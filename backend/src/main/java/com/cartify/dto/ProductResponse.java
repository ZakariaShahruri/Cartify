package com.cartify.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Read-only product response — safe to send to the frontend.
 */
public record ProductResponse(
        UUID id,
        String name,
        String description,
        BigDecimal price,
        Integer stockQuantity,
        String imageUrl,
        String categoryName,
        String categorySlug,
        BigDecimal ratingAvg,
        Integer ratingCount,
        Boolean isFeatured,
        Instant createdAt
) {

    /** Convenience factory from entity */
    public static ProductResponse from(com.cartify.model.Product p) {
        return new ProductResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getStockQuantity(),
                p.getImageUrl(),
                p.getCategory() != null ? p.getCategory().getName() : null,
                p.getCategory() != null ? p.getCategory().getSlug() : null,
                p.getRatingAvg(),
                p.getRatingCount(),
                p.getIsFeatured(),
                p.getCreatedAt()
        );
    }
}
