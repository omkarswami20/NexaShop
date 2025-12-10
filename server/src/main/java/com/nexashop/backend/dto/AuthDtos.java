package com.nexashop.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuthDtos {

        public record LoginRequest(
                        @NotBlank(message = "Identifier (Email or Phone) is required") String identifier,

                        @NotBlank(message = "Password is required") String password) {
        }

        public record LoginResponse(
                        String token,
                        String refreshToken,
                        String type,
                        Long id,
                        String name,
                        String email,
                        String role,
                        boolean isVerified,
                        String status) {
                public LoginResponse(String token, String refreshToken, Long id, String name, String email, String role,
                                boolean isVerified, String status) {
                        this(token, refreshToken, "Bearer", id, name, email, role, isVerified, status);
                }
        }

        public record SellerRegisterRequest(
                        @NotBlank(message = "Business Name is required") String businessName,

                        @NotBlank(message = "Owner Name is required") String ownerName,

                        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                        @NotBlank(message = "Phone number is required") @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits") String phone,

                        @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password,

                        @NotBlank(message = "Address is required") String address) {
        }

        public record TokenRefreshRequest(
                        @NotBlank(message = "Refresh token is required") String refreshToken) {
        }

        public record TokenRefreshResponse(
                        String accessToken,
                        String refreshToken,
                        String tokenType) {
                public TokenRefreshResponse(String accessToken, String refreshToken) {
                        this(accessToken, refreshToken, "Bearer");
                }
        }

        public record VerifyOtpRequest(
                        @NotBlank(message = "Identifier (Email or Phone) is required") String identifier,

                        @NotBlank(message = "OTP is required") String otp) {
        }

        public record VerifyEmailRequest(
                        @NotBlank(message = "Token is required") String token) {
        }

        public record AdminLoginRequest(
                        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                        @NotBlank(message = "Password is required") String password) {
        }
}
