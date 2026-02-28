package com.farm.backend.controller;

import com.farm.backend.domain.Like;
import com.farm.backend.domain.Post;
import com.farm.backend.repository.LikeRepository;
import com.farm.backend.repository.PostRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class LikeController {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    @PostMapping("/post/{postId}")
    public Map<String, Integer> toggleLike(@PathVariable String postId) {

        // 기존 좋아요 여부 확인
        Like existing = likeRepository.findByPostId(postId);

        Post post = postRepository.findById(postId).orElse(null);

        if (post == null) {
            Map<String, Integer> result = new HashMap<>();
            result.put("likeCount", 0);
            return result;
        }

        // 좋아요 없으면 추가
        if (existing == null) {
            Like like = new Like();
            like.setPostId(postId);
            likeRepository.save(like);

            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);

        } else { // 좋아요 있었으면 취소
            likeRepository.delete(existing);

            post.setLikeCount(Math.max(0, post.getLikeCount() - 1));
            postRepository.save(post);
        }

        // 최종 좋아요 수 리턴
        Map<String, Integer> response = new HashMap<>();
        response.put("likeCount", post.getLikeCount());
        return response;
    }
}
