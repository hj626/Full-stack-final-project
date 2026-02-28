package com.farm.backend.controller;

import com.farm.backend.domain.Comment;
import com.farm.backend.domain.Post;
import com.farm.backend.repository.CommentRepository;
import com.farm.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 🔥 댓글 조회
    @GetMapping("/{postId}")
    public List<Comment> getComments(@PathVariable String postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    // 🔥 댓글 생성
    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {

        comment.setCreatedAt(LocalDateTime.now());
        Comment saved = commentRepository.save(comment);

        // 🔥 댓글 개수 증가
        Post post = postRepository.findById(comment.getPostId()).orElse(null);
        if (post != null) {
            post.setCommentCount(post.getCommentCount() + 1);
            postRepository.save(post);
        }

        return saved;
    }
}
