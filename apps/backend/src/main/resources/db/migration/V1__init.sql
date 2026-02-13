-- Enable Extensions (if needed for future)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS vector;

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50)
);

-- Wines Table
CREATE TABLE wines (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(19, 2) NOT NULL,
    sale BOOLEAN DEFAULT FALSE,
    sale_price DECIMAL(19, 2),
    description TEXT,
    short_description TEXT,
    image VARCHAR(255),
    type VARCHAR(50) NOT NULL,
    stock_status VARCHAR(50),
    stock_quantity INTEGER,
    grape_variety VARCHAR(255),
    production_year INTEGER,
    alcohol VARCHAR(50),
    acidity VARCHAR(50),
    sugar VARCHAR(50),
    flavor VARCHAR(255),
    quality_level VARCHAR(255),
    edition VARCHAR(255),
    rating DOUBLE PRECISION,
    temp VARCHAR(50),
    created_at TIMESTAMP
);

-- Wine Recommended Dishes (ElementCollection)
CREATE TABLE wine_dishes (
    wine_id VARCHAR(255) NOT NULL,
    dish VARCHAR(255),
    FOREIGN KEY (wine_id) REFERENCES wines(id)
);

-- Wine Tags (ElementCollection)
CREATE TABLE wine_tags (
    wine_id VARCHAR(255) NOT NULL,
    tag VARCHAR(255),
    FOREIGN KEY (wine_id) REFERENCES wines(id)
);

-- Events Table
CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    date TIMESTAMP,
    time VARCHAR(50),
    location VARCHAR(255),
    description TEXT,
    spots INTEGER,
    price DECIMAL(19, 2),
    image VARCHAR(255),
    category VARCHAR(50),
    is_full BOOLEAN DEFAULT FALSE
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID,
    total_amount DECIMAL(19, 2),
    status VARCHAR(50),
    created_at TIMESTAMP
);
