# Tugas 2 Deployment Guide - HiddenGem Explorer

Dokumen ini mengikuti `docs/TUGAS2_IMPLEMENTATION_PLAN.md`. Bagian yang bisa dilakukan dari repo sudah diimplementasikan; bagian di bawah perlu dijalankan langsung di Ubuntu VM/aaPanel karena membutuhkan akses server, database, dan domain.

## 1. Pull Kode Terbaru di VM

```bash
cd /www/wwwroot/hiddengem.stei.my.id
git pull origin main
```

Jika folder website di VM berbeda, masuk ke folder yang memang dipakai aaPanel untuk domain `hiddengem.stei.my.id`.

## 2. Buat Database di aaPanel

1. Buka aaPanel.
2. Masuk menu `Databases`.
3. Buat database, contoh:
   - Database name: `hiddengem_db`
   - Username: `hiddengem_user`
   - Password: simpan password yang dibuat aaPanel.

## 3. Import Schema dan Seed

Jalankan dari terminal VM:

```bash
mysql -u hiddengem_user -p hiddengem_db < api/schema.sql
mysql -u hiddengem_user -p hiddengem_db < api/seed.sql
```

Screenshot yang perlu diambil:

- Setelah command import schema berhasil tanpa error.
- Setelah command import seed berhasil tanpa error.

## 4. Konfigurasi Environment Backend

```bash
cd /www/wwwroot/hiddengem.stei.my.id/api
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
DB_PASSWORD=password_dari_aapanel
DB_NAME=hiddengem_db

JWT_SECRET=ganti_dengan_string_panjang_random
UPLOAD_DIR=/www/wwwroot/hiddengem.stei.my.id/uploads
PUBLIC_UPLOAD_BASE_URL=/uploads
```

## 5. Install dan Build Backend

```bash
cd /www/wwwroot/hiddengem.stei.my.id/api
npm install
npm run build
```

Screenshot yang perlu diambil:

- Output `npm install`.
- Output `npm run build`.

## 6. Buat Superadmin

Default aman untuk percobaan:

```bash
ADMIN_EMAIL=admin@hiddengem.local ADMIN_PASSWORD='Admin123!' npm run admin:create
```

Jika shell VM sulit dengan tanda kutip, pakai:

```bash
export ADMIN_EMAIL=admin@hiddengem.local
export ADMIN_PASSWORD=Admin123!
npm run admin:create
```

Screenshot yang perlu diambil:

- Output `Superadmin ready: admin@hiddengem.local`.

## 7. Jalankan Backend dengan PM2

Jika PM2 belum ada:

```bash
sudo npm install -g pm2
```

Jalankan API:

```bash
cd /www/wwwroot/hiddengem.stei.my.id/api
pm2 start dist/server.js --name hiddengem-api
pm2 save
pm2 status
```

Tes API:

```bash
curl http://127.0.0.1:3001/api/health
```

Output yang diharapkan:

```json
{"status":"ok","service":"hiddengem-api"}
```

Screenshot yang perlu diambil:

- `pm2 status`.
- Output `curl http://127.0.0.1:3001/api/health`.

## 8. Build Frontend

Dari root project:

```bash
cd /www/wwwroot/hiddengem.stei.my.id
npm install
npm run build
```

Jika aaPanel site root menunjuk langsung ke folder domain, pindahkan isi `dist/` ke root web:

```bash
cp -r dist/* /www/wwwroot/hiddengem.stei.my.id/
```

Screenshot yang perlu diambil:

- Output `npm run build`.

## 9. Nginx Reverse Proxy untuk API

Di aaPanel, buka site `hiddengem.stei.my.id`, lalu edit konfigurasi Nginx. Tambahkan blok ini di dalam `server { ... }`:

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

Tes dan reload Nginx:

```bash
sudo nginx -t
sudo /etc/init.d/nginx reload
```

Jika aaPanel Nginx tidak memakai service systemd, gunakan tombol reload/restart dari aaPanel.

Screenshot yang perlu diambil:

- Konfigurasi reverse proxy `/api`.
- Output `sudo nginx -t`.

## 10. Uji Public URL

Buka:

- `https://hiddengem.stei.my.id`
- `https://hiddengem.stei.my.id/api/health`

Alur uji:

1. Login superadmin.
2. Register provider baru.
3. Approve provider dari dashboard superadmin.
4. Login provider, buat paket dengan foto.
5. Register/login tourist.
6. Tourist request paket.
7. Provider menerima/menolak request.

Screenshot laporan:

- Halaman Home.
- Halaman Login/Register.
- Dashboard Superadmin dengan provider pending/approved.
- Dashboard Provider saat membuat paket.
- Halaman Paket setelah foto paket muncul.
- Dashboard Tourist setelah request dibuat.
- Dashboard Provider setelah request masuk.

## 11. Docker Bonus Opsional

Repo sudah menyiapkan:

- `Dockerfile` untuk frontend Nginx.
- `api/Dockerfile` untuk backend Express.
- `docker-compose.yml` untuk MariaDB, API, dan frontend.

Uji lokal Docker:

```bash
docker compose up --build
```

Setelah container aktif, buka:

- `http://localhost:8080`
- `http://localhost:8080/api/health`

Screenshot bonus:

- Output `docker compose ps`.
- Halaman frontend Docker.
- Output API health check.

## Referensi Teknis

- Express routing: https://expressjs.com/en/guide/routing.html
- Multer upload middleware: https://github.com/expressjs/multer
- mysql2 Node.js driver: https://sidorares.github.io/node-mysql2/docs
- PM2 process manager: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx reverse proxy: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
