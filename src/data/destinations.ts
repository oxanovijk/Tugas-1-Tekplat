export type Destination = {
  name: string
  region: string
  category: 'Alam' | 'Budaya' | 'Sejarah' | 'Desa'
  summary: string
  hiddenGemReason: string
  accessNote: string
  sourceName: string
  sourceUrl: string
  curationStatus: string
}

export const destinations: Destination[] = [
  {
    name: 'Curug Cikaso',
    region: 'Sukabumi, Jawa Barat',
    category: 'Alam',
    summary:
      'Air terjun bertingkat di kawasan Sukabumi selatan yang cocok menjadi contoh wisata alam berbasis koordinat dan catatan akses.',
    hiddenGemReason:
      'Dipilih karena menawarkan pengalaman alam kuat namun masih membutuhkan kurasi akses, estimasi waktu, dan konteks perjalanan.',
    accessNote:
      'Perlu verifikasi kondisi jalan dan cuaca sebelum kunjungan; cocok ditampilkan bersama data cuaca pada iterasi berikutnya.',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Curug%20Cikaso',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kasepuhan Ciptagelar',
    region: 'Sukabumi, Jawa Barat',
    category: 'Budaya',
    summary:
      'Kampung adat dengan nilai budaya Sunda yang kuat dan relevan untuk narasi pertukaran budaya lokal.',
    hiddenGemReason:
      'Destinasi ini membantu platform tidak hanya menampilkan pemandangan, tetapi juga konteks adat dan praktik budaya.',
    accessNote:
      'Akses dan etika kunjungan perlu ditulis hati-hati karena kawasan adat memiliki aturan lokal.',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Kasepuhan_Ciptagelar',
    curationStatus: 'dev seed',
  },
  {
    name: 'Goa Sunyaragi',
    region: 'Cirebon, Jawa Barat',
    category: 'Sejarah',
    summary:
      'Situs bersejarah di Cirebon yang dapat digunakan untuk menguji tampilan destinasi berbasis narasi sejarah.',
    hiddenGemReason:
      'Dipilih untuk menyeimbangkan dataset awal antara alam, budaya, dan sejarah dalam satu platform wisata.',
    accessNote:
      'Informasi jam operasional dan tiket harus diverifikasi dari sumber resmi sebelum publikasi produksi.',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Taman_Sari_Gua_Sunyaragi',
    curationStatus: 'dev seed',
  },
  {
    name: 'Desa Wisata Nglanggeran',
    region: 'Gunungkidul, DI Yogyakarta',
    category: 'Desa',
    summary:
      'Desa wisata dengan bentang alam dan aktivitas lokal yang cocok untuk contoh katalog wisata berbasis komunitas.',
    hiddenGemReason:
      'Dipakai sebagai contoh data desa wisata yang dapat diberi catatan budaya, aktivitas, dan akses transportasi.',
    accessNote:
      'Validasi ulang rute dan paket kunjungan diperlukan jika nanti platform menampilkan rekomendasi perjalanan.',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Desa%20Wisata%20Nglanggeran',
    curationStatus: 'dev seed',
  },
  {
    name: 'Candi Ijo',
    region: 'Sleman, DI Yogyakarta',
    category: 'Sejarah',
    summary:
      'Kompleks candi di kawasan perbukitan yang memberi contoh kombinasi data sejarah, lokasi, dan akses.',
    hiddenGemReason:
      'Cocok untuk menguji kartu destinasi yang memuat konteks sejarah tanpa membuat klaim wisata berlebihan.',
    accessNote:
      'Perlu verifikasi jam operasional dan kondisi akses karena lokasi berada di area perbukitan.',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Candi_Ijo',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pantai Wediombo',
    region: 'Gunungkidul, DI Yogyakarta',
    category: 'Alam',
    summary:
      'Pantai di sisi selatan Gunungkidul yang dapat menjadi contoh destinasi alam dengan catatan keselamatan.',
    hiddenGemReason:
      'Dipilih untuk memperlihatkan bahwa platform perlu menyertakan catatan akses dan keselamatan, bukan hanya promosi.',
    accessNote:
      'Informasi ombak, cuaca, dan keselamatan perlu diverifikasi sebelum direkomendasikan untuk perjalanan nyata.',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Pantai%20Wediombo',
    curationStatus: 'dev seed',
  },
]
