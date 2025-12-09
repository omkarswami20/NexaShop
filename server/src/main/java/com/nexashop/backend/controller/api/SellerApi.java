package com.nexashop.backend.controller.api;

import com.nexashop.backend.dto.LoginRequest;
import com.nexashop.backend.dto.LoginResponse;
import com.nexashop.backend.dto.SellerRegisterRequest;
import com.nexashop.backend.entity.Seller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Sellers", description = "Endpoints for seller registration and login")
public interface SellerApi {

    @Operation(summary = "Register a new Seller", description = "Creates a new seller account with PENDING_APPROVAL status. Generates and sends an OTP to the provided phone number.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration successful, OTP sent"),
            @ApiResponse(responseCode = "400", description = "Email or Phone number already exists")
    })
    ResponseEntity<Seller> registerSeller(@RequestBody SellerRegisterRequest request);

    @Operation(summary = "Login Seller", description = "Authenticates a seller using Email OR Phone Number and Password. Checks if Phone and Email are verified and if the account is approved.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful, returns JWT token"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "403", description = "Access denied (Not verified or Pending Approval)")
    })
    ResponseEntity<LoginResponse> loginSeller(@RequestBody LoginRequest request);
}
