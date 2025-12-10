package com.nexashop.backend.controller;

import com.nexashop.backend.dto.ProductDtos;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.service.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Management", description = "Endpoints for admin operations like managing sellers")
public class AdminController {

    private final SellerService sellerService;

    public AdminController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    // -------- LOGIN ONLY OPEN ENDPOINT -------- //
    // Moved to CommonAuthController

    // ------------ PROTECTED ENDPOINTS ------------ //

    @Operation(summary = "Get pending sellers", description = "Retrieves a list of sellers waiting for approval.", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/pending")
    public ResponseEntity<List<Seller>> getPendingSellers() {
        return ResponseEntity.ok(sellerService.getPendingSellers());
    }

    @Operation(summary = "Get all sellers", description = "Retrieves a list of all registered sellers.", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/sellers")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @Operation(summary = "Update seller status", description = "Approves or rejects a seller account.", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update-status")
    public ResponseEntity<Seller> updateSellerStatus(
            @Valid @RequestBody ProductDtos.UpdateSellerStatusRequest request) {
        return ResponseEntity.ok(sellerService.updateSellerStatus(request));
    }
}
