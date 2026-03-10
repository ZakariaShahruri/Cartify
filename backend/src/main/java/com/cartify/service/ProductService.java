package com.cartify.service;

import com.cartify.dto.PagedResponse;
import com.cartify.dto.ProductResponse;
import com.cartify.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    /**
     * Returns a paginated list of all products.
     *
     * @param page   zero-based page index
     * @param size   items per page (max 50)
     * @param sortBy field to sort by (e.g. "price", "ratingAvg", "createdAt")
     * @param dir    "asc" or "desc"
     */
    public PagedResponse<ProductResponse> getProducts(int page, int size, String sortBy, String dir) {
        size = Math.min(size, 50);
        Sort sort = dir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return PagedResponse.of(productRepository.findAll(pageable), ProductResponse::from);
    }

    /** Returns products filtered by category slug */
    public PagedResponse<ProductResponse> getByCategory(String slug, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return PagedResponse.of(productRepository.findByCategorySlug(slug, pageable), ProductResponse::from);
    }

    /** Search products by name or description */
    public PagedResponse<ProductResponse> search(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return PagedResponse.of(productRepository.search(query, pageable), ProductResponse::from);
    }

    /** Get a single product by ID */
    public ProductResponse getById(UUID id) {
        return productRepository.findById(id)
                .map(ProductResponse::from)
                .orElseThrow(() -> new com.cartify.exception.ResourceNotFoundException("Product not found: " + id));
    }

    /** Featured products for homepage hero */
    public PagedResponse<ProductResponse> getFeatured(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return PagedResponse.of(productRepository.findByIsFeaturedTrue(pageable), ProductResponse::from);
    }
}
