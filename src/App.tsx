import {
  Compass,
  ExternalLink,
  Filter,
  Landmark,
  MapPin,
  Mountain,
  Search,
  ShieldCheck,
  Sprout,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'
import { destinations, type Destination } from './data/destinations'

const itemsPerPage = 6
const categories = ['Semua', ...Array.from(new Set(destinations.map((item) => item.category)))]
const regions = ['Semua', ...Array.from(new Set(destinations.map((item) => item.region)))]

const categoryIcons: Record<Destination['category'], typeof Mountain> = {
  Alam: Mountain,
  Budaya: Landmark,
  Sejarah: ShieldCheck,
  Desa: Sprout,
}

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [region, setRegion] = useState('Semua')
  const [page, setPage] = useState(1)

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return destinations.filter((destination) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        destination.name.toLowerCase().includes(normalizedQuery) ||
        destination.region.toLowerCase().includes(normalizedQuery) ||
        destination.summary.toLowerCase().includes(normalizedQuery)
      const matchesCategory = category === 'Semua' || destination.category === category
      const matchesRegion = region === 'Semua' || destination.region === region

      return matchesQuery && matchesCategory && matchesRegion
    })
  }, [category, query, region])

  const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / itemsPerPage))
  const currentPage = Math.min(page, totalPages)
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Tourism & Culture Exchange</p>
          <h1 id="hero-title">HiddenGem Explorer</h1>
          <p className="hero-description">
            Kurasi destinasi wisata lokal bernilai alam, budaya, dan sejarah dengan catatan akses,
            sumber data, serta alasan kurasi yang transparan.
          </p>
          <div className="hero-actions" aria-label="Ringkasan platform">
            <a className="primary-link" href="#explore">
              <Compass size={18} aria-hidden="true" />
              Jelajahi
            </a>
            <a className="secondary-link" href="#sources">
              <ExternalLink size={18} aria-hidden="true" />
              Sumber
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Ringkasan koleksi destinasi">
          <div>
            <span className="metric">{destinations.length}</span>
            <span className="metric-label">dev seed destinasi</span>
          </div>
          <div>
            <span className="metric">{regions.length - 1}</span>
            <span className="metric-label">wilayah awal</span>
          </div>
          <div>
            <span className="metric">3</span>
            <span className="metric-label">sumber terbuka target</span>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="Filter destinasi">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Cari destinasi</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Cari tempat, wilayah, atau cerita"
          />
        </label>
        <label className="select-box">
          <Filter size={18} aria-hidden="true" />
          <span className="sr-only">Filter kategori</span>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value)
              setPage(1)
            }}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="select-box">
          <MapPin size={18} aria-hidden="true" />
          <span className="sr-only">Filter wilayah</span>
          <select
            value={region}
            onChange={(event) => {
              setRegion(event.target.value)
              setPage(1)
            }}
          >
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </section>

      <section id="explore" className="destination-section" aria-label="Daftar destinasi">
        <div className="section-heading">
          <p className="eyebrow">Kurasi Awal</p>
          <h2>Destinasi untuk validasi platform</h2>
          <p>
            Data ini adalah seed pengembangan untuk demonstrasi Tugas 1. Deskripsi ditulis mandiri
            dan harus diverifikasi ulang sebelum dipakai sebagai data produksi.
          </p>
        </div>

        <div className="destination-grid">
          {paginatedDestinations.map((destination) => {
            const Icon = categoryIcons[destination.category]

            return (
              <article className="destination-card" key={destination.name}>
                <figure className="card-media">
                  <img
                    src={destination.imageUrl}
                    alt={destination.imageAlt}
                    loading="lazy"
                  />
                  <figcaption>
                    Foto: <a href={destination.imageSourceUrl} target="_blank">{destination.imageCredit}</a>
                  </figcaption>
                </figure>
                <div className="card-topline">
                  <span className="category-pill">
                    <Icon size={16} aria-hidden="true" />
                    {destination.category}
                  </span>
                  <span className="status-pill">{destination.curationStatus}</span>
                </div>
                <h3>{destination.name}</h3>
                <p className="location">
                  <MapPin size={16} aria-hidden="true" />
                  {destination.region}
                </p>
                <p>{destination.summary}</p>
                <dl>
                  <div>
                    <dt>Alasan kurasi</dt>
                    <dd>{destination.hiddenGemReason}</dd>
                  </div>
                  <div>
                    <dt>Catatan akses</dt>
                    <dd>{destination.accessNote}</dd>
                  </div>
                </dl>
                <a className="source-link" href={destination.sourceUrl} target="_blank">
                  Sumber: {destination.sourceName}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>

        <nav className="pagination" aria-label="Navigasi halaman destinasi">
          <button
            type="button"
            onClick={() => setPage((activePage) => Math.max(1, activePage - 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          <div className="page-buttons">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                type="button"
                className={pageNumber === currentPage ? 'active' : ''}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage((activePage) => Math.min(totalPages, activePage + 1))}
            disabled={currentPage === totalPages}
          >
            Berikutnya
          </button>
          <p>
            Menampilkan {paginatedDestinations.length} dari {filteredDestinations.length} destinasi
          </p>
        </nav>
      </section>

      <section id="sources" className="source-section" aria-labelledby="source-title">
        <div>
          <p className="eyebrow">Data Strategy</p>
          <h2 id="source-title">Sumber data yang disiapkan</h2>
        </div>
        <div className="source-list">
          <a href="https://dev.opentripmap.org/" target="_blank">
            OpenTripMap
            <ExternalLink size={15} aria-hidden="true" />
          </a>
          <a href="https://www.openstreetmap.org/" target="_blank">
            OpenStreetMap
            <ExternalLink size={15} aria-hidden="true" />
          </a>
          <a href="https://api.wikimedia.org/wiki/API_catalog" target="_blank">
            Wikimedia API
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
