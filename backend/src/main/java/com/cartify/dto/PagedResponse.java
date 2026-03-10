package com.cartify.dto;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

/**
 * Generic paginated API wrapper.
 *
 * Example response:
 * {
 *   "content": [...],
 *   "page": 0,
 *   "size": 12,
 *   "totalElements": 48,
 *   "totalPages": 4,
 *   "last": false
 * }
 */
public record PagedResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {

    public static <E, D> PagedResponse<D> of(Page<E> pageResult, Function<E, D> mapper) {
        return new PagedResponse<>(
                pageResult.getContent().stream().map(mapper).toList(),
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements(),
                pageResult.getTotalPages(),
                pageResult.isLast()
        );
    }
}
