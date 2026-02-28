package com.farm.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.farm.backend.domain.EmailVerify;
import com.farm.backend.repository.EmailVerifyRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailVerifyRepository emailVerifyRepository;

    // 이메일 보내는 대신 "인증코드 저장만" 처리
    public String sendVerification(String email) {

        // 6자리 코드 생성
        String code = generateCode();

        // EmailVerify 저장
        EmailVerify verify = new EmailVerify();
        verify.setEmail(email);
        verify.setCode(code);
        verify.setCreatedAt(LocalDateTime.now());
        verify.setExpiredAt(LocalDateTime.now().plusMinutes(5)); // 5분 유효

        emailVerifyRepository.save(verify);

        // 실제 이메일은 보내지 않으므로 이메일 주소 그대로 반환
        return email;
    }

    // 인증코드 검증
    public boolean verifyCode(String email, String code) {
        return emailVerifyRepository.findTopByEmailOrderByCreatedAtDesc(email)
                .filter(v -> v.getExpiredAt().isAfter(LocalDateTime.now()))
                .filter(v -> v.getCode().equals(code))
                .isPresent();
    }

    public String sendVerifyCode(String email) {
    return sendVerification(email);
}

    // 랜덤 6자리 코드 생성
    private String generateCode() {
        Random random = new Random();
        int number = random.nextInt(900000) + 100000; // 100000 ~ 999999
        return String.valueOf(number);
    }
}
