package com.nexashop.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private static final String ADMIN_EMAIL = "admin1@nexashop.com";
    private static final String ADMIN_PASSWORD = "admin123";

    public boolean validateCredentials(String email, String password) {
        return ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password);
    }
}
