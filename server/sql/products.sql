INSERT INTO products 
(name, description, price, stock_quantity, category_id, image_url, status, seller_id, created_at, updated_at) 
VALUES
-- Electronics & Mobiles (Category 1)
('Redmi Note 13', '6GB RAM, 128GB storage, 108MP camera – budget bestseller in India', 12999, 30, 1, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Samsung Galaxy M34', 'Monster 6000mAh battery, AMOLED display', 16999, 20, 1, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('HP 15s Laptop', 'Intel i5, 16GB RAM, 512GB SSD – student favourite', 48999, 10, 1, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('boAt Airdopes 141', 'Wireless earbuds with ENx noise cancellation', 1299, 50, 1, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Realme Power Bank 10000mAh', 'Fast charging Type-C input/output', 999, 40, 1, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),

-- Fashion & Lifestyle (Category 2)
('Men\'s Cotton T-Shirt', 'Premium soft cotton, round neck – perfect for daily wear', 499, 60, 2, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Women\'s Kurti', 'Rayon printed kurti suitable for office & casual wear', 799, 45, 2, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Men\'s Sneakers', 'Lightweight stylish sneakers for everyday use', 1299, 35, 2, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Ladies Handbag', 'Trendy PU leather handbag with spacious compartments', 999, 25, 2, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),

-- Grocery & Daily Essentials (Category 3)
('Maggi Noodles 280g', 'India’s favourite instant noodles – pack of 4', 52, 100, 3, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Tata Tea Premium 1kg', 'Strong aroma-rich tea loved in Indian homes', 499, 60, 3, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Parle-G Biscuits', 'Classic glucose biscuits – family pack', 40, 120, 3, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Kurkure Masala Munch 90g', 'Crispy & spicy Indian snack – 90g', 20, 90, 3, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Fortune Sunflower Oil 1L', 'Refined sunflower oil for daily cooking', 135, 80, 3, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),

-- Gaming & Digital Goods (Category 4)
('BGMI UC Top-Up 60 UC', 'Instant UC credit for Battlegrounds Mobile India', 75, 200, 4, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Free Fire Diamonds – 100', 'Instant diamond recharge for Free Fire players', 80, 180, 4, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Google Play ₹500 Gift Card', 'Instant redeemable digital code', 500, 90, 4, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Steam Wallet ₹800', 'Digital balance for PC game purchases', 800, 70, 4, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),

-- Accessories & Gadgets (Category 5)
('Mobile Back Cover (Universal)', 'Shockproof TPU cover – high demand product', 199, 120, 5, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Laptop Sleeve 15.6 inch', 'Water-resistant lightweight protective case', 499, 40, 5, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Wired Earphones', 'Durable earphones with deep bass – 3.5mm jack', 249, 80, 5, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW()),
('Keychain Gadget', 'Trendy multicolor keychain – youth favourite', 99, 100, 5, 'https://via.placeholder.com/150', 'ACTIVE', 1, NOW(), NOW());
