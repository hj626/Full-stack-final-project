package com.farm.backend.product.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.farm.backend.product.entity.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    // 물품 저장소

    List<Product> findBySellerId(String sellerId);

    List<Product> findByStatus(String status);

    List<Product> findByCategory(String category);
}
