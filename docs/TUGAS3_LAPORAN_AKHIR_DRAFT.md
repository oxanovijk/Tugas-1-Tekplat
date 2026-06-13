# HiddenGem Explorer

Laporan Tugas Besar Pengganti UAS  
II2210 Teknologi Platform

Penulis:  
Haidarozan Pramasony - 18224103  
Fikrifalah Muslich - 18224069  

Kelompok: [PERLU DIISI - nomor/nama kelompok apabila diminta pada form]  
Repository: https://github.com/oxanovijk/Tugas-1-Tekplat  
Link platform publik: https://hiddengem.stei.my.id [PERLU DIVERIFIKASI SETELAH WEB DINYALAKAN]  
Link video penjelasan: [PERLU DIISI - link video 10 sampai 15 menit yang dapat diakses publik/tidak terkunci]

SEKOLAH TEKNIK ELEKTRO DAN INFORMATIKA  
INSTITUT TEKNOLOGI BANDUNG  
2026

---

## Compliance Audit

Dokumen ini disusun berdasarkan spesifikasi Tugas 3 II2210. Berdasarkan Bab I 1.1 halaman 5, Tugas 3 merupakan capaian akhir untuk mendokumentasikan platform yang telah dikembangkan pada capaian sebelumnya, mulai dari latar belakang masalah, arsitektur sistem, alur interaksi pengguna, tata kelola akses, fitur unik, hingga hasil implementasi dan demonstrasi platform.

Berdasarkan Bab II 2.1 halaman 8, dokumentasi akhir wajib mengikuti template yang disediakan dan ditulis dalam bahasa Indonesia. Struktur laporan ini mengikuti template laporan akhir yang memuat BAB I Pendahuluan, BAB II Arsitektur Platform, BAB III Interaksi Platform, BAB IV Tata Kelola Platform, BAB V Keunikan dan Insentif Platform, BAB VI Daftar Pustaka, BAB VII Implementasi dan Demonstrasi, serta BAB VIII Penjelasan Tambahan.

Berdasarkan Bab II 2.2 halaman 8, kelompok wajib membuat video penjelasan berdurasi minimal 10 menit dan maksimal 15 menit yang mencakup Problem Statement, Architecture Flow, Governance, dan Live Demo. Link video belum tersedia pada saat draft ini dibuat sehingga diberi tag [PERLU DIISI].

Berdasarkan Bab III 3.1 halaman 9, berkas yang dikumpulkan setidaknya mencakup berkas dokumentasi, link rekaman video, link platform yang sudah publik, dan tangkapan layar platform yang sudah terpublikasi. Karena platform publik belum dinyalakan pada saat penyusunan draft, semua klaim akses publik diberi tanda [PERLU DIVERIFIKASI SETELAH WEB DINYALAKAN].

---

# BAB I PENDAHULUAN

## 1.1. Latar Belakang

HiddenGem Explorer dikembangkan sebagai platform digital bertema Tourism & Culture Exchange. Berdasarkan Bab I 1.2 halaman 5-6 pada spesifikasi Tugas 3, tema Tourism & Culture Exchange berfokus pada promosi potensi wisata tersembunyi dan pertukaran budaya di pelosok Indonesia melalui penghubungan narasi sejarah, budaya lokal, dan akses transportasi dengan integrasi API.

Permasalahan yang diangkat adalah masih terbatasnya kanal digital sederhana yang menghubungkan calon wisatawan dengan penyedia jasa travel lokal pada destinasi yang belum sepopuler destinasi arus utama. Banyak destinasi lokal memiliki nilai budaya, sejarah, atau alam yang kuat, tetapi informasi perjalanan, konteks budaya, dan akses layanan lokal belum selalu tersaji dalam satu platform yang mudah dipahami.

Pada capaian sebelumnya, HiddenGem Explorer telah dikembangkan dari katalog destinasi menjadi platform interaksi antara penyedia jasa travel dan turis. Berdasarkan Bab I 1.3 halaman 6-7 pada spesifikasi Tugas 3, platform akhir perlu menjelaskan frontend, backend/server, database mandiri, integrasi API eksternal/publik, akses online/public, alur antar-role, tata kelola akses, autentikasi, validasi, dan fitur unik. Laporan ini mendokumentasikan aspek tersebut dalam bentuk narasi teknis, bukti implementasi, dan rencana demonstrasi.

## 1.2. Problem Statement

Problem statement platform ini adalah: bagaimana menyediakan platform sederhana yang membantu turis menemukan destinasi wisata tersembunyi sekaligus menghubungkan mereka dengan penyedia jasa travel lokal secara terkontrol, tervalidasi, dan dapat didemonstrasikan melalui sistem berbasis web.

Kebutuhan ini relevan dengan Tugas 3 karena berdasarkan Bab I 1.1 halaman 5, mahasiswa diharapkan tidak hanya membangun platform yang berjalan, tetapi juga mampu menjelaskan nilai, cara kerja, dan manfaat platform secara runtut sebagai pengganti evaluasi akhir mata kuliah.

## 1.3. Tujuan dan Manfaat

Tujuan HiddenGem Explorer adalah menyediakan platform katalog destinasi dan request perjalanan yang mempertemukan dua pihak utama: penyedia jasa travel sebagai produsen layanan, dan turis sebagai konsumen layanan. Superadmin berperan sebagai pengelola akses untuk menyetujui penyedia jasa travel sebelum dapat menawarkan paket.

Manfaat bagi turis adalah memperoleh informasi destinasi, melihat paket travel, dan mengirim request perjalanan tanpa harus melalui sistem pembayaran yang kompleks. Manfaat bagi penyedia jasa travel adalah memperoleh kanal digital untuk mempromosikan paket perjalanan. Manfaat bagi superadmin adalah menjaga kualitas platform melalui proses approval penyedia jasa travel.

Nilai tambah platform ini adalah integrasi katalog destinasi, paket travel, request perjalanan, approval provider, upload foto paket sebagai data non-teks, dan integrasi API eksternal untuk memperkaya informasi destinasi. Penjelasan nilai tambah ini sejalan dengan Bab I 1.3 halaman 6-7 dan Bab II 2.2 halaman 8 pada spesifikasi Tugas 3 yang meminta penjelasan arsitektur, alur interaksi, governance, dan fitur unik.

---

# BAB II ARSITEKTUR PLATFORM

## 2.1. Struktur Organisasi Sistem

Berdasarkan Bab I 1.3 halaman 6 pada spesifikasi Tugas 3, platform yang didokumentasikan setidaknya perlu mencakup frontend, backend/server, database mandiri pada server/VPS, integrasi minimal satu API eksternal/publik, dan akses online/public melalui internet.

HiddenGem Explorer menggunakan arsitektur tiga lapisan, yaitu lapisan antarmuka, lapisan layanan, dan lapisan data. Lapisan antarmuka dibangun dengan React, TypeScript, dan Vite. Lapisan layanan dibangun dengan Node.js dan Express. Lapisan data menggunakan MariaDB/MySQL yang dikelola mandiri di server/VPS. Integrasi API eksternal dilakukan melalui endpoint backend yang mengambil ringkasan destinasi dari Wikipedia REST API.

[PLACEHOLDER GAMBAR 1 - Diagram Arsitektur Umum HiddenGem Explorer]  
Cara mengambil screenshot: Buat diagram arsitektur yang memperlihatkan Browser, React Frontend, Nginx/Reverse Proxy, Express Backend API, MariaDB/MySQL, folder uploads, dan Wikipedia REST API. Diagram dapat dibuat ulang di Google Docs atau Mermaid Live Editor.  
Caption: Gambar 2.1. Diagram arsitektur umum HiddenGem Explorer.

## 2.1.1. Lapisan Data

Lapisan data menyimpan akun pengguna, destinasi, paket travel, media paket, dan request perjalanan. Berdasarkan Bab I 1.3 halaman 6 pada spesifikasi Tugas 3, database harus dikelola sendiri pada server/VPS yang digunakan. Pada implementasi HiddenGem Explorer, struktur database didefinisikan pada `api/schema.sql` dengan tabel utama `users`, `destinations`, `travel_packages`, `package_media`, dan `trip_requests`.

Data non-teks diwujudkan melalui foto paket. Pada endpoint pembuatan paket, file gambar disimpan pada folder upload server, metadata file disimpan di tabel `package_media`, dan data gambar dapat disimpan sebagai `image_blob`. Hal ini mendukung penjelasan aspek database dan data non-teks yang sebelumnya diwajibkan pada capaian Tugas 2, serta tetap relevan untuk Tugas 3 karena Bab I 1.3 halaman 6-7 meminta hasil implementasi dan pengelolaan data dijelaskan.

[PLACEHOLDER GAMBAR 2 - Daftar Tabel Database]  
Cara mengambil screenshot: Buka phpMyAdmin/aaPanel database atau terminal MySQL. Tampilkan database `hiddengem_db` dan tabel `users`, `destinations`, `travel_packages`, `package_media`, dan `trip_requests`.  
Caption: Gambar 2.2. Tabel utama database HiddenGem Explorer.

[PLACEHOLDER GAMBAR 3 - ERD atau Skema Relasi Database]  
Cara mengambil screenshot: Buat ERD yang menunjukkan relasi `users` ke `travel_packages`, `destinations` ke `travel_packages`, `travel_packages` ke `package_media`, dan `travel_packages` ke `trip_requests`.  
Caption: Gambar 2.3. Skema relasi database HiddenGem Explorer.

## 2.1.2. Lapisan Layanan

Lapisan layanan menggunakan Express API untuk mengelola autentikasi, role pengguna, approval provider, daftar destinasi, paket travel, request perjalanan, dan integrasi API eksternal. Backend menyediakan endpoint utama seperti `/api/auth/register`, `/api/auth/login`, `/api/admin/users`, `/api/packages`, `/api/requests`, `/api/destinations`, dan `/api/external/wiki-summary`.

Pemilihan Express didasarkan pada kebutuhan routing API yang sederhana dan jelas. Struktur endpoint ini mendukung Bab I 1.1 halaman 5 pada spesifikasi Tugas 3 yang meminta dokumentasi alasan teknis di balik pemisahan fungsi layanan, pengelolaan data, dan validasi sistem.

Tabel 2.1. Komponen teknologi platform

| Komponen | Teknologi | Fungsi |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | Antarmuka katalog, dashboard, dan form interaksi |
| Backend | Node.js, Express | Logika aplikasi, routing API, autentikasi, validasi |
| Database | MariaDB/MySQL | Penyimpanan data mandiri pada server/VPS |
| File upload | Multer | Upload foto paket travel |
| Reverse proxy | Nginx | Meneruskan request `/api` ke backend |
| Process manager | PM2 | Menjaga backend tetap berjalan di server |
| API eksternal | Wikipedia REST API | Mengambil ringkasan informasi destinasi |
| Deployment | aaPanel, Cloudflare Tunnel | Publikasi platform melalui domain |
| Docker bonus | Docker Compose | Opsi menjalankan frontend, backend, dan database dalam container |

## 2.1.3. Lapisan Antarmuka

Lapisan antarmuka menyediakan halaman utama, katalog destinasi, halaman paket travel, form login/register, dashboard superadmin, dashboard provider, dan dashboard tourist. Berdasarkan Bab I 1.3 halaman 6 pada spesifikasi Tugas 3, frontend aplikasi harus dapat diakses pengguna.

Antarmuka dibuat agar alur demonstrasi dapat dilakukan melalui browser: superadmin memvalidasi provider, provider membuat paket dengan foto, tourist mengirim request, dan provider mengubah status request.

[PLACEHOLDER GAMBAR 4 - Tampilan Homepage Public HiddenGem Explorer]  
Cara mengambil screenshot: Nyalakan web, buka `https://hiddengem.stei.my.id`, pastikan URL publik terlihat pada address bar dan halaman awal HiddenGem Explorer terlihat.  
Caption: Gambar 2.4. Tampilan awal HiddenGem Explorer pada URL publik.

## 2.2. Lapisan Infrastruktur

Deployment platform ditargetkan menggunakan VM/server berbasis Linux, aaPanel, Nginx, PM2, database MariaDB/MySQL mandiri, dan Cloudflare Tunnel. Berdasarkan Bab I 1.3 halaman 6 pada spesifikasi Tugas 3, platform harus dapat diakses secara online/public melalui internet. Berdasarkan Bab III 3.1 halaman 9, link platform yang sudah publik dan tangkapan layar platform terpublikasi wajib dikumpulkan.

Status saat draft ini dibuat: [PERLU DIVERIFIKASI SETELAH WEB DINYALAKAN]. Link publik yang digunakan adalah `https://hiddengem.stei.my.id`.

[PLACEHOLDER GAMBAR 5 - Cloudflare Tunnel atau Route Public URL]  
Cara mengambil screenshot: Buka Cloudflare Zero Trust atau dashboard tunnel. Tampilkan route/domain `hiddengem.stei.my.id` dan status tunnel yang healthy. Jangan tampilkan token rahasia.  
Caption: Gambar 2.5. Konfigurasi Cloudflare Tunnel untuk akses publik platform.

[PLACEHOLDER GAMBAR 6 - Nginx Reverse Proxy API]  
Cara mengambil screenshot: Buka konfigurasi site di aaPanel atau terminal. Tampilkan blok `location /api/` yang meneruskan request ke backend Express di port 3001.  
Caption: Gambar 2.6. Konfigurasi reverse proxy Nginx untuk backend API.

## 2.3. Lapisan Fungsional/Layanan

Berdasarkan Bab II 2.2 halaman 8 pada spesifikasi Tugas 3, video penjelasan harus menjelaskan bagaimana data mengalir dari lapisan infrastruktur ke lapisan layanan. Pada HiddenGem Explorer, pengguna mengakses frontend melalui browser. Frontend memanggil endpoint `/api`. Nginx meneruskan request API ke backend Express. Backend memvalidasi request, membaca atau menulis data ke MariaDB/MySQL, dan mengembalikan respons JSON ke frontend.

Tabel 2.2. Fungsi utama platform

| Nama Fungsi | Role | Input | Validasi | Output |
| --- | --- | --- | --- | --- |
| Registrasi akun | Tourist, Provider | Nama, email, password, role | Email unik, format email valid, password minimal 8 karakter, role valid | Akun baru tersimpan |
| Login | Semua role | Email, password | Email-password cocok, akun tidak rejected | Token dan data user |
| Approval provider | Superadmin | ID provider, status approval | User harus superadmin, target harus provider | Status provider diperbarui |
| Lihat destinasi | Public | Query opsional | Data tersedia | Daftar destinasi |
| Buat paket travel | Provider approved | Destinasi, judul, deskripsi, durasi, harga, kapasitas, gambar | Provider approved, destinasi valid, gambar valid | Paket dan media tersimpan |
| Lihat paket travel | Public | Query opsional | Paket aktif | Daftar paket |
| Buat trip request | Tourist | Paket, tanggal, jumlah peserta, catatan | Role tourist, paket aktif, peserta tidak melebihi kapasitas | Request pending |
| Update status request | Provider | ID request, status baru | Request harus milik paket provider | Status request diperbarui |
| Ringkasan Wikipedia | Public | Judul destinasi | Query title tersedia | Ringkasan destinasi dari API eksternal |

[PLACEHOLDER GAMBAR 7 - System Flowchart Fungsi Utama]  
Cara mengambil screenshot: Buat flowchart yang memuat alur registrasi, login, approval provider, pembuatan paket, request tourist, update status request, dan pemanggilan API eksternal.  
Caption: Gambar 2.7. System flowchart fungsi utama HiddenGem Explorer.

---

# BAB III INTERAKSI PLATFORM

## 3.1. Mekanisme Pertukaran Nilai

Berdasarkan Bab I 1.3 halaman 6-7 pada spesifikasi Tugas 3, dokumentasi akhir harus menjelaskan alur interaksi antar-role pengguna. HiddenGem Explorer memiliki tiga role: superadmin, provider, dan tourist.

Superadmin membawa nilai tata kelola akses dengan menyetujui atau menolak akun penyedia travel. Provider membawa nilai berupa paket perjalanan lokal. Tourist membawa nilai berupa permintaan perjalanan atau minat terhadap paket yang tersedia. Pertukaran nilai terjadi ketika provider menawarkan paket travel dan tourist mengirim request perjalanan.

Tabel 3.1. Role pengguna HiddenGem Explorer

| Role | Padanan Spesifikasi | Nilai yang Dibawa | Fungsi Utama |
| --- | --- | --- | --- |
| Superadmin | Superadmin | Tata kelola akses | Menyetujui/menolak provider |
| Provider | Produsen/Penyedia Jasa Travel | Layanan perjalanan | Membuat paket dan mengelola request |
| Tourist | Konsumen/Turis | Permintaan perjalanan | Melihat paket dan mengirim request |

## 3.2. Alur Interaksi Superadmin-Provider

Alur pertama adalah registrasi dan approval provider. Provider melakukan registrasi, sistem menyimpan akun dengan status pending, superadmin memeriksa akun, lalu superadmin menyetujui atau menolak provider. Provider hanya dapat membuat paket setelah statusnya approved.

Alur ini mendukung Bab II 2.2 halaman 8 pada spesifikasi Tugas 3, khususnya bagian Governance yang meminta penjelasan keamanan dan aturan main platform. Alur ini juga mendukung Bab I 1.3 halaman 6-7 yang meminta tata kelola akses, autentikasi, dan validasi sistem dijelaskan.

[PLACEHOLDER GAMBAR 8 - Sequence Diagram Registrasi dan Approval Provider]  
Cara mengambil screenshot: Buat sequence diagram dengan aktor Provider, Frontend, Backend API, Database, dan Superadmin. Tampilkan register provider, status pending, approval superadmin, dan akses provider setelah approved.  
Caption: Gambar 3.1. Sequence diagram registrasi dan approval provider.

## 3.3. Alur Interaksi Provider-Tourist

Alur kedua adalah request perjalanan. Provider yang sudah approved membuat paket travel dengan foto. Tourist membuka daftar paket, memilih paket, mengisi tanggal, jumlah peserta, dan catatan, lalu mengirim request. Provider kemudian melihat request masuk dan mengubah status menjadi accepted, rejected, atau completed.

Alur ini menjadi bagian utama Live Demo karena berdasarkan Bab II 2.2 halaman 8 pada spesifikasi Tugas 3, video harus menunjukkan interaksi antar pengguna yang berbeda peran di dalam platform.

[PLACEHOLDER GAMBAR 9 - Sequence Diagram Tourist Mengirim Request Perjalanan]  
Cara mengambil screenshot: Buat sequence diagram dengan aktor Provider, Tourist, Frontend, Backend API, dan Database. Tampilkan provider membuat paket, tourist mengirim request, dan provider memperbarui status request.  
Caption: Gambar 3.2. Sequence diagram request perjalanan antara tourist dan provider.

---

# BAB IV TATA KELOLA PLATFORM

## 4.1. Pengaturan Akses

Berdasarkan Bab I 1.3 halaman 6-7 pada spesifikasi Tugas 3, dokumentasi akhir harus menjelaskan tata kelola akses, autentikasi, dan validasi sistem. HiddenGem Explorer menggunakan registrasi dan login berbasis email-password. Password disimpan dalam bentuk hash menggunakan bcrypt. Sesi pengguna dikelola menggunakan JSON Web Token.

Provider baru berstatus pending setelah registrasi. Tourist dapat menggunakan akun setelah registrasi. Superadmin dapat mengubah status approval provider. Endpoint tertentu hanya dapat diakses oleh role yang sesuai, misalnya endpoint admin hanya untuk superadmin, endpoint pembuatan paket hanya untuk provider approved, dan endpoint pembuatan request hanya untuk tourist.

[PLACEHOLDER GAMBAR 10 - Halaman Login dan Register]  
Cara mengambil screenshot: Buka platform, klik Masuk atau Daftar. Tampilkan form email, password, dan pilihan role pada form registrasi.  
Caption: Gambar 4.1. Halaman autentikasi HiddenGem Explorer.

[PLACEHOLDER GAMBAR 11 - Dashboard Superadmin Approval Provider]  
Cara mengambil screenshot: Login sebagai superadmin. Tampilkan daftar user provider dan tombol Setujui/Tolak. Jika belum ada provider pending, register provider baru terlebih dahulu.  
Caption: Gambar 4.2. Dashboard superadmin untuk approval provider.

## 4.2. Keamanan dan Aturan

Governance platform mencakup pembatasan role, validasi input, dan validasi status. Berdasarkan Bab II 2.2 halaman 8 pada spesifikasi Tugas 3, video wajib menjelaskan Governance, yaitu sistem keamanan dan aturan main di dalam platform.

Aturan utama yang diterapkan adalah sebagai berikut. Provider harus approved sebelum membuat paket. Paket wajib memiliki gambar. Tourist hanya dapat membuat request jika login sebagai tourist. Jumlah peserta tidak boleh melebihi kapasitas paket. Provider hanya dapat mengubah status request untuk paket miliknya. Email pengguna harus unik dan password minimal 8 karakter.

Catatan keamanan: bagian ini menjelaskan mekanisme yang ada pada implementasi. Audit keamanan produksi secara menyeluruh, seperti penetration testing, rate limiting, dan hardening server lanjutan, tidak tertulis sebagai requirement spesifik pada PDF Tugas 3.

---

# BAB V KEUNIKAN DAN INSENTIF PLATFORM

Berdasarkan Bab I 1.3 halaman 6-7 pada spesifikasi Tugas 3, dokumentasi akhir harus menjelaskan fitur unik atau nilai tambah platform. HiddenGem Explorer memiliki keunikan pada penggabungan katalog destinasi wisata tersembunyi dengan mekanisme request perjalanan antara tourist dan provider lokal.

Berbeda dari katalog wisata statis, platform ini menyediakan role produsen dan konsumen yang jelas. Provider dapat membuat paket berbasis destinasi dan mengunggah foto sebagai data non-teks. Tourist dapat mengirim request perjalanan. Superadmin menjaga kualitas penyedia melalui proses approval. Integrasi Wikipedia REST API juga membantu memperkaya konteks destinasi.

Nilai tambah bagi keberlanjutan platform adalah distribusi perhatian ke destinasi lokal yang tidak selalu menjadi pusat wisata utama. Dengan melibatkan penyedia travel lokal, platform berpotensi mendekatkan manfaat ekonomi kepada komunitas sekitar destinasi. Klaim ini masih bersifat nilai desain platform dan perlu didukung oleh data penggunaan apabila platform dikembangkan lebih lanjut.

[PLACEHOLDER GAMBAR 12 - Halaman Paket Travel dengan Foto]  
Cara mengambil screenshot: Buka menu Paket setelah ada minimal satu paket aktif. Pastikan foto, nama paket, destinasi, penyedia, durasi, kapasitas, harga, dan tombol request terlihat.  
Caption: Gambar 5.1. Halaman paket travel HiddenGem Explorer.

---

# BAB VI DAFTAR PUSTAKA

[1] A. A. Arman dan D. W. Anggara, "VPS Server Setup", ITB, Bandung, Slide Materi Perkuliahan, 2026.  
[2] A. A. Arman, "Cloud Computing Technologies", ITB, Bandung, Slide Materi Perkuliahan, 2026.  
[3] React, "React Documentation", https://react.dev/.  
[4] Vite, "Vite Guide", https://vite.dev/guide/.  
[5] Express.js, "Routing", https://expressjs.com/en/guide/routing.html.  
[6] MariaDB, "MariaDB Server Documentation", https://mariadb.org/documentation/.  
[7] mysql2, "MySQL2 Documentation", https://sidorares.github.io/node-mysql2/docs.  
[8] Multer, "Node.js middleware for handling multipart/form-data", https://github.com/expressjs/multer.  
[9] NGINX, "NGINX Reverse Proxy", https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/.  
[10] PM2, "PM2 Quick Start", https://pm2.keymetrics.io/docs/usage/quick-start/.  
[11] Docker, "Docker Compose Networking", https://docs.docker.com/compose/how-tos/networking/.  
[12] Wikipedia API, "REST API", https://www.mediawiki.org/wiki/API.  
[13] Cloudflare, "Cloudflare Tunnel Documentation", https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/.

---

# BAB VII IMPLEMENTASI DAN DEMONSTRASI

## 7.1. Tampilan Sistem

Berdasarkan Bab III 3.1 halaman 9 pada spesifikasi Tugas 3, pengumpulan harus mencakup link platform yang sudah publik dan tangkapan layar platform sudah terpublikasi. Link platform yang digunakan adalah:

https://hiddengem.stei.my.id

Status: [PERLU DIVERIFIKASI SETELAH WEB DINYALAKAN]

[PLACEHOLDER GAMBAR 13 - Public Frontend HiddenGem Explorer]  
Cara mengambil screenshot: Nyalakan VM/web, buka `https://hiddengem.stei.my.id` dari browser host, pastikan address bar terlihat.  
Caption: Gambar 7.1. Link public frontend HiddenGem Explorer.

[PLACEHOLDER GAMBAR 14 - Public API Health Check]  
Cara mengambil screenshot: Buka `https://hiddengem.stei.my.id/api/health` dari browser atau terminal. Output yang diharapkan adalah JSON status API.  
Caption: Gambar 7.2. Link public backend API HiddenGem Explorer.

[PLACEHOLDER GAMBAR 15 - Dashboard Provider Membuat Paket]  
Cara mengambil screenshot: Login sebagai provider approved. Buka dashboard provider. Isi form paket dan pilih foto. Ambil screenshot sebelum atau sesudah submit.  
Caption: Gambar 7.3. Dashboard provider untuk membuat paket travel.

[PLACEHOLDER GAMBAR 16 - Dashboard Tourist Request Perjalanan]  
Cara mengambil screenshot: Login sebagai tourist. Buka halaman paket, klik Request Paket, isi tanggal dan jumlah peserta, lalu kirim request. Ambil screenshot request pada dashboard tourist.  
Caption: Gambar 7.4. Dashboard tourist untuk melihat request perjalanan.

[PLACEHOLDER GAMBAR 17 - Dashboard Provider Request Masuk]  
Cara mengambil screenshot: Login sebagai provider pemilik paket. Buka dashboard provider dan tampilkan daftar request masuk beserta tombol Terima, Tolak, dan Selesai.  
Caption: Gambar 7.5. Dashboard provider untuk mengelola request masuk.

## 7.2. Skema Database

Skema database ditunjukkan melalui ERD pada Gambar 2.3 dan daftar tabel pada Gambar 2.2. Berdasarkan Bab I 1.3 halaman 6 pada spesifikasi Tugas 3, database yang dikelola sendiri pada server/VPS merupakan salah satu aspek yang harus dijelaskan.

[PLACEHOLDER GAMBAR 18 - Bukti Data Non-Teks pada package_media]  
Cara mengambil screenshot: Setelah membuat paket melalui UI dengan upload foto, buka tabel `package_media`. Tampilkan `file_path`, `mime_type`, `original_name`, dan jika memungkinkan indikator bahwa `image_blob` terisi. Jangan tampilkan data rahasia.  
Caption: Gambar 7.6. Bukti penyimpanan media paket pada database.

## 7.3. Video Penjelasan dan Demo

Berdasarkan Bab II 2.2 halaman 8 pada spesifikasi Tugas 3, video penjelasan wajib berdurasi minimal 10 menit dan maksimal 15 menit. Video harus mencakup Problem Statement, Architecture Flow, Governance, dan Live Demo.

Link video: [PERLU DIISI - tautan video yang dapat diakses hingga akhir Juli dan tidak dikunci]

Rencana susunan video:

1. Menit 0:00-1:30 - Pembukaan, identitas kelompok, tema Tourism & Culture Exchange, dan tujuan platform.
2. Menit 1:30-3:00 - Problem statement: kebutuhan kanal digital untuk menghubungkan turis dan penyedia travel lokal.
3. Menit 3:00-5:00 - Architecture flow: browser, frontend React, Nginx, Express API, MariaDB/MySQL, upload storage, Wikipedia REST API.
4. Menit 5:00-7:00 - Governance: role, login/register, provider pending, approval superadmin, validasi input, JWT, password hash.
5. Menit 7:00-11:30 - Live demo: superadmin approval provider, provider membuat paket dengan foto, tourist mengirim request, provider mengubah status request.
6. Menit 11:30-13:30 - Bukti deployment public, API health, dan database.
7. Menit 13:30-15:00 - Penutup, fitur unik, manfaat, dan keterbatasan.

[PLACEHOLDER GAMBAR 19 - Screenshot Halaman Video atau Link Video]  
Cara mengambil screenshot: Setelah video diunggah, buka halaman video dan pastikan judul, durasi, dan status akses publik/tidak terkunci terlihat.  
Caption: Gambar 7.7. Link video penjelasan dan demo HiddenGem Explorer.

---

# BAB VIII PENJELASAN TAMBAHAN

## 8.1. Status Penyempurnaan Platform

Berdasarkan Bab II 2.4 halaman 8 pada spesifikasi Tugas 3, mahasiswa diberikan kesempatan untuk menyempurnakan platformnya. Penyempurnaan yang sudah tersedia pada implementasi adalah integrasi role, approval provider, pembuatan paket travel, request tourist, upload foto paket, database mandiri, dan API eksternal.

Catatan: daftar penyempurnaan yang wajib dilakukan tidak tertulis secara rinci pada spesifikasi Tugas 3. Oleh karena itu, bagian ini hanya menjelaskan penyempurnaan yang benar-benar ada pada implementasi dan tidak menambahkan klaim fitur di luar kode/laporan sebelumnya.

## 8.2. Keterbatasan

Platform belum mencakup sistem pembayaran, verifikasi identitas penyedia secara formal, rating/review pengguna, notifikasi real-time, atau moderasi konten lanjutan. Fitur-fitur tersebut tidak tertulis sebagai requirement pada spesifikasi Tugas 3, sehingga tidak diklaim sebagai bagian dari implementasi wajib.

## 8.3. Checklist Screenshot

Tabel 8.1. Checklist screenshot laporan akhir

| No | Screenshot | Status | Keterangan |
| --- | --- | --- | --- |
| 1 | Diagram arsitektur umum | [PERLU DIISI] | Gambar 2.1 |
| 2 | Daftar tabel database | [PERLU DIISI] | Gambar 2.2 |
| 3 | ERD database | [PERLU DIISI] | Gambar 2.3 |
| 4 | Homepage public | [PERLU DIISI] | Gambar 2.4 / 7.1 |
| 5 | Cloudflare Tunnel healthy | [PERLU DIISI] | Gambar 2.5 |
| 6 | Nginx reverse proxy | [PERLU DIISI] | Gambar 2.6 |
| 7 | System flowchart | [PERLU DIISI] | Gambar 2.7 |
| 8 | Sequence diagram approval provider | [PERLU DIISI] | Gambar 3.1 |
| 9 | Sequence diagram request perjalanan | [PERLU DIISI] | Gambar 3.2 |
| 10 | Login/register | [PERLU DIISI] | Gambar 4.1 |
| 11 | Dashboard superadmin approval | [PERLU DIISI] | Gambar 4.2 |
| 12 | Halaman paket dengan foto | [PERLU DIISI] | Gambar 5.1 |
| 13 | Public API health check | [PERLU DIISI] | Gambar 7.2 |
| 14 | Provider membuat paket | [PERLU DIISI] | Gambar 7.3 |
| 15 | Tourist request perjalanan | [PERLU DIISI] | Gambar 7.4 |
| 16 | Provider request masuk | [PERLU DIISI] | Gambar 7.5 |
| 17 | Data non-teks di package_media | [PERLU DIISI] | Gambar 7.6 |
| 18 | Link video/durasi video | [PERLU DIISI] | Gambar 7.7 |

## 8.4. Checklist Submit

Tabel 8.2. Checklist submit Tugas 3

| Butir Pengumpulan | Dasar Spesifikasi | Status |
| --- | --- | --- |
| Berkas dokumentasi mengikuti template | Bab II 2.1 halaman 8 | [PERLU DIISI] |
| Bahasa Indonesia | Bab II 2.1 halaman 8 | Draft sudah bahasa Indonesia |
| Link rekaman video | Bab III 3.1 halaman 9 | [PERLU DIISI] |
| Durasi video 10-15 menit | Bab II 2.2 halaman 8 | [PERLU DIVERIFIKASI] |
| Video mencakup Problem Statement | Bab II 2.2 halaman 8 | [PERLU DIVERIFIKASI] |
| Video mencakup Architecture Flow | Bab II 2.2 halaman 8 | [PERLU DIVERIFIKASI] |
| Video mencakup Governance | Bab II 2.2 halaman 8 | [PERLU DIVERIFIKASI] |
| Video mencakup Live Demo antar-role | Bab II 2.2 halaman 8 | [PERLU DIVERIFIKASI] |
| Link platform publik | Bab III 3.1 halaman 9 | https://hiddengem.stei.my.id [PERLU DIVERIFIKASI] |
| Screenshot platform terpublikasi | Bab III 3.1 halaman 9 | [PERLU DIISI] |
| Daftar pustaka | Template BAB VI halaman 16 | Sudah ada draft |

## 8.5. Data yang Masih Perlu Diisi Manual

1. [PERLU DIISI] Nomor/nama kelompok apabila diminta.
2. [PERLU DIISI] Link video penjelasan 10 sampai 15 menit.
3. [PERLU DIISI] Screenshot public frontend setelah web dinyalakan.
4. [PERLU DIISI] Screenshot public API health setelah backend dan domain aktif.
5. [PERLU DIISI] Screenshot Cloudflare Tunnel healthy.
6. [PERLU DIISI] Screenshot database dan ERD final.
7. [PERLU DIISI] Screenshot live demo seluruh role.
8. [PERLU DIISI] Pastikan link video tidak dikunci dan dapat diakses sampai akhir Juli.
9. [PERLU DIVERIFIKASI] Pastikan kredensial database di VM sesuai dengan file `.env` production.
10. [PERLU DIVERIFIKASI] Pastikan `JWT_SECRET` production bukan placeholder.

