# Sprint 1 Report: Authentication & Seller Onboarding

## 1. Overview
This sprint focused on building the secure foundation of the platform. We implemented a **system-wide authentication** mechanism using JWTs and built a specific workflow for **Sellers** to register and get approved by **Admins**.

---

## 2. Folder Structure
The key files involved in this sprint are:

```
src/main/java/com/nexashop/backend/
├── controller/
│   ├── AuthController.java       # General Auth (Refresh Token, Logout)
│   ├── AdminController.java      # Admin actions (Approve Sellers)
│   └── SellerController.java     # Seller Registration & Login
├── service/
│   ├── SellerService.java        # Business Logic for Sellers
│   ├── AdminAuthService.java     # Admin Login Logic
│   └── RefreshTokenService.java  # Token Rotation Logic
├── security/
│   ├── JwtUtils.java             # JWT Generation & Validation
│   └── JwtAuthenticationFilter.java
└── entity/
    └── Seller.java
```

---

## 3. User Flow

### A. Seller Registration (Onboarding)
1.  **Seller** submits registration form (Name, Email, Store Name, Password).
2.  **System** saves Seller with status `PENDING_APPROVAL`.
3.  **System** sends verification email (mocked).
4.  **Seller** cannot login yet.

### B. Admin Approval
1.  **Admin** logs in.
2.  **Admin** views list of `PENDING` sellers.
3.  **Admin** approves a seller.
4.  **System** updates Seller status to `APPROVED`.

### C. Seller Login
1.  **Seller** logs in with credentials.
2.  **System** verifies password and checks if status is `APPROVED`.
3.  **System** issues **Access Token** (JWT) and **Refresh Token**.

---

## 4. Code Logic & Implementation

### Seller Registration
**File:** `SellerService.java`
The core logic prevents duplicate emails, encrypts the password, and sets the default status to `PENDING_APPROVAL`.

```java
public Seller registerSeller(SellerRegisterRequest request) {
    if (sellerRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new IllegalArgumentException("Email already exists");
    }

    Seller seller = new Seller();
    seller.setName(request.getName());
    seller.setEmail(request.getEmail());
    // Encrypt password before saving
    seller.setPassword(passwordEncoder.encode(request.getPassword()));
    seller.setStoreName(request.getStoreName());
    
    // Critical: Default status is PENDING
    seller.setStatus(Seller.SellerStatus.PENDING_APPROVAL);

    Seller savedSeller = sellerRepository.save(seller);
    emailService.sendVerificationEmail(savedSeller);
    return savedSeller;
}
```

### JWT Generation
**File:** `JwtUtils.java`
We embed the user's `role` directly into the token claims. This allows the frontend to easily know if the user is a SELLER or ADMIN.

```java
public String generateToken(String email, String role) {
    return Jwts.builder()
            .setSubject(email)
            .claim("role", role) // Role embedded here
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
}
```

### Admin Approval Logic
**File:** `AdminController.java` & `SellerService.java`
The Admin updates the seller's status. If rejected, they can provide a reason.

```java
// Controller
@PutMapping("/update-status")
public ResponseEntity<Seller> updateSellerStatus(@Valid @RequestBody UpdateSellerStatusRequest request) {
    return ResponseEntity.ok(sellerService.updateSellerStatus(request));
}

// Service
public Seller updateSellerStatus(UpdateSellerStatusRequest request) {
    Seller seller = sellerRepository.findById(request.getSellerId())
            .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

    seller.setStatus(request.getNewStatus()); // e.g., APPROVED or DENIED
    Seller updatedSeller = sellerRepository.save(seller);
    
    // Notify seller of the decision
    emailService.sendStatusNotification(updatedSeller, request.getRejectionReason());

    return updatedSeller;
}
```
