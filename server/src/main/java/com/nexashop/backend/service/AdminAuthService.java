package com.nexashop.backend.service;

import com.nexashop.backend.dto.AuthDtos;
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

    public AuthDtos.LoginResponse login(AuthDtos.AdminLoginRequest request) {
        if (!validateCredentials(request.email(), request.password())) {
            throw new BadCredentialsException("Invalid Credentials");
        }

        String token = jwtUtils.generateToken(request.email(), "ROLE_ADMIN");
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.email());
        return new AuthDtos.LoginResponse(token, refreshToken.getToken(), null, "Admin User", request.email(),
                "ROLE_ADMIN", true, "ACTIVE");
    }
}
