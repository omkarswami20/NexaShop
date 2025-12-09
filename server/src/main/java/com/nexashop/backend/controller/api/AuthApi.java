package com.nexashop.backend.controller.api;

import com.nexashop.backend.dto.TokenRefreshRequest;
import com.nexashop.backend.dto.VerifyEmailRequest;
import com.nexashop.backend.dto.VerifyOtpRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Authentication", description = "Endpoints for authentication, verification, and token management")
public interface AuthApi {

    @Operation(summary = "Refresh Access Token", description = "Generates a new access token using a valid refresh token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token refreshed successfully"),
            @ApiResponse(responseCode = "403", description = "Refresh token is not in database or expired")
    })
    ResponseEntity<?> refreshtoken(@RequestBody TokenRefreshRequest request);

    @Operation(summary = "Verify OTP", description = "Verifies the OTP sent to the user's phone number. If successful, sends an email verification link.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OTP verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid OTP or OTP expired"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request);

    @Operation(summary = "Verify Email", description = "Verifies the email using the token sent via email link. If successful, marks email as verified.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid token")
    })
    ResponseEntity<?> verifyEmail(@RequestBody VerifyEmailRequest request);

    @Operation(summary = "Logout user", security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<?> logoutUser();
}
