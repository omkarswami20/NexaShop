package com.nexashop.backend.controller;

import com.nexashop.backend.dto.LoginResponse;
import com.nexashop.backend.dto.SellerLoginRequest;
import com.nexashop.backend.dto.SellerRegisterRequest;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.service.SellerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
public class SellerController implements com.nexashop.backend.controller.api.SellerApi {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<Seller> registerSeller(@Valid @RequestBody SellerRegisterRequest request) {
        return ResponseEntity.ok(sellerService.registerSeller(request));
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginSeller(
            @Valid @RequestBody com.nexashop.backend.dto.LoginRequest request) {
        return ResponseEntity.ok(sellerService.loginSeller(request));
    }
}
