package com.farm.backend.controller;

import com.farm.backend.domain.Member;
import com.farm.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Member member) {
        try {
            memberService.signup(member);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "회원가입 성공");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String password = request.get("password");

        Member member = memberService.login(userId, password);
        if (member != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "로그인 성공");
            response.put("userId", member.getUserId());
            response.put("name", member.getName());
            response.put("nickname", member.getNickname());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "아이디 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
