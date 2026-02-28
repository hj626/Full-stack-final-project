package com.farm.backend.product.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farm.backend.product.dto.ProductDTO;
import com.farm.backend.product.entity.Product;
import com.farm.backend.product.service.ProductService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductDetailController {

    private final ProductService productService;

    @GetMapping("/detail/{id}")
    public ProductDTO getProductDetail(@PathVariable String id) {
        Product product = productService.findById(id);
        if (product == null)
            return null;

        return ProductDTO.builder()
                .name(product.getName())
                .price(product.getPrice())
                .stock(product.getStock())
                .unit(product.getUnit())
                .origin(product.getOrigin())
                .originDetail(product.getOriginDetail())
                .farmingType(product.getFarmingType())
                .harvestDate(product.getHarvestDate())
                .expirationDate(product.getExpirationDate())
                .tags(product.getTags())
                .description(product.getDescription())
                .category(product.getCategory())
                .images(product.getImages())
                .mainImage(product.getMainImage())
                .storageMethod(product.getStorageMethod())
                .shippingConditions(product.getShippingConditions())
                .discountRate(product.getDiscountRate())
                .discountStart(product.getDiscountStart())
                .discountEnd(product.getDiscountEnd())
                .bulkMinQuantity(product.getBulkMinQuantity())
                .bulkDiscountRate(product.getBulkDiscountRate())
                .stockWarningThreshold(product.getStockWarningThreshold())
                .shippingFreeThreshold(product.getShippingFreeThreshold())
                .additionalShippingFee(product.getAdditionalShippingFee())
                .certificates(product.getCertificates())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

}
