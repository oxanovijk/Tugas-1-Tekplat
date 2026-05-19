# Strategi Sumber Data HiddenGem Explorer

Data awal di repository ini adalah development seed, bukan dataset produksi. Tujuannya adalah menyediakan tampilan platform yang stabil untuk Tugas 1 sambil menyiapkan jalur integrasi API eksternal pada iterasi berikutnya.

## Prinsip Data

- Deskripsi destinasi ditulis mandiri, bukan hasil copy-paste dari blog travel.
- Setiap destinasi memiliki `sourceName` dan `sourceUrl`.
- Label `hidden gem` dipakai sebagai kurasi platform, bukan klaim objektif bahwa destinasi tidak dikenal publik.
- Data produksi perlu verifikasi manusia untuk lokasi, akses, jam operasional, keamanan, dan izin penggunaan foto.

## Sumber Data Kandidat

| Sumber | Kegunaan | Catatan |
| --- | --- | --- |
| OpenTripMap | POI wisata, kategori, koordinat, dan ringkasan destinasi | Cocok untuk integrasi API eksternal pada bonus. |
| OpenStreetMap | Lokasi, koordinat, dan pencarian tempat | Cocok untuk validasi lokasi dan link peta. |
| Wikimedia API | Ringkasan sejarah/budaya dan metadata konten terbuka | Perlu atribusi sesuai lisensi. |
| Open data pemerintah | Dataset pariwisata daerah | Format dan kelengkapan data bergantung tiap instansi. |

## Referensi API

- OpenTripMap: https://dev.opentripmap.org/
- OpenStreetMap: https://www.openstreetmap.org/
- Nominatim: https://nominatim.org/release-docs/4.3/api/Overview/
- Wikimedia API Catalog: https://api.wikimedia.org/wiki/API_catalog
- Portal Satu Data Indonesia: https://data.go.id/

## Rencana Integrasi Bonus

1. Tambahkan backend kecil di VPS.
2. Simpan destinasi di database self-managed.
3. Tambahkan endpoint untuk daftar destinasi dan detail destinasi.
4. Ambil data eksternal dari OpenTripMap atau Wikimedia.
5. Tampilkan sumber data dan waktu sinkronisasi pada UI/admin.
