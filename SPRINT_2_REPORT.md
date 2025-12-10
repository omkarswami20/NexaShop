# Sprint 2 Report: Product Management (Seller Panel)

## 1. Overview
This sprint focused on the **Seller Dashboard**, specifically the ability to manage products. We enabled sellers to **Create, Read, Update, and Delete** products, upload images, and manage inventory stock.

---

## 2. Folder Structure
The key files involved in this sprint are:

```
src/main/java/com/nexashop/backend/
├── controller/
│   ├── ProductController.java      # Main CRUD endpoints
│   ├── FileUploadController.java   # Image Uploading
│   └── CategoryController.java     # Category Management
├── service/
│   ├── ProductService.java         # Complex Product Logic
│   └── FileStorageService.java     # File System Logic
└── entity/
    └── Product.java
```

---

## 3. User Flow

### A. Product Creation
1.  **Seller** uploads an image via `POST /api/upload/product-image`.
2.  **System** saves image and returns a public URL.
3.  **Seller** submits Product Form (Name, Price, Category, and Image URL).
4.  **System** validates data and links the product to the logged-in Seller.

### B. Inventory Management
1.  **Seller** views their product list.
2.  **Seller** changes "Stock Quantity" for an item.
3.  **System** updates only that specific field in the database.

### C. Filtering & Viewing
1.  **Seller** searches for "Gaming Mouse".
2.  **System** filters products by name/description matching "Gaming Mouse" belonging ONLY to that seller.

---

## 4. Code Logic & Implementation

### Add Product (Linking to Seller)
**File:** `ProductService.java`
We use the `sellerEmail` (extracted from the JWT) to find the Seller entity. This ensures a product is always securely linked to the person who created it.

```java
public Product addProduct(ProductRequest request, String sellerEmail) {
    // 1. Fetch Seller ID securely from token email
    Seller seller = getSellerByEmail(sellerEmail);

    Product product = new Product();
    updateProductFromRequest(product, request);
    
    // 2. Link Product to Seller
    product.setSeller(seller);

    // 3. Default Status
    if (product.getStatus() == null) {
        product.setStatus(ProductStatus.ACTIVE);
    }

    return productRepository.save(product);
}
```

### Image Upload
**File:** `FileUploadController.java`
We handle multipart file uploads. We validate the size (max 5MB) before saving it to the server's file system.

```java
@PostMapping("/product-image")
public ResponseEntity<?> uploadProductImage(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body("File is empty");
    }

    // Validate 5MB Limit
    if (file.getSize() > 5 * 1024 * 1024) {
        return ResponseEntity.badRequest().body("File size exceeds 5MB limit");
    }

    String fileUrl = fileStorageService.saveFile(file);
    
    Map<String, String> response = new HashMap<>();
    response.put("url", fileUrl); // Return URL for frontend to attach to Product
    return ResponseEntity.ok(response);
}
```

### Security: "Own Your Data"
**File:** `ProductService.java`
When updating or deleting, we strictly check if the product belongs to the current seller.

```java
private Product getProductOwnedBySeller(Long productId, String sellerEmail) {
    Seller seller = getSellerByEmail(sellerEmail);
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

    // Critical Security Check
    if (!product.getSeller().getId().equals(seller.getId())) {
        throw new SecurityException("You do not own this product");
    }
    return product;
}
```
