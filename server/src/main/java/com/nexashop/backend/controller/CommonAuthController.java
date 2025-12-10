package com.nexashop.backend.controller;

import com.nexashop.backend.dto.*;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.repository.SellerRepository;
import com.nexashop.backend.security.JwtUtils;
import com.nexashop.backend.service.AdminAuthService;
import com.nexashop.backend.service.OtpService;
import com.nexashop.backend.service.RefreshTokenService;
import com.nexashop.backend.service.SellerService;
import com.nexashop.backend.service.CustomerService;
import com.nexashop.backend.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for authentication, verification, and token management")
public class CommonAuthController {

    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;
    private final SellerRepository sellerRepository;
    private final SellerService sellerService;
    private final AdminAuthService adminAuthService;
    private final OtpService otpService;
    private final CustomerService customerService;

    public CommonAuthController(RefreshTokenService refreshTokenService,
            JwtUtils jwtUtils,
            SellerRepository sellerRepository,
            SellerService sellerService,
            AdminAuthService adminAuthService,
            OtpService otpService,
            CustomerService customerService) {
        this.refreshTokenService = refreshTokenService;
        this.jwtUtils = jwtUtils;
        this.sellerRepository = sellerRepository;
        this.sellerService = sellerService;
        this.adminAuthService = adminAuthService;
        this.otpService = otpService;
        this.customerService = customerService;
    }

    // ------------------- GENERAL AUTH -------------------

    @Operation(summary = "Refresh Access Token", description = "Generates a new access token using a valid refresh token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token refreshed successfully"),
            @ApiResponse(responseCode = "403", description = "Refresh token is not in database or expired")
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshtoken(@RequestBody AuthDtos.TokenRefreshRequest request) {
        String requestRefreshToken = request.refreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(com.nexashop.backend.entity.RefreshToken::getEmail)
                .map(email -> {
                    String role = "ROLE_ADMIN";
                    if (sellerRepository.findByEmail(email).isPresent()) {
                        role = "ROLE_SELLER";
                    }
                    // TODO: Check for Customer role as well if needed for refresh token logic
                    // For now defaulting to ADMIN/SELLER logic, but should be updated for generic
                    // role detection

                    String token = jwtUtils.generateToken(email, role);
                    return ResponseEntity.ok(new AuthDtos.TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    @Operation(summary = "Send OTP", description = "Generates and sends an OTP to the provided phone number.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OTP sent successfully"),
            @ApiResponse(responseCode = "500", description = "Failed to send OTP")
    })
    @org.springframework.web.bind.annotation.GetMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@org.springframework.web.bind.annotation.RequestParam String phone) {
        String otp = otpService.generateOtp();
        otpService.sendOtp(phone, otp);
        return ResponseEntity.ok(Map.of("message", "OTP sent"));
    }

    @Operation(summary = "Verify OTP", description = "Verifies the OTP sent to the user's phone number.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OTP verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid OTP or OTP expired"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthDtos.VerifyOtpRequest request) {
        // 1. Try Seller Verification (DB) - Prioritize this to ensure DB update for
        // registration
        try {
            sellerService.verifyOtp(request.identifier(), request.otp());
            // Also clear from memory if present to keep it clean
            otpService.validateOtp(request.identifier(), request.otp());
            return ResponseEntity
                    .ok(Map.of("message", "OTP verified successfully. Please check your email for verification link."));
        } catch (ResourceNotFoundException | IllegalArgumentException e) {
            // 2. Fallback to in-memory OTP service (Generic Flow)
            // If user not found in DB or OTP doesn't match DB (but might match memory for
            // generic flow)
            if (otpService.validateOtp(request.identifier(), request.otp())) {
                return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
            }
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP or User not found"));
        }
    }

    @Operation(summary = "Verify Email", description = "Verifies the email using the token sent via email link. If successful, marks email as verified.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid token")
    })
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody AuthDtos.VerifyEmailRequest request) {
        try {
            sellerService.verifyEmail(request.token());
            return ResponseEntity.ok(Map.of("message", "Email verified successfully. Please wait for Admin Approval."));
        } catch (ResourceNotFoundException e) {
            try {
                customerService.verifyEmail(request.token());
                return ResponseEntity.ok(Map.of("message", "Email verified successfully! You can now login."));
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid verification token"));
            }
        }
    }

    @Operation(summary = "Logout user", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @Operation(summary = "Forgot Password", description = "Initiates password reset flow by sending OTP.")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody AuthDtos.ForgotPasswordRequest request) {
        // Check if user exists (Seller or Customer)
        // For now, we'll just generate OTP and send it.
        // In a real app, we should verify existence to avoid enumeration, but for this
        // sprint:

        String otp = otpService.generateOtp();
        // Determine if email or phone
        if (request.identifier().contains("@")) {
            // Send Email OTP (Not implemented in OtpService yet, assuming phone for now or
            // logging)
            System.out.println("Email OTP for " + request.identifier() + ": " + otp);
        } else {
            otpService.sendOtp(request.identifier(), otp);
        }

        return ResponseEntity.ok(Map.of("message", "OTP sent for password reset"));
    }

    @Operation(summary = "Reset Password", description = "Resets password using OTP.")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody AuthDtos.ResetPasswordRequest request) {
        if (!otpService.validateOtp(request.identifier(), request.otp())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP"));
        }

        // Try to reset for Customer first (as per current focus)
        try {
            customerService.resetPassword(request.identifier(), request.newPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } catch (ResourceNotFoundException e) {
            // Try Seller
            try {
                sellerService.resetPassword(request.identifier(), request.newPassword());
                return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
            }
        }
    }

    // ------------------- SELLER AUTH -------------------

    @Operation(summary = "Register a new Seller", description = "Creates a new seller account with PENDING_APPROVAL status. Generates and sends an OTP to the provided phone number.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration successful, OTP sent"),
            @ApiResponse(responseCode = "400", description = "Email or Phone number already exists")
    })
    @PostMapping("/seller/register")
    public ResponseEntity<Seller> registerSeller(@Valid @RequestBody AuthDtos.SellerRegisterRequest request) {
        return ResponseEntity.ok(sellerService.registerSeller(request));
    }

    @Operation(summary = "Login Seller", description = "Authenticates a seller using Email OR Phone Number and Password. Checks if Phone and Email are verified and if the account is approved.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful, returns JWT token"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "403", description = "Access denied (Not verified or Pending Approval)")
    })
    @PostMapping("/seller/login")
    public ResponseEntity<AuthDtos.LoginResponse> loginSeller(@Valid @RequestBody AuthDtos.LoginRequest request) {
        return ResponseEntity.ok(sellerService.loginSeller(request));
    }

    // ------------------- ADMIN AUTH -------------------

    @Operation(summary = "Login Admin", description = "Authenticates an admin using Email and Password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful, returns JWT token"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/admin/login")
    public ResponseEntity<AuthDtos.LoginResponse> loginAdmin(@Valid @RequestBody AuthDtos.AdminLoginRequest request) {
        return ResponseEntity.ok(adminAuthService.login(request));
    }

    // ------------------- CUSTOMER AUTH -------------------

    @Operation(summary = "Register a new Customer", description = "Creates a new customer account. Auto-approved.")
    @PostMapping("/customer/register")
    public ResponseEntity<com.nexashop.backend.entity.Customer> registerCustomer(
            @Valid @RequestBody AuthDtos.CustomerRegisterRequest request) {
        return ResponseEntity.ok(customerService.registerCustomer(request));
    }

    @Operation(summary = "Login Customer", description = "Authenticates a customer.")
    @PostMapping("/customer/login")
    public ResponseEntity<AuthDtos.LoginResponse> loginCustomer(@Valid @RequestBody AuthDtos.LoginRequest request) {
        return ResponseEntity.ok(customerService.loginCustomer(request));
    }
}
