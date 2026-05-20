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
  {
    name: 'Situ Gunung',
    region: 'Sukabumi, Jawa Barat',
    category: 'Alam',
    summary:
      'Danau dan kawasan hutan pegunungan yang cocok untuk menampilkan wisata alam berbasis akses dan aktivitas ringan.',
    hiddenGemReason:
      'Dipilih sebagai contoh destinasi alam yang dapat diberi konteks rute, cuaca, dan catatan kunjungan.',
    accessNote: 'Perlu verifikasi kondisi jalur dan tiket kawasan sebelum digunakan sebagai rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Situ_Gunung.jpg/1280px-Situ_Gunung.jpg',
    imageAlt: 'Pemandangan Situ Gunung di Sukabumi',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Situ_Gunung.jpg',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Situ%20Gunung',
    curationStatus: 'dev seed',
  },
  {
    name: 'Curug Cimahi',
    region: 'Bandung Barat, Jawa Barat',
    category: 'Alam',
    summary:
      'Air terjun di kawasan Bandung Barat yang dapat menjadi contoh destinasi alam dekat kota besar.',
    hiddenGemReason:
      'Cocok untuk menguji kurasi destinasi alam dengan informasi akses singkat dan sumber lokasi terbuka.',
    accessNote: 'Jam buka, harga tiket, dan kondisi tangga perlu diverifikasi ulang sebelum publikasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e5/COLLECTIE_TROPENMUSEUM_Waterval_in_de_omgeving_van_Tjisaroea_en_Tjimahi_TMnr_60050403.jpg',
    imageAlt: 'Air terjun di sekitar Cimahi',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Waterval_in_de_omgeving_van_Tjisaroea_en_Tjimahi_TMnr_60050403.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Curug_Cimahi',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kawah Putih',
    region: 'Bandung, Jawa Barat',
    category: 'Alam',
    summary:
      'Kawah vulkanik di Ciwidey yang cocok untuk contoh destinasi alam dengan catatan cuaca dan keselamatan.',
    hiddenGemReason:
      'Dipakai untuk menguji bagaimana platform menampilkan catatan akses dan risiko alam, bukan hanya visual.',
    accessNote: 'Perlu catatan cuaca, bau belerang, dan aturan kawasan sebelum direkomendasikan untuk kunjungan.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg/1280px-Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg',
    imageAlt: 'Danau Kawah Putih dari area pandang',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Kawah_Putih_Lake_from_the_viewing_platform,_Bandung_Regency,_2014-08-21.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Kawah_Putih',
    curationStatus: 'dev seed',
  },
  {
    name: 'Gunung Tangkuban Parahu',
    region: 'Bandung Barat, Jawa Barat',
    category: 'Alam',
    summary:
      'Gunung api aktif yang memberi contoh destinasi alam dengan kebutuhan catatan keamanan dan status kawasan.',
    hiddenGemReason:
      'Dimasukkan untuk menyeimbangkan dataset alam vulkanik dan memperlihatkan pentingnya verifikasi status lokasi.',
    accessNote: 'Status aktivitas gunung dan aturan kawasan wajib dicek dari sumber resmi sebelum kunjungan.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Panoramic_View_of_Kawah_Ratu_Crater_in_Mt.Tangkuban_Perahu.jpg/1280px-Panoramic_View_of_Kawah_Ratu_Crater_in_Mt.Tangkuban_Perahu.jpg',
    imageAlt: 'Panorama Kawah Ratu di Gunung Tangkuban Parahu',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Panoramic_View_of_Kawah_Ratu_Crater_in_Mt.Tangkuban_Perahu.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Gunung_Tangkuban_Parahu',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kampung Naga',
    region: 'Tasikmalaya, Jawa Barat',
    category: 'Budaya',
    summary:
      'Kampung adat di Tasikmalaya yang cocok untuk menampilkan destinasi berbasis etika kunjungan dan budaya lokal.',
    hiddenGemReason:
      'Dipilih agar platform tidak hanya memuat wisata alam, tetapi juga pengalaman budaya yang perlu ditulis hati-hati.',
    accessNote: 'Etika berkunjung, larangan dokumentasi, dan aturan lokal perlu diverifikasi sebelum publikasi produksi.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/View_of_Naga_village.jpg',
    imageAlt: 'Pemandangan Kampung Naga',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Naga_village.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Kampung_Naga',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kawasan Baduy',
    region: 'Lebak, Banten',
    category: 'Budaya',
    summary:
      'Kawasan masyarakat adat Baduy yang memberi contoh destinasi budaya dengan batasan etika dan akses.',
    hiddenGemReason:
      'Dimasukkan untuk menguji catatan kepercayaan, aturan adat, dan tanggung jawab platform terhadap komunitas lokal.',
    accessNote: 'Aturan adat, pembatasan teknologi, dan izin kunjungan perlu dihormati serta diverifikasi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Raiyani_Muharramah-Pakaian_badui_luar_DSCF2964.jpg/1280px-Raiyani_Muharramah-Pakaian_badui_luar_DSCF2964.jpg',
    imageAlt: 'Pakaian masyarakat Baduy luar',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Raiyani_Muharramah-Pakaian_badui_luar_DSCF2964.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Suku_Badui',
    curationStatus: 'dev seed',
  },
  {
    name: 'Benteng Belgica',
    region: 'Banda Neira, Maluku',
    category: 'Sejarah',
    summary:
      'Benteng bersejarah di Banda Neira yang cocok untuk narasi sejarah rempah dan warisan kolonial.',
    hiddenGemReason:
      'Memperkaya dataset sejarah di luar Jawa dan mendukung tema pertukaran budaya melalui konteks situs.',
    accessNote: 'Akses transportasi antarpulau dan jam kunjungan perlu diverifikasi sebelum rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Fort_Belgica_01.JPG/1280px-Fort_Belgica_01.JPG',
    imageAlt: 'Bangunan Benteng Belgica di Banda Neira',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Belgica_01.JPG',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Benteng_Belgica',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pantai Ora',
    region: 'Maluku Tengah, Maluku',
    category: 'Alam',
    summary:
      'Pantai di Pulau Seram yang mewakili destinasi bahari dengan kebutuhan informasi akses dan konservasi.',
    hiddenGemReason:
      'Cocok untuk menunjukkan kurasi wisata alam terpencil dengan catatan transportasi dan lingkungan.',
    accessNote: 'Akses laut, biaya lokal, dan aturan konservasi perlu diverifikasi sebelum publikasi produksi.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Panorama_Pantai_Ora.jpg',
    imageAlt: 'Panorama Pantai Ora',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_Pantai_Ora.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Pantai_Ora',
    curationStatus: 'dev seed',
  },
  {
    name: 'Danau Weekuri',
    region: 'Sumba Barat Daya, NTT',
    category: 'Alam',
    summary:
      'Laguna air asin di Sumba yang cocok untuk contoh destinasi alam dengan catatan keselamatan air.',
    hiddenGemReason:
      'Dipilih untuk menampilkan wisata alam Indonesia Timur yang memerlukan keterangan akses dan konservasi.',
    accessNote: 'Kondisi jalan, keselamatan berenang, dan aturan lokal perlu dicek sebelum rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Weekuri_Lagoon.jpg/1280px-Weekuri_Lagoon.jpg',
    imageAlt: 'Laguna Danau Weekuri di Sumba',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Weekuri_Lagoon.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Danau_Weekuri',
    curationStatus: 'dev seed',
  },
  {
    name: 'Wae Rebo',
    region: 'Manggarai, NTT',
    category: 'Budaya',
    summary:
      'Desa adat di pegunungan Flores yang cocok untuk narasi budaya, akses trekking, dan etika kunjungan.',
    hiddenGemReason:
      'Memperlihatkan bahwa platform perlu memuat konteks komunitas, bukan sekadar daftar lokasi wisata.',
    accessNote: 'Aturan adat, jalur trekking, dan ketersediaan pemandu perlu diverifikasi sebelum kunjungan.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Wae_Rebo_di_Pagi_Hari.jpg/1280px-Wae_Rebo_di_Pagi_Hari.jpg',
    imageAlt: 'Wae Rebo pada pagi hari',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Wae_Rebo_di_Pagi_Hari.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Wae_Rebo',
    curationStatus: 'dev seed',
  },
  {
    name: 'Bukit Holbung',
    region: 'Samosir, Sumatera Utara',
    category: 'Alam',
    summary:
      'Bukit di kawasan Danau Toba yang cocok untuk kartu wisata alam dengan panorama dan catatan cuaca.',
    hiddenGemReason:
      'Dipilih untuk memperluas dataset Sumatera dan menampilkan destinasi berbasis panorama terbuka.',
    accessNote: 'Kondisi jalur, cuaca, dan akses parkir perlu diverifikasi sebelum digunakan produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bukit_Holbung_di_Siang_Hari.jpg/1280px-Bukit_Holbung_di_Siang_Hari.jpg',
    imageAlt: 'Bukit Holbung di siang hari',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Bukit_Holbung_di_Siang_Hari.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Bukit_Holbung',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pulau Lengkuas',
    region: 'Belitung, Kepulauan Bangka Belitung',
    category: 'Alam',
    summary:
      'Pulau kecil dengan mercusuar yang cocok untuk narasi wisata bahari dan sejarah ringan.',
    hiddenGemReason:
      'Menggabungkan konteks alam, akses perahu, dan landmark sejarah dalam satu destinasi.',
    accessNote: 'Jadwal perahu, cuaca laut, dan akses mercusuar perlu dicek sebelum rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lengkuas_Island.JPG/1280px-Lengkuas_Island.JPG',
    imageAlt: 'Pulau Lengkuas di Belitung',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Lengkuas_Island.JPG',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Pulau_Lengkuas',
    curationStatus: 'dev seed',
  },
  {
    name: 'Rammang-Rammang',
    region: 'Maros, Sulawesi Selatan',
    category: 'Alam',
    summary:
      'Kawasan karst di Maros yang cocok untuk menampilkan wisata alam berbasis lanskap dan perjalanan perahu.',
    hiddenGemReason:
      'Dipilih karena lanskapnya kuat dan membutuhkan catatan akses lokal yang informatif.',
    accessNote: 'Rute perahu, cuaca, dan jam kunjungan kawasan perlu diverifikasi sebelum dipakai produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Kawasan_Geopark_Maros_Pangkep.jpg/1280px-Kawasan_Geopark_Maros_Pangkep.jpg',
    imageAlt: 'Kawasan Geopark Maros Pangkep',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Kawasan_Geopark_Maros_Pangkep.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Rammang-Rammang',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kepulauan Derawan',
    region: 'Berau, Kalimantan Timur',
    category: 'Alam',
    summary:
      'Kepulauan bahari di Kalimantan Timur yang cocok untuk contoh wisata pulau dan konservasi laut.',
    hiddenGemReason:
      'Memperluas cakupan Kalimantan dan menunjukkan kebutuhan informasi transportasi serta ekosistem laut.',
    accessNote: 'Jadwal transportasi, cuaca laut, dan aturan konservasi perlu diverifikasi sebelum produksi.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Derawan_Island_East_Kalimantan.jpg',
    imageAlt: 'Pulau Derawan di Kalimantan Timur',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Derawan_Island_East_Kalimantan.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Kepulauan_Derawan',
    curationStatus: 'dev seed',
  },
  {
    name: 'Kelimutu',
    region: 'Ende, NTT',
    category: 'Alam',
    summary:
      'Danau kawah berwarna di Flores yang cocok untuk kartu destinasi alam dengan catatan status kawasan.',
    hiddenGemReason:
      'Memberi contoh wisata geologi Indonesia Timur yang perlu dikaitkan dengan cuaca dan akses pagi hari.',
    accessNote: 'Jam kunjungan, cuaca, dan akses menuju area pandang perlu diverifikasi sebelum produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beautiful_Kelimutu_at_Sunrise.jpg/1280px-Beautiful_Kelimutu_at_Sunrise.jpg',
    imageAlt: 'Kelimutu saat matahari terbit',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Beautiful_Kelimutu_at_Sunrise.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Kelimutu',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pantai Tanjung Aan',
    region: 'Lombok Tengah, NTB',
    category: 'Alam',
    summary:
      'Pantai di Lombok bagian selatan yang cocok untuk menampilkan wisata pantai dengan catatan musim dan akses.',
    hiddenGemReason:
      'Dipilih untuk menambah variasi destinasi bahari dan memperlihatkan catatan keselamatan pesisir.',
    accessNote: 'Cuaca, ombak, akses parkir, dan fasilitas lokal perlu diverifikasi sebelum rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/PANTAI_TANJUNG_AAN.jpg/1280px-PANTAI_TANJUNG_AAN.jpg',
    imageAlt: 'Pantai Tanjung Aan di Lombok',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:PANTAI_TANJUNG_AAN.jpg',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Pantai%20Tanjung%20Aan',
    curationStatus: 'dev seed',
  },
  {
    name: 'Desa Sade',
    region: 'Lombok Tengah, NTB',
    category: 'Budaya',
    summary:
      'Desa adat Sasak yang cocok untuk contoh destinasi budaya dengan catatan etika dan narasi lokal.',
    hiddenGemReason:
      'Memperkuat aspek pertukaran budaya dan memberi ruang untuk catatan kunjungan yang sensitif terhadap komunitas.',
    accessNote: 'Pemandu lokal, etika dokumentasi, dan aktivitas budaya perlu diverifikasi sebelum produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Masakan_ikan_di_Desa_Sade_Lombok.JPG/1280px-Masakan_ikan_di_Desa_Sade_Lombok.JPG',
    imageAlt: 'Masakan ikan di Desa Sade Lombok',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Masakan_ikan_di_Desa_Sade_Lombok.JPG',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Desa%20Sade%20Lombok',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pantai Papuma',
    region: 'Jember, Jawa Timur',
    category: 'Alam',
    summary:
      'Pantai dengan formasi batu karang di Jember yang cocok untuk visualisasi wisata alam pesisir.',
    hiddenGemReason:
      'Dipilih untuk memperluas cakupan Jawa Timur dan menguji catatan keselamatan pantai.',
    accessNote: 'Kondisi ombak, akses jalan, dan keselamatan area batu karang perlu diverifikasi sebelum produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Papumarock_-_Pantai_Papuma_-_Jember_Jawa_Timur.jpg/1280px-Papumarock_-_Pantai_Papuma_-_Jember_Jawa_Timur.jpg',
    imageAlt: 'Batu karang di Pantai Papuma Jember',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Papumarock_-_Pantai_Papuma_-_Jember_Jawa_Timur.jpg',
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/search?query=Pantai%20Papuma',
    curationStatus: 'dev seed',
  },
  {
    name: 'Candi Plaosan',
    region: 'Klaten, Jawa Tengah',
    category: 'Sejarah',
    summary:
      'Kompleks candi dekat Yogyakarta yang cocok untuk menampilkan wisata sejarah berbasis situs budaya.',
    hiddenGemReason:
      'Mendukung kategori sejarah dan membantu membedakan destinasi populer dari situs yang butuh konteks tambahan.',
    accessNote: 'Jam operasional dan aturan kawasan cagar budaya perlu diverifikasi sebelum publikasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Plaosan_Temple.jpg/1280px-Plaosan_Temple.jpg',
    imageAlt: 'Kompleks Candi Plaosan',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Plaosan_Temple.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Candi_Plaosan',
    curationStatus: 'dev seed',
  },
  {
    name: 'Tebing Breksi',
    region: 'Sleman, DI Yogyakarta',
    category: 'Alam',
    summary:
      'Kawasan tebing wisata di Yogyakarta yang dapat digunakan untuk contoh destinasi geologi dan aktivitas lokal.',
    hiddenGemReason:
      'Dipakai untuk menguji kombinasi visual, akses, dan aktivitas dalam satu kartu destinasi.',
    accessNote: 'Jam buka, tiket, dan keamanan area tebing perlu diverifikasi sebelum rekomendasi produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lahan_parkir_dan_amfiteater_di_Tebing_Breksi_Yogyakarta.jpg/1280px-Lahan_parkir_dan_amfiteater_di_Tebing_Breksi_Yogyakarta.jpg',
    imageAlt: 'Area Tebing Breksi Yogyakarta',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Lahan_parkir_dan_amfiteater_di_Tebing_Breksi_Yogyakarta.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Tebing_Breksi',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pura Ulun Danu Bratan',
    region: 'Tabanan, Bali',
    category: 'Budaya',
    summary:
      'Pura di tepi Danau Bratan yang cocok untuk narasi budaya, lanskap, dan etika kunjungan tempat ibadah.',
    hiddenGemReason:
      'Menambah konteks budaya Bali dan memperlihatkan perlunya catatan perilaku saat mengunjungi tempat ibadah.',
    accessNote: 'Aturan berpakaian, jam operasional, dan area kunjungan perlu diverifikasi sebelum produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Pura_Ulundanu_Bedugul_di_pagi_hari.jpg/1280px-Pura_Ulundanu_Bedugul_di_pagi_hari.jpg',
    imageAlt: 'Pura Ulun Danu Bratan pada pagi hari',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Pura_Ulundanu_Bedugul_di_pagi_hari.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Pura_Ulun_Danu_Bratan',
    curationStatus: 'dev seed',
  },
  {
    name: 'Pulau Padar',
    region: 'Manggarai Barat, NTT',
    category: 'Alam',
    summary:
      'Pulau di kawasan Komodo yang cocok untuk contoh wisata alam berbasis trekking dan konservasi.',
    hiddenGemReason:
      'Dipakai untuk menunjukkan pentingnya catatan kawasan konservasi dan akses perahu dalam platform wisata.',
    accessNote: 'Aturan taman nasional, cuaca, dan keselamatan trekking perlu diverifikasi sebelum produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Pulau_Padar_1.jpg/1280px-Pulau_Padar_1.jpg',
    imageAlt: 'Lanskap Pulau Padar',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Pulau_Padar_1.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Pulau_Padar',
    curationStatus: 'dev seed',
  },
  {
    name: 'Danau Toba',
    region: 'Sumatera Utara',
    category: 'Alam',
    summary:
      'Danau vulkanik besar yang cocok untuk contoh destinasi lintas wilayah dengan banyak titik akses.',
    hiddenGemReason:
      'Dimasukkan untuk menguji bagaimana platform menangani destinasi luas dengan banyak sub-area dan rute.',
    accessNote: 'Titik masuk, transportasi ke pulau/kawasan, dan cuaca perlu diverifikasi per lokasi spesifik.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lake_Toba_and_the_surrounding_hills.jpg/1280px-Lake_Toba_and_the_surrounding_hills.jpg',
    imageAlt: 'Danau Toba dan perbukitan di sekitarnya',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Toba_and_the_surrounding_hills.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Danau_Toba',
    curationStatus: 'dev seed',
  },
  {
    name: 'Lawang Sewu',
    region: 'Semarang, Jawa Tengah',
    category: 'Sejarah',
    summary:
      'Bangunan bersejarah di Semarang yang cocok untuk kartu destinasi berbasis arsitektur dan sejarah kota.',
    hiddenGemReason:
      'Memperkuat kategori sejarah dan memberi contoh destinasi urban yang tetap memiliki narasi budaya.',
    accessNote: 'Jam operasional, aturan tur, dan tiket perlu diverifikasi sebelum digunakan produksi.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Lawang_sewu_semarang.jpg/1280px-Lawang_sewu_semarang.jpg',
    imageAlt: 'Bangunan Lawang Sewu Semarang',
    imageCredit: 'Wikimedia Commons',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Lawang_sewu_semarang.jpg',
    sourceName: 'Wikimedia',
    sourceUrl: 'https://id.wikipedia.org/wiki/Lawang_Sewu',
    curationStatus: 'dev seed',
  },
]
