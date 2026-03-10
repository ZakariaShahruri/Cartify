package com.cartify.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public record RegisterRequest(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 8) String password,
            @NotBlank String fullName
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record AuthResponse(
            String token,
            String tokenType,
            UserResponse user
    ) {
        public static AuthResponse of(String token, UserResponse user) {
            return new AuthResponse(token, "Bearer", user);
        }
    }

    public record UserResponse(
            String id,
            String email,
            String fullName,
            String role,
            String avatarUrl
    ) {
        public static UserResponse from(com.cartify.model.User u) {
            return new UserResponse(
                    u.getId().toString(),
                    u.getEmail(),
                    u.getFullName(),
                    u.getRole().name(),
                    u.getAvatarUrl()
            );
        }
    }
}
