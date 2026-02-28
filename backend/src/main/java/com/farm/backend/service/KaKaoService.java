package com.farm.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.farm.backend.domain.Member;
import com.farm.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoService {

    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 카카오 로그인 (code → Member 리턴)
    public Member kakaoLogin(String code) throws Exception {

        RestTemplate rt = new RestTemplate();

        // 1) Access Token 요청 (기존에 쓰던 값 그대로 유지)
        String tokenUrl = "https://kauth.kakao.com/oauth/token" +
                "?grant_type=authorization_code" +
                "&client_id=96a4a7dfe35ee2e71a6d030c21bfacec" +
                "&redirect_uri=http://localhost:3000/oauth/kakao" +
                "&code=" + code;

        String tokenResult = rt.postForObject(tokenUrl, null, String.class);
        JsonNode tokenJson = objectMapper.readTree(tokenResult);
        String accessToken = tokenJson.get("access_token").asText();

        // 2) 사용자 정보 요청 (Authorization 헤더 방식)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> userResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                String.class);

        JsonNode profile = objectMapper.readTree(userResponse.getBody());
        String kakaoId = profile.get("id").asText();

        // ✅ 닉네임 우선순위:
        // 1순위: kakao_account.profile.nickname (새 API)
        // 2순위: properties.nickname (옛날 위치)
        // 3순위: "카카오사용자" 기본값
        String nickname = "카카오사용자";

        // 1) kakao_account.profile.nickname 시도
        JsonNode kakaoAccount = profile.get("kakao_account");
        if (kakaoAccount != null && kakaoAccount.has("profile")) {
            JsonNode kakaoProfile = kakaoAccount.get("profile");
            if (kakaoProfile != null && kakaoProfile.has("nickname")) {
                nickname = kakaoProfile.get("nickname").asText();
            }
        }

        // 2) 그래도 "카카오사용자"면, 예전 properties.nickname 확인
        if ("카카오사용자".equals(nickname)) {
            JsonNode properties = profile.get("properties");
            if (properties != null && properties.has("nickname")) {
                nickname = properties.get("nickname").asText();
            }
        }

        // 3) DB 저장 or 기존 회원 로그인
        Member member = memberRepository.findByUserId(kakaoId);
        if (member == null) {
            member = new Member();
            member.setUserId(kakaoId);
            member.setNickname(nickname);
            member.setName(nickname); // name도 닉네임으로 통일
            member.setProvider("kakao");
            memberRepository.save(member);
        } else {
            // 닉네임이 바뀌었을 수도 있으니 업데이트 (선택)
            member.setNickname(nickname);
            member.setName(nickname);
            memberRepository.save(member);
        }

        return member;
    }
}
