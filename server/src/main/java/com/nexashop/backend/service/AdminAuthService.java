package com.nexashop.backend.service;

import com.nexashop.backend.dto.AdminLoginRequest;
import com.nexashop.backend.dto.LoginResponse;
import com.nexashop.backend.entity.RefreshToken;
import com.nexashop.backend.security.JwtUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private static final String ADMIN_EMAIL = "admin1@nexashop.com";
    private static final String ADMIN_PASSWORD = "admin123";

    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    public AdminAuthService(JwtUtils jwtUtils, RefreshTokenService refreshTokenService) {
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    private boolean validateCredentials(String email, String password) {
        return ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password);
    }

    public LoginResponse login(AdminLoginRequest request) {
        if (!validateCredentials(request.getEmail(), request.getPassword())) {
            throw new BadCredentialsException("Invalid Credentials");
        }

        String token = jwtUtils.generateToken(request.getEmail(), "ROLE_ADMIN");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getEmail());
        return new LoginResponse(token, refreshToken.getToken(), "Admin User", request.getEmail(), "ROLE_ADMIN");
    }
}
