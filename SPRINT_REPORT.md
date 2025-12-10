# NexaShop Project Status Report

## Sprint 1: Authentication & Seller Onboarding (2 Weeks)

### Goal
Establish a secure authentication system, managing distinct roles for Sellers and Admins, and enabling a seamless seller onboarding workflow.

### Deliverables & Status

| Feature | Status | Description |
| :--- | :--- | :--- |
| **System Authentication** | ✅ **Completed** | Secure `login`, `logout`, and role-based access control (RBAC) are implemented. |
| **JWT Implementation** | ✅ **Completed** | Token-based authentication using `JwtUtils`, inclusive of Access and Refresh token generation/validation. |
| **Seller Self-Signup** | ✅ **Completed** | `POST /api/sellers/register` endpoint creates seller accounts with `PENDING_APPROVAL` status. |
| **Admin Panel - Sellers** | ✅ **Completed** | Admin endpoints to view pending/all sellers (`GET /api/admin/pending`, `/api/admin/sellers`) and approve/reject applications (`PUT /api/admin/update-status`). |
| **Email Verification** | ⚠️ **Partial/Excluded** | `EmailService` exists and is integrated into registration flow, but specific notification details are excluded from this report per request. |

### Technical Implementation Details
-   **Controllers**:
    -   `AuthController.java`: Handles generic auth operations like token refresh and logout.
    -   `SellerController.java`: Manages seller-specific registration and login.
    -   `AdminController.java`: Manages administrative oversight of sellers.
-   **Security**:
    -   Stateless JWT Filter chain is active.
    -   Refresh Token rotation mechanism implemented via `RefreshTokenService`.

---

## Sprint 2: Product Management (Seller Panel) (2 Weeks)

### Goal
Empower sellers to manage their inventory, including creating, updating, and categorizing products with image support.

### Deliverables & Status

| Feature | Status | Description |
| :--- | :--- | :--- |
| **Product CRUD** | ✅ **Completed** | Full lifecycle management (`CREATE`, `READ`, `UPDATE`, `DELETE`) is available via `ProductController`. |
| **Product Listing** | ✅ **Completed** | `GET /api/products/seller` supports filtering by status, category, and search queries (keywords). |
| **Image Upload** | ✅ **Completed** | Dedicated `FileUploadController` manages multipart file uploads to local storage (max 5MB), returning accessible URLs. |
| **Inventory Management** | ✅ **Completed** | Targeted endpoint `PATCH /api/products/{id}/stock` allows rapid inventory adjustments. |
| **Product Status** | ✅ **Completed** | Validation and toggling of product visibility (`ACTIVE` / `INACTIVE`) via `PATCH /api/products/{id}/status`. |
| **Product Categories** | ✅ **Completed** | `CategoryController` and `CategoryService` managed hierarchical data for product organization. |

### Technical Implementation Details
-   **Endpoints**:
    -   **List**: `GET /api/products/seller?status={status}&category={cat}&search={term}`
    -   **Upload**: `POST /api/upload/product-image`
    -   **Stock**: `PATCH /api/products/{id}/stock`
-   **Architecture**:
    -   Service layer allows business logic encapsulation (e.g., verifying seller ownership before updates).
    -   Image handling uses a dedicated `FileStorageService` to decouple storage logic from product entities.

---

## Summary
The core backend infrastructure for both **Authentication/Onboarding** and **Product Management** is fully operational.
-   **Sellers** can register, await approval, and then log in to manage their catalog.
-   **Admins** have full control over the seller vetting process.
-   **Products** can be fully managed with images, stock tracking, and categorization.
