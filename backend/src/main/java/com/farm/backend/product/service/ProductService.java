package com.farm.backend.product.service;

import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.farm.backend.product.dto.ProductDTO;
import com.farm.backend.product.entity.Product;
import com.farm.backend.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    // Repository를 이용해 데이터 사용 로직 처리

    private final ProductRepository productRepository;

    // 판매자 상품 등록
    public Product create(ProductDTO dto, String sellerId, String sellerName) {
        Product product = Product.builder()
                .id(new ObjectId().toString())
                .name(dto.getName())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .unit(dto.getUnit())
                .origin(dto.getOrigin())
                .originDetail(dto.getOriginDetail())
                .farmingType(dto.getFarmingType())
                .harvestDate(dto.getHarvestDate())
                .expirationDate(dto.getExpirationDate())
                .tags(dto.getTags())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .images(dto.getImages())
                .mainImage(dto.getMainImage())
                .storageMethod(dto.getStorageMethod())
                .shippingConditions(dto.getShippingConditions())
                .discountRate(dto.getDiscountRate())
                .discountStart(dto.getDiscountStart())
                .discountEnd(dto.getDiscountEnd())
                .bulkMinQuantity(dto.getBulkMinQuantity())
                .bulkDiscountRate(dto.getBulkDiscountRate())
                .stockWarningThreshold(dto.getStockWarningThreshold())
                .shippingFreeThreshold(dto.getShippingFreeThreshold())
                .additionalShippingFee(dto.getAdditionalShippingFee())
                .certificates(dto.getCertificates())
                .sellerId(sellerId)
                .sellerName(sellerName)
                .status("pending")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return productRepository.save(product);
    }

    // 상품 전체 조회(공개)
    public List<Product> findAll() {
        return productRepository.findByStatus("approved");
    }

    // 상품 상세 조회
    public Product findById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    // 판매자 본인 상품 조회
    public List<Product> findMyProducts(String sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    // 판매자 상품 수정
    public Product update(Product updated, String id) {
        Product product = findById(id);
        if (product == null)
            return null;

        updated.setId(id);
        updated.setSellerId(product.getSellerId());
        updated.setSellerName(product.getSellerName());
        updated.setStatus("pending");// 수정 시 다시 승인 필요
        updated.setCreatedAt(product.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(updated);
    }

    // 관리자 기능

    // 관리자 승인
    public Product approve(String id) {
        Product product = findById(id);
        if (product == null)
            return null;

        product.setStatus("approved");
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    // 관리자가 상품 삭제
    public void delete(String id) {
        productRepository.deleteById(id);
    }

}
