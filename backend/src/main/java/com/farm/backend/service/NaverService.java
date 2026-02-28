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
public class NaverService {

    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Member naverLogin(String code, String state) throws Exception {

        RestTemplate rt = new RestTemplate();

        // 1) 네이버 Access Token 요청
        String tokenUrl =
                "https://nid.naver.com/oauth2.0/token" +
                        "?grant_type=authorization_code" +
                        "&client_id=b3OBagSlwW4Riy478hl0" +
                        "&client_secret=hURfwxHrsB" +
                        "&redirect_uri=http://localhost:3000/oauth/naver" +
                        "&code=" + code +
                        "&state=" + state;

        String tokenResult = rt.getForObject(tokenUrl, String.class);
        JsonNode tokenJson = objectMapper.readTree(tokenResult);
        String accessToken = tokenJson.get("access_token").asText();

        // 2) 사용자 정보 요청
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> userResponse = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.GET,
                entity,
                String.class
        );

        JsonNode profile = objectMapper.readTree(userResponse.getBody());
        JsonNode response = profile.get("response");

        String naverId = response.get("id").asText();
        String name = response.get("name").asText();
        String nickname = response.get("nickname").asText();

        // 3) DB 저장 또는 기존 로그인
        Member member = memberRepository.findByUserId(naverId);
        if (member == null) {
            member = new Member();
            member.setUserId(naverId);
            member.setName(name);
            member.setNickname(nickname);
            member.setProvider("naver");
            memberRepository.save(member);
        }

        return member;
    }
}
