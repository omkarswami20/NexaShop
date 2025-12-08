package com.nexashop.backend.service;

import com.nexashop.backend.dto.LoginResponse;
import com.nexashop.backend.dto.SellerLoginRequest;
import com.nexashop.backend.dto.SellerRegisterRequest;
import com.nexashop.backend.dto.UpdateSellerStatusRequest;
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

    public SellerService(SellerRepository sellerRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService) {
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    public Seller registerSeller(SellerRegisterRequest request) {
        if (sellerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        Seller seller = new Seller();
        seller.setName(request.getName());
        seller.setEmail(request.getEmail());
        seller.setPassword(passwordEncoder.encode(request.getPassword()));
        seller.setStoreName(request.getStoreName());
        seller.setStatus(Seller.SellerStatus.PENDING_APPROVAL);

        Seller savedSeller = sellerRepository.save(seller);
        emailService.sendVerificationEmail(savedSeller);
        return savedSeller;
    }

    public LoginResponse loginSeller(SellerLoginRequest request) {
        Seller seller = sellerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid Credentials"));

        if (!passwordEncoder.matches(request.getPassword(), seller.getPassword())) {
            throw new BadCredentialsException("Invalid Credentials");
        }

        if (seller.getStatus() == Seller.SellerStatus.PENDING_APPROVAL) {
            throw new AccessDeniedException("Login Failed: Please wait for Admin Approval.");
        } else if (seller.getStatus() == Seller.SellerStatus.DENIED) {
            throw new AccessDeniedException("Login Failed: Your account was rejected.");
        }

        String token = jwtUtils.generateToken(seller.getEmail(), "ROLE_SELLER");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(seller.getEmail());

        return new LoginResponse(token, refreshToken.getToken(), seller.getName(), seller.getEmail(), "ROLE_SELLER");
    }

    public List<Seller> getPendingSellers() {
        return sellerRepository.findByStatus(Seller.SellerStatus.PENDING_APPROVAL);
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller updateSellerStatus(UpdateSellerStatusRequest request) {
        Seller seller = sellerRepository.findById(request.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

        seller.setStatus(request.getNewStatus());
        Seller updatedSeller = sellerRepository.save(seller);
        emailService.sendStatusNotification(updatedSeller, request.getRejectionReason());

        return updatedSeller;
    }
}
