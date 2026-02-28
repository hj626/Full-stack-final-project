package com.farm.backend.controller;

import com.farm.backend.service.KakaoService;
import com.farm.backend.service.NaverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocialController {

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private NaverService naverService;

    // 카카오 로그인
    @GetMapping("/api/social/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestParam String code) throws Exception {
        return ResponseEntity.ok(kakaoService.kakaoLogin(code));
    }

    // 네이버 로그인 
    @GetMapping("/api/social/naver")
    public ResponseEntity<?> naverLogin(@RequestParam String code,
                                        @RequestParam String state) throws Exception {
        return ResponseEntity.ok(naverService.naverLogin(code, state));
    }
}
