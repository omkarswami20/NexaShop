package com.nexashop.backend.dto;

import com.nexashop.backend.entity.Seller;
import io.swagger.v3.oas.annotations.media.Schema;

public class UpdateSellerStatusRequest {
    private Long sellerId;
    private Seller.SellerStatus newStatus;
    @Schema(description = "Optional reason for rejection. Required only when status is DENIED.", example = "Invalid Store Name")
    private String rejectionReason;

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Seller.SellerStatus getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(Seller.SellerStatus newStatus) {
        this.newStatus = newStatus;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
