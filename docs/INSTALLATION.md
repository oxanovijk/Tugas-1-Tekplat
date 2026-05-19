# Dokumentasi Instalasi HiddenGem Explorer

Dokumen ini adalah draft dokumentasi Tugas 1. Isi placeholder nama, NIM, screenshot, URL publik, dan konfigurasi aktual setelah deployment dilakukan.

## 1. Topik dan Alasan Pemilihan

| Item | Isi |
| --- | --- |
| Tema | Tourism & Culture Exchange |
| Nama platform | HiddenGem Explorer |
| Tujuan | Menampilkan kurasi awal destinasi wisata lokal bernilai alam, budaya, dan sejarah dengan sumber data yang transparan. |
| Alasan | Tema ini sesuai dengan fokus promosi potensi wisata tersembunyi dan pertukaran budaya. Scope frontend sederhana cukup untuk menunjukkan deployment platform tanpa membangun produk final. |

## 2. Pengaturan Virtualisasi, VPS, dan Linux

Checklist awal:

- [ ] Install VMWare.
- [ ] Download image Ubuntu 24.04 LTS untuk VMWare.
- [ ] Buka image melalui `File > Open`.
- [ ] Set `Network Adapter` ke `Bridged (Automatic)`.
- [ ] Jalankan VM Ubuntu.
- [ ] Update sistem:

```bash
sudo apt update && sudo apt upgrade -y
```

Opsional untuk copy-paste host ke VM:

```bash
sudo apt install open-vm-tools open-vm-tools-desktop -y
sudo reboot
```

Screenshot yang perlu dimasukkan:

- Tampilan VM Ubuntu berhasil menyala.
- Network adapter `Bridged`.
- Terminal setelah update sistem.

## 3. Instalasi dan Konfigurasi aaPanel

Instal aaPanel di Ubuntu:

```bash
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
```

Masuk konfigurasi aaPanel:

```bash
sudo bt
```

Konfigurasi keamanan dasar:

| Menu `bt` | Fungsi |
| --- | --- |
| `6` | Ganti username |
| `5` | Ganti password |
| `28` | Ganti security entrance |
| `8` | Ganti port aaPanel |
| `27` | Matikan SSL panel jika memakai Cloudflare Tunnel sesuai panduan tugas |
| `14` | Lihat detail akses aaPanel |

Contoh firewall bila port aaPanel adalah `1122`:

```bash
sudo ufw allow 1122
```

Screenshot yang perlu dimasukkan:

- Hasil instalasi aaPanel.
- Menu konfigurasi `bt`.
- Halaman login aaPanel lokal tanpa menampilkan password.

## 4. Cloudflare Tunnel dan Akses Publik

Langkah ringkas:

1. Login Cloudflare.
2. Masuk ke `Zero Trust`.
3. Buka `Networks > Tunnels`.
4. Buat tunnel baru dengan format nama `Nama Lengkap - NIM`.
5. Pilih OS Linux yang sesuai.
6. Salin perintah instalasi tunnel ke terminal Ubuntu.
7. Pastikan tunnel berstatus `HEALTHY`.
8. Buat public hostname untuk aaPanel atau aplikasi.

Contoh service untuk aaPanel:

```text
Service type: HTTP
URL: localhost:1122
```

Screenshot yang perlu dimasukkan:

- Tunnel `HEALTHY`.
- Public hostname.
- aaPanel atau aplikasi terbuka lewat URL publik.

## 5. Vibe-Coding, Deployment, Frontend, Backend, dan Database

Frontend dibuat dengan Vite + React + TypeScript.

Install dependency:

```bash
npm install
```

Jalankan lokal:

```bash
npm run dev
```

Build untuk deployment:

```bash
npm run build
```

Folder hasil build:

```text
dist/
```

Deploy ke aaPanel:

1. Buat site baru di aaPanel.
2. Pindahkan isi `dist/` ke folder site, misalnya `/www/wwwroot/hiddengem-explorer/`.
3. Atur tunnel/public hostname ke site aplikasi.
4. Buka URL publik dan uji tampilan.

Status backend/database/API:

- Frontend: sudah disiapkan.
- Backend: belum pada setup awal; kandidat bonus.
- Database: belum pada setup awal; kandidat bonus self-managed di VPS.
- API eksternal: disiapkan melalui OpenTripMap/OpenStreetMap/Wikimedia pada iterasi berikutnya.

## 6. Tech Stack dan Alasan

| Komponen | Teknologi | Alasan |
| --- | --- | --- |
| Frontend | Vite + React + TypeScript | Build ringan, cocok untuk deployment statis, dan mudah didokumentasikan. |
| UI icons | lucide-react | Ikon ringan untuk memperjelas filter, lokasi, dan sumber data. |
| Panel | aaPanel | Sesuai panduan tugas dan mempermudah manajemen website di VM/VPS. |
| Tunnel | Cloudflare Tunnel | Membuat aplikasi lokal/VM dapat diakses publik tanpa membuka port publik langsung. |
| Data awal | TypeScript seed data | Stabil untuk demonstrasi Tugas 1 dan mudah diganti dengan API/database. |

## 7. Penjelasan Komponen

- `src/App.tsx`: komponen utama antarmuka HiddenGem Explorer.
- `src/data/destinations.ts`: seed data destinasi untuk demonstrasi.
- `src/App.css`: styling mobile-first dan layout responsif.
- `docs/DATA_SOURCES.md`: strategi sumber data.
- `docs/SUBMISSION_CHECKLIST.md`: checklist pengumpulan.

## 8. Link Publik dan Screenshot

Isi setelah deployment:

```text
URL platform publik: [ISI URL]
Tanggal uji akses: [ISI TANGGAL]
```

Screenshot final yang perlu dimasukkan:

- URL publik di browser.
- Tampilan halaman utama HiddenGem Explorer.
- Tampilan daftar destinasi.
- Cloudflare Tunnel status `HEALTHY`.
- aaPanel site configuration.
