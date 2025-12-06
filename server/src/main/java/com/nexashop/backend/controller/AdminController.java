package com.nexashop.backend.controller;

import com.nexashop.backend.dto.AdminLoginRequest;
import com.nexashop.backend.dto.LoginResponse;
import com.nexashop.backend.dto.UpdateSellerStatusRequest;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.repository.SellerRepository;
import com.nexashop.backend.security.JwtUtils;
import com.nexashop.backend.service.AdminAuthService;
import com.nexashop.backend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminAuthService adminAuthService;
    private final SellerRepository sellerRepository;
    private final EmailService emailService;
    private final JwtUtils jwtUtils;
    private final com.nexashop.backend.service.RefreshTokenService refreshTokenService;

    public AdminController(AdminAuthService adminAuthService, SellerRepository sellerRepository,
            EmailService emailService, JwtUtils jwtUtils,
            com.nexashop.backend.service.RefreshTokenService refreshTokenService) {
        this.adminAuthService = adminAuthService;
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    // -------- LOGIN ONLY OPEN ENDPOINT -------- //
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequest request) {
        if (adminAuthService.validateCredentials(request.getEmail(), request.getPassword())) {
            String token = jwtUtils.generateToken(request.getEmail(), "ROLE_ADMIN");
            com.nexashop.backend.entity.RefreshToken refreshToken = refreshTokenService
                    .createRefreshToken(request.getEmail());
            return ResponseEntity.ok(new LoginResponse(token, refreshToken.getToken()));
        }
        return ResponseEntity.status(401).body("Invalid Credentials");
    }

    // ------------ PROTECTED ENDPOINTS ------------ //

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/pending")
    public ResponseEntity<List<Seller>> getPendingSellers() {
        return ResponseEntity.ok(sellerRepository.findByStatus(Seller.SellerStatus.PENDING_APPROVAL));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/sellers")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerRepository.findAll());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update-status")
    public ResponseEntity<?> updateSellerStatus(@RequestBody UpdateSellerStatusRequest request) {
        return sellerRepository.findById(request.getSellerId())
                .map(seller -> {
                    seller.setStatus(request.getNewStatus());
                    Seller updatedSeller = sellerRepository.save(seller);
                    emailService.sendStatusNotification(updatedSeller, request.getRejectionReason());
                    return ResponseEntity.ok(updatedSeller);
                }).orElse(ResponseEntity.notFound().build());
    }
}
