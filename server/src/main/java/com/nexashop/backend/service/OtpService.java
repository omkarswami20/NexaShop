package com.nexashop.backend.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class OtpService {

    private static final SecureRandom secureRandom = new SecureRandom();

    public String generateOtp() {
        int otp = 100000 + secureRandom.nextInt(900000);
        return String.valueOf(otp);
    }

    public void sendOtp(String phoneNumber, String otp) {
        // In a real application, integrate with an SMS provider like Twilio or AWS SNS
        System.out.println("--------------------------------------------------");
        System.out.println("SENDING OTP TO " + phoneNumber + ": " + otp);
        System.out.println("--------------------------------------------------");
    }
}
