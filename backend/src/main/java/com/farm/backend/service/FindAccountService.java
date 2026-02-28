package com.farm.backend.service;

import com.farm.backend.domain.Member;
import com.farm.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindAccountService {

    private final MemberRepository memberRepository;

    // 아이디 찾기
    public String findUserId(String name, String email) {
        Member member = memberRepository.findByNameAndEmail(name, email);

        if (member == null) {
            throw new RuntimeException("일치하는 회원 정보가 없습니다.");
        }

        return member.getUserId();
    }

    // 비밀번호 찾기 - 회원 존재 여부만 확인 (메일 인증 없음)
    public boolean checkUserForPw(String name, String userId, String email) {
        Member member = memberRepository.findByNameAndUserIdAndEmail(name, userId, email);

        return member != null;
    }

    // 비밀번호 변경
    public void updatePassword(String userId, String newPassword) {
        Member member = memberRepository.findByUserId(userId);

        if (member == null) {
            throw new RuntimeException("회원이 존재하지 않습니다.");
        }

        member.setPassword(newPassword);
        memberRepository.save(member);
    }
}
