package com.nexashop.backend.controller;

// import com.nexashop.backend.dto.ProductRequest;
// import com.nexashop.backend.entity.Product;
// import com.nexashop.backend.entity.Seller;
// import com.nexashop.backend.repository.ProductRepository;
// import com.nexashop.backend.repository.SellerRepository;
// import io.swagger.v3.oas.annotations.Operation;
// import io.swagger.v3.oas.annotations.security.SecurityRequirement;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/products")
public class ProductController {

    // private final ProductRepository productRepository;
    // private final SellerRepository sellerRepository;

    // public ProductController(ProductRepository productRepository,
    // SellerRepository sellerRepository) {
    // this.productRepository = productRepository;
    // this.sellerRepository = sellerRepository;
    // }

    // private Seller getCurrentSeller() {
    // Authentication authentication =
    // SecurityContextHolder.getContext().getAuthentication();
    // String email = authentication.getName();
    // return sellerRepository.findByEmail(email)
    // .orElseThrow(() -> new RuntimeException("Seller not found"));
    // }

    // @Operation(summary = "Add a new product", security =
    // @SecurityRequirement(name = "bearerAuth"))
    // @PostMapping
    // public ResponseEntity<Product> addProduct(@RequestBody ProductRequest
    // request) {
    // Seller seller = getCurrentSeller();

    // Product product = new Product();
    // product.setName(request.getName());
    // product.setDescription(request.getDescription());
    // product.setPrice(request.getPrice());
    // product.setStockQuantity(request.getStockQuantity());
    // product.setCategory(request.getCategory());
    // product.setImageUrl(request.getImageUrl());
    // product.setSeller(seller);

    // return ResponseEntity.ok(productRepository.save(product));
    // }

    // @Operation(summary = "Get all products for the current seller", security =
    // @SecurityRequirement(name = "bearerAuth"))
    // @GetMapping("/seller")
    // public ResponseEntity<List<Product>> getSellerProducts() {
    // Seller seller = getCurrentSeller();
    // return ResponseEntity.ok(productRepository.findBySellerId(seller.getId()));
    // }

    // @Operation(summary = "Update a product", security = @SecurityRequirement(name
    // = "bearerAuth"))
    // @PutMapping("/{id}")
    // public ResponseEntity<Product> updateProduct(@PathVariable Long id,
    // @RequestBody ProductRequest request) {
    // Seller seller = getCurrentSeller();
    // Product product = productRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("Product not found"));

    // if (!product.getSeller().getId().equals(seller.getId())) {
    // return ResponseEntity.status(403).build();
    // }

    // product.setName(request.getName());
    // product.setDescription(request.getDescription());
    // product.setPrice(request.getPrice());
    // product.setStockQuantity(request.getStockQuantity());
    // product.setCategory(request.getCategory());
    // product.setImageUrl(request.getImageUrl());

    // return ResponseEntity.ok(productRepository.save(product));
    // }

    // @Operation(summary = "Delete a product", security = @SecurityRequirement(name
    // = "bearerAuth"))
    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
    // Seller seller = getCurrentSeller();
    // Product product = productRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("Product not found"));

    // if (!product.getSeller().getId().equals(seller.getId())) {
    // return ResponseEntity.status(403).build();
    // }

    // productRepository.delete(product);
    // return ResponseEntity.ok().build();
    // }

    // @Operation(summary = "Get all products (Public)")
    // @GetMapping
    // public ResponseEntity<List<Product>> getAllProducts() {
    // return ResponseEntity.ok(productRepository.findAll());
    // }

    // @Operation(summary = "Get product by ID (Public)")
    // @GetMapping("/{id}")
    // public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    // return productRepository.findById(id)
    // .map(ResponseEntity::ok)
    // .orElse(ResponseEntity.notFound().build());
    // }
}
