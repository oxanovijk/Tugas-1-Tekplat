export type Destination = {
  name: string
  region: string
  category: 'Alam' | 'Budaya' | 'Sejarah' | 'Desa'
  summary: string
  hiddenGemReason: string
  accessNote: string
  imageUrl: string
  imageAlt: string
  imageCredit: string
  imageSourceUrl: string
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Air_terjun_Cikaso.jpg/1280px-Air_terjun_Cikaso.jpg',
    imageAlt: 'Air terjun Curug Cikaso di Sukabumi',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Air_terjun_Cikaso.jpg',
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Bentang_alam_Kasepuhan_Ciptagelar.jpg/1280px-Bentang_alam_Kasepuhan_Ciptagelar.jpg',
    imageAlt: 'Bentang alam Kasepuhan Ciptagelar',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Bentang_alam_Kasepuhan_Ciptagelar.jpg',
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Arya.sunyaragi.cave.2014.jpg/1280px-Arya.sunyaragi.cave.2014.jpg',
    imageAlt: 'Kompleks Goa Sunyaragi di Cirebon',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Arya.sunyaragi.cave.2014.jpg',
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bukit_Nglanggeran.jpg/1280px-Bukit_Nglanggeran.jpg',
    imageAlt: 'Bukit Nglanggeran di Gunungkidul',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Bukit_Nglanggeran.jpg',
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Candi_Ijo.JPG/1280px-Candi_Ijo.JPG',
    imageAlt: 'Bangunan Candi Ijo di Sleman',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Candi_Ijo.JPG',
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Wediombo_Beach_4.jpg/1280px-Wediombo_Beach_4.jpg',
    imageAlt: 'Pantai Wediombo di Gunungkidul',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Wediombo_Beach_4.jpg',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Pantai%20Wediombo',
    curationStatus: 'dev seed',
  },
]
