# Mapping Reuse Gambar Laporan Tugas 1/2 untuk Laporan Akhir Tugas 3

Folder hasil ekstraksi gambar:

`docs/tugas3_reuse_assets/`

Index lengkap:

`docs/tugas3_reuse_assets/README.md`

Contact sheet:

- `docs/tugas3_reuse_assets/T1_contact_sheet.jpg`
- `docs/tugas3_reuse_assets/T2_contact_sheet.jpg`

Catatan prinsip:

- Berdasarkan Tugas 3 Bab III 3.1 halaman 9, submission harus memuat link platform publik dan tangkapan layar platform sudah terpublikasi. Karena itu, screenshot yang menjadi bukti public deployment sebaiknya diambil ulang setelah web dinyalakan.
- Gambar konseptual seperti diagram arsitektur, sequence diagram, system flowchart, dan diagram Docker aman dipakai ulang apabila tidak ada perubahan arsitektur/alur.
- Screenshot UI lama dapat dipakai ulang hanya jika UI dan data demo masih sama. Jika ada perubahan data, domain mati saat screenshot lama, atau ingin bukti terbaru, ambil ulang.

## Rekomendasi Reuse per Placeholder Tugas 3

| Placeholder T3 | Status Reuse | Sumber gambar lama | Catatan |
| --- | --- | --- | --- |
| Gambar 1 - Diagram Arsitektur Umum | Pakai ulang langsung | `T2_p09_img01.png` | Diagram arsitektur dari laporan Tugas 2. Aman jika arsitektur tetap React, Nginx, Express, MariaDB, upload storage, API eksternal. |
| Gambar 2 - Daftar Tabel Database | Pakai ulang jika DB sama | `T2_p11_img02.png` | Menunjukkan tabel DB di aaPanel/phpMyAdmin. Jika schema berubah, ambil ulang. |
| Gambar 3 - ERD/Skema Relasi Database | Belum ada gambar khusus | Tidak ada | Laporan T2 punya daftar tabel, tetapi belum ada ERD eksplisit. Buat ERD baru atau pakai diagram skema sendiri. |
| Gambar 4 - Homepage Public | Ambil ulang untuk bukti T3 | `T2_p23_img01.png` atau `T2_p06_img01.png` | Bisa jadi fallback, tetapi T3 perlu bukti terbaru public URL. |
| Gambar 5 - Cloudflare Tunnel / Route | Ambil ulang untuk bukti T3 | `T1_p22_img01.png`, `T1_p22_img02.png` | Screenshot lama dari T1 bisa jadi referensi style, tetapi status tunnel harus terbaru. |
| Gambar 6 - Nginx Reverse Proxy | Pakai ulang jika config sama | `T2_p21_img01.png` | Aman jika blok reverse proxy `/api/` tidak berubah. |
| Gambar 7 - System Flowchart | Pakai ulang langsung | `T2_p15_img01.png` | Aman jika alur fungsi tidak berubah. |
| Gambar 8 - Sequence Approval Provider | Pakai ulang langsung | `T2_p13_img01.png` | Aman jika alur superadmin-provider tidak berubah. |
| Gambar 9 - Sequence Tourist Request | Pakai ulang langsung | `T2_p14_img01.png` | Aman jika alur provider-tourist tidak berubah. |
| Gambar 10 - Login/Register | Pakai ulang jika UI sama | `T2_p08_img01.png`, `T2_p08_img02.png` | T2 punya login dan register. Pilih salah satu atau gabungkan dua gambar. |
| Gambar 11 - Dashboard Superadmin Approval | Pakai ulang jika UI/data sama | `T2_p08_img03.png` | Bagus untuk governance. Jika ingin menunjukkan provider pending terbaru, ambil ulang. |
| Gambar 12 - Halaman Paket Travel dengan Foto | Pakai ulang jika UI sama | `T2_p18_img01.png` | Ada screenshot halaman paket dengan foto. Ambil ulang jika paket/data terbaru berbeda. |
| Gambar 13 - Public Frontend | Ambil ulang untuk bukti T3 | `T2_p23_img01.png` | Karena web sedang mati saat audit, ini wajib diverifikasi ulang setelah dinyalakan. |
| Gambar 14 - Public API Health Check | Ambil ulang untuk bukti T3 | `T2_p23_img02.png` atau `T2_p12_img01.png` | Ambil ulang dari public URL setelah backend aktif. |
| Gambar 15 - Dashboard Provider Membuat Paket | Pakai ulang jika UI sama | `T2_p17_img01.png` | Screenshot sangat relevan untuk demo provider. |
| Gambar 16 - Dashboard Tourist Request | Pakai ulang jika UI sama | `T2_p18_img02.png` | Relevan untuk alur tourist request. |
| Gambar 17 - Dashboard Provider Request Masuk | Pakai ulang jika UI sama | `T2_p19_img01.png` | Relevan untuk provider memvalidasi request. |
| Gambar 18 - Bukti Data Non-Teks package_media | Sebaiknya ambil baru | Tidak ada bukti lengkap | T2 punya tabel DB dan halaman paket, tetapi belum bukti `image_blob`/metadata media yang kuat. |
| Gambar 19 - Link Video | Tidak ada | Tidak ada | Harus dibuat setelah video diunggah. |

## Gambar Tambahan yang Layak Dipakai di Lampiran

| Kebutuhan | Sumber gambar lama | Catatan |
| --- | --- | --- |
| Repository GitHub | `T2_p10_img01.png` atau `T1_p16_img01.png` | Bisa dipakai jika ingin menunjukkan struktur repo. |
| Import schema database | `T2_p11_img01.png` | Bisa masuk lampiran implementasi database. |
| PM2 status backend | `T2_p12_img02.png` | Ambil ulang jika ingin bukti runtime terbaru. |
| Tes API eksternal | `T2_p20_img01.png` | Relevan untuk integrasi Wikipedia API; ambil ulang jika public API harus terbaru. |
| Build frontend | `T2_p22_img01.png` | Bisa dipakai sebagai bukti build historis, tetapi hasil terbaru lebih baik. |
| Build backend | `T2_p22_img02.png` | Sama seperti build frontend. |
| Docker Compose PS | `T2_p25_img01.png` | Pakai jika Docker bonus tetap ingin dijelaskan. |
| Diagram Dockerization | `T2_p25_img02.png` | Pakai jika arsitektur Docker tidak berubah. |

