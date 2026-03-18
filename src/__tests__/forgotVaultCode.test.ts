import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api, setToken } from '../api'

// Helper to mock a successful fetch response
function mockFetch(body: object, ok = true, status = 200) {
  vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok,
    status,
    json: async () => body,
  } as Response)
}

// Helper to mock a failed fetch response with an error body
function mockFetchError(error: string, status: number) {
  vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ error }),
  } as Response)
}

beforeEach(() => {
  vi.mocked(globalThis.fetch).mockReset()
  setToken('test-token')
})

// ---------------------------------------------------------------------------
// forgotVaultCode — POST /auth/vault-code/forgot
// ---------------------------------------------------------------------------
describe('api.forgotVaultCode', () => {
  it('sends POST to /auth/vault-code/forgot and resolves on success', async () => {
    mockFetch({ success: true })
    await expect(api.forgotVaultCode()).resolves.toEqual({ success: true })
    expect(globalThis.fetch).toHaveBeenCalledOnce()
    const [url, opts] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toContain('/auth/vault-code/forgot')
    expect(opts.method).toBe('POST')
  })

  it('includes Authorization header with token', async () => {
    mockFetch({ success: true })
    await api.forgotVaultCode()
    const [, opts] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit]
    expect((opts.headers as Record<string, string>)['Authorization']).toBe('Bearer test-token')
  })

  it('throws when no vault code is set (400)', async () => {
    mockFetchError('No vault code set', 400)
    await expect(api.forgotVaultCode()).rejects.toThrow('No vault code set')
  })

  it('throws on network error', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network error'))
    await expect(api.forgotVaultCode()).rejects.toThrow()
  })
})

// ---------------------------------------------------------------------------
// resetVaultCode — POST /auth/vault-code/reset
// ---------------------------------------------------------------------------
describe('api.resetVaultCode', () => {
  it('sends POST to /auth/vault-code/reset with otpCode and newCode', async () => {
    mockFetch({ success: true })
    await expect(api.resetVaultCode('123456', '7890')).resolves.toEqual({ success: true })
    const [url, opts] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toContain('/auth/vault-code/reset')
    expect(opts.method).toBe('POST')
    expect(JSON.parse(opts.body as string)).toEqual({ otpCode: '123456', newCode: '7890' })
  })

  it('throws on invalid OTP (401)', async () => {
    mockFetchError('Invalid code. Please check your email.', 401)
    await expect(api.resetVaultCode('000000', '1234')).rejects.toThrow('Invalid code. Please check your email.')
  })

  it('throws when OTP has expired (401)', async () => {
    mockFetchError('Code expired. Request a new one.', 401)
    await expect(api.resetVaultCode('123456', '1234')).rejects.toThrow('Code expired. Request a new one.')
  })

  it('throws when no reset code was requested (400)', async () => {
    mockFetchError('No reset code requested', 400)
    await expect(api.resetVaultCode('123456', '1234')).rejects.toThrow('No reset code requested')
  })

  it('throws when new code is not exactly 4 digits', async () => {
    mockFetchError('New code must be exactly 4 digits', 400)
    await expect(api.resetVaultCode('123456', '12')).rejects.toThrow('New code must be exactly 4 digits')
  })
})

// ---------------------------------------------------------------------------
// Input validation (client-side guards, tested as pure logic)
// ---------------------------------------------------------------------------
describe('Forgot vault flow — client-side validation', () => {
  it('OTP must be exactly 6 digits', () => {
    const isValidOtp = (otp: string) => /^\d{6}$/.test(otp.replace(/\s/g, ''))
    expect(isValidOtp('123456')).toBe(true)
    expect(isValidOtp('12345')).toBe(false)   // too short
    expect(isValidOtp('1234567')).toBe(false) // too long
    expect(isValidOtp('abcdef')).toBe(false)  // non-numeric
    expect(isValidOtp('')).toBe(false)
  })

  it('new PIN must be exactly 4 digits', () => {
    const isValidPin = (pin: string) => /^\d{4}$/.test(pin.replace(/\s/g, ''))
    expect(isValidPin('1234')).toBe(true)
    expect(isValidPin('123')).toBe(false)    // too short
    expect(isValidPin('12345')).toBe(false)  // too long
    expect(isValidPin('abcd')).toBe(false)   // non-numeric
    expect(isValidPin('')).toBe(false)
  })

  it('new PIN and confirm PIN must match', () => {
    const pinsMatch = (a: string, b: string) => a.replace(/\s/g, '') === b.replace(/\s/g, '')
    expect(pinsMatch('1234', '1234')).toBe(true)
    expect(pinsMatch('1234', '5678')).toBe(false)
    expect(pinsMatch('1234', '')).toBe(false)
  })

  it('masked email hides middle characters', () => {
    const maskEmail = (email: string) => email.replace(/(.{2}).*(@.*)/, '$1****$2')
    expect(maskEmail('nikhil@gmail.com')).toBe('ni****@gmail.com')
    expect(maskEmail('ab@test.com')).toBe('ab****@test.com')
  })
})

// ---------------------------------------------------------------------------
// setVaultCode — 409 handling (vault already exists, sync hasVaultCode)
// ---------------------------------------------------------------------------
describe('api.setVaultCode — 409 conflict', () => {
  it('throws with 409 status when vault code already exists', async () => {
    mockFetchError('Vault code already set. Use PATCH to change it.', 409)
    const err = await api.setVaultCode('1234').catch((e) => e)
    expect(err).toBeDefined()
    expect(err.status).toBe(409)
    expect(err.message).toContain('Vault code already set')
  })
})

// ---------------------------------------------------------------------------
// verifyVaultCode — POST /auth/vault-code/verify
// ---------------------------------------------------------------------------
describe('api.verifyVaultCode', () => {
  it('resolves on correct PIN', async () => {
    mockFetch({ success: true })
    await expect(api.verifyVaultCode('1234')).resolves.toEqual({ success: true })
  })

  it('throws on incorrect PIN (401)', async () => {
    mockFetchError('Incorrect code', 401)
    await expect(api.verifyVaultCode('0000')).rejects.toThrow('Incorrect code')
  })

  it('sends the PIN in request body', async () => {
    mockFetch({ success: true })
    await api.verifyVaultCode('5678')
    const [, opts] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(opts.body as string)).toEqual({ code: '5678' })
  })
})
