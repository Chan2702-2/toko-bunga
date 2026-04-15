-- ============================================
-- Database Schema untuk Toko Bunga Indo
-- Jalankan ini di phpMyAdmin / MySQL CLI RumahWeb
-- ============================================

CREATE DATABASE IF NOT EXISTS toko_bunga
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE toko_bunga;

-- Tabel admin users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabel kategori
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabel produk
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_address TEXT,
  total_amount DECIMAL(12, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabel item pesanan
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price_at_time DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- Sample Data
-- ============================================

-- Admin user (password: admin123)
INSERT INTO users (email, password, name) VALUES
('admin@tokobunga.com', '$2a$10$rQZ8kHxMBOx3GHOz0l5KxOGxNMJ8Kz3YvVx3qz3qz3qz3qz3qz3q', 'Admin Toko Bunga');

-- Kategori
INSERT INTO categories (name, slug, description) VALUES
('Hand Bouquet', 'hand-bouquet', 'Buket bunga segar untuk berbagai acara'),
('Bunga Papan', 'bunga-papan', 'Bunga papan ucapan untuk grand opening, pernikahan, dll'),
('Flower Box', 'flower-box', 'Kotak bunga premium yang estetik'),
('Standing Flower', 'standing-flower', 'Rangkaian bunga berdiri untuk acara'),
('Bunga Meja', 'bunga-meja', 'Dekorasi meja dengan bunga segar'),
('Parcel & Hamper', 'parcel-hamper', 'Parcel dan hamper untuk hadiah');

-- Produk contoh
INSERT INTO products (name, description, price, category, image_url, is_available) VALUES
('Rose Bouquet Premium', 'Buket mawar merah premium dengan 24 tangkai mawar segar. Cocok untuk anniversary atau ungkapan cinta.', 350000, 'hand-bouquet', NULL, TRUE),
('Bunga Papan Congratulations', 'Bunga papan ucapan selamat dengan desain elegan. Cocok untuk grand opening dan wisuda.', 750000, 'bunga-papan', NULL, TRUE),
('Flower Box Rose Pink', 'Kotak bunga mawar pink premium dalam box hitam elegan. Perfect untuk birthday surprise.', 450000, 'flower-box', NULL, TRUE),
('Mixed Bouquet Graduation', 'Buket campuran untuk wisuda dengan kombinasi mawar, baby breath, dan lily.', 275000, 'hand-bouquet', NULL, TRUE),
('Standing Flower Grand Opening', 'Rangkaian bunga berdiri megah untuk acara grand opening dengan bunga segar pilihan.', 1200000, 'standing-flower', NULL, TRUE),
('Bunga Meja Kantor', 'Dekorasi meja kantor dengan bunga segar yang cantik dan tahan lama.', 200000, 'bunga-meja', NULL, TRUE);
