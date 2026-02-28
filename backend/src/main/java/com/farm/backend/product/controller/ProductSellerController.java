package com.farm.backend.product.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farm.backend.product.dto.ProductDTO;
import com.farm.backend.product.entity.Product;
import com.farm.backend.product.service.ProductService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/seller/products")
@RequiredArgsConstructor
public class ProductSellerController {

    // 판매자용 컨트롤러

    private final ProductService productService;

    // @PostMapping
    // public Product createProduct(@RequestBody ProductDTO productDTO,
    // Authentication auth) {

    @PostMapping
    public Product createProduct(@RequestBody ProductDTO productDTO) {

        // if (auth == null)
        // throw new RuntimeException("인증 실패");

        // 권한 설정
        // String sellerId = auth.getName();
        // String sellerName = auth.getAuthorities().toString();

        String sellerId = "test-seller";
        String sellerName = "테스트 판매자";

        System.out.println("상품등록 요청 들어옴");

        return productService.create(productDTO, sellerId, sellerName);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable String id,
            @RequestBody Product product) {

        return productService.update(product, id);
    }

    @GetMapping("/mine")
    public List<Product> getMyProducts(Authentication auth) {
        String sellerId = auth.getName();
        return productService.findMyProducts(sellerId);
    }

}