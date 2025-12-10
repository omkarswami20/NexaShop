package com.nexashop.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class ProductDtos {

    public record ProductRequest(
            @NotBlank(message = "Product name is required") String name,

            @NotBlank(message = "Description is required") String description,

            @NotNull(message = "Price is required") @Positive(message = "Price must be positive") BigDecimal price,

            @NotNull(message = "Stock quantity is required") @Min(value = 0, message = "Stock cannot be negative") Integer stockQuantity,

            @NotNull(message = "Category ID is required") Long categoryId,

            String imageUrl,

            String status) {
    }

    public record ProductStatusRequest(
            @NotBlank(message = "Status is required") String status) {
    }

    public record ProductStockRequest(
            @NotNull(message = "Quantity is required") @Min(value = 0, message = "Quantity cannot be negative") Integer quantity) {
    }

    public record CategoryRequest(
            @NotBlank(message = "Name is required") String name,

            String description) {
    }

    public record UpdateSellerStatusRequest(
            @NotNull(message = "Seller ID is required") Long sellerId,

            @NotBlank(message = "Status is required") String status,

            String rejectionReason) {
    }
}
