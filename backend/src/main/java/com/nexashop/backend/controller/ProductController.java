package com.nexashop.backend.controller;

import com.nexashop.backend.dto.ProductRequest;
import com.nexashop.backend.entity.Category;
import com.nexashop.backend.entity.Product;
import com.nexashop.backend.entity.ProductStatus;
import com.nexashop.backend.entity.Seller;
import com.nexashop.backend.repository.CategoryRepository;
import com.nexashop.backend.repository.ProductRepository;
import com.nexashop.backend.repository.SellerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@SuppressWarnings("null")
public class ProductController {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository,
            SellerRepository sellerRepository,
            CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
        this.categoryRepository = categoryRepository;
    }

    private Seller getCurrentSeller() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        String email = authentication.getName();
        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }

    @Operation(summary = "Add a new product", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest request) {
        Seller seller = getCurrentSeller();

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElse(null);
            product.setCategory(category);
        }

        product.setImageUrl(request.getImageUrl());
        if (request.getStatus() != null) {
            product.setStatus(ProductStatus.valueOf(request.getStatus().toUpperCase()));
        }
        product.setSeller(seller);

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Operation(summary = "Get all products for the current seller", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/seller")
    public ResponseEntity<Map<String, Object>> getSellerProducts(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        Seller seller = getCurrentSeller();
        List<Product> products = productRepository.findBySellerId(seller.getId());

        // Apply filters
        if (status != null && !status.isEmpty()) {
            try {
                ProductStatus productStatus = ProductStatus.valueOf(status.toUpperCase());
                products = products.stream()
                        .filter(p -> p.getStatus() == productStatus)
                        .toList();
            } catch (IllegalArgumentException e) {
                // Invalid status, ignore filter
            }
        }

        if (category != null && !category.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getCategory() != null && p.getCategory().getName().equalsIgnoreCase(category))
                    .toList();
        }

        if (search != null && !search.isEmpty()) {
            String searchLower = search.toLowerCase();
            products = products.stream()
                    .filter(p -> (p.getName() != null && p.getName().toLowerCase().contains(searchLower)) ||
                            (p.getDescription() != null && p.getDescription().toLowerCase().contains(searchLower)))
                    .toList();
        }

        // Get total count before pagination
        int total = products.size();

        // Apply pagination
        int fromIndex = Math.min(offset, products.size());
        int toIndex = Math.min(offset + limit, products.size());
        List<Product> paginatedProducts = products.subList(fromIndex, toIndex);

        // Build response
        Map<String, Object> response = new HashMap<>();
        response.put("products", paginatedProducts);
        response.put("total", total);
        response.put("page", (offset / limit) + 1);
        response.put("pageSize", limit);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update a product", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
            @RequestBody ProductRequest request) {
        Seller seller = getCurrentSeller();
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).build();
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElse(null);
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }

        product.setImageUrl(request.getImageUrl());
        if (request.getStatus() != null) {
            product.setStatus(ProductStatus.valueOf(request.getStatus().toUpperCase()));
        }

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Operation(summary = "Delete a product", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Seller seller = getCurrentSeller();
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).build();
        }

        productRepository.delete(product);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update product status", security = @SecurityRequirement(name = "bearerAuth"))
    @PatchMapping("/{id}/status")
    public ResponseEntity<Product> updateProductStatus(@PathVariable Long id,
            @RequestBody java.util.Map<String, String> request) {
        Seller seller = getCurrentSeller();
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).build();
        }

        String statusStr = request.get("status");
        if (statusStr != null) {
            try {
                ProductStatus newStatus = ProductStatus.valueOf(statusStr.toUpperCase());
                product.setStatus(newStatus);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Operation(summary = "Update product stock", security = @SecurityRequirement(name = "bearerAuth"))
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Product> updateProductStock(@PathVariable Long id,
            @RequestBody java.util.Map<String, Integer> request) {
        Seller seller = getCurrentSeller();
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).build();
        }

        Integer stockQuantity = request.get("stockQuantity");
        if (stockQuantity != null && stockQuantity >= 0) {
            product.setStockQuantity(stockQuantity);
        } else {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Operation(summary = "Get all products (Public - Active only)")
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findByStatus(ProductStatus.ACTIVE));
    }

    @Operation(summary = "Get product by ID (Public - Active only)")
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .filter(p -> p.getStatus() == ProductStatus.ACTIVE)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
