package com.nexashop.backend.controller;

import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.repository.SellerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerRepository sellerRepository;
    private final com.nexashop.backend.service.EmailService emailService;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final com.nexashop.backend.security.JwtUtils jwtUtils;
    private final com.nexashop.backend.service.RefreshTokenService refreshTokenService;

    public SellerController(SellerRepository sellerRepository, com.nexashop.backend.service.EmailService emailService,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder,
            com.nexashop.backend.security.JwtUtils jwtUtils,
            com.nexashop.backend.service.RefreshTokenService refreshTokenService) {
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @Operation(summary = "Register a new Seller", description = "Creates a new seller account with PENDING_APPROVAL status and sends a verification email.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration successful"),
            @ApiResponse(responseCode = "400", description = "Email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerSeller(@RequestBody com.nexashop.backend.dto.SellerRegisterRequest request) {
        if (sellerRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Seller seller = new Seller();
        seller.setName(request.getName());
        seller.setEmail(request.getEmail());
        seller.setPassword(passwordEncoder.encode(request.getPassword()));
        seller.setStoreName(request.getStoreName());
        seller.setStatus(Seller.SellerStatus.PENDING_APPROVAL);

        Seller savedSeller = sellerRepository.save(seller);
        emailService.sendVerificationEmail(savedSeller);
        return ResponseEntity.ok(savedSeller);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginSeller(@RequestBody com.nexashop.backend.dto.SellerLoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        Optional<Seller> sellerOpt = sellerRepository.findByEmail(email);

        if (sellerOpt.isEmpty() || !passwordEncoder.matches(password, sellerOpt.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }

        Seller seller = sellerOpt.get();
        if (seller.getStatus() == Seller.SellerStatus.PENDING_APPROVAL) {
            return ResponseEntity.status(403).body("Login Failed: Please wait for Admin Approval.");
        } else if (seller.getStatus() == Seller.SellerStatus.DENIED) {
            return ResponseEntity.status(403).body("Login Failed: Your account was rejected.");
        }

        String token = jwtUtils.generateToken(seller.getEmail(), "ROLE_SELLER");
        com.nexashop.backend.entity.RefreshToken refreshToken = refreshTokenService
                .createRefreshToken(seller.getEmail());
        return ResponseEntity.ok(new com.nexashop.backend.dto.LoginResponse(token, refreshToken.getToken()));
    }
}
