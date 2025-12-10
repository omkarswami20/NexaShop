package com.nexashop.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class ProductDtos {

        @Schema(description = "Request object for creating or updating a product")
        public record ProductRequest(
                        @Schema(description = "Name of the product", example = "Smartphone X") @NotBlank(message = "Product name is required") String name,

                        @Schema(description = "Detailed description of the product", example = "Latest model with 5G support") @NotBlank(message = "Description is required") String description,

                        @Schema(description = "Price of the product", example = "999.99") @NotNull(message = "Price is required") @Positive(message = "Price must be positive") BigDecimal price,

                        @Schema(description = "Available stock quantity", example = "100") @NotNull(message = "Stock quantity is required") @Min(value = 0, message = "Stock cannot be negative") Integer stockQuantity,

                        @Schema(description = "ID of the category the product belongs to", example = "1") @NotNull(message = "Category ID is required") Long categoryId,

                        @Schema(description = "URL of the product image", example = "https://example.com/image.jpg") String imageUrl,

                        @Schema(description = "Status of the product", example = "ACTIVE") String status) {
        }

        @Schema(description = "Request object for updating product status")
        public record ProductStatusRequest(
                        @Schema(description = "New status for the product", example = "INACTIVE") @NotBlank(message = "Status is required") String status) {
        }

        @Schema(description = "Request object for updating product stock")
        public record ProductStockRequest(
                        @Schema(description = "New stock quantity", example = "50") @NotNull(message = "Quantity is required") @Min(value = 0, message = "Quantity cannot be negative") Integer quantity) {
        }

        @Schema(description = "Request object for creating or updating a category")
        public record CategoryRequest(
                        @Schema(description = "Name of the category", example = "Electronics") @NotBlank(message = "Name is required") String name,

                        @Schema(description = "Description of the category", example = "Gadgets and devices") String description) {
        }

        @Schema(description = "Request object for updating seller status (Admin only)")
        public record UpdateSellerStatusRequest(
                        @Schema(description = "ID of the seller to update", example = "10") @NotNull(message = "Seller ID is required") Long sellerId,

                        @Schema(description = "New status for the seller", example = "APPROVED") @NotBlank(message = "Status is required") String status,

                        @Schema(description = "Reason for rejection (if applicable)", example = "Incomplete documentation") String rejectionReason) {
        }
}
