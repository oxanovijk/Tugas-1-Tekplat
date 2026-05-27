SET NAMES utf8mb4;

INSERT INTO destinations
  (name, city, province, category, short_description, best_time, sustainability_note, image_url, external_title)
VALUES
  ('Pantai Wediombo', 'Gunungkidul', 'DI Yogyakarta', 'Pantai',
   'Pantai berkarang dengan kolam alami dan garis pantai yang lebih tenang dibanding pantai populer di sekitarnya.',
   'April-Oktober',
   'Kunjungan dibatasi pada jalur aman agar ekosistem karang dan kolam alami tidak rusak.',
   'https://upload.wikimedia.org/wikipedia/commons/9/9d/Wediombo_Beach%2C_Gunungkidul.jpg',
   'Pantai Wediombo'),
  ('Air Terjun Tumpak Sewu', 'Lumajang', 'Jawa Timur', 'Air Terjun',
   'Air terjun bertingkat dengan panorama tebing melingkar yang cocok untuk wisata alam berpemandu.',
   'Mei-September',
   'Wisata berpemandu membantu menjaga keselamatan dan mengurangi risiko kerusakan jalur turun.',
   'https://upload.wikimedia.org/wikipedia/commons/9/9b/Tumpak_Sewu_Waterfall.jpg',
   'Tumpak Sewu'),
  ('Pulau Padar', 'Manggarai Barat', 'Nusa Tenggara Timur', 'Pulau',
   'Pulau dengan punggungan bukit dan teluk berlapis yang menjadi titik pandang utama kawasan Labuan Bajo.',
   'April-November',
   'Pembatasan jalur trekking membantu mencegah erosi dan menjaga vegetasi savana.',
   'https://upload.wikimedia.org/wikipedia/commons/7/78/Padar_Island.jpg',
   'Pulau Padar'),
  ('Desa Wae Rebo', 'Manggarai', 'Nusa Tenggara Timur', 'Desa Budaya',
   'Desa adat di pegunungan dengan rumah Mbaru Niang dan pengalaman budaya lokal yang kuat.',
   'Mei-Oktober',
   'Model homestay lokal memastikan manfaat ekonomi langsung diterima komunitas adat.',
   'https://upload.wikimedia.org/wikipedia/commons/0/0f/Wae_Rebo_Village.jpg',
   'Wae Rebo'),
  ('Danau Weekuri', 'Sumba Barat Daya', 'Nusa Tenggara Timur', 'Danau',
   'Laguna air asin jernih dengan suasana tenang dan tebing karang rendah.',
   'Mei-Oktober',
   'Pengelolaan sampah dan pembatasan aktivitas berenang penting untuk menjaga kejernihan laguna.',
   'https://upload.wikimedia.org/wikipedia/commons/0/0f/Lake_Weekuri.jpg',
   'Danau Weekuri'),
  ('Kampung Naga', 'Tasikmalaya', 'Jawa Barat', 'Desa Budaya',
   'Kampung adat Sunda yang mempertahankan tata ruang, arsitektur, dan praktik budaya tradisional.',
   'Sepanjang tahun',
   'Kunjungan perlu mengikuti aturan adat dan kapasitas lokal agar tidak mengganggu aktivitas warga.',
   'https://upload.wikimedia.org/wikipedia/commons/5/53/Kampung_Naga.jpg',
   'Kampung Naga')
ON DUPLICATE KEY UPDATE
  category = VALUES(category),
  short_description = VALUES(short_description),
  best_time = VALUES(best_time),
  sustainability_note = VALUES(sustainability_note),
  image_url = VALUES(image_url),
  external_title = VALUES(external_title);

INSERT INTO users (name, email, password_hash, role, approval_status)
VALUES
  ('Nusantara Local Trip', 'provider.nusantara@hiddengem.local', '$2b$12$ct5iUoqSJ900755uuPvDOer61WDrzMiCuCg24ozkTjuYlf6HJmHoq', 'provider', 'approved'),
  ('Jelajah Budaya Travel', 'provider.budaya@hiddengem.local', '$2b$12$ct5iUoqSJ900755uuPvDOer61WDrzMiCuCg24ozkTjuYlf6HJmHoq', 'provider', 'approved'),
  ('EcoTrail Indonesia', 'provider.ecotrail@hiddengem.local', '$2b$12$ct5iUoqSJ900755uuPvDOer61WDrzMiCuCg24ozkTjuYlf6HJmHoq', 'provider', 'approved'),
  ('Tourist Demo', 'tourist.demo@hiddengem.local', '$2b$12$a3EIv.bKHr8h/hrm.zm6ZuGTstMrWqIvuNr2BJ7EhEOSfQ5djAJQ2', 'tourist', 'approved')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  password_hash = VALUES(password_hash),
  role = VALUES(role),
  approval_status = VALUES(approval_status);

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Sunrise Rockpool Escape',
       'Simulasi paket satu hari untuk menikmati sunrise, eksplorasi kolam alami, dan briefing keselamatan pesisir Wediombo.',
       1, 350000, 8, 'active'
FROM users u
JOIN destinations d ON d.name = 'Pantai Wediombo'
WHERE u.email = 'provider.nusantara@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Sunrise Rockpool Escape');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Camping Pesisir Wediombo',
       'Simulasi paket dua hari dengan agenda camping ringan, sesi foto pantai, dan edukasi sampah wisata.',
       2, 750000, 6, 'active'
FROM users u
JOIN destinations d ON d.name = 'Pantai Wediombo'
WHERE u.email = 'provider.ecotrail@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Camping Pesisir Wediombo');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Tumpak Sewu Guided Trek',
       'Simulasi paket trekking berpemandu menuju titik pandang dan area bawah air terjun dengan validasi cuaca sebelum keberangkatan.',
       1, 450000, 6, 'active'
FROM users u
JOIN destinations d ON d.name = 'Air Terjun Tumpak Sewu'
WHERE u.email = 'provider.ecotrail@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Tumpak Sewu Guided Trek');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Lumajang Waterfall Photo Trip',
       'Simulasi paket foto perjalanan air terjun Lumajang dengan itinerary santai, transport lokal, dan pemandu area.',
       2, 900000, 5, 'active'
FROM users u
JOIN destinations d ON d.name = 'Air Terjun Tumpak Sewu'
WHERE u.email = 'provider.nusantara@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Lumajang Waterfall Photo Trip');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Padar Viewpoint Open Trip',
       'Simulasi paket open trip menuju viewpoint Pulau Padar dengan jadwal pagi dan briefing jalur trekking.',
       1, 650000, 10, 'active'
FROM users u
JOIN destinations d ON d.name = 'Pulau Padar'
WHERE u.email = 'provider.nusantara@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Padar Viewpoint Open Trip');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Komodo Island Hopping Lite',
       'Simulasi paket dua hari untuk itinerary pulau ringan sekitar Labuan Bajo dengan fokus konservasi dan pembatasan rombongan.',
       2, 1800000, 8, 'active'
FROM users u
JOIN destinations d ON d.name = 'Pulau Padar'
WHERE u.email = 'provider.ecotrail@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Komodo Island Hopping Lite');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Wae Rebo Cultural Homestay',
       'Simulasi paket homestay budaya di Wae Rebo dengan orientasi etika kunjungan, trekking, dan aktivitas komunitas.',
       2, 1250000, 6, 'active'
FROM users u
JOIN destinations d ON d.name = 'Desa Wae Rebo'
WHERE u.email = 'provider.budaya@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Wae Rebo Cultural Homestay');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Manggarai Village Immersion',
       'Simulasi paket tiga hari untuk pengalaman desa, diskusi budaya lokal, dan eksplorasi lanskap Manggarai.',
       3, 1850000, 5, 'active'
FROM users u
JOIN destinations d ON d.name = 'Desa Wae Rebo'
WHERE u.email = 'provider.ecotrail@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Manggarai Village Immersion');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Weekuri Lagoon Slow Day',
       'Simulasi paket satu hari untuk menikmati Danau Weekuri secara santai dengan catatan keselamatan berenang.',
       1, 400000, 8, 'active'
FROM users u
JOIN destinations d ON d.name = 'Danau Weekuri'
WHERE u.email = 'provider.nusantara@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Weekuri Lagoon Slow Day');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Sumba Barat Daya Culture Loop',
       'Simulasi paket dua hari menggabungkan lagoon, desa sekitar, dan kuliner lokal dengan kapasitas kecil.',
       2, 1100000, 6, 'active'
FROM users u
JOIN destinations d ON d.name = 'Danau Weekuri'
WHERE u.email = 'provider.budaya@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Sumba Barat Daya Culture Loop');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Kampung Naga Heritage Walk',
       'Simulasi paket jalan budaya satu hari dengan pemandu, pengantar etika kunjungan, dan sesi cerita arsitektur tradisional.',
       1, 250000, 12, 'active'
FROM users u
JOIN destinations d ON d.name = 'Kampung Naga'
WHERE u.email = 'provider.budaya@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Kampung Naga Heritage Walk');

INSERT INTO travel_packages
  (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
SELECT u.id, d.id, 'Tasikmalaya Rural Culture Trip',
       'Simulasi paket dua hari untuk eksplorasi budaya pedesaan Tasikmalaya dengan kegiatan lokal yang ringan.',
       2, 650000, 8, 'active'
FROM users u
JOIN destinations d ON d.name = 'Kampung Naga'
WHERE u.email = 'provider.nusantara@hiddengem.local'
  AND NOT EXISTS (SELECT 1 FROM travel_packages WHERE title = 'Tasikmalaya Rural Culture Trip');

INSERT INTO package_media (package_id, file_path, mime_type, original_name, is_primary)
SELECT p.id, d.image_url, 'image/jpeg', CONCAT(REPLACE(LOWER(p.title), ' ', '-'), '.jpg'), 1
FROM travel_packages p
JOIN destinations d ON d.id = p.destination_id
WHERE p.title IN (
  'Sunrise Rockpool Escape',
  'Camping Pesisir Wediombo',
  'Tumpak Sewu Guided Trek',
  'Lumajang Waterfall Photo Trip',
  'Padar Viewpoint Open Trip',
  'Komodo Island Hopping Lite',
  'Wae Rebo Cultural Homestay',
  'Manggarai Village Immersion',
  'Weekuri Lagoon Slow Day',
  'Sumba Barat Daya Culture Loop',
  'Kampung Naga Heritage Walk',
  'Tasikmalaya Rural Culture Trip'
)
  AND NOT EXISTS (
    SELECT 1
    FROM package_media pm
    WHERE pm.package_id = p.id
      AND pm.is_primary = 1
  );
