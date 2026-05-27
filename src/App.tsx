import {
  CheckCircle2,
  Compass,
  ExternalLink,
  Filter,
  Landmark,
  LogIn,
  MapPin,
  Mountain,
  PackagePlus,
  Search,
  ShieldCheck,
  Sprout,
  UserPlus,
  XCircle,
} from 'lucide-react'
import { type FormEvent, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  api,
  resolveMediaUrl,
  type AdminUser,
  type ApiDestination,
  type AuthUser,
  type ApprovalStatus,
  type TravelPackage,
  type TripRequest,
  type UserRole,
} from './api/client'
import { destinations, type Destination } from './data/destinations'

const itemsPerPage = 6
const categories = ['Semua', ...Array.from(new Set(destinations.map((item) => item.category)))]
const regions = ['Semua', ...Array.from(new Set(destinations.map((item) => item.region)))]
const sessionKey = 'hiddengem-session'

const categoryIcons: Record<Destination['category'], typeof Mountain> = {
  Alam: Mountain,
  Budaya: Landmark,
  Sejarah: ShieldCheck,
  Desa: Sprout,
}

type View = 'home' | 'packages' | 'login' | 'register' | 'admin' | 'provider' | 'tourist'

type Session = {
  user: AuthUser
  token: string
}

function readSession(): Session | null {
  const raw = localStorage.getItem(sessionKey)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as Session
  } catch {
    localStorage.removeItem(sessionKey)
    return null
  }
}

function dashboardFor(role: UserRole): View {
  if (role === 'superadmin') {
    return 'admin'
  }

  return role
}

function roleLabel(role: UserRole) {
  if (role === 'superadmin') {
    return 'Superadmin'
  }
  if (role === 'provider') {
    return 'Penyedia travel'
  }
  return 'Turis'
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    accepted: 'Diterima',
    completed: 'Selesai',
    active: 'Aktif',
  }

  return labels[status] ?? status
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

function persistSession(session: Session | null) {
  if (!session) {
    localStorage.removeItem(sessionKey)
    return
  }

  localStorage.setItem(sessionKey, JSON.stringify(session))
}

function App() {
  const [session, setSession] = useState<Session | null>(() => readSession())
  const [view, setView] = useState<View>(() => {
    const storedSession = readSession()
    return storedSession ? dashboardFor(storedSession.user.role) : 'home'
  })
  const sessionToken = session?.token

  useEffect(() => {
    if (!sessionToken) {
      return
    }

    const token = sessionToken

    api
      .me(token)
      .then(({ user }) => {
        setSession((currentSession) => {
          if (!currentSession || currentSession.token !== token) {
            return currentSession
          }

          const nextSession = { ...currentSession, user }
          persistSession(nextSession)
          return nextSession
        })
      })
      .catch(() => {
        setSession(null)
        persistSession(null)
        setView('login')
      })
  }, [sessionToken])

  const handleAuthSuccess = (nextSession: Session) => {
    setSession(nextSession)
    persistSession(nextSession)
    setView(dashboardFor(nextSession.user.role))
  }

  const handleLogout = () => {
    setSession(null)
    persistSession(null)
    setView('home')
  }

  return (
    <main>
      <TopNav session={session} view={view} onLogout={handleLogout} onViewChange={setView} />
      {view === 'home' && <HomeView onViewChange={setView} />}
      {view === 'packages' && <PackagesView session={session} onViewChange={setView} />}
      {view === 'login' && (
        <AuthPanel mode="login" onAuthSuccess={handleAuthSuccess} onViewChange={setView} />
      )}
      {view === 'register' && (
        <AuthPanel mode="register" onAuthSuccess={handleAuthSuccess} onViewChange={setView} />
      )}
      {view === 'admin' && <AdminDashboard session={session} onViewChange={setView} />}
      {view === 'provider' && <ProviderDashboard session={session} onViewChange={setView} />}
      {view === 'tourist' && <TouristDashboard session={session} onViewChange={setView} />}
    </main>
  )
}

function TopNav({
  session,
  view,
  onLogout,
  onViewChange,
}: {
  session: Session | null
  view: View
  onLogout: () => void
  onViewChange: (view: View) => void
}) {
  return (
    <header className="top-nav">
      <button className="brand-button" type="button" onClick={() => onViewChange('home')}>
        <Compass size={20} aria-hidden="true" />
        HiddenGem
      </button>
      <nav aria-label="Navigasi utama">
        <button type="button" className={view === 'packages' ? 'active' : ''} onClick={() => onViewChange('packages')}>
          Paket
        </button>
        {session ? (
          <>
            <button
              type="button"
              className={view === dashboardFor(session.user.role) ? 'active' : ''}
              onClick={() => onViewChange(dashboardFor(session.user.role))}
            >
              Dashboard
            </button>
            <span className="user-chip">{roleLabel(session.user.role)}</span>
            <button type="button" onClick={onLogout}>
              Keluar
            </button>
          </>
        ) : (
          <>
            <button type="button" className={view === 'login' ? 'active' : ''} onClick={() => onViewChange('login')}>
              Masuk
            </button>
            <button
              type="button"
              className={view === 'register' ? 'active' : ''}
              onClick={() => onViewChange('register')}
            >
              Daftar
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

function HomeView({ onViewChange }: { onViewChange: (view: View) => void }) {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Tourism Service Exchange</p>
          <h1 id="hero-title">HiddenGem Explorer</h1>
          <p className="hero-description">
            Platform katalog destinasi dan request perjalanan yang menghubungkan turis dengan penyedia
            jasa travel lokal tanpa payment gateway.
          </p>
          <div className="hero-actions" aria-label="Aksi utama">
            <button className="primary-link" type="button" onClick={() => onViewChange('packages')}>
              <Compass size={18} aria-hidden="true" />
              Lihat Paket
            </button>
            <button className="secondary-link" type="button" onClick={() => onViewChange('register')}>
              <UserPlus size={18} aria-hidden="true" />
              Daftar
            </button>
          </div>
        </div>
        <div className="hero-panel" aria-label="Ringkasan platform">
          <div>
            <span className="metric">3</span>
            <span className="metric-label">role pengguna</span>
          </div>
          <div>
            <span className="metric">{destinations.length}</span>
            <span className="metric-label">seed destinasi</span>
          </div>
          <div>
            <span className="metric">2</span>
            <span className="metric-label">alur interaksi</span>
          </div>
        </div>
      </section>

      <DestinationExplorer />

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
    </>
  )
}

function DestinationExplorer() {
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
    <>
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
            Katalog ini menjadi konteks awal agar penyedia travel dapat membuat paket perjalanan dan
            turis dapat mengajukan request ke paket yang tersedia.
          </p>
        </div>

        <div className="destination-grid">
          {paginatedDestinations.map((destination) => {
            const Icon = categoryIcons[destination.category]

            return (
              <article className="destination-card" key={destination.name}>
                <figure className="card-media">
                  <img src={destination.imageUrl} alt={destination.imageAlt} loading="lazy" />
                  <figcaption>
                    Foto:{' '}
                    <a href={destination.imageSourceUrl} target="_blank">
                      {destination.imageCredit}
                    </a>
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
    </>
  )
}

function AuthPanel({
  mode,
  onAuthSuccess,
  onViewChange,
}: {
  mode: 'login' | 'register'
  onAuthSuccess: (session: Session) => void
  onViewChange: (view: View) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('tourist')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isRegister = mode === 'register'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = isRegister
        ? await api.register({ name, email, password, role })
        : await api.login({ email, password })

      onAuthSuccess(response)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="app-section auth-section" aria-labelledby="auth-title">
      <div className="section-heading">
        <p className="eyebrow">Access Control</p>
        <h2 id="auth-title">{isRegister ? 'Daftar akun' : 'Masuk akun'}</h2>
        <p>
          Akun penyedia travel akan berstatus menunggu sampai superadmin menyetujui pendaftarannya.
        </p>
      </div>
      <form className="form-panel" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>
              Nama
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Role
              <select value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
                <option value="tourist">Turis</option>
                <option value="provider">Penyedia travel</option>
              </select>
            </label>
          </>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {message && <p className="notice error">{message}</p>}
        <button className="primary-action" type="submit" disabled={loading}>
          <LogIn size={18} aria-hidden="true" />
          {loading ? 'Memproses' : isRegister ? 'Daftar' : 'Masuk'}
        </button>
        <button
          className="text-action"
          type="button"
          onClick={() => onViewChange(isRegister ? 'login' : 'register')}
        >
          {isRegister ? 'Sudah punya akun' : 'Belum punya akun'}
        </button>
      </form>
    </section>
  )
}

function ProtectedSection({
  session,
  allowedRole,
  onViewChange,
  children,
}: {
  session: Session | null
  allowedRole: UserRole
  onViewChange: (view: View) => void
  children: ReactNode
}) {
  if (!session) {
    return (
      <section className="app-section">
        <p className="notice error">Silakan masuk terlebih dahulu.</p>
        <button className="primary-action" type="button" onClick={() => onViewChange('login')}>
          Masuk
        </button>
      </section>
    )
  }

  if (session.user.role !== allowedRole) {
    return (
      <section className="app-section">
        <p className="notice error">Dashboard ini tidak tersedia untuk role {roleLabel(session.user.role)}.</p>
      </section>
    )
  }

  return <>{children}</>
}

function AdminDashboard({ session, onViewChange }: { session: Session | null; onViewChange: (view: View) => void }) {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const token = session?.token

  const loadUsers = useCallback(async () => {
    if (!token) {
      return
    }

    try {
      const response = await api.listUsers(token)
      setUsers(response.users)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memuat user')
    }
  }, [token])

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  const updateApproval = async (userId: number, status: ApprovalStatus) => {
    if (!token) {
      return
    }

    setMessage(null)
    try {
      await api.updateApproval(token, userId, status)
      await loadUsers()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memperbarui status')
    }
  }

  return (
    <ProtectedSection session={session} allowedRole="superadmin" onViewChange={onViewChange}>
      <section className="app-section">
        <DashboardHeading eyebrow="Superadmin" title="Approval penyedia travel" user={session!.user} />
        {message && <p className="notice error">{message}</p>}
        <div className="table-list">
          {users.map((user) => (
            <article className="table-row" key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <span className="status-pill">{roleLabel(user.role)}</span>
              <span className={`status-chip ${user.approvalStatus}`}>{statusLabel(user.approvalStatus)}</span>
              {user.role === 'provider' ? (
                <div className="row-actions">
                  <button type="button" onClick={() => updateApproval(user.id, 'approved')}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    Setujui
                  </button>
                  <button type="button" onClick={() => updateApproval(user.id, 'rejected')}>
                    <XCircle size={16} aria-hidden="true" />
                    Tolak
                  </button>
                </div>
              ) : (
                <span>-</span>
              )}
            </article>
          ))}
        </div>
      </section>
    </ProtectedSection>
  )
}

function ProviderDashboard({
  session,
  onViewChange,
}: {
  session: Session | null
  onViewChange: (view: View) => void
}) {
  const [destinationsApi, setDestinationsApi] = useState<ApiDestination[]>([])
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [requests, setRequests] = useState<TripRequest[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [destinationId, setDestinationId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [durationDays, setDurationDays] = useState('1')
  const [estimatedPrice, setEstimatedPrice] = useState('500000')
  const [capacity, setCapacity] = useState('5')
  const [image, setImage] = useState<File | null>(null)
  const token = session?.token

  const loadProviderData = useCallback(async () => {
    if (!token) {
      return
    }

    try {
      const [destinationResponse, packageResponse, requestResponse] = await Promise.all([
        api.listDestinations(),
        api.listProviderPackages(token),
        api.listProviderRequests(token),
      ])
      setDestinationsApi(destinationResponse.destinations)
      setPackages(packageResponse.packages)
      setRequests(requestResponse.requests)
      setDestinationId((currentDestinationId) => {
        if (currentDestinationId) {
          return currentDestinationId
        }

        const firstDestination = destinationResponse.destinations[0]
        return firstDestination ? String(firstDestination.id) : currentDestinationId
      })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memuat data provider')
    }
  }, [token])

  useEffect(() => {
    void loadProviderData()
  }, [loadProviderData])

  const handleCreatePackage = async (event: FormEvent) => {
    event.preventDefault()
    if (!session || !token) {
      return
    }

    setMessage(null)
    setSuccess(null)

    const formData = new FormData()
    formData.set('destinationId', destinationId)
    formData.set('title', title)
    formData.set('description', description)
    formData.set('durationDays', durationDays)
    formData.set('estimatedPrice', estimatedPrice)
    formData.set('capacity', capacity)
    if (image) {
      formData.set('image', image)
    }

    try {
      await api.createPackage(token, formData)
      setSuccess('Paket berhasil dibuat.')
      setTitle('')
      setDescription('')
      setImage(null)
      await loadProviderData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal membuat paket')
    }
  }

  const updateStatus = async (requestId: number, status: 'accepted' | 'rejected' | 'completed') => {
    if (!token) {
      return
    }

    try {
      await api.updateRequestStatus(token, requestId, status)
      await loadProviderData()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memperbarui request')
    }
  }

  return (
    <ProtectedSection session={session} allowedRole="provider" onViewChange={onViewChange}>
      <section className="app-section dashboard-grid">
        <DashboardHeading eyebrow="Provider" title="Kelola paket travel" user={session!.user} />
        {session!.user.approvalStatus !== 'approved' && (
          <p className="notice warning">Akun penyedia travel masih menunggu approval superadmin.</p>
        )}
        {message && <p className="notice error">{message}</p>}
        {success && <p className="notice success">{success}</p>}

        <form className="form-panel" onSubmit={handleCreatePackage}>
          <h3>Paket baru</h3>
          <label>
            Destinasi
            <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)} required>
              {destinationsApi.map((destination) => (
                <option value={destination.id} key={destination.id}>
                  {destination.name} - {destination.city}
                </option>
              ))}
            </select>
          </label>
          <label>
            Judul paket
            <input value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>
          <label>
            Deskripsi
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
          </label>
          <div className="form-grid">
            <label>
              Durasi hari
              <input
                type="number"
                min={1}
                value={durationDays}
                onChange={(event) => setDurationDays(event.target.value)}
                required
              />
            </label>
            <label>
              Harga estimasi
              <input
                type="number"
                min={1}
                value={estimatedPrice}
                onChange={(event) => setEstimatedPrice(event.target.value)}
                required
              />
            </label>
            <label>
              Kapasitas
              <input
                type="number"
                min={1}
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                required
              />
            </label>
          </div>
          <label>
            Foto paket
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              required
            />
          </label>
          <button className="primary-action" type="submit" disabled={session!.user.approvalStatus !== 'approved'}>
            <PackagePlus size={18} aria-hidden="true" />
            Buat paket
          </button>
        </form>

        <Panel title="Request masuk">
          {requests.length === 0 ? (
            <p className="muted">Belum ada request perjalanan.</p>
          ) : (
            requests.map((request) => (
              <RequestItem request={request} key={request.id}>
                <button type="button" onClick={() => updateStatus(request.id, 'accepted')}>
                  Terima
                </button>
                <button type="button" onClick={() => updateStatus(request.id, 'rejected')}>
                  Tolak
                </button>
                <button type="button" onClick={() => updateStatus(request.id, 'completed')}>
                  Selesai
                </button>
              </RequestItem>
            ))
          )}
        </Panel>

        <Panel title="Paket saya">
          <div className="package-grid compact">
            {packages.map((travelPackage) => (
              <PackageCard packageItem={travelPackage} key={travelPackage.id} />
            ))}
          </div>
        </Panel>
      </section>
    </ProtectedSection>
  )
}

function TouristDashboard({
  session,
  onViewChange,
}: {
  session: Session | null
  onViewChange: (view: View) => void
}) {
  const [requests, setRequests] = useState<TripRequest[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const token = session?.token

  useEffect(() => {
    if (!token) {
      return
    }

    api
      .listTouristRequests(token)
      .then((response) => setRequests(response.requests))
      .catch((error) => setMessage(error instanceof Error ? error.message : 'Gagal memuat request'))
  }, [token])

  return (
    <ProtectedSection session={session} allowedRole="tourist" onViewChange={onViewChange}>
      <section className="app-section">
        <DashboardHeading eyebrow="Tourist" title="Request perjalanan saya" user={session!.user} />
        {message && <p className="notice error">{message}</p>}
        <button className="primary-action" type="button" onClick={() => onViewChange('packages')}>
          Cari Paket
        </button>
        <div className="request-list">
          {requests.length === 0 ? (
            <p className="muted">Belum ada request perjalanan.</p>
          ) : (
            requests.map((request) => <RequestItem request={request} key={request.id} />)
          )}
        </div>
      </section>
    </ProtectedSection>
  )
}

function PackagesView({
  session,
  onViewChange,
}: {
  session: Session | null
  onViewChange: (view: View) => void
}) {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null)
  const [preferredDate, setPreferredDate] = useState('')
  const [participantCount, setParticipantCount] = useState('1')
  const [note, setNote] = useState('')
  const [success, setSuccess] = useState<string | null>(null)

  const loadPackages = async () => {
    try {
      const response = await api.listPackages()
      setPackages(response.packages)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memuat paket')
    }
  }

  useEffect(() => {
    void loadPackages()
  }, [])

  const submitRequest = async (event: FormEvent) => {
    event.preventDefault()

    if (!session) {
      onViewChange('login')
      return
    }

    if (session.user.role !== 'tourist' || !selectedPackageId) {
      return
    }

    setMessage(null)
    setSuccess(null)

    try {
      await api.createTripRequest(session.token, {
        packageId: selectedPackageId,
        preferredDate,
        participantCount: Number(participantCount),
        note,
      })
      setSuccess('Request perjalanan berhasil dikirim.')
      setSelectedPackageId(null)
      setPreferredDate('')
      setParticipantCount('1')
      setNote('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal mengirim request')
    }
  }

  return (
    <section className="app-section" aria-labelledby="packages-title">
      <div className="section-heading">
        <p className="eyebrow">Marketplace</p>
        <h2 id="packages-title">Paket travel dari penyedia lokal</h2>
        <p>Turis dapat mengajukan minat perjalanan, lalu penyedia travel memvalidasi request tersebut.</p>
      </div>
      {message && <p className="notice error">{message}</p>}
      {success && <p className="notice success">{success}</p>}
      {packages.length === 0 ? (
        <p className="notice warning">Belum ada paket dari penyedia travel.</p>
      ) : (
        <div className="package-grid">
          {packages.map((travelPackage) => (
            <PackageCard packageItem={travelPackage} key={travelPackage.id}>
              {session?.user.role === 'tourist' ? (
                selectedPackageId === travelPackage.id ? (
                  <form className="inline-form" onSubmit={submitRequest}>
                    <label>
                      Tanggal
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(event) => setPreferredDate(event.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Peserta
                      <input
                        type="number"
                        min={1}
                        max={travelPackage.capacity}
                        value={participantCount}
                        onChange={(event) => setParticipantCount(event.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Catatan
                      <textarea value={note} onChange={(event) => setNote(event.target.value)} />
                    </label>
                    <button className="primary-action" type="submit">
                      Kirim request
                    </button>
                  </form>
                ) : (
                  <button className="primary-action" type="button" onClick={() => setSelectedPackageId(travelPackage.id)}>
                    Request Paket
                  </button>
                )
              ) : (
                <button className="primary-action" type="button" onClick={() => onViewChange(session ? dashboardFor(session.user.role) : 'login')}>
                  {session ? 'Buka Dashboard' : 'Masuk untuk Request'}
                </button>
              )}
            </PackageCard>
          ))}
        </div>
      )}
    </section>
  )
}

function DashboardHeading({ eyebrow, title, user }: { eyebrow: string; title: string; user: AuthUser }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>
        {user.name} - {roleLabel(user.role)} - {statusLabel(user.approvalStatus)}
      </p>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel-block">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function PackageCard({
  packageItem,
  children,
}: {
  packageItem: TravelPackage
  children?: ReactNode
}) {
  const imageUrl = resolveMediaUrl(packageItem.imageUrl)

  return (
    <article className="package-card">
      {imageUrl && (
        <figure className="card-media">
          <img src={imageUrl} alt={packageItem.title} loading="lazy" />
        </figure>
      )}
      <div className="card-topline">
        <span className="category-pill">{packageItem.destinationName}</span>
        <span className="status-pill">{statusLabel(packageItem.status)}</span>
      </div>
      <h3>{packageItem.title}</h3>
      <p className="location">
        <MapPin size={16} aria-hidden="true" />
        {packageItem.city}, {packageItem.province}
      </p>
      <p>{packageItem.description}</p>
      <dl>
        <div>
          <dt>Penyedia</dt>
          <dd>{packageItem.providerName}</dd>
        </div>
        <div>
          <dt>Durasi dan kapasitas</dt>
          <dd>
            {packageItem.durationDays} hari - {packageItem.capacity} peserta
          </dd>
        </div>
        <div>
          <dt>Estimasi harga</dt>
          <dd>{formatCurrency(packageItem.estimatedPrice)}</dd>
        </div>
      </dl>
      {children}
    </article>
  )
}

function RequestItem({ request, children }: { request: TripRequest; children?: ReactNode }) {
  return (
    <article className="request-item">
      <div>
        <strong>{request.packageTitle}</strong>
        <span>{request.destinationName}</span>
      </div>
      <span className={`status-chip ${request.status}`}>{statusLabel(request.status)}</span>
      <p>
        {request.participantCount} peserta, tanggal {request.preferredDate}
      </p>
      {request.note && <p>{request.note}</p>}
      {children && <div className="row-actions">{children}</div>}
    </article>
  )
}

export default App
