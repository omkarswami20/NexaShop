package com.nexashop.backend.service;

import com.nexashop.backend.dto.AuthDtos;
import com.nexashop.backend.dto.ProductDtos;
import com.nexashop.backend.entity.RefreshToken;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.exception.ResourceNotFoundException;
import com.nexashop.backend.repository.SellerRepository;
import com.nexashop.backend.security.JwtUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SellerService {

    private final SellerRepository sellerRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    private final OtpService otpService;

    public SellerService(SellerRepository sellerRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService,
            OtpService otpService) {
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
        this.otpService = otpService;
    }

    public Seller registerSeller(AuthDtos.SellerRegisterRequest request) {
        if (sellerRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (sellerRepository.findByPhoneNumber(request.phone()).isPresent()) {
            throw new IllegalArgumentException("Phone number already exists");
        }

        Seller seller = new Seller();
        seller.setName(request.ownerName());
        seller.setEmail(request.email());
        seller.setPhoneNumber(request.phone());
        seller.setPassword(passwordEncoder.encode(request.password()));
        seller.setStoreName(request.businessName());
        seller.setStatus(Seller.SellerStatus.PENDING_APPROVAL);

        // Generate OTP
        String otp = otpService.generateOtp();
        seller.setOtp(otp);
        seller.setOtpExpiry(java.time.LocalDateTime.now().plusMinutes(5));
        seller.setPhoneVerified(false);
        seller.setEmailVerified(false);

        Seller savedSeller = sellerRepository.save(seller);

        // Send OTP
        otpService.sendOtp(savedSeller.getPhoneNumber(), otp);

        // Don't send welcome email yet, wait for verifications
        // emailService.sendVerificationEmail(savedSeller);

        return savedSeller;
    }

    public AuthDtos.LoginResponse loginSeller(AuthDtos.LoginRequest request) {
        Seller seller = sellerRepository.findByEmailOrPhoneNumber(request.identifier(), request.identifier())
                .orElseThrow(() -> new BadCredentialsException("Invalid Credentials"));

        if (!passwordEncoder.matches(request.password(), seller.getPassword())) {
            throw new BadCredentialsException("Invalid Credentials");
        }

        if (!seller.isPhoneVerified()) {
            throw new AccessDeniedException("Login Failed: Phone number not verified.");
        }

        if (!seller.isEmailVerified()) {
            throw new AccessDeniedException("Login Failed: Email not verified.");
        }

        if (seller.getStatus() == Seller.SellerStatus.PENDING_APPROVAL) {
            throw new AccessDeniedException("Login Failed: Please wait for Admin Approval.");
        } else if (seller.getStatus() == Seller.SellerStatus.DENIED) {
            throw new AccessDeniedException("Login Failed: Your account was rejected.");
        }

        String token = jwtUtils.generateToken(seller.getEmail(), "ROLE_SELLER");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(seller.getEmail());

        return new AuthDtos.LoginResponse(token, refreshToken.getToken(), seller.getId(), seller.getName(),
                seller.getEmail(), "ROLE_SELLER", seller.isEmailVerified(), seller.getStatus().name());
    }

    public void verifyOtp(String identifier, String otp) {
        Seller seller = sellerRepository.findByEmailOrPhoneNumber(identifier, identifier)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (seller.isPhoneVerified()) {
            return; // Already verified
        }

        if (seller.getOtp() == null || !seller.getOtp().equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        if (seller.getOtpExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP Expired");
        }

        seller.setPhoneVerified(true);
        seller.setOtp(null);
        seller.setOtpExpiry(null);

        // Generate Email Verification Token
        String token = java.util.UUID.randomUUID().toString();
        seller.setEmailVerificationToken(token);

        sellerRepository.save(seller);

        // Send Email Verification Link
        emailService.sendEmailVerificationLink(seller);
    }

    public void verifyEmail(String token) {
        Seller seller = sellerRepository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));

        if (seller.isEmailVerified()) {
            return;
        }

        seller.setEmailVerified(true);
        seller.setEmailVerificationToken(null);
        sellerRepository.save(seller);

        // Now send the "Application Received / Wait for Approval" email
        emailService.sendVerificationEmail(seller);
    }

    public List<Seller> getPendingSellers() {
        return sellerRepository.findByStatus(Seller.SellerStatus.PENDING_APPROVAL);
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller updateSellerStatus(ProductDtos.UpdateSellerStatusRequest request) {
        Seller seller = sellerRepository.findById(request.sellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

        seller.setStatus(Seller.SellerStatus.valueOf(request.status()));
        Seller updatedSeller = sellerRepository.save(seller);
        emailService.sendStatusNotification(updatedSeller, request.rejectionReason());

        return updatedSeller;
    }

    @Transactional
    public void resetPassword(String identifier, String newPassword) {
        Seller seller = sellerRepository.findByEmailOrPhoneNumber(identifier, identifier)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

        seller.setPassword(passwordEncoder.encode(newPassword));
        sellerRepository.save(seller);
    }
}
