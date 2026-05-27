# Tugas 2 Implementation Plan - HiddenGem Explorer

Dokumen ini adalah rencana implementasi Tugas 2 II2210 Teknologi Platform untuk platform **HiddenGem Explorer**. Dokumen ini dibuat sebagai baseline teknis agar implementasi berikutnya tidak melebar, tetap sesuai PDF Tugas 2, dan bisa dikerjakan cepat di atas hasil Tugas 1.

## 1. Proof of Understanding dari PDF Tugas 2

Berdasarkan `II2210_Tugas 2 2026.pdf`:

- Bab I 1.1 menyatakan Tugas 2 memperluas platform sebelumnya dengan **autentikasi, kontrol akses, backend, database mandiri, serta fungsi utama yang mendukung pertukaran layanan/data antara produsen dan konsumen**.
- Bab I 1.3 menyatakan platform setidaknya mencakup **frontend**, **backend/server**, **database mandiri pada server/VPS**, **minimal satu API eksternal/publik**, dan **akses online/public**.
- Bab II 2.1 mewajibkan autentikasi sederhana, **minimal tiga role**: `superadmin`, `produsen`, dan `konsumen`.
- Bab II 2.1 juga menyatakan registrasi pengguna hanya diterima ketika pengguna diterima oleh superadmin, dengan cara dibebaskan.
- Bab II 2.2 mewajibkan database dikelola mandiri di VPS dan **tidak menggunakan layanan database eksternal seperti Supabase/Firebase**.
- Bab II 2.2 juga meminta backend/database dapat menyimpan data selain teks seperti gambar/video/gif atau serupa.
- Bab II 2.3 meminta **minimal dua alur interaksi** antara produsen dan konsumen yang divisualisasikan dengan sequence diagram.
- Bab II 2.4 meminta system flowchart dan tabel fungsi.
- Bab II 2.5 meminta penjelasan fitur unik dan manfaatnya.
- Bab III 3.2 meminta dokumentasi PDF, link platform publik, dan screenshot platform publik.

## 2. Scope Produk yang Dipilih

### FINAL IMPLEMENTATION DECISION

HiddenGem Explorer akan dikembangkan menjadi:

> **Platform katalog destinasi wisata dan request perjalanan, tempat penyedia jasa travel menawarkan paket untuk destinasi tertentu, lalu turis dapat mengajukan minat perjalanan tanpa payment gateway.**

Scope ini dipilih karena:

- Cocok dengan tema **Tourism & Culture Exchange**.
- Role PDF untuk tema ini sudah memberi contoh `Penyedia Jasa Travel` dan `Turis`.
- Tidak perlu payment gateway karena PDF tidak mewajibkan transaksi finansial.
- Tetap memenuhi interaksi produsen-konsumen: provider menawarkan paket, turis mengajukan minat/request.
- Bisa dibuat cukup sederhana namun tetap memiliki backend, database, auth, role, dan upload file.

## 3. Role dan Hak Akses

| Role | Nama di UI | Hak Akses |
| --- | --- | --- |
| `superadmin` | Superadmin | Login, melihat user baru, approve/reject provider, melihat semua data |
| `provider` | Penyedia Travel | Register, menunggu approval, login, membuat paket travel, upload gambar paket, melihat request turis |
| `tourist` | Turis | Register, login, melihat destinasi dan paket, mengajukan minat perjalanan |

## 4. Konsep Interaksi Platform

### 4.1 Destinasi

Destinasi adalah tempat wisata yang sudah ada pada platform, misalnya:

- Candi Ijo
- Wae Rebo
- Pantai Ora
- Danau Toba

Destinasi tetap berfungsi sebagai katalog utama.

### 4.2 Paket Travel

Paket travel adalah layanan yang dibuat oleh provider untuk destinasi tertentu.

Contoh:

```text
Destinasi: Wae Rebo
  - Paket 1: Open Trip Wae Rebo 2D1N
  - Paket 2: Cultural Walk Wae Rebo
  - Paket 3: Private Guide Wae Rebo
```

### 4.3 Request Perjalanan

Turis tidak membeli tiket. Turis hanya mengajukan minat/request perjalanan.

Status request:

- `pending`
- `accepted`
- `rejected`
- `contacted`

Tidak ada:

- checkout,
- invoice,
- payment gateway,
- pembayaran dummy.

Alasan: payment gateway tidak diminta PDF dan akan membuat scope terlalu besar.

## 5. Arsitektur Teknis

### FINAL IMPLEMENTATION DECISION

Gunakan arsitektur berikut:

```text
Browser User
  -> React Frontend
  -> Express Backend API
  -> MariaDB Database di VPS/aaPanel
  -> Local file storage untuk upload gambar
```

### 5.1 Frontend

Tetap memakai:

- Vite
- React
- TypeScript
- CSS
- lucide-react

Tambahan halaman:

- Login
- Register
- Superadmin Dashboard
- Provider Dashboard
- Tourist Dashboard / Package Request
- Package Detail

### 5.2 Backend

Gunakan:

- Node.js
- Express.js
- mysql2
- bcryptjs
- jsonwebtoken
- multer
- cors
- dotenv

### 5.3 Database

Gunakan:

- MariaDB/MySQL mandiri dari aaPanel

Alasan:

- Sesuai PDF karena database dikelola sendiri di VPS.
- Sudah tersedia di ekosistem aaPanel.
- Lebih cepat disiapkan dibanding mengelola PostgreSQL manual di deadline pendek.

### 5.4 File Storage

Untuk upload gambar paket:

- file disimpan di folder VPS:

```text
/www/wwwroot/hiddengem.stei.my.id/uploads
```

- metadata file disimpan di database.
- untuk memenuhi kebutuhan "menyimpan data selain teks", tambahkan juga kolom `image_blob MEDIUMBLOB NULL` pada tabel `package_media` sebagai bukti kemampuan database menyimpan binary. Namun implementasi utama tetap memakai file path agar web lebih ringan.

## 6. Struktur Folder Target

Struktur repo setelah implementasi:

```text
.
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── requireRole.ts
│   │   ├── routes/
│   │   │   ├── admin.ts
│   │   │   ├── auth.ts
│   │   │   ├── destinations.ts
│   │   │   ├── packages.ts
│   │   │   └── requests.ts
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docs/
│   ├── TUGAS2_IMPLEMENTATION_PLAN.md
│   └── ...
├── src/
│   ├── App.tsx
│   ├── data/
│   └── ...
└── package.json
```

## 7. Database Schema

### 7.1 Tabel `users`

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('superadmin', 'provider', 'tourist') NOT NULL,
  approval_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Catatan:

- `superadmin` dibuat manual via seed.
- `tourist` bisa langsung `approved`.
- `provider` default `pending`, lalu harus di-approve superadmin.

### 7.2 Tabel `destinations`

```sql
CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  region VARCHAR(160) NOT NULL,
  category ENUM('Alam', 'Budaya', 'Sejarah', 'Desa') NOT NULL,
  summary TEXT NOT NULL,
  hidden_gem_reason TEXT NOT NULL,
  access_note TEXT NOT NULL,
  image_url TEXT,
  image_credit VARCHAR(160),
  source_name VARCHAR(160),
  source_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7.3 Tabel `travel_packages`

```sql
CREATE TABLE travel_packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT NOT NULL,
  provider_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  duration VARCHAR(80) NOT NULL,
  estimated_price INT NULL,
  capacity INT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id),
  FOREIGN KEY (provider_id) REFERENCES users(id)
);
```

### 7.4 Tabel `package_media`

```sql
CREATE TABLE package_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  image_blob MEDIUMBLOB NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES travel_packages(id)
);
```

### 7.5 Tabel `trip_requests`

```sql
CREATE TABLE trip_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  tourist_id INT NOT NULL,
  preferred_date DATE NULL,
  participant_count INT NOT NULL,
  note TEXT,
  status ENUM('pending', 'accepted', 'rejected', 'contacted') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES travel_packages(id),
  FOREIGN KEY (tourist_id) REFERENCES users(id)
);
```

## 8. API Endpoint Plan

Base URL target:

```text
https://hiddengem.stei.my.id/api
```

Jika backend berjalan di port `3001`, Nginx perlu reverse proxy `/api` ke:

```text
http://127.0.0.1:3001
```

### 8.1 Auth

| Method | Endpoint | Role | Fungsi |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | public | Register provider/tourist |
| POST | `/api/auth/login` | public | Login dan menerima JWT |
| GET | `/api/auth/me` | all logged-in | Mengambil user aktif |

### 8.2 Admin

| Method | Endpoint | Role | Fungsi |
| --- | --- | --- | --- |
| GET | `/api/admin/users` | superadmin | Melihat daftar user |
| PATCH | `/api/admin/users/:id/approve` | superadmin | Approve provider |
| PATCH | `/api/admin/users/:id/reject` | superadmin | Reject provider |

### 8.3 Destinations

| Method | Endpoint | Role | Fungsi |
| --- | --- | --- | --- |
| GET | `/api/destinations` | public/logged-in | List destinasi |
| GET | `/api/destinations/:id` | public/logged-in | Detail destinasi |

### 8.4 Travel Packages

| Method | Endpoint | Role | Fungsi |
| --- | --- | --- | --- |
| GET | `/api/packages` | public/logged-in | List paket travel |
| GET | `/api/packages/:id` | public/logged-in | Detail paket travel |
| POST | `/api/packages` | approved provider | Membuat paket travel |
| GET | `/api/provider/packages` | approved provider | Melihat paket milik provider |

### 8.5 Trip Requests

| Method | Endpoint | Role | Fungsi |
| --- | --- | --- | --- |
| POST | `/api/requests` | tourist | Mengajukan minat perjalanan |
| GET | `/api/tourist/requests` | tourist | Melihat request milik turis |
| GET | `/api/provider/requests` | provider | Melihat request masuk |
| PATCH | `/api/provider/requests/:id/status` | provider | Update status request |

## 9. Validasi Utama

| Fungsi | Validasi |
| --- | --- |
| Register | email unik, role hanya `provider` atau `tourist` |
| Login | email ada, password cocok, provider harus approved untuk akses provider dashboard |
| Approve provider | hanya `superadmin` |
| Create package | hanya `provider` yang `approved` |
| Upload image | MIME harus `image/jpeg`, `image/png`, atau `image/webp`; ukuran maksimal 2 MB |
| Create request | hanya `tourist`; `participant_count >= 1`; package harus ada |
| Update request status | hanya provider pemilik package |

## 10. UI Page Plan

### 10.1 Public Home

Tetap menampilkan:

- hero HiddenGem Explorer,
- destinasi,
- pagination,
- foto,
- sumber data.

Tambahan:

- tombol `Login`
- tombol `Register`
- tombol `Lihat Paket` pada destinasi.

### 10.2 Login Page

Field:

- email
- password

Output:

- JWT disimpan di localStorage.
- redirect berdasarkan role:
  - superadmin -> `/admin`
  - provider -> `/provider`
  - tourist -> `/tourist`

### 10.3 Register Page

Field:

- name
- email
- password
- role: `provider` atau `tourist`

Output:

- tourist langsung approved.
- provider pending approval.

### 10.4 Superadmin Dashboard

Fitur:

- list user provider pending,
- approve provider,
- reject provider.

### 10.5 Provider Dashboard

Fitur:

- membuat paket travel,
- memilih destinasi,
- upload foto paket,
- melihat paket milik sendiri,
- melihat request turis.

### 10.6 Tourist Dashboard

Fitur:

- melihat paket,
- mengajukan minat perjalanan,
- melihat status request.

## 11. Dua Alur Interaksi Utama untuk Sequence Diagram

### 11.1 Sequence Diagram 1 - Provider Membuat Paket Travel

Aktor:

- Provider
- Frontend
- Backend API
- Database
- File Storage

Alur:

1. Provider login.
2. Frontend mengirim email/password ke backend.
3. Backend validasi credential dan role.
4. Backend mengecek `approval_status`.
5. Provider mengisi form paket dan upload foto.
6. Frontend mengirim data paket dan file.
7. Backend validasi role `provider` dan status `approved`.
8. Backend menyimpan data paket ke `travel_packages`.
9. Backend menyimpan file ke folder uploads.
10. Backend menyimpan metadata ke `package_media`.
11. Backend mengirim response sukses.
12. Paket tampil di platform.

Validasi:

- user harus login,
- role harus provider,
- provider harus approved,
- file harus gambar.

Keluaran:

- paket travel baru tersimpan dan tampil.

### 11.2 Sequence Diagram 2 - Turis Mengajukan Minat Perjalanan

Aktor:

- Tourist
- Frontend
- Backend API
- Database
- Provider

Alur:

1. Tourist login.
2. Tourist membuka daftar paket.
3. Frontend mengambil paket dari backend.
4. Tourist memilih paket.
5. Tourist mengisi form request.
6. Backend validasi token dan role tourist.
7. Backend validasi package tersedia.
8. Backend menyimpan request ke `trip_requests`.
9. Provider membuka dashboard request.
10. Backend mengambil request berdasarkan provider pemilik paket.
11. Provider mengubah status request.
12. Backend menyimpan status baru.

Validasi:

- tourist harus login,
- package harus valid,
- participant_count minimal 1,
- provider hanya bisa melihat request untuk paket miliknya.

Keluaran:

- request perjalanan tersimpan dan status dapat diproses provider.

## 12. System Flowchart yang Harus Dibuat

Buat minimal satu flowchart besar atau beberapa flowchart kecil yang memuat:

1. Register/Login
2. Superadmin approval
3. Provider create package
4. Tourist request trip
5. Provider update request status

Flowchart ringkas:

```text
Start
  -> User Register/Login
  -> Sistem cek role
  -> Jika provider pending: tampilkan status menunggu approval
  -> Jika superadmin: approve/reject provider
  -> Jika approved provider: create package + upload image
  -> Jika tourist: lihat package + ajukan request
  -> Sistem simpan data ke database
  -> Output sesuai role
End
```

## 13. Tabel Fungsi untuk Laporan

| Nama Fungsi | Role Pengguna | Input | Penjelasan | Validasi | Keluaran |
| --- | --- | --- | --- | --- | --- |
| Register | Provider/Tourist | name, email, password, role | Membuat akun baru | Email unik, role valid | Akun tersimpan |
| Login | Semua role | email, password | Autentikasi user | Password cocok | Token login |
| Approve Provider | Superadmin | user_id | Menyetujui provider | Role superadmin | Provider approved |
| Create Package | Provider | destination, title, description, image | Membuat layanan travel | Provider approved | Paket tersimpan |
| View Packages | Tourist | filter/search | Melihat paket travel | Paket published | Daftar paket |
| Request Trip | Tourist | package_id, date, participant_count, note | Mengajukan minat perjalanan | Tourist login, package valid | Request tersimpan |
| Update Request Status | Provider | request_id, status | Memproses request turis | Provider pemilik paket | Status request berubah |

## 14. Keunikan Platform

### FINAL IMPLEMENTATION DECISION

Fitur unik yang dijelaskan:

> **Curated HiddenGem Package Matching**

Maksudnya, platform tidak hanya menampilkan destinasi, tetapi menghubungkan destinasi dengan paket travel dari provider lokal. Setiap paket dikaitkan dengan:

- kategori destinasi,
- alasan kurasi,
- catatan akses,
- foto,
- estimasi harga,
- durasi,
- request/minat turis.

Manfaat:

- Turis mendapat pilihan perjalanan yang lebih kontekstual.
- Provider lokal dapat menawarkan jasa untuk destinasi spesifik.
- Platform lebih berkelanjutan karena ada interaksi dua arah, bukan katalog statis.

Data yang digunakan:

- data destinasi,
- data paket travel,
- data request turis,
- data status request,
- media gambar paket.

## 15. External/Public API Integration

PDF Tugas 2 tetap menyebut minimal satu API eksternal/publik pada spesifikasi platform. Untuk implementasi cepat:

### Pilihan Utama

Gunakan Wikimedia/OpenStreetMap source link yang sudah ada sebagai data source, lalu tambahkan endpoint backend:

```text
GET /api/external/wiki-summary?title=...
```

Endpoint ini mengambil ringkasan dari Wikimedia REST API untuk destinasi tertentu.

Namun jika waktu sangat sempit, jelaskan bahwa integrasi API publik dipakai untuk sumber gambar/sumber destinasi yang berasal dari Wikimedia/OpenStreetMap, dan siapkan endpoint eksternal sebagai rencana pengembangan.

### Rekomendasi Implementasi Jika Sempat

Tambahkan API call backend ke Wikimedia:

```text
https://id.wikipedia.org/api/rest_v1/page/summary/{title}
```

Lalu tampilkan ringkasan singkat di detail destinasi.

## 16. Deployment Plan di VM/aaPanel

### 16.1 Database MariaDB di aaPanel

Di aaPanel:

1. buka `Databases`
2. install MariaDB/MySQL jika belum ada
3. buat database:

```text
hiddengem_db
```

4. buat user database:

```text
hiddengem_user
```

5. simpan password di `.env` backend, jangan di repo.

### 16.2 Backend Deployment

Di VM:

```bash
cd ~/Tugas-1-Tekplat/api
npm install
npm run build
```

Jalankan dengan PM2:

```bash
sudo npm install -g pm2
pm2 start dist/server.js --name hiddengem-api
pm2 save
pm2 startup
```

Backend port:

```text
3001
```

### 16.3 Nginx Reverse Proxy

Tambahkan konfigurasi aaPanel/Nginx untuk route `/api`:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /uploads/ {
    alias /www/wwwroot/hiddengem.stei.my.id/uploads/;
}
```

Reload:

```bash
sudo /etc/init.d/nginx reload
```

### 16.4 Frontend Deployment

Di VM:

```bash
cd ~/Tugas-1-Tekplat
git pull
npm install
npm run build
sudo rm -rf /www/wwwroot/hiddengem.stei.my.id/*
sudo cp -r dist/* /www/wwwroot/hiddengem.stei.my.id/
sudo /etc/init.d/nginx reload
```

Penting: jangan hapus folder uploads saat deploy ulang. Command final harus disesuaikan:

```bash
sudo find /www/wwwroot/hiddengem.stei.my.id -mindepth 1 -maxdepth 1 ! -name uploads -exec rm -rf {} +
sudo cp -r dist/* /www/wwwroot/hiddengem.stei.my.id/
```

## 17. Screenshot yang Harus Dikumpulkan

### Auth dan Role

- Screenshot halaman register.
- Screenshot halaman login.
- Screenshot superadmin dashboard.
- Screenshot provider pending approval.
- Screenshot provider approved.

### Backend dan Database

- Screenshot aaPanel database list.
- Screenshot tabel database atau query `SHOW TABLES;`.
- Screenshot backend berjalan di PM2.
- Screenshot upload gambar berhasil.

### Interaksi Produsen-Konsumen

- Screenshot provider membuat paket.
- Screenshot paket tampil untuk turis.
- Screenshot turis mengajukan request.
- Screenshot provider melihat request masuk.
- Screenshot provider mengubah status request.

### Platform Publik

- Screenshot URL `https://hiddengem.stei.my.id/`.
- Screenshot halaman dengan tombol login/register.
- Screenshot dashboard setelah login.

## 18. Urutan Implementasi yang Disarankan

### Phase 1 - Backend Foundation

1. Buat folder `api`.
2. Setup Express + TypeScript.
3. Setup koneksi MariaDB.
4. Buat `schema.sql`.
5. Buat endpoint health check:

```text
GET /api/health
```

### Phase 2 - Auth dan Role

1. Buat register.
2. Buat login.
3. Buat JWT middleware.
4. Buat role middleware.
5. Seed superadmin.

### Phase 3 - Admin Approval

1. Buat endpoint list users.
2. Buat approve/reject provider.
3. Buat UI superadmin sederhana.

### Phase 4 - Package dan Upload

1. Buat CRUD package minimal.
2. Buat upload gambar dengan Multer.
3. Simpan file ke `/uploads`.
4. Simpan metadata ke database.

### Phase 5 - Tourist Request

1. Buat request trip.
2. Buat list request tourist.
3. Buat list request provider.
4. Buat update status request.

### Phase 6 - Deployment

1. Deploy backend via PM2.
2. Tambahkan Nginx reverse proxy `/api`.
3. Deploy frontend build.
4. Test public URL.

### Phase 7 - Dokumentasi

1. Buat sequence diagram 1.
2. Buat sequence diagram 2.
3. Buat system flowchart.
4. Buat tabel fungsi.
5. Tambahkan screenshot.
6. Export PDF.

## 19. Risiko dan Keputusan

| Risiko | Dampak | Keputusan |
| --- | --- | --- |
| Payment gateway terlalu sulit | Overbuild dan tidak selesai | Tidak dibuat; pakai request/minat perjalanan |
| Database eksternal tidak sesuai PDF | Kehilangan poin | Pakai MariaDB mandiri di VPS/aaPanel |
| Upload gambar menyulitkan | Backend lebih rumit | Pakai Multer + file storage + metadata DB |
| Provider approval terlalu rumit | Auth tidak selesai | Approval hanya untuk provider |
| Docker bonus memakan waktu | Deadline utama terganggu | Docker hanya dikerjakan setelah fitur wajib selesai |

## 20. Referensi Teknis untuk Daftar Pustaka

- Express routing: https://expressjs.com/en/guide/routing.html
- Express middleware: https://expressjs.com/en/5x/guide/using-middleware.html
- MariaDB BLOB data type: https://mariadb.com/docs/server/reference/data-types/string-data-types/blob
- Multer package documentation: https://www.npmjs.com/package/multer
- PM2 runtime overview: https://doc.pm2.io/en/runtime/overview/
- PM2 startup hook: https://pm2.io/docs/runtime/guide/startup-hook/
- Docker Compose documentation: https://docs.docker.com/compose/

## 21. Batas Implementasi Oleh Codex

Codex bisa langsung mengerjakan:

- perubahan kode frontend,
- backend Express,
- schema SQL,
- dokumentasi laporan,
- diagram Mermaid untuk sequence/flowchart,
- commit dan push ke GitHub.

Codex tidak bisa sepenuhnya melakukan sendiri:

- klik dashboard aaPanel di VM,
- memasukkan password database/Cloudflare,
- menjalankan command di terminal VM jika tidak ada remote shell/SSH dari host,
- mengambil screenshot dari dalam VM.

Jika tidak ada akses terminal VM dari Codex, pengguna perlu menjalankan command deployment yang disediakan pada dokumen ini, lalu mengirim output/screenshot untuk dicek.

