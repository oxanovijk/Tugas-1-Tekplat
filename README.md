# HiddenGem Explorer

HiddenGem Explorer adalah platform katalog destinasi dan request perjalanan untuk II2210 Tugas 2. Konsepnya mengikuti `docs/TUGAS2_IMPLEMENTATION_PLAN.md`: penyedia jasa travel membuat paket untuk destinasi tertentu, turis mengajukan minat perjalanan, dan superadmin menyetujui akun penyedia sebelum paket dapat dibuat.

## Kesesuaian Tugas 2

| Butir tugas | Implementasi repo |
| --- | --- |
| Authentication & access control | JWT login/register dengan role `superadmin`, `provider`, `tourist` |
| Approval role | Provider baru berstatus `pending` sampai disetujui superadmin |
| Backend/server | Express API di folder `api/` |
| Self-managed database | Skema MariaDB/MySQL di `api/schema.sql` dan seed di `api/seed.sql` |
| Data non-teks | Upload foto paket dengan metadata file dan `image_blob` di database |
| Interaksi produsen-konsumen | Provider membuat paket, tourist mengirim trip request, provider mengubah status request |
| External/public API | Endpoint `/api/external/wiki-summary` ke Wikipedia REST API |
| Public access | Ditargetkan via aaPanel/Nginx/Cloudflare pada domain `hiddengem.stei.my.id` |
| Docker bonus | `Dockerfile`, `api/Dockerfile`, dan `docker-compose.yml` tersedia sebagai opsi deployment bonus |

## Tech Stack

- Frontend: Vite, React, TypeScript, lucide-react.
- Backend: Node.js, Express, TypeScript, JWT, bcrypt, multer.
- Database: MariaDB/MySQL self-managed.
- Deployment target: Ubuntu VM, aaPanel, Nginx, PM2.
- Optional Docker: MariaDB, Express API, dan Nginx frontend container.

## Menjalankan Frontend Lokal

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Menjalankan Backend Lokal

```bash
cd api
npm install
cp .env.example .env
npm run build
npm start
```

Backend membutuhkan database MariaDB/MySQL yang sudah diisi `api/schema.sql` dan `api/seed.sql`.

## Struktur Folder Utama

```text
.
├── api/
│   ├── schema.sql
│   ├── seed.sql
│   └── src/
├── docs/
│   ├── TUGAS2_DEPLOYMENT_GUIDE.md
│   └── TUGAS2_IMPLEMENTATION_PLAN.md
├── src/
│   ├── api/
│   ├── data/
│   ├── App.css
│   └── App.tsx
└── package.json
```

## Deployment

Panduan deployment VM/aaPanel ada di `docs/TUGAS2_DEPLOYMENT_GUIDE.md`.

## Docker Opsional

```bash
docker compose up --build
```

Frontend akan tersedia di `http://localhost:8080`. Setelah container database pertama kali hidup, buat superadmin dengan masuk ke container API atau jalankan script serupa dengan environment yang sama.
