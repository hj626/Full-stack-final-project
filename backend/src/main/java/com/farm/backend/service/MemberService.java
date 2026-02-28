package com.farm.backend.service;

import com.farm.backend.domain.Member;
import com.farm.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    public Member signup(Member member) {

        // 기본 provider 값 설정
        if (member.getProvider() == null || member.getProvider().trim().isEmpty()) {
            member.setProvider("local");
        }

        // 이메일 중복체크
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }

        // 아이디 중복체크
        if (memberRepository.existsByUserId(member.getUserId())) {
            throw new RuntimeException("이미 사용 중인 아이디입니다.");
        }

        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        return memberRepository.save(member);
    }
        public Member findByUserId(String userId) {
        return memberRepository.findByUserId(userId);
    }

    // 로그인
    public Member login(String userId, String rawPassword) {
        Member member = memberRepository.findByUserId(userId);

        // 비밀번호 비교
        if (member != null && passwordEncoder.matches(rawPassword, member.getPassword())) {
            return member;
        }

        return null;
    }
}
