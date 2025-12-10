package com.nexashop.backend.controller;

import com.nexashop.backend.dto.CustomerDtos;

import com.nexashop.backend.service.CustomerService;
import com.nexashop.backend.security.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@Tag(name = "Customer Management", description = "Endpoints for customer profile and address management")
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

    private final CustomerService customerService;
    private final JwtUtils jwtUtils;

    public CustomerController(CustomerService customerService, JwtUtils jwtUtils) {
        this.customerService = customerService;
        this.jwtUtils = jwtUtils;
    }

    private String getEmailFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return jwtUtils.getEmailFromToken(authHeader.substring(7));
        }
        throw new IllegalArgumentException("Invalid Authorization Header");
    }

    @Operation(summary = "Get Customer Profile")
    @GetMapping("/profile")
    public ResponseEntity<CustomerDtos.ProfileResponse> getProfile(@RequestHeader("Authorization") String authHeader) {
        String email = getEmailFromHeader(authHeader);
        return ResponseEntity.ok(customerService.getProfile(email));
    }

    @Operation(summary = "Update Customer Profile")
    @PutMapping("/profile")
    public ResponseEntity<CustomerDtos.ProfileResponse> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody CustomerDtos.UpdateProfileRequest request) {
        String email = getEmailFromHeader(authHeader);
        return ResponseEntity.ok(customerService.updateProfile(email, request));
    }

    @Operation(summary = "Get Customer Addresses")
    @GetMapping("/addresses")
    public ResponseEntity<List<CustomerDtos.AddressDto>> getAddresses(
            @RequestHeader("Authorization") String authHeader) {
        String email = getEmailFromHeader(authHeader);
        return ResponseEntity.ok(customerService.getAddresses(email));
    }

    @Operation(summary = "Add New Address")
    @PostMapping("/addresses")
    public ResponseEntity<CustomerDtos.AddressDto> addAddress(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody CustomerDtos.AddressDto request) {
        String email = getEmailFromHeader(authHeader);
        return ResponseEntity.ok(customerService.addAddress(email, request));
    }

    @Operation(summary = "Update Address")
    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<CustomerDtos.AddressDto> updateAddress(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long addressId,
            @Valid @RequestBody CustomerDtos.AddressDto request) {
        String email = getEmailFromHeader(authHeader);
        return ResponseEntity.ok(customerService.updateAddress(email, addressId, request));
    }

    @Operation(summary = "Delete Address")
    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<?> deleteAddress(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long addressId) {
        String email = getEmailFromHeader(authHeader);
        customerService.deleteAddress(email, addressId);
        return ResponseEntity.ok(Map.of("message", "Address deleted successfully"));
    }
}
