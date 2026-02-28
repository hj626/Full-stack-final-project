package com.farm.backend.dto;

import lombok.Data;

@Data
public class SocialUserDto {
    private String provider;      // kakao, naver 등
    private String providerId;    // 소셜 고유 ID
    private String email;         // 소셜 이메일
    private String name;          // 화면 표시용 이름
    private String nickname;      // 카카오 닉네임
}
