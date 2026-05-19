# HiddenGem Explorer

HiddenGem Explorer adalah platform sederhana untuk kurasi destinasi wisata lokal yang bernilai alam, budaya, atau sejarah. Repository ini disiapkan untuk Tugas 1 II2210 Teknologi Platform dengan fokus pada frontend, deployment, dokumentasi instalasi, dan akses publik melalui tunnel.

## Kesesuaian Tugas

| Butir tugas | Implementasi repo |
| --- | --- |
| Tema | Tourism & Culture Exchange |
| Frontend | Vite + React + TypeScript |
| Backend | Belum dikerjakan pada setup awal; kandidat bonus |
| Database | Belum dikerjakan pada setup awal; kandidat bonus self-managed di VPS |
| API eksternal | Disiapkan sebagai integrasi berikutnya: OpenTripMap, OpenStreetMap, Wikimedia |
| Akses publik | Ditargetkan melalui aaPanel + Cloudflare Tunnel |
| Dokumentasi | `docs/INSTALLATION.md`, `docs/DATA_SOURCES.md`, `docs/SUBMISSION_CHECKLIST.md` |

## Tech Stack

- Vite untuk build frontend statis yang ringan.
- React + TypeScript untuk komponen UI dan typing data destinasi.
- lucide-react untuk ikon UI.
- aaPanel untuk deployment di VM/VPS sesuai panduan tugas.
- Cloudflare Tunnel untuk akses publik.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Struktur Folder

```text
.
├── docs/
│   ├── DATA_SOURCES.md
│   ├── INSTALLATION.md
│   └── SUBMISSION_CHECKLIST.md
├── public/
├── src/
│   ├── data/
│   │   └── destinations.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
└── vite.config.ts
```

## Status Data

Data destinasi pada `src/data/destinations.ts` adalah development seed untuk demonstrasi UI. Deskripsi ditulis mandiri dan perlu diverifikasi ulang sebelum digunakan sebagai data produksi.

## Deployment Ringkas

1. Build aplikasi dengan `npm run build`.
2. Pindahkan isi folder `dist/` ke folder website aaPanel, misalnya `/www/wwwroot/hiddengem-explorer/`.
3. Atur site di aaPanel sebagai static site.
4. Buat Cloudflare Tunnel public hostname ke port/site yang digunakan.
5. Ambil screenshot URL publik dan tampilan antarmuka.

Panduan detail ada di `docs/INSTALLATION.md`.
