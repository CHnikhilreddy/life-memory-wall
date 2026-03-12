export function validatePassword(p: string): string | null {
  if (p.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(p)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(p)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(p)) return 'Password must contain at least one number'
  if (!/[^A-Za-z0-9]/.test(p)) return 'Password must contain at least one special character'
  return null
}
