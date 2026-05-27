# Tugas 2 Deployment Guide Final - HiddenGem Explorer

Dokumen ini mengikuti `docs/TUGAS2_IMPLEMENTATION_PLAN.md` dan dibuat final agar tidak rancu antara folder repository dan folder website aaPanel.

## Prinsip Deployment yang Dipakai

Gunakan dua folder berbeda:

| Kebutuhan | Path final | Fungsi |
| --- | --- | --- |
| Repository Git | `/home/ubuntu/Tugas-1-Tekplat` | Tempat `git pull`, `npm install`, dan `npm run build` |
| Web root aaPanel | `/www/wwwroot/hiddengem.stei.my.id` | Tempat file frontend hasil build di-serve oleh Nginx |
| Upload gambar | `/www/wwwroot/hiddengem.stei.my.id/uploads` | Tempat file gambar paket disimpan |

Alasan: folder `/www/wwwroot/hiddengem.stei.my.id` biasanya dibuat oleh aaPanel sebagai web root, bukan repository Git. Karena itu, command `git pull origin main` dijalankan di folder repo `/home/ubuntu/Tugas-1-Tekplat`, bukan di folder web root aaPanel.

Catatan penting untuk MySQL aaPanel:

- Pada VM ini, MySQL aaPanel terdeteksi berjalan dengan socket `/tmp/mysql.sock`.
- Jika command `mysql -u ... -p` gagal dengan error socket `/run/mysqld/mysqld.sock`, gunakan tambahan `--socket=/tmp/mysql.sock`.
- Jika user database tugas sudah berhasil dibuat, tidak perlu reset password root lagi. Lanjut dari pengecekan login user database dan import schema.

```bash
export REPO_DIR=/home/ubuntu/Tugas-1-Tekplat
export WEB_ROOT=/www/wwwroot/hiddengem.stei.my.id
```

---

## 1. Siapkan atau Update Repository di VM

### 1.1 Cek apakah repo sudah ada

```bash
find /home/ubuntu /www/wwwroot -name ".git" -type d 2>/dev/null
```

Jika muncul:

```text
/home/ubuntu/Tugas-1-Tekplat/.git
```

maka repo sudah ada.

### 1.2 Jika repo sudah ada

```bash
cd /home/ubuntu/Tugas-1-Tekplat
git status
git pull origin main
```

### 1.3 Jika repo belum ada

```bash
cd /home/ubuntu
git clone https://github.com/oxanovijk/Tugas-1-Tekplat.git
cd Tugas-1-Tekplat
git status
```

Screenshot yang perlu diambil:

- Output `git status`.
- Output `git pull origin main` atau `git clone`.

---

## 2. Buat Database di aaPanel

Jika database dan user tugas sudah dibuat lewat terminal, bagian ini boleh dianggap selesai. Data final yang dibutuhkan backend adalah:

- Database name: `hiddengem_db`
- Database user: `hiddengem_user`
- Database password: password yang sudah Anda buat untuk user `hiddengem_user`

Jika belum dibuat, buat dari MySQL root:

```bash
mysql --socket=/tmp/mysql.sock -u root -p
```

Lalu jalankan di prompt `mysql>`:

```sql
CREATE DATABASE IF NOT EXISTS hiddengem_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'hiddengem_user'@'localhost' IDENTIFIED BY 'ISI_PASSWORD_DATABASE_TUGAS';
ALTER USER 'hiddengem_user'@'localhost' IDENTIFIED BY 'ISI_PASSWORD_DATABASE_TUGAS';
GRANT ALL PRIVILEGES ON hiddengem_db.* TO 'hiddengem_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Ganti `ISI_PASSWORD_DATABASE_TUGAS` dengan password yang ingin dipakai di file `.env`.

Screenshot yang perlu diambil:

- Terminal atau aaPanel yang menunjukkan database `hiddengem_db` sudah tersedia.
- Jangan screenshot password database.

---

## 3. Test Login User Database

Sebelum import schema, pastikan user database tugas bisa login:

```bash
mysql --socket=/tmp/mysql.sock -u hiddengem_user -p -e "SHOW DATABASES;"
```

Masukkan password user `hiddengem_user` yang sudah dibuat.

Jika berhasil, output akan menampilkan daftar database termasuk `hiddengem_db`.

Screenshot yang perlu diambil:

- Output `SHOW DATABASES;` yang memperlihatkan `hiddengem_db`.

---

## 4. Import Schema dan Seed Database

Jalankan dari folder repository, bukan dari web root. Karena MySQL aaPanel memakai socket `/tmp/mysql.sock`, gunakan command berikut:

```bash
cd /home/ubuntu/Tugas-1-Tekplat
mysql --socket=/tmp/mysql.sock -u hiddengem_user -p hiddengem_db < api/schema.sql
mysql --socket=/tmp/mysql.sock -u hiddengem_user -p hiddengem_db < api/seed.sql
```

Masukkan password user `hiddengem_user` saat diminta.

Catatan:

- Jika import berhasil, biasanya terminal tidak menampilkan output apa pun dan langsung kembali ke prompt.
- Jika muncul error `Table already exists`, itu berarti schema pernah di-import. Anda bisa lanjut jika tabel sudah ada.
- File `api/seed.sql` juga berisi data demo provider, tourist, dan paket travel dummy. Seed ini dibuat idempotent sehingga aman dijalankan ulang untuk mengisi paket tanpa membuat duplikasi.

Screenshot yang perlu diambil:

- Terminal setelah import `schema.sql` berhasil tanpa error.
- Terminal setelah import `seed.sql` berhasil tanpa error.

---

## 5. Cek Tabel Database Setelah Import

```bash
mysql --socket=/tmp/mysql.sock -u hiddengem_user -p hiddengem_db -e "SHOW TABLES;"
```

Output minimal yang diharapkan:

```text
users
destinations
travel_packages
package_media
trip_requests
```

Untuk memastikan paket demo sudah masuk:

```bash
mysql --socket=/tmp/mysql.sock -u hiddengem_user -p hiddengem_db -e "SELECT d.name AS destination, COUNT(p.id) AS total_packages FROM destinations d LEFT JOIN travel_packages p ON p.destination_id = d.id GROUP BY d.id, d.name;"
```

Setiap destinasi seed seharusnya memiliki minimal 2 paket demo.

Screenshot yang perlu diambil:

- Output `SHOW TABLES;` yang memperlihatkan tabel-tabel di atas.
- Output jumlah paket per destinasi.

---

## 6. Siapkan Folder Upload

```bash
sudo mkdir -p /www/wwwroot/hiddengem.stei.my.id/uploads
sudo chown -R ubuntu:ubuntu /www/wwwroot/hiddengem.stei.my.id/uploads
sudo chmod -R 755 /www/wwwroot/hiddengem.stei.my.id/uploads
```

Folder ini dipakai backend untuk menyimpan foto paket.

---

## 7. Konfigurasi Environment Backend

```bash
cd /home/ubuntu/Tugas-1-Tekplat/api
cp .env.example .env
nano .env
```

Isi minimal:

```env
PORT=3001
NODE_ENV=production
APP_ORIGIN=https://hiddengem.stei.my.id

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=hiddengem_user
DB_PASSWORD=password_user_hiddengem_yang_sudah_dibuat
DB_NAME=hiddengem_db

JWT_SECRET=ganti_dengan_string_panjang_random
UPLOAD_DIR=/www/wwwroot/hiddengem.stei.my.id/uploads
PUBLIC_UPLOAD_BASE_URL=/uploads
```

Catatan:

- `DB_PASSWORD` harus sama dengan password database di aaPanel.
- Jika Anda membuat user database lewat terminal, gunakan password user `hiddengem_user`, bukan password root MySQL.
- `JWT_SECRET` bebas, tetapi harus panjang dan sulit ditebak.
- Jangan upload file `.env` ke GitHub.

Screenshot yang perlu diambil:

- Tidak perlu screenshot isi `.env` jika ada password. Jika butuh bukti, screenshot command `ls -la api/.env` saja.

---

## 8. Install dan Build Backend

```bash
cd /home/ubuntu/Tugas-1-Tekplat/api
npm install
npm run build
```

Screenshot yang perlu diambil:

- Output `npm install`.
- Output `npm run build` yang sukses.

---

## 9. Buat Superadmin

Jalankan dari folder `api`:

```bash
cd /home/ubuntu/Tugas-1-Tekplat/api
ADMIN_EMAIL=admin@hiddengem.local ADMIN_PASSWORD='Admin123!' npm run admin:create
```

Jika shell VM bermasalah dengan tanda kutip, pakai:

```bash
cd /home/ubuntu/Tugas-1-Tekplat/api
export ADMIN_EMAIL=admin@hiddengem.local
export ADMIN_PASSWORD=Admin123!
npm run admin:create
```

Output yang diharapkan:

```text
Superadmin ready: admin@hiddengem.local
```

Screenshot yang perlu diambil:

- Output `Superadmin ready: admin@hiddengem.local`.

---

## 10. Jalankan Backend dengan PM2

Jika PM2 belum ada:

```bash
sudo npm install -g pm2
```

Jalankan atau restart API:

```bash
cd /home/ubuntu/Tugas-1-Tekplat/api
pm2 restart hiddengem-api --update-env || pm2 start dist/server.js --name hiddengem-api
pm2 save
pm2 status
```

Tes API lokal:

```bash
curl http://127.0.0.1:3001/api/health
```

Output yang diharapkan:

```json
{"status":"ok","service":"hiddengem-api"}
```

Screenshot yang perlu diambil:

- Output `pm2 status`.
- Output `curl http://127.0.0.1:3001/api/health`.

---

## 11. Build Frontend dari Repository

Jalankan dari folder repo:

```bash
cd /home/ubuntu/Tugas-1-Tekplat
npm install
npm run build
```

Screenshot yang perlu diambil:

- Output `npm run build` yang sukses.

---

## 12. Copy Hasil Build Frontend ke Web Root aaPanel

Pastikan web root ada:

```bash
sudo mkdir -p /www/wwwroot/hiddengem.stei.my.id
```

Copy hasil build:

```bash
cd /home/ubuntu/Tugas-1-Tekplat
sudo rsync -av --delete --exclude uploads dist/ /www/wwwroot/hiddengem.stei.my.id/
```

Jika `rsync` belum ada:

```bash
sudo apt install rsync -y
sudo rsync -av --delete --exclude uploads dist/ /www/wwwroot/hiddengem.stei.my.id/
```

Kenapa memakai `rsync`:

- Isi `dist/` menjadi isi public frontend.
- File frontend lama yang sudah tidak dipakai dibersihkan.
- Folder `uploads` tetap aman dan tidak terhapus.

Screenshot yang perlu diambil:

- Output `rsync` yang menunjukkan file berhasil dikirim ke web root.

---

## 13. Konfigurasi Nginx Reverse Proxy di aaPanel

Di aaPanel, buka site `hiddengem.stei.my.id`, lalu edit konfigurasi Nginx. Tambahkan atau pastikan blok berikut ada di dalam `server { ... }`:

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

location / {
    try_files $uri $uri/ /index.html;
}
```

Tes konfigurasi:

```bash
sudo nginx -t
```

Reload Nginx:

```bash
sudo /etc/init.d/nginx reload
```

Jika reload gagal tetapi Nginx sebenarnya berjalan, gunakan:

```bash
sudo /etc/init.d/nginx restart
```

Atau gunakan tombol restart/reload Nginx dari aaPanel.

Screenshot yang perlu diambil:

- Konfigurasi Nginx yang menunjukkan blok `/api/`.
- Output `sudo nginx -t`.

---

## 14. Uji Public URL

Buka:

```text
https://hiddengem.stei.my.id
https://hiddengem.stei.my.id/api/health
```

Jika frontend terbuka tetapi API gagal:

```bash
pm2 status
curl http://127.0.0.1:3001/api/health
sudo nginx -t
```

Jika API lokal berhasil tetapi public `/api/health` gagal, masalah biasanya ada di konfigurasi Nginx reverse proxy.

Screenshot laporan:

- Home public platform.
- Public API health check.
- Login/Register.
- Dashboard Superadmin.
- Dashboard Provider.
- Halaman Paket.
- Dashboard Tourist.
- Request masuk di Provider.

---

## 15. Alur Update Setelah Ada Perubahan Kode Baru

Jika nanti ada update dari GitHub, jalankan urutan ini:

```bash
cd /home/ubuntu/Tugas-1-Tekplat
git pull origin main

npm install
npm run build

cd api
npm install
npm run build
pm2 restart hiddengem-api --update-env

cd /home/ubuntu/Tugas-1-Tekplat
sudo rsync -av --delete --exclude uploads dist/ /www/wwwroot/hiddengem.stei.my.id/
sudo nginx -t
sudo /etc/init.d/nginx reload
```

Urutan ini adalah urutan final untuk update:

1. Pull kode di folder repo.
2. Build frontend.
3. Build backend.
4. Restart backend.
5. Copy frontend build ke web root.
6. Test dan reload Nginx.

---

## 16. Docker Bonus Opsional

Repo sudah menyiapkan:

- `Dockerfile` untuk frontend Nginx.
- `api/Dockerfile` untuk backend Express.
- `docker-compose.yml` untuk MariaDB, API, dan frontend.

Uji lokal Docker:

```bash
cd /home/ubuntu/Tugas-1-Tekplat
docker compose up --build
```

Setelah container aktif, buka:

```text
http://localhost:8080
http://localhost:8080/api/health
```

Screenshot bonus:

- Output `docker compose ps`.
- Halaman frontend Docker.
- Output API health check.

---

## Referensi Teknis

- Express routing: https://expressjs.com/en/guide/routing.html
- Multer upload middleware: https://github.com/expressjs/multer
- mysql2 Node.js driver: https://sidorares.github.io/node-mysql2/docs
- PM2 process manager: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx reverse proxy: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
