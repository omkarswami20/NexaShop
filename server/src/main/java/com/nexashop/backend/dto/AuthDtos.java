package com.nexashop.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuthDtos {

        @Schema(description = "Request object for user login")
        public record LoginRequest(
                        @Schema(description = "User's email or phone number", example = "seller@example.com") @NotBlank(message = "Identifier (Email or Phone) is required") String identifier,

                        @Schema(description = "User's password", example = "password123") @NotBlank(message = "Password is required") String password) {
        }

        @Schema(description = "Response object for successful login")
        public record LoginResponse(
                        @Schema(description = "JWT access token") String token,
                        @Schema(description = "JWT refresh token") String refreshToken,
                        @Schema(description = "Token type", example = "Bearer") String type,
                        @Schema(description = "User ID") Long id,
                        @Schema(description = "User's full name") String name,
                        @Schema(description = "User's email address") String email,
                        @Schema(description = "User's role", example = "SELLER") String role,
                        @Schema(description = "Whether the user's email is verified") boolean isVerified,
                        @Schema(description = "User's account status", example = "APPROVED") String status) {
                public LoginResponse(String token, String refreshToken, Long id, String name, String email, String role,
                                boolean isVerified, String status) {
                        this(token, refreshToken, "Bearer", id, name, email, role, isVerified, status);
                }
        }

        @Schema(description = "Request object for seller registration")
        public record SellerRegisterRequest(
                        @Schema(description = "Name of the business/store", example = "My Awesome Store") @NotBlank(message = "Business Name is required") String businessName,

                        @Schema(description = "Full name of the owner", example = "John Doe") @NotBlank(message = "Owner Name is required") String ownerName,

                        @Schema(description = "Owner's email address", example = "john@example.com") @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                        @Schema(description = "Owner's phone number", example = "9876543210") @NotBlank(message = "Phone number is required") @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits") String phone,

                        @Schema(description = "Password for the account", example = "securePass123") @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password,

                        @Schema(description = "Business address", example = "123 Main St, City, Country") @NotBlank(message = "Address is required") String address) {
        }

        @Schema(description = "Request object for refreshing the access token")
        public record TokenRefreshRequest(
                        @Schema(description = "The refresh token received during login") @NotBlank(message = "Refresh token is required") String refreshToken) {
        }

        @Schema(description = "Response object containing new access and refresh tokens")
        public record TokenRefreshResponse(
                        @Schema(description = "New JWT access token") String accessToken,
                        @Schema(description = "New JWT refresh token") String refreshToken,
                        @Schema(description = "Token type", example = "Bearer") String tokenType) {
                public TokenRefreshResponse(String accessToken, String refreshToken) {
                        this(accessToken, refreshToken, "Bearer");
                }
        }

        @Schema(description = "Request object for verifying OTP")
        public record VerifyOtpRequest(
                        @Schema(description = "User's email or phone number") @NotBlank(message = "Identifier (Email or Phone) is required") String identifier,

                        @Schema(description = "One-Time Password sent to the user", example = "123456") @NotBlank(message = "OTP is required") String otp) {
        }

        @Schema(description = "Request object for verifying email via token")
        public record VerifyEmailRequest(
                        @Schema(description = "Verification token from the email link") @NotBlank(message = "Token is required") String token) {
        }

        @Schema(description = "Request object for admin login")
        public record AdminLoginRequest(
                        @Schema(description = "Admin's email address", example = "admin@nexashop.com") @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                        @Schema(description = "Admin's password") @NotBlank(message = "Password is required") String password) {
        }

        @Schema(description = "Request object for customer registration")
        public record CustomerRegisterRequest(
                        @Schema(description = "Full name of the customer", example = "Jane Doe") @NotBlank(message = "Name is required") String name,
                        @Schema(description = "Username for the account", example = "janedoe") @NotBlank(message = "Username is required") String username,
                        @Schema(description = "Email address", example = "jane@example.com") @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
                        @Schema(description = "Phone number", example = "9876543210") @NotBlank(message = "Phone number is required") @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits") String phone,
                        @Schema(description = "Password", example = "securePass123") @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password) {
        }

        @Schema(description = "Request object for forgot password")
        public record ForgotPasswordRequest(
                        @Schema(description = "User's email or phone number") @NotBlank(message = "Identifier is required") String identifier) {
        }

        @Schema(description = "Request object for reset password")
        public record ResetPasswordRequest(
                        @Schema(description = "User's email or phone number") @NotBlank(message = "Identifier is required") String identifier,
                        @Schema(description = "OTP received") @NotBlank(message = "OTP is required") String otp,
                        @Schema(description = "New password") @NotBlank(message = "New Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String newPassword) {
        }
}
