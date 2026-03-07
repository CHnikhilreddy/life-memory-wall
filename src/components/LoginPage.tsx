import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from 'lucide-react'
import { useStore } from '../store/useStore'
import { allUsers } from '../data/mockData'
import ParticleBackground from './ParticleBackground'

type Screen = 'main' | 'email' | 'phone'
type EmailStep = 'enter' | 'password'
type PhoneStep = 'enter' | 'otp'

export default function LoginPage() {
  const login = useStore((s) => s.login)
  const [screen, setScreen] = useState<Screen>('main')

  // Email flow
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailStep, setEmailStep] = useState<EmailStep>('enter')

  // Phone flow
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('enter')
  const [otpSent, setOtpSent] = useState(false)

  const resetAll = () => {
    setScreen('main')
    setEmail('')
    setPassword('')
    setEmailStep('enter')
    setPhone('')
    setOtp(['', '', '', '', '', ''])
    setPhoneStep('enter')
    setOtpSent(false)
  }

  const handleEmailNext = () => {
    if (!email.trim() || !email.includes('@')) return
    setEmailStep('password')
  }

  const handleEmailLogin = () => {
    if (!password.trim()) return
    // Try to match email to a test user, otherwise create as u1
    const matched = allUsers.find((u) => u.email === email.trim().toLowerCase())
    login(matched ? { id: matched.id, name: matched.name, email: matched.email } : { email: email.trim() })
  }

  const handleSendOtp = () => {
    if (phone.length < 10) return
    setOtpSent(true)
    setPhoneStep('otp')
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-submit when all filled
    if (value && index === 5 && newOtp.every((d) => d !== '')) {
      const matched = allUsers.find((u) => u.phone === phone.trim())
      setTimeout(() => login(matched ? { id: matched.id, name: matched.name, phone: matched.phone } : { phone }), 300)
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />

      {/* Decorative blobs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-lavender/40 to-transparent blur-2xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-peach/30 to-transparent blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '5%' }}
      />

      <div className="relative z-10 w-full max-w-sm px-6">
        <AnimatePresence mode="wait">

          {/* ===== MAIN SCREEN ===== */}
          {screen === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-warmDark mb-3 text-shadow-warm">
                  Life Memory Wall
                </h1>
                <p className="font-handwriting text-2xl text-warmDark/60 mb-14">
                  Your stories, beautifully preserved
                </p>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Google */}
                <button
                  onClick={login}
                  className="w-full glass rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-white/60 transition-all duration-500 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-sans text-warmDark group-hover:text-warmDark/80">Continue with Google</span>
                </button>

                {/* Email */}
                <button
                  onClick={() => setScreen('email')}
                  className="w-full glass rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-white/60 transition-all duration-500 group"
                >
                  <Mail className="w-5 h-5 text-warmDark/55" />
                  <span className="font-sans text-warmDark group-hover:text-warmDark/80">Continue with Email</span>
                </button>

                {/* Phone */}
                <button
                  onClick={() => setScreen('phone')}
                  className="w-full glass rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-white/60 transition-all duration-500 group"
                >
                  <Phone className="w-5 h-5 text-warmDark/55" />
                  <span className="font-sans text-warmDark group-hover:text-warmDark/80">Continue with Phone</span>
                </button>
              </motion.div>

              {/* Quick login for testing */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-warmDark/35 text-xs mb-3 font-sans">Quick login as (for testing)</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => login({ id: u.id, name: u.name, email: u.email })}
                      className="glass rounded-full px-4 py-2 text-sm text-warmDark/60 hover:text-warmDark hover:bg-white/60 transition-all flex items-center gap-2"
                    >
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-lavender/60 to-peach/60 flex items-center justify-center text-xs font-serif text-warmDark">
                        {u.name[0]}
                      </span>
                      {u.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.p
                className="mt-6 text-warmDark/35 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                Your memories are safe and private
              </motion.p>
            </motion.div>
          )}

          {/* ===== EMAIL SCREEN ===== */}
          {screen === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={resetAll}
                className="flex items-center gap-2 text-warmDark/50 hover:text-warmDark/70 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <h2 className="font-serif text-3xl text-warmDark mb-2">Welcome back</h2>
              <p className="font-handwriting text-lg text-warmDark/55 mb-8">
                {emailStep === 'enter' ? 'Enter your email to continue' : `Signing in as ${email}`}
              </p>

              <AnimatePresence mode="wait">
                {emailStep === 'enter' ? (
                  <motion.div
                    key="email-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-handwriting text-warmDark/50 text-base block mb-2">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEmailNext()}
                        placeholder="you@example.com"
                        autoFocus
                        className="w-full bg-white/40 rounded-2xl px-5 py-4 text-warmDark font-sans outline-none focus:ring-2 focus:ring-gold/30 transition-all border border-white/50"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleEmailNext}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold/80 to-coral/70 text-white font-serif text-lg"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="password-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-handwriting text-warmDark/50 text-base block mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEmailLogin()}
                          placeholder="Enter your password"
                          autoFocus
                          className="w-full bg-white/40 rounded-2xl px-5 py-4 pr-12 text-warmDark font-sans outline-none focus:ring-2 focus:ring-gold/30 transition-all border border-white/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-warmDark/40 hover:text-warmDark/70 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleEmailLogin}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold/80 to-coral/70 text-white font-serif text-lg"
                    >
                      Sign in
                    </motion.button>
                    <button
                      onClick={() => setEmailStep('enter')}
                      className="w-full text-center text-warmDark/40 text-sm hover:text-warmDark/70 transition-colors"
                    >
                      Use a different email
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ===== PHONE SCREEN ===== */}
          {screen === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={resetAll}
                className="flex items-center gap-2 text-warmDark/50 hover:text-warmDark/70 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <h2 className="font-serif text-3xl text-warmDark mb-2">
                {phoneStep === 'enter' ? 'Your phone number' : 'Enter the code'}
              </h2>
              <p className="font-handwriting text-lg text-warmDark/55 mb-8">
                {phoneStep === 'enter'
                  ? "We'll send you a verification code"
                  : `Sent to +91 ${phone}`}
              </p>

              <AnimatePresence mode="wait">
                {phoneStep === 'enter' ? (
                  <motion.div
                    key="phone-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-handwriting text-warmDark/50 text-base block mb-2">Phone number</label>
                      <div className="flex gap-2">
                        <div className="bg-white/40 rounded-2xl px-4 py-4 text-warmDark font-sans border border-white/50 flex items-center gap-1 text-sm">
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                          placeholder="98765 43210"
                          autoFocus
                          className="flex-1 bg-white/40 rounded-2xl px-5 py-4 text-warmDark font-sans outline-none focus:ring-2 focus:ring-gold/30 transition-all border border-white/50 tracking-wider"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleSendOtp}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold/80 to-coral/70 text-white font-serif text-lg"
                    >
                      Send OTP
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* OTP boxes */}
                    <div className="flex gap-3 justify-center">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          autoFocus={i === 0}
                          className={`w-12 h-14 rounded-xl text-center text-xl font-serif outline-none transition-all border ${
                            digit
                              ? 'bg-white/60 border-gold/40 text-warmDark'
                              : 'bg-white/30 border-white/50 text-warmDark/55'
                          } focus:ring-2 focus:ring-gold/30 focus:border-gold/40`}
                        />
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        if (otp.every((d) => d !== '')) {
                          const matched = allUsers.find((u) => u.phone === phone.trim())
                          login(matched ? { id: matched.id, name: matched.name, phone: matched.phone } : { phone })
                        }
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold/80 to-coral/70 text-white font-serif text-lg"
                    >
                      Verify & Sign in
                    </motion.button>

                    <div className="text-center space-y-2">
                      <button
                        onClick={() => {
                          setOtp(['', '', '', '', '', ''])
                          setOtpSent(false)
                          // Simulate resend
                          setTimeout(() => setOtpSent(true), 500)
                        }}
                        className="text-gold/70 text-sm hover:text-gold transition-colors font-sans"
                      >
                        Resend code
                      </button>
                      <button
                        onClick={() => { setPhoneStep('enter'); setOtp(['', '', '', '', '', '']) }}
                        className="block mx-auto text-warmDark/40 text-sm hover:text-warmDark/70 transition-colors"
                      >
                        Change number
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
