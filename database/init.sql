-- ============================================
-- Cartify Database Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name   VARCHAR(255) NOT NULL,
    role        VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',  -- CUSTOMER | ADMIN
    avatar_url  VARCHAR(500),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    slug  VARCHAR(100) UNIQUE NOT NULL
);

-- Products
CREATE TABLE products (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name             VARCHAR(255) NOT NULL,
    description      TEXT,
    price            NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity   INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url        VARCHAR(500),
    category_id      INT REFERENCES categories(id) ON DELETE SET NULL,
    rating_avg       NUMERIC(3, 2) DEFAULT 0,
    rating_count     INT DEFAULT 0,
    is_featured      BOOLEAN DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status           VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    -- PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED
    total_amount     NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB NOT NULL,
    -- { "street": "...", "city": "...", "state": "...", "zip": "...", "country": "..." }
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id   UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity     INT NOT NULL CHECK (quantity > 0),
    unit_price   NUMERIC(10, 2) NOT NULL
);

-- Reviews
CREATE TABLE reviews (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating       SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment      TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)   -- one review per user per product
);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ============================================
-- Seed Data
-- ============================================
INSERT INTO categories (name, slug) VALUES
    ('Electronics',      'electronics'),
    ('Books',            'books'),
    ('Clothing',         'clothing'),
    ('Home & Garden',    'home-garden'),
    ('Sports',           'sports');

INSERT INTO products (name, description, price, stock_quantity, image_url, category_id, rating_avg, rating_count, is_featured) VALUES
    ('Wireless Noise-Cancelling Headphones',
     'Premium over-ear headphones with 30h battery life and active noise cancellation.',
     89.99, 150, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 1, 4.7, 2341, TRUE),

    ('Mechanical Keyboard — TKL',
     'Compact tenkeyless layout with tactile switches, RGB backlighting and aluminium frame.',
     129.00, 80, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', 1, 4.5, 876, FALSE),

    ('The Pragmatic Programmer',
     'Your journey to mastery. 20th Anniversary Edition. A must-read for every developer.',
     45.00, 300, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 2, 4.9, 5102, TRUE),

    ('Running Shoes — Ultraboost',
     'Responsive cushioning and energy return for long-distance running comfort.',
     159.95, 60, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 5, 4.6, 1230, TRUE),

    ('Smart LED Desk Lamp',
     'Adjustable colour temperature, touch controls, and USB-C charging port.',
     39.99, 200, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 4, 4.3, 432, FALSE);
