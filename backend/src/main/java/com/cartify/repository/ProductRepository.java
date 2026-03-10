package com.cartify.repository;

import com.cartify.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    // Filter by category slug
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.slug = :slug")
    Page<Product> findByCategorySlug(@Param("slug") String slug, Pageable pageable);

    // Full-text search on name and description
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Product> search(@Param("q") String query, Pageable pageable);

    // Featured products for homepage
    Page<Product> findByIsFeaturedTrue(Pageable pageable);
}
