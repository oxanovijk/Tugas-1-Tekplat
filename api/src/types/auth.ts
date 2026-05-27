export type UserRole = 'superadmin' | 'provider' | 'tourist'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export type AuthUser = {
  id: number
  name: string
  email: string
  role: UserRole
  approvalStatus: ApprovalStatus
}

export type JwtPayload = {
  sub: number
  role: UserRole
}
