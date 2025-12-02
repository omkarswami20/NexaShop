package com.nexashop.backend.controller;

import com.nexashop.backend.entity.Admin;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.entity.SellerStatus;
import com.nexashop.backend.repository.AdminRepository;
import com.nexashop.backend.repository.SellerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;
    private final SellerRepository sellerRepository;
    private final com.nexashop.backend.service.EmailService emailService;
    private final com.nexashop.backend.security.JwtUtils jwtUtils;

    public AdminController(AdminRepository adminRepository, SellerRepository sellerRepository,
            com.nexashop.backend.service.EmailService emailService, com.nexashop.backend.security.JwtUtils jwtUtils) {
        this.adminRepository = adminRepository;
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody com.nexashop.backend.dto.AdminLoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        Optional<Admin> adminOpt = adminRepository.findByEmail(email);

        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            String token = jwtUtils.generateToken(adminOpt.get().getEmail());
            return ResponseEntity.ok(java.util.Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Fail");
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Seller>> getPendingSellers() {
        List<Seller> pendingSellers = sellerRepository.findByStatus(SellerStatus.PENDING_APPROVAL);
        return ResponseEntity.ok(pendingSellers);
    }

    @GetMapping("/sellers")
    public ResponseEntity<List<Seller>> getAllSellers() {
        List<Seller> sellers = sellerRepository.findAll();
        return ResponseEntity.ok(sellers);
    }

    @Operation(summary = "Update Seller Status", description = "Approve or Reject a seller. If Rejected, an optional reason can be provided.")
    @ApiResponse(responseCode = "200", description = "Status updated successfully")
    @ApiResponse(responseCode = "404", description = "Seller not found")
    @PutMapping("/update-status")
    public ResponseEntity<?> updateSellerStatus(
            @RequestBody com.nexashop.backend.dto.UpdateSellerStatusRequest request) {
        Long sellerId = request.getSellerId();
        SellerStatus newStatus = request.getNewStatus();

        Optional<Seller> sellerOpt = sellerRepository.findById(sellerId);
        if (sellerOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Seller seller = sellerOpt.get();
        seller.setStatus(newStatus);
        Seller updatedSeller = sellerRepository.save(seller);
        emailService.sendStatusNotification(updatedSeller, request.getRejectionReason());
        return ResponseEntity.ok(updatedSeller);
    }
}
