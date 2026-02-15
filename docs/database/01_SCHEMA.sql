-- 🏗 Fellbach Wine Store - Current Schema
-- Corresponds to Liquibase changelog: 001-initial-schema.xml

-- 1. 👥 USERS
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_role VARCHAR(50) -- 'USER', 'ADMIN'
);

-- 2. 🍷 WINES
CREATE TABLE wines (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    
    image_url VARCHAR(255),
    price DECIMAL(19, 2) NOT NULL,
    sale_price DECIMAL(19, 2),
    is_sale BOOLEAN DEFAULT FALSE,
    
    stock_status VARCHAR(50), -- 'IN_STOCK', 'OUT_OF_STOCK'
    stock_quantity INTEGER,
    
    type VARCHAR(50), -- 'RED', 'WHITE', 'ROSE', 'SPARKLING', 'ALCOHOL_FREE', 'PACKAGE', 'OTHER'
    grape_variety VARCHAR(255),
    
    release_year INTEGER,
    alcohol VARCHAR(50),
    acidity VARCHAR(50),
    sugar VARCHAR(50),
    flavor VARCHAR(50), -- 'TROCKEN', 'FEINHERB', etc.
    
    edition VARCHAR(255),
    rating DOUBLE PRECISION,
    featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE wine_dishes (
    wine_id BIGINT NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
    dish VARCHAR(255)
);

CREATE TABLE wine_tags (
    wine_id BIGINT NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
    tag VARCHAR(255)
);

-- 3. 📅 EVENTS
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    
    date DATE,
    time VARCHAR(100),
    location VARCHAR(255),
    
    price_per_person DECIMAL(19, 2),
    total_spots INTEGER,
    booked_spots INTEGER DEFAULT 0,
    
    category VARCHAR(50) -- 'WEINFEST', 'WEINPROBE', etc.
);

-- 4. 🎟 BOOKINGS
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(255),
    
    guests_count INTEGER NOT NULL,
    total_price DECIMAL(19, 2),
    status VARCHAR(50), -- 'CONFIRMED', 'CANCELLED'
    
    created_at TIMESTAMP
);

-- 5. 🛒 ORDERS
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID, -- Optional link to registered user
    
    total_amount DECIMAL(19, 2),
    status VARCHAR(50), -- 'NEW', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'
    
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    zip_code VARCHAR(20),
    
    created_at TIMESTAMP
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    wine_id BIGINT NOT NULL REFERENCES wines(id),
    
    quantity INTEGER NOT NULL,
    price DECIMAL(19, 2)
);
