package com.nexashop.backend.controller;

import com.nexashop.backend.dto.ProductDtos;
import com.nexashop.backend.entity.Category;
import com.nexashop.backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Tag(name = "Category Management", description = "Endpoints for managing product categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "Get all categories", description = "Retrieves a list of all available product categories.")
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @Operation(summary = "Create a category", description = "Creates a new product category (Admin only).", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody ProductDtos.CategoryRequest request) {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    @Operation(summary = "Update a category", description = "Updates an existing product category (Admin only).", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id,
            @Valid @RequestBody ProductDtos.CategoryRequest request) {
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }

    @Operation(summary = "Delete a category", description = "Deletes a product category (Admin only).", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
