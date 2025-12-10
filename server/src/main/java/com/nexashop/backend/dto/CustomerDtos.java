package com.nexashop.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CustomerDtos {

        @Schema(description = "Response object for customer profile")
        public record ProfileResponse(
                        Long id,
                        String name,
                        String username,
                        String email,
                        boolean isEmailVerified) {
        }

        @Schema(description = "Request object for updating customer profile")
        public record UpdateProfileRequest(
                        @NotBlank(message = "Name is required") String name) {
        }

        @Schema(description = "DTO for Address")
        public record AddressDto(
                        Long id,
                        @NotBlank(message = "Street is required") String street,
                        @NotBlank(message = "City is required") String city,
                        @NotBlank(message = "State is required") String state,
                        @NotBlank(message = "Zip Code is required") String zipCode,
                        @NotBlank(message = "Country is required") String country,
                        @NotNull(message = "Address Type is required") String type) {
        }
}
