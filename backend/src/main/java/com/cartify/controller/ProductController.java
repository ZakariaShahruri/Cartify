package com.cartify.controller;

import com.cartify.dto.PagedResponse;
import com.cartify.dto.ProductResponse;
import com.cartify.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product catalog endpoints")
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products?page=0&size=12&sortBy=createdAt&dir=desc
     */
    @GetMapping
    @Operation(summary = "List all products (paginated)")
    public ResponseEntity<PagedResponse<ProductResponse>> listProducts(
            @RequestParam(defaultValue = "0")    int page,
            @RequestParam(defaultValue = "12")   int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String dir
    ) {
        return ResponseEntity.ok(productService.getProducts(page, size, sortBy, dir));
    }

    /**
     * GET /api/products/featured
     */
    @GetMapping("/featured")
    @Operation(summary = "Get featured products for homepage")
    public ResponseEntity<PagedResponse<ProductResponse>> featuredProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ResponseEntity.ok(productService.getFeatured(page, size));
    }

    /**
     * GET /api/products/search?q=headphones
     */
    @GetMapping("/search")
    @Operation(summary = "Search products by name or description")
    public ResponseEntity<PagedResponse<ProductResponse>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return ResponseEntity.ok(productService.search(q, page, size));
    }

    /**
     * GET /api/products/category/electronics
     */
    @GetMapping("/category/{slug}")
    @Operation(summary = "Filter products by category slug")
    public ResponseEntity<PagedResponse<ProductResponse>> byCategory(
            @PathVariable String slug,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return ResponseEntity.ok(productService.getByCategory(slug, page, size));
    }

    /**
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get a product by ID")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.getById(id));
    }
}
