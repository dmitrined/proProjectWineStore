-- Drop old tables to recreate with correct types (Long ID, etc.)
DROP TABLE IF EXISTS wine_dishes;
DROP TABLE IF EXISTS wine_tags;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS wines;

-- Wines Table (with Long ID / Serial)
CREATE TABLE wines (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    image_url VARCHAR(255),
    price DECIMAL(19, 2) NOT NULL,
    sale_price DECIMAL(19, 2),
    is_sale BOOLEAN DEFAULT FALSE,
    stock_status VARCHAR(50),
    stock_quantity INTEGER,
    type VARCHAR(50),
    grape_variety VARCHAR(255),
    year INTEGER,
    alcohol VARCHAR(50),
    acidity VARCHAR(50),
    sugar VARCHAR(50),
    flavor VARCHAR(50),
    quality_level VARCHAR(255),
    edition VARCHAR(255),
    rating DOUBLE PRECISION
);

-- Wine Recommended Dishes (ElementCollection)
CREATE TABLE wine_dishes (
    wine_id BIGINT NOT NULL,
    dish VARCHAR(255),
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE
);

-- Wine Tags (ElementCollection)
CREATE TABLE wine_tags (
    wine_id BIGINT NOT NULL,
    tag VARCHAR(255),
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE
);

-- Events Table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    date DATE,
    time TIME,
    location VARCHAR(255),
    price_per_person DECIMAL(19, 2),
    total_spots INTEGER,
    booked_spots INTEGER DEFAULT 0,
    category VARCHAR(50)
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(255),
    guests_count INTEGER NOT NULL,
    total_price DECIMAL(19, 2),
    status VARCHAR(50),
    created_at TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
