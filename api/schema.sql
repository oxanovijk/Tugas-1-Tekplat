SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('superadmin', 'provider', 'tourist') NOT NULL,
  approval_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role_status (role, approval_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS destinations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  city VARCHAR(120) NOT NULL,
  province VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  short_description TEXT NOT NULL,
  best_time VARCHAR(120) NOT NULL,
  sustainability_note TEXT NOT NULL,
  image_url TEXT NOT NULL,
  external_title VARCHAR(180) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_destinations_name_city (name, city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS travel_packages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  provider_id INT UNSIGNED NOT NULL,
  destination_id INT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  duration_days INT UNSIGNED NOT NULL,
  estimated_price DECIMAL(12, 2) NOT NULL,
  capacity INT UNSIGNED NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_packages_provider FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_packages_destination FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE,
  INDEX idx_packages_destination (destination_id),
  INDEX idx_packages_provider (provider_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS package_media (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id INT UNSIGNED NOT NULL,
  file_path TEXT NOT NULL,
  mime_type VARCHAR(80) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  image_blob MEDIUMBLOB NULL,
  is_primary TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_media_package FOREIGN KEY (package_id) REFERENCES travel_packages(id) ON DELETE CASCADE,
  INDEX idx_media_package (package_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trip_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id INT UNSIGNED NOT NULL,
  tourist_id INT UNSIGNED NOT NULL,
  preferred_date DATE NOT NULL,
  participant_count INT UNSIGNED NOT NULL,
  note TEXT NULL,
  status ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_package FOREIGN KEY (package_id) REFERENCES travel_packages(id) ON DELETE CASCADE,
  CONSTRAINT fk_requests_tourist FOREIGN KEY (tourist_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_requests_tourist (tourist_id),
  INDEX idx_requests_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
