-- =====================================================
-- GYMSHOP COMPLETE DATABASE SCHEMA
-- E-commerce platform for Gym & Supplement Store
-- =====================================================

-- Tạo database
-- CREATE DATABASE IF NOT EXISTS gymsinhvien CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gymsinhvien;


-- =====================================================
-- 1. QUẢN LÝ NGƯỜI DÙNG VÀ PHÂN QUYỀN
-- =====================================================

-- 1.1. Vai trò admin
-- CREATE TABLE admin_roles (
  --  id INT AUTO_INCREMENT PRIMARY KEY,
   -- role_name VARCHAR(100) NOT NULL UNIQUE,
   -- permissions JSON COMMENT 'Ví dụ: ["manage_users", "manage_products", "view_reports"]',
    -- description TEXT,
    -- is_active BOOLEAN DEFAULT TRUE,
   --  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   --  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- 1.2. Phân loại khách hàng (VIP, thường, Premium)
CREATE TABLE customer_tiers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'VIP, Premium, Regular, Bronze, Silver, Gold',
    discount_rate DECIMAL(5,2) DEFAULT 0.00 COMMENT 'Tỷ lệ giảm giá (%)',
    min_order_amount DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Số tiền tối thiểu để đạt tier',
    points_multiplier DECIMAL(3,2) DEFAULT 1.00 COMMENT 'Hệ số nhân điểm',
    description TEXT,
    benefits JSON COMMENT 'Các quyền lợi: ["free_shipping", "priority_support", "exclusive_deals"]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1.3. Thông tin người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20),
    full_name VARCHAR(100),
    gender ENUM('male', 'female', 'other') NULL,
    date_of_birth DATE NULL,
    avatar_url VARCHAR(255),
    
    -- Địa chỉ
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    ward VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Hệ thống
    role_id INT NULL COMMENT 'Null nếu là customer',
    customer_tier_id INT DEFAULT 1,
    loyalty_points INT DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    
    -- Trạng thái
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (role_id) REFERENCES admin_roles(id) ON DELETE SET NULL,
    FOREIGN KEY (customer_tier_id) REFERENCES customer_tiers(id) ON DELETE SET NULL,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_customer_tier (customer_tier_id)
);

-- =====================================================
-- 2. QUẢN LÝ SẢN PHẨM
-- =====================================================

-- 2.1. Thương hiệu
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    logo_url VARCHAR(255),
    banner_url VARCHAR(255),
    description TEXT,
    country VARCHAR(50),
    website VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE COMMENT 'Thương hiệu chính hãng',
    is_featured BOOLEAN DEFAULT FALSE COMMENT 'Thương hiệu nổi bật',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured, is_active)
);

-- 2.2. Danh mục sản phẩm (hỗ trợ đa cấp)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    icon_class VARCHAR(100) COMMENT 'CSS class cho icon',
    parent_id INT NULL,
    level INT DEFAULT 0 COMMENT '0=root, 1=sub, 2=sub-sub',
    sort_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_parent (parent_id),
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured, is_active)
);

-- 2.3. Kho hàng
CREATE TABLE warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    address TEXT,
    city VARCHAR(100),
    manager_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2.4. Sản phẩm chính
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    sku VARCHAR(100) UNIQUE COMMENT 'Mã sản phẩm',
    brand_id INT,
    category_id INT,
    
    -- Thông tin cơ bản
    short_description VARCHAR(500),
    description TEXT,
    ingredients TEXT COMMENT 'Thành phần',
    usage_instructions TEXT COMMENT 'Hướng dẫn sử dụng',
    warnings TEXT COMMENT 'Cảnh báo, lưu ý',
    
    -- Giá cả
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2) NULL COMMENT 'Giá gốc để tính % giảm',
    cost_price DECIMAL(10,2) NULL COMMENT 'Giá vốn',
    
    -- Tồn kho
    track_inventory BOOLEAN DEFAULT TRUE,
    inventory_quantity INT DEFAULT 0,
    low_stock_threshold INT DEFAULT 10,
    
    -- Thông tin sản phẩm gym/supplement
    expiry_date DATE NULL,
    batch_number VARCHAR(50),
    origin_country VARCHAR(50),
    manufacturer VARCHAR(100),
    
    -- Hình ảnh
    featured_image VARCHAR(255),
    image_gallery JSON COMMENT 'Array các URL hình ảnh',
    
    -- SEO & Marketing
    meta_title VARCHAR(255),
    meta_description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_on_sale BOOLEAN DEFAULT FALSE,
    
    -- Trạng thái
    status ENUM('draft', 'active', 'inactive', 'out_of_stock') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_slug (slug),
    INDEX idx_brand (brand_id),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured, status),
    INDEX idx_price (price),
    FULLTEXT idx_search (name, short_description, description)
);

-- 2.5. Biến thể sản phẩm (size, flavor, v.v.)
CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku VARCHAR(100) UNIQUE,
    variant_name VARCHAR(100) NOT NULL COMMENT 'Ví dụ: 2.2kg Chocolate, 5lb Vanilla',
    
    -- Thuộc tính biến thể
    size VARCHAR(50) COMMENT '2.2kg, 5lb, 30 viên',
    flavor VARCHAR(50) COMMENT 'Chocolate, Vanilla, Strawberry',
    color VARCHAR(50),
    
    -- Giá và tồn kho riêng
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    inventory_quantity INT DEFAULT 0,
    weight DECIMAL(8,2) COMMENT 'Trọng lượng',
    weight_unit VARCHAR(10) DEFAULT 'kg' COMMENT 'kg, lb, g',
    
    -- Thông tin bổ sung
    image_url VARCHAR(255),
    barcode VARCHAR(100),
    
    is_default BOOLEAN DEFAULT FALSE COMMENT 'Biến thể mặc định',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_sku (sku),
    INDEX idx_default (is_default)
);

-- 2.6. Thuộc tính động của sản phẩm
CREATE TABLE product_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    attribute_name VARCHAR(100) NOT NULL COMMENT 'serving_size, protein_per_serving, calories',
    attribute_value VARCHAR(255) NOT NULL,
    unit VARCHAR(20) COMMENT 'g, mg, kcal, %',
    sort_order INT DEFAULT 0,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_name (attribute_name)
);

-- 2.7. Thông tin dinh dưỡng (cho supplement)
CREATE TABLE nutritional_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    serving_size VARCHAR(50) COMMENT 'Khẩu phần: 30g, 1 scoop',
    servings_per_container INT COMMENT 'Số khẩu phần/hộp',
    
    -- Thông tin dinh dưỡng cơ bản
    calories DECIMAL(8,2),
    protein DECIMAL(8,2),
    carbohydrates DECIMAL(8,2),
    fat DECIMAL(8,2),
    fiber DECIMAL(8,2),
    sugar DECIMAL(8,2),
    sodium DECIMAL(8,2),
    
    -- Thông tin bổ sung (dạng JSON để linh hoạt)
    additional_nutrients JSON COMMENT '{"creatine": {"value": 5, "unit": "g"}, "bcaa": {"value": 10, "unit": "g"}}',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_nutrition (product_id)
);

-- =====================================================
-- 3. GIỎ HÀNG VÀ ĐƠN HÀNG
-- =====================================================

-- 3.1. Giỏ hàng
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_id VARCHAR(255) COMMENT 'Cho guest users',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_session (session_id)
);

-- 3.2. Chi tiết giỏ hàng
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT NULL COMMENT 'Null nếu sản phẩm không có variant',
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL COMMENT 'Giá tại thời điểm thêm vào giỏ',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_cart_product (cart_id, product_id, variant_id),
    INDEX idx_cart (cart_id)
);

-- 3.3. Đơn hàng
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE COMMENT 'Mã đơn hàng: GS2024001',
    user_id INT,
    
    -- Thông tin khách hàng
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    
    -- Địa chỉ giao hàng
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100),
    shipping_district VARCHAR(100),
    shipping_ward VARCHAR(100),
    shipping_postal_code VARCHAR(20),
    
    -- Thông tin đơn hàng
    subtotal DECIMAL(12,2) NOT NULL COMMENT 'Tổng tiền hàng',
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL COMMENT 'Tổng thanh toán',
    
    -- Trạng thái
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    
    -- Thông tin bổ sung
    notes TEXT COMMENT 'Ghi chú từ khách hàng',
    admin_notes TEXT COMMENT 'Ghi chú nội bộ',
    discount_code VARCHAR(50),
    
    -- Người xử lý
    handled_by INT COMMENT 'Admin xử lý đơn',
    
    -- Thời gian
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (handled_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_date (order_date),
    INDEX idx_order_number (order_number)
);

-- 3.4. Chi tiết đơn hàng
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT,
    variant_id INT NULL,
    
    -- Thông tin sản phẩm tại thời điểm đặt hàng
    product_name VARCHAR(200) NOT NULL,
    variant_name VARCHAR(100),
    sku VARCHAR(100),
    
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    -- Thông tin bổ sung
    product_image VARCHAR(255),
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL,
    
    INDEX idx_order (order_id)
);

-- =====================================================
-- 4. THANH TOÁN VÀ VẬN CHUYỂN
-- =====================================================

-- 4.1. Thanh toán
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method ENUM('cod', 'bank_transfer', 'credit_card', 'e_wallet', 'momo', 'zalopay') NOT NULL,
    
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    
    -- Thông tin giao dịch
    transaction_id VARCHAR(255) COMMENT 'Mã giao dịch từ payment gateway',
    gateway_response JSON COMMENT 'Response từ payment gateway',
    
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    
    -- Thời gian
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    failed_at TIMESTAMP NULL,
    
    notes TEXT,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_status (status),
    INDEX idx_transaction (transaction_id)
);

-- 4.2. Vận chuyển
CREATE TABLE shippings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    
    -- Thông tin vận chuyển
    carrier VARCHAR(100) COMMENT 'GHTK, GHN, J&T, Viettel Post',
    service_type VARCHAR(100) COMMENT 'Standard, Express, Same day',
    tracking_number VARCHAR(100),
    
    -- Thời gian dự kiến
    estimated_delivery_date DATE,
    
    -- Thời gian thực tế
    shipped_date TIMESTAMP NULL,
    delivered_date TIMESTAMP NULL,
    
    -- Trạng thái
    status ENUM('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returned') DEFAULT 'pending',
    
    -- Chi phí và thông tin bổ sung
    shipping_fee DECIMAL(10,2),
    insurance_fee DECIMAL(10,2) DEFAULT 0.00,
    cod_fee DECIMAL(10,2) DEFAULT 0.00,
    
    notes TEXT,
    delivery_attempts INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_tracking (tracking_number),
    INDEX idx_status (status)
);

-- =====================================================
-- 5. KHUYẾN MÃI VÀ GIẢM GIÁ
-- =====================================================

-- 5.1. Mã giảm giá
CREATE TABLE discount_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Loại giảm giá
    type ENUM('percentage', 'fixed', 'free_shipping') NOT NULL,
    value DECIMAL(10,2) NOT NULL COMMENT 'Giá trị (% hoặc số tiền)',
    
    -- Điều kiện áp dụng
    minimum_order_amount DECIMAL(10,2) DEFAULT 0.00,
    maximum_discount_amount DECIMAL(10,2) NULL COMMENT 'Giảm tối đa (cho percentage)',
    
    -- Giới hạn sử dụng
    usage_limit INT NULL COMMENT 'Tổng số lần sử dụng tối đa',
    usage_limit_per_customer INT DEFAULT 1,
    used_count INT DEFAULT 0,
    
    -- Thời gian hiệu lực
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    
    -- Áp dụng cho
    applicable_to ENUM('all', 'specific_products', 'specific_categories', 'specific_brands') DEFAULT 'all',
    applicable_items JSON COMMENT 'IDs của products/categories/brands',
    
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_code (code),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_active (is_active)
);

-- 5.2. Flash Sale / Sale có thời hạn
CREATE TABLE flash_sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_time (start_time, end_time)
);

-- 5.3. Sản phẩm trong Flash Sale
CREATE TABLE flash_sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flash_sale_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT NULL,
    
    original_price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NOT NULL,
    
    -- Giới hạn số lượng
    max_quantity INT NOT NULL COMMENT 'Số lượng tối đa cho sale',
    sold_quantity INT DEFAULT 0 COMMENT 'Đã bán',
    
    FOREIGN KEY (flash_sale_id) REFERENCES flash_sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_flash_sale_product (flash_sale_id, product_id, variant_id),
    INDEX idx_flash_sale (flash_sale_id)
);

-- =====================================================
-- 6. ĐÁNH GIÁ VÀ TƯƠNG TÁC
-- =====================================================

-- 6.1. Đánh giá sản phẩm
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NULL COMMENT 'Chỉ cho phép đánh giá sau khi mua',
    
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    
    -- Thông tin bổ sung
    images JSON COMMENT 'Array các URL hình ảnh review',
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    
    -- Hữu ích
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    
    -- Trạng thái
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_reply TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_user_product_order (user_id, product_id, order_id),
    INDEX idx_product (product_id),
    INDEX idx_rating (rating),
    INDEX idx_status (status)
);

-- 6.2. Danh sách yêu thích
CREATE TABLE wishlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_product (user_id, product_id, variant_id),
    INDEX idx_user (user_id)
);

-- =====================================================
-- 7. QUẢN LÝ KHO VÀ INVENTORY
-- =====================================================

-- 7.1. Lịch sử xuất nhập kho
CREATE TABLE inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    variant_id INT NULL,
    warehouse_id INT NOT NULL,
    
    type ENUM('in', 'out', 'adjustment', 'damaged', 'expired') NOT NULL,
    quantity INT NOT NULL COMMENT 'Số lượng (dương cho in, âm cho out)',
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    
    -- Lý do và tham chiếu
    reason VARCHAR(255),
    reference_type ENUM('purchase', 'sale', 'adjustment', 'return', 'damage') NULL,
    reference_id INT NULL COMMENT 'ID của order, purchase, etc.',
    
    unit_cost DECIMAL(10,2) NULL,
    total_cost DECIMAL(12,2) NULL,
    
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_product (product_id, variant_id),
    INDEX idx_warehouse (warehouse_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 8. THÔNG BÁO VÀ MARKETING
-- =====================================================

-- 8.1. Thông báo cho users
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL COMMENT 'Null để gửi cho tất cả',
    type ENUM('order_update', 'promotion', 'system', 'review_reminder', 'stock_alert') NOT NULL,
    
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500) NULL,
    
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    
    -- Metadata
    metadata JSON COMMENT 'Thông tin bổ sung: order_id, product_id, etc.',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
);

-- 8.2. Newsletter subscribers
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    source VARCHAR(100) COMMENT 'Nguồn đăng ký: website, popup, checkout',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- 8.3. Banner quảng cáo
CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    image_mobile_url VARCHAR(255) COMMENT 'Hình cho mobile',
    
    link_url VARCHAR(500),
    link_target ENUM('_self', '_blank') DEFAULT '_self',
    
    position ENUM('homepage_hero', 'homepage_middle', 'category_top', 'product_sidebar') NOT NULL,
    sort_order INT DEFAULT 0,
    
    -- Thời gian hiển thị
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_position (position, is_active),
    INDEX idx_dates (start_date, end_date)
);

-- =====================================================
-- 9. SYSTEM & ADMIN
-- =====================================================

-- 9.1. Cấu hình hệ thống
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE COMMENT 'Có thể truy cập từ frontend',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (setting_key)
);

-- 9.2. Logs hoạt động admin
CREATE TABLE admin_activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL COMMENT 'create_product, update_order, delete_user',
    entity_type VARCHAR(50) COMMENT 'product, order, user',
    entity_id INT,
    details JSON COMMENT 'Chi tiết thay đổi',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at)
);

-- 9.3. File uploads
CREATE TABLE media_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT NOT NULL COMMENT 'Size in bytes',
    mime_type VARCHAR(100) NOT NULL,
    file_type ENUM('image', 'video', 'document', 'other') NOT NULL,
    
    -- Metadata cho hình ảnh
    width INT NULL,
    height INT NULL,
    alt_text VARCHAR(255),
    
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_type (file_type),
    INDEX idx_uploaded_by (uploaded_by)
);

-- =====================================================
-- INSERT DỮ LIỆU MẪU
-- =====================================================

-- Customer tiers
INSERT INTO customer_tiers (name, discount_rate, min_order_amount, points_multiplier, description, benefits) VALUES
('Regular', 0.00, 0, 1.00, 'Khách hàng thường', '["basic_support"]'),
('Bronze', 2.00, 2000000, 1.20, 'Khách hàng đồng', '["basic_support", "birthday_discount"]'),
('Silver', 5.00, 5000000, 1.50, 'Khách hàng bạc', '["priority_support", "free_shipping_50k", "birthday_discount"]'),
('Gold', 8.00, 10000000, 2.00, 'Khách hàng vàng', '["priority_support", "free_shipping", "exclusive_deals", "birthday_discount"]'),
('VIP', 12.00, 20000000, 3.00, 'Khách hàng VIP', '["vip_support", "free_shipping", "exclusive_deals", "early_access", "birthday_discount"]');

-- Admin roles
INSERT INTO admin_roles (role_name, permissions, description) VALUES
('Super Admin', '["*"]', 'Toàn quyền hệ thống'),
('Admin', '["manage_products", "manage_orders", "manage_users", "view_reports"]', 'Quản trị viên'),
('Staff', '["manage_orders", "manage_inventory", "customer_support"]', 'Nhân viên'),
('Marketing', '["manage_promotions", "manage_content", "view_analytics"]', 'Marketing');

-- Warehouses
INSERT INTO warehouses (name, code, address, city, manager_name, phone, is_default, is_active) VALUES
('Kho Hà Nội', 'HN01', '123 Đường ABC, Quận Cầu Giấy', 'Hà Nội', 'Nguyễn Văn A', '0901234567', TRUE, TRUE),
('Kho TP.HCM', 'HCM01', '456 Đường XYZ, Quận 1', 'TP. Hồ Chí Minh', 'Trần Thị B', '0907654321', FALSE, TRUE);

-- Brands
INSERT INTO brands (name, slug, description, country, is_verified, is_featured, is_active) VALUES
('Optimum Nutrition', 'optimum-nutrition', 'Thương hiệu dinh dưỡng thể thao hàng đầu thế giới', 'USA', TRUE, TRUE, TRUE),
('Dymatize', 'dymatize', 'Thương hiệu protein chất lượng cao', 'USA', TRUE, TRUE, TRUE),
('MuscleTech', 'muscletech', 'Thương hiệu bổ sung dinh dưỡng thể thao', 'USA', TRUE, TRUE, TRUE),
('BSN', 'bsn', 'Bio-Engineered Supplements and Nutrition', 'USA', TRUE, FALSE, TRUE),
('Cellucor', 'cellucor', 'Thương hiệu pre-workout nổi tiếng', 'USA', TRUE, FALSE, TRUE);

-- Categories
INSERT INTO categories (name, slug, description, level, sort_order, is_featured, is_active) VALUES
('Protein', 'protein', 'Các sản phẩm protein hỗ trợ xây dựng cơ bắp', 0, 1, TRUE, TRUE),
('Mass Gainer', 'mass-gainer', 'Sản phẩm tăng cân, tăng khối lượng cơ', 0, 2, TRUE, TRUE),
('Pre-Workout', 'pre-workout', 'Sản phẩm uống trước khi tập luyện', 0, 3, TRUE, TRUE),
('BCAA & Amino', 'bcaa-amino', 'Axit amin thiết yếu cho cơ bắp', 0, 4, TRUE, TRUE),
('Vitamins & Minerals', 'vitamins-minerals', 'Vitamin và khoáng chất', 0, 5, TRUE, TRUE),
('Gym Accessories', 'gym-accessories', 'Phụ kiện tập gym', 0, 6, FALSE, TRUE),
('Apparel', 'apparel', 'Quần áo thể thao', 0, 7, FALSE, TRUE);

-- Sub-categories
INSERT INTO categories (name, slug, description, parent_id, level, sort_order, is_active) VALUES
('Whey Protein', 'whey-protein', 'Protein từ whey', 1, 1, 1, TRUE),
('Casein Protein', 'casein-protein', 'Protein casein tiêu hóa chậm', 1, 1, 2, TRUE),
('Plant Protein', 'plant-protein', 'Protein thực vật', 1, 1, 3, TRUE);

-- System settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'GymShop VN', 'string', 'Tên website', TRUE),
('site_description', 'Cửa hàng thể thao và thực phẩm bổ sung hàng đầu Việt Nam', 'string', 'Mô tả website', TRUE),
('free_shipping_threshold', '1500000', 'number', 'Miễn phí ship từ số tiền', TRUE),
('default_currency', 'VND', 'string', 'Đơn vị tiền tệ', TRUE),
('tax_rate', '10', 'number', 'Thuế VAT (%)', FALSE),
('points_per_vnd', '1000', 'number', 'Số VNĐ = 1 điểm thưởng', TRUE);

-- =====================================================
-- INDEXES BỔ SUNG CHO PERFORMANCE
-- =====================================================

-- Composite indexes cho search và filter
CREATE INDEX idx_products_search ON products(status, is_featured, category_id, brand_id);
CREATE INDEX idx_products_price_range ON products(status, price);
CREATE INDEX idx_orders_user_status ON orders(user_id, status, order_date);
CREATE INDEX idx_reviews_product_status ON product_reviews(product_id, status, rating);

-- =====================================================
-- VIEWS HỮU ÍCH
-- =====================================================

-- View sản phẩm với thông tin đầy đủ
CREATE VIEW v_products_full AS
SELECT 
    p.*,
    b.name as brand_name,
    b.slug as brand_slug,
    c.name as category_name,
    c.slug as category_slug,
    c.parent_id as category_parent_id,
    COALESCE(AVG(pr.rating), 0) as avg_rating,
    COUNT(pr.id) as review_count,
    CASE WHEN p.compare_price > p.price THEN 
        ROUND(((p.compare_price - p.price) / p.compare_price) * 100, 0)
    ELSE 0 END as discount_percentage
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.status = 'approved'
GROUP BY p.id;

-- View đơn hàng với thông tin khách hàng
CREATE VIEW v_orders_summary AS
SELECT 
    o.*,
    u.username,
    u.email as user_email,
    u.customer_tier_id,
    ct.name as customer_tier_name,
    COUNT(oi.id) as total_items,
    SUM(oi.quantity) as total_quantity
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN customer_tiers ct ON u.customer_tier_id = ct.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- =====================================================
-- STORED PROCEDURES HỮU ÍCH
-- =====================================================

DELIMITER //

-- Procedure cập nhật điểm thưởng cho khách hàng
CREATE PROCEDURE UpdateCustomerLoyaltyPoints(
    IN p_user_id INT,
    IN p_order_total DECIMAL(12,2)
)
BEGIN
    DECLARE v_points_to_add INT;
    DECLARE v_points_per_vnd INT;
    DECLARE v_multiplier DECIMAL(3,2);
    
    -- Lấy cấu hình điểm thưởng
    SELECT CAST(setting_value AS UNSIGNED) INTO v_points_per_vnd 
    FROM system_settings WHERE setting_key = 'points_per_vnd';
    
    -- Lấy hệ số nhân điểm của customer tier
    SELECT ct.points_multiplier INTO v_multiplier
    FROM users u 
    JOIN customer_tiers ct ON u.customer_tier_id = ct.id
    WHERE u.id = p_user_id;
    
    -- Tính điểm thưởng
    SET v_points_to_add = FLOOR((p_order_total / v_points_per_vnd) * v_multiplier);
    
    -- Cập nhật điểm và tổng chi tiêu
    UPDATE users 
    SET 
        loyalty_points = loyalty_points + v_points_to_add,
        total_spent = total_spent + p_order_total
    WHERE id = p_user_id;
    
END //

-- Procedure cập nhật inventory khi có đơn hàng
CREATE PROCEDURE UpdateInventoryOnOrder(
    IN p_order_id INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_product_id INT;
    DECLARE v_variant_id INT;
    DECLARE v_quantity INT;
    
    DECLARE order_cursor CURSOR FOR
        SELECT product_id, variant_id, quantity
        FROM order_items
        WHERE order_id = p_order_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN order_cursor;
    
    order_loop: LOOP
        FETCH order_cursor INTO v_product_id, v_variant_id, v_quantity;
        
        IF done THEN
            LEAVE order_loop;
        END IF;
        
        -- Cập nhật inventory cho variant hoặc product
        IF v_variant_id IS NOT NULL THEN
            UPDATE product_variants 
            SET inventory_quantity = inventory_quantity - v_quantity
            WHERE id = v_variant_id;
        ELSE
            UPDATE products 
            SET inventory_quantity = inventory_quantity - v_quantity
            WHERE id = v_product_id;
        END IF;
        
        -- Ghi log inventory
        INSERT INTO inventory_transactions (
            product_id, variant_id, warehouse_id, type, quantity, 
            previous_quantity, new_quantity, reason, reference_type, reference_id
        ) VALUES (
            v_product_id, v_variant_id, 1, 'out', -v_quantity,
            0, 0, 'Order sale', 'sale', p_order_id
        );
        
    END LOOP;
    
    CLOSE order_cursor;
    
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS TỰ ĐỘNG
-- =====================================================

-- Trigger cập nhật updated_at cho products
DELIMITER //
CREATE TRIGGER products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- Trigger tính toán total_price cho order_items
DELIMITER //
CREATE TRIGGER order_items_calculate_total
    BEFORE INSERT ON order_items
    FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * NEW.unit_price;
END //

CREATE TRIGGER order_items_calculate_total_update
    BEFORE UPDATE ON order_items
    FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * NEW.unit_price;
END //
DELIMITER ;

-- =====================================================
-- HOÀN TẤT
-- =====================================================

-- Tạo user admin mặc định (password: admin123)
INSERT INTO users (username, password, email, full_name, role_id, customer_tier_id, is_active) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@gymshop.vn', 'System Administrator', 1, 1, TRUE);

-- Hiển thị thông báo hoàn thành
SELECT 'Database GymShop đã được tạo thành công!' as message;
SELECT 'Tổng số bảng:' as info, COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'gymshop';