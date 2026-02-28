package com.farm.backend.controller;

import com.farm.backend.domain.Post;
import com.farm.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;

    // ===============================
    // 이미지 저장 함수
    // ===============================
    private String saveImage(MultipartFile image) {
        if (image == null || image.isEmpty()) return null;

        try {
            // 저장할 경로 (서버 로컬)
            String uploadDir = System.getProperty("user.dir") + "/uploads";

            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // 파일명 설정
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File dest = new File(dir, fileName);

            // 파일 저장
            image.transferTo(dest);

            // 프론트에서 접근할 URL
            return "/uploads/" + fileName;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // ===============================
    // 게시글 생성 (multipart/form-data)
    // ===============================
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setViews(0);
        post.setCommentCount(0);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        // 이미지 저장
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            post.setImageUrl(imageUrl);
        }

        return postRepository.save(post);
    }

    // ===============================
    // 게시글 목록 조회
    // ===============================
    @GetMapping
    public List<Post> getPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    // ===============================
    // 최신 3개 게시글 조회
    // ===============================
    @GetMapping("/latest")
    public List<Post> getLatestPosts() {
        return postRepository.findTop3ByOrderByCreatedAtDesc();
    }

    // ===============================
    // 게시글 상세 조회 (+ 조회수 증가)
    // ===============================
    @GetMapping("/{id}")
    public Post getPost(@PathVariable String id) {
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) return null;

        post.setViews(post.getViews() + 1);
        postRepository.save(post);

        return post;
    }
}
