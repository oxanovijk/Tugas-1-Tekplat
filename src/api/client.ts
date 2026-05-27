export type UserRole = 'superadmin' | 'provider' | 'tourist'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export type AuthUser = {
  id: number
  name: string
  email: string
  role: UserRole
  approvalStatus: ApprovalStatus
}

export type AdminUser = AuthUser & {
  createdAt: string
}

export type ApiDestination = {
  id: number
  name: string
  city: string
  province: string
  category: string
  shortDescription: string
  bestTime: string
  sustainabilityNote: string
  imageUrl: string
  externalTitle: string
}

export type TravelPackage = {
  id: number
  destinationId: number
  destinationName: string
  city: string
  province: string
  providerId: number
  providerName: string
  title: string
  description: string
  durationDays: number
  estimatedPrice: number
  capacity: number
  status: string
  imageUrl: string | null
  createdAt: string
}

export type TripRequest = {
  id: number
  packageId: number
  packageTitle: string
  destinationName: string
  touristId: number
  touristName: string
  providerId: number
  providerName: string
  preferredDate: string
  participantCount: number
  note: string | null
  status: string
  createdAt: string
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: FormData | Record<string, unknown>
  token?: string | null
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, ...requestOptions } = options
  const headers = new Headers(requestOptions.headers)
  const isFormData = body instanceof FormData

  if (!isFormData && body) {
    headers.set('content-type', 'application/json')
  }

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type')
  const payload = contentType?.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const message = typeof payload?.message === 'string' ? payload.message : 'Request failed'
    throw new Error(message)
  }

  return payload as T
}

export function resolveMediaUrl(path: string | null) {
  if (!path) {
    return null
  }

  if (/^https?:\/\//.test(path)) {
    return path
  }

  if (API_BASE_URL.startsWith('http')) {
    return `${new URL(API_BASE_URL).origin}${path}`
  }

  return path
}

export const api = {
  register: (payload: { name: string; email: string; password: string; role: UserRole }) =>
    apiRequest<{ user: AuthUser; token: string }>('/auth/register', {
      method: 'POST',
      body: payload,
    }),
  login: (payload: { email: string; password: string }) =>
    apiRequest<{ user: AuthUser; token: string }>('/auth/login', {
      method: 'POST',
      body: payload,
    }),
  me: (token: string) => apiRequest<{ user: AuthUser }>('/auth/me', { token }),
  listUsers: (token: string) => apiRequest<{ users: AdminUser[] }>('/admin/users', { token }),
  updateApproval: (token: string, userId: number, status: ApprovalStatus) =>
    apiRequest<{ message: string }>(`/admin/users/${userId}/approval`, {
      method: 'PATCH',
      token,
      body: { status },
    }),
  listDestinations: () => apiRequest<{ destinations: ApiDestination[] }>('/destinations'),
  listPackages: () => apiRequest<{ packages: TravelPackage[] }>('/packages'),
  listProviderPackages: (token: string) => apiRequest<{ packages: TravelPackage[] }>('/packages/mine', { token }),
  createPackage: (token: string, payload: FormData) =>
    apiRequest<{ id: number; message: string }>('/packages', {
      method: 'POST',
      token,
      body: payload,
    }),
  createTripRequest: (
    token: string,
    payload: { packageId: number; preferredDate: string; participantCount: number; note: string },
  ) =>
    apiRequest<{ id: number; message: string }>('/requests', {
      method: 'POST',
      token,
      body: payload,
    }),
  listTouristRequests: (token: string) =>
    apiRequest<{ requests: TripRequest[] }>('/requests/tourist', { token }),
  listProviderRequests: (token: string) =>
    apiRequest<{ requests: TripRequest[] }>('/requests/provider', { token }),
  updateRequestStatus: (token: string, requestId: number, status: 'accepted' | 'rejected' | 'completed') =>
    apiRequest<{ message: string }>(`/requests/${requestId}/status`, {
      method: 'PATCH',
      token,
      body: { status },
    }),
}
