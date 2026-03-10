import React from 'react'

// === ACCENT PALETTES (for icon variations) ===
const accents = [
  { skin: '#F5E6D3', hair: '#8B6F47', cloth: '#D4A574', accent: '#C9907A', bg: '#FFF8F0', dark: '#6B4F37' },  // Warm
  { skin: '#E8E0F0', hair: '#7B6890', cloth: '#B8A5D0', accent: '#9B8BB0', bg: '#F5F0FF', dark: '#5A4970' },  // Lavender
  { skin: '#FFE4E1', hair: '#C07070', cloth: '#E8A5A0', accent: '#D48A85', bg: '#FFF5F3', dark: '#A05555' },  // Rosy
]

type IconProps = { accent?: number; className?: string }
function getA(accent: number = 0) { return accents[accent % accents.length] }

// === ICON COMPONENTS ===

function CoupleIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Left person */}
      <circle cx="22" cy="18" r="8" fill={a.skin} />
      <path d="M14 17c0-5 3-9 8-9s8 4 8 4l-2 3c-2-1-4-2-6-1-3 1-5 3-5 5z" fill={a.hair} />
      <path d="M22 26c-8 0-12 5-12 12v6c0 2 1 3 3 3h18c2 0 3-1 3-3v-6c0-7-4-12-12-12z" fill={a.cloth} />
      {/* Right person */}
      <circle cx="42" cy="18" r="8" fill={a.skin} />
      <path d="M34 14c1-4 4-7 8-7s7 3 8 7c0 2-1 3-2 4l-1-3c-1-2-3-3-5-3s-4 1-5 3l-1 3c-1-1-2-2-2-4z" fill={a.dark} />
      <path d="M42 26c-8 0-12 5-12 12v6c0 2 1 3 3 3h18c2 0 3-1 3-3v-6c0-7-4-12-12-12z" fill={a.accent} />
      {/* Heart between */}
      <path d="M32 30c-1-2-3-3-5-2s-2 3-1 5l6 6 6-6c1-2 1-4-1-5s-4 0-5 2z" fill="#E8927C" opacity="0.7" />
    </svg>
  )
}

function BestiesIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Left bestie */}
      <circle cx="20" cy="19" r="8" fill={a.skin} />
      <path d="M12 18c0-5 4-10 8-10 3 0 5 2 6 4l-2 4c-1-2-3-3-5-3-3 0-5 2-6 5z" fill={a.hair} />
      <ellipse cx="20" cy="12" rx="6" ry="3" fill={a.hair} />
      <path d="M20 27c-7 0-11 4-11 10v7c0 2 1 3 3 3h16c2 0 3-1 3-3v-7c0-6-4-10-11-10z" fill={a.cloth} />
      {/* Right bestie */}
      <circle cx="44" cy="19" r="8" fill={a.skin} />
      <path d="M36 15c1-4 4-6 8-6s7 3 7 7c0 1 0 2-1 3l-2-3c-1-2-3-3-5-2-2 0-4 1-5 3z" fill={a.dark} />
      <path d="M44 27c-7 0-11 4-11 10v7c0 2 1 3 3 3h16c2 0 3-1 3-3v-7c0-6-4-10-11-10z" fill={a.accent} />
      {/* Peace sign / high five */}
      <path d="M30 34l2-4 2 4-2 3z" fill={a.skin} />
      <path d="M34 34l-2-4-2 4 2 3z" fill={a.skin} />
      {/* Star sparkle */}
      <path d="M32 8l1 2 2 0-1.5 1.5.5 2-2-1-2 1 .5-2L29 10l2 0z" fill="#C9A96E" />
    </svg>
  )
}

function SquadIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Back person (center) */}
      <circle cx="32" cy="14" r="7" fill={a.skin} />
      <path d="M25 12c1-4 3-6 7-6s6 2 7 6c0 1-1 2-2 2-1-3-3-4-5-4s-4 1-5 4c-1 0-2-1-2-2z" fill={a.dark} />
      <path d="M32 21c-7 0-10 4-10 9v8c0 1.5 1 2.5 2.5 2.5h15c1.5 0 2.5-1 2.5-2.5v-8c0-5-3-9-10-9z" fill={a.cloth} />
      {/* Left person */}
      <circle cx="17" cy="22" r="7" fill={a.skin} />
      <path d="M10 20c0-4 3-8 7-8 2 0 4 1 5 3l-1 3c-1-2-3-3-4-3-3 0-5 2-5 5z" fill={a.hair} />
      <path d="M17 29c-6 0-9 3-9 8v7c0 1.5 1 2.5 2.5 2.5h13c1.5 0 2.5-1 2.5-2.5v-7c0-5-3-8-9-8z" fill={a.accent} />
      {/* Right person */}
      <circle cx="47" cy="22" r="7" fill={a.skin} />
      <path d="M40 18c1-3 3-5 7-5 3 0 6 3 6 7 0 1 0 2-1 3-1-3-3-5-5-5-3 0-5 2-5 5 0-2-1-3-2-5z" fill={a.hair} />
      <path d="M47 29c-6 0-9 3-9 8v7c0 1.5 1 2.5 2.5 2.5h13c1.5 0 2.5-1 2.5-2.5v-7c0-5-3-8-9-8z" fill={a.cloth} opacity="0.85" />
    </svg>
  )
}

function FamilyIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Parent left */}
      <circle cx="20" cy="16" r="7.5" fill={a.skin} />
      <path d="M12 14c1-5 4-8 8-8s6 3 7 6l-1 3c-1-3-3-5-6-5s-5 2-6 5z" fill={a.hair} />
      <path d="M20 24c-7 0-10 4-10 10v8c0 1.5 1 2.5 2.5 2.5h15c1.5 0 2.5-1 2.5-2.5v-8c0-6-3-10-10-10z" fill={a.cloth} />
      {/* Parent right */}
      <circle cx="44" cy="16" r="7.5" fill={a.skin} />
      <path d="M37 12c1-4 3-6 7-6s6 2 7 6v2c-1-3-3-5-6-4-3 0-5 2-6 5v-3z" fill={a.dark} />
      <path d="M44 24c-7 0-10 4-10 10v8c0 1.5 1 2.5 2.5 2.5h15c1.5 0 2.5-1 2.5-2.5v-8c0-6-3-10-10-10z" fill={a.accent} />
      {/* Child center */}
      <circle cx="32" cy="30" r="5.5" fill={a.skin} />
      <path d="M27 28c0-3 2-5 5-5s5 2 5 5l-2 1c-1-2-2-3-3-3s-2 1-3 3z" fill={a.hair} />
      <path d="M32 36c-5 0-7 3-7 7v3c0 1 1 2 2 2h10c1 0 2-1 2-2v-3c0-4-2-7-7-7z" fill={a.cloth} opacity="0.7" />
    </svg>
  )
}

function MeTimeIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Person relaxing */}
      <circle cx="32" cy="18" r="9" fill={a.skin} />
      <path d="M23 16c1-6 4-10 9-10s8 4 9 10c0 1-1 2-2 2-1-4-3-7-7-7s-6 3-7 7c-1 0-2-1-2-2z" fill={a.hair} />
      <ellipse cx="32" cy="11" rx="7" ry="4" fill={a.hair} />
      <path d="M32 27c-9 0-14 5-14 13v6c0 2 1.5 3 3.5 3h21c2 0 3.5-1 3.5-3v-6c0-8-5-13-14-13z" fill={a.cloth} />
      {/* Book */}
      <rect x="26" y="38" width="12" height="9" rx="1.5" fill={a.bg} stroke={a.accent} strokeWidth="1" />
      <line x1="32" y1="38" x2="32" y2="47" stroke={a.accent} strokeWidth="0.8" />
      {/* Stars */}
      <circle cx="14" cy="12" r="1.5" fill="#C9A96E" opacity="0.6" />
      <circle cx="50" cy="14" r="1" fill="#C9A96E" opacity="0.5" />
      <circle cx="48" cy="8" r="1.5" fill="#C9A96E" opacity="0.4" />
    </svg>
  )
}

function MyLoveIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Person */}
      <circle cx="32" cy="20" r="9" fill={a.skin} />
      <path d="M23 18c1-5 4-9 9-9s8 4 9 9l-2 2c-1-4-4-7-7-7s-6 3-7 7z" fill={a.hair} />
      <path d="M32 29c-9 0-13 5-13 12v5c0 2 1.5 3 3.5 3h19c2 0 3.5-1 3.5-3v-5c0-7-4-12-13-12z" fill={a.cloth} />
      {/* Big heart being held */}
      <path d="M32 36c-2-3-6-4-8-2s-2 5 0 8l8 8 8-8c2-3 2-6 0-8s-6-1-8 2z" fill="#E8927C" opacity="0.8" />
      {/* Small hearts floating */}
      <path d="M12 10c-.5-1-1.5-1.5-2.5-1s-1 1.5-.5 2.5l3 3 3-3c.5-1 .5-2-.5-2.5s-2 0-2.5 1z" fill="#E8927C" opacity="0.4" />
      <path d="M52 8c-.5-1-1.5-1.5-2.5-1s-1 1.5-.5 2.5l3 3 3-3c.5-1 .5-2-.5-2.5s-2 0-2.5 1z" fill="#E8927C" opacity="0.3" />
    </svg>
  )
}

function CoffeeDatesIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Coffee cup */}
      <path d="M16 24h24c1 0 2 1 2 2v16c0 4-3 7-7 7H21c-4 0-7-3-7-7V26c0-1 1-2 2-2z" fill={a.bg} stroke={a.cloth} strokeWidth="1.5" />
      {/* Handle */}
      <path d="M40 28h4c3 0 5 2 5 5s-2 5-5 5h-4" stroke={a.cloth} strokeWidth="1.5" fill="none" />
      {/* Coffee liquid */}
      <ellipse cx="28" cy="30" rx="11" ry="3" fill={a.cloth} opacity="0.4" />
      {/* Saucer */}
      <ellipse cx="28" cy="50" rx="16" ry="3" fill={a.skin} />
      {/* Steam */}
      <path d="M22 18c0-3 2-5 2-8" stroke={a.accent} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M28 16c0-3 2-5 2-8" stroke={a.accent} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M34 18c0-3 2-5 2-8" stroke={a.accent} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Heart on cup */}
      <path d="M28 34c-.8-1.2-2.4-1.6-3.2-.8s-.4 2 .4 3.2l2.8 2.8 2.8-2.8c.8-1.2.8-2.4-.4-3.2s-2.4-.4-3.2.8z" fill="#E8927C" opacity="0.5" />
    </svg>
  )
}

function HomeIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* House body */}
      <rect x="14" y="30" width="36" height="22" rx="2" fill={a.bg} stroke={a.cloth} strokeWidth="1.2" />
      {/* Roof */}
      <path d="M8 32L32 12l24 20" stroke={a.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 30L32 14l20 16z" fill={a.cloth} opacity="0.5" />
      {/* Door */}
      <rect x="27" y="38" width="10" height="14" rx="5" fill={a.accent} />
      <circle cx="35" cy="46" r="1" fill={a.dark} />
      {/* Window left */}
      <rect x="17" y="35" width="7" height="7" rx="1" fill={a.skin} stroke={a.cloth} strokeWidth="0.8" />
      <line x1="20.5" y1="35" x2="20.5" y2="42" stroke={a.cloth} strokeWidth="0.5" />
      <line x1="17" y1="38.5" x2="24" y2="38.5" stroke={a.cloth} strokeWidth="0.5" />
      {/* Window right */}
      <rect x="40" y="35" width="7" height="7" rx="1" fill={a.skin} stroke={a.cloth} strokeWidth="0.8" />
      <line x1="43.5" y1="35" x2="43.5" y2="42" stroke={a.cloth} strokeWidth="0.5" />
      <line x1="40" y1="38.5" x2="47" y2="38.5" stroke={a.cloth} strokeWidth="0.5" />
      {/* Chimney */}
      <rect x="42" y="16" width="6" height="10" rx="1" fill={a.accent} />
      {/* Smoke */}
      <circle cx="45" cy="12" r="2" fill={a.skin} opacity="0.4" />
      <circle cx="47" cy="9" r="1.5" fill={a.skin} opacity="0.3" />
    </svg>
  )
}

function CheersIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Left glass */}
      <path d="M14 20l4 24h10l4-24z" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      <path d="M15 22l3.5 20h9l3.5-20z" fill={a.accent} opacity="0.3" />
      <ellipse cx="23" cy="20" rx="9" ry="3" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      {/* Right glass */}
      <path d="M36 20l4 24h10l4-24z" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      <path d="M37 22l3.5 20h9l3.5-20z" fill={a.cloth} opacity="0.25" />
      <ellipse cx="45" cy="20" rx="9" ry="3" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      {/* Clink sparkle */}
      <circle cx="32" cy="16" r="2" fill="#C9A96E" opacity="0.7" />
      <path d="M32 10l0.8 2 2-0.8-1.5 1.5 1.5 1.5-2-0.8L32 16l-0.8-2-2 0.8 1.5-1.5-1.5-1.5 2 0.8z" fill="#C9A96E" opacity="0.5" />
      {/* Bases */}
      <ellipse cx="23" cy="46" rx="6" ry="2" fill={a.cloth} opacity="0.5" />
      <ellipse cx="45" cy="46" rx="6" ry="2" fill={a.cloth} opacity="0.5" />
      {/* Bubbles */}
      <circle cx="20" cy="28" r="1" fill="white" opacity="0.6" />
      <circle cx="24" cy="32" r="0.8" fill="white" opacity="0.5" />
      <circle cx="42" cy="30" r="1" fill="white" opacity="0.6" />
      <circle cx="46" cy="26" r="0.8" fill="white" opacity="0.5" />
    </svg>
  )
}

function ComfortIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Teddy body */}
      <ellipse cx="32" cy="38" rx="14" ry="16" fill={a.cloth} />
      {/* Teddy head */}
      <circle cx="32" cy="20" r="12" fill={a.cloth} />
      {/* Ears */}
      <circle cx="21" cy="12" r="5" fill={a.cloth} />
      <circle cx="21" cy="12" r="3" fill={a.accent} />
      <circle cx="43" cy="12" r="5" fill={a.cloth} />
      <circle cx="43" cy="12" r="3" fill={a.accent} />
      {/* Face */}
      <ellipse cx="32" cy="23" rx="5" ry="4" fill={a.skin} />
      <ellipse cx="32" cy="22" rx="2" ry="1.5" fill={a.dark} />
      {/* Eyes */}
      <circle cx="27" cy="18" r="1.5" fill={a.dark} />
      <circle cx="37" cy="18" r="1.5" fill={a.dark} />
      {/* Arms */}
      <ellipse cx="17" cy="36" rx="5" ry="7" fill={a.cloth} transform="rotate(-15 17 36)" />
      <ellipse cx="47" cy="36" rx="5" ry="7" fill={a.cloth} transform="rotate(15 47 36)" />
      {/* Feet */}
      <ellipse cx="24" cy="52" rx="6" ry="4" fill={a.cloth} />
      <ellipse cx="40" cy="52" rx="6" ry="4" fill={a.cloth} />
      {/* Belly */}
      <ellipse cx="32" cy="40" rx="6" ry="7" fill={a.skin} opacity="0.5" />
      {/* Bow */}
      <path d="M28 28c-2-1-4 0-4 2s2 3 4 2l4-2-4-2z" fill="#E8927C" opacity="0.6" />
      <path d="M36 28c2-1 4 0 4 2s-2 3-4 2l-4-2 4-2z" fill="#E8927C" opacity="0.6" />
      <circle cx="32" cy="29" r="1.5" fill="#E8927C" opacity="0.7" />
    </svg>
  )
}

function SunshineIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line key={i} x1="32" y1="32" x2={32 + 28 * Math.cos(angle * Math.PI / 180)} y2={32 + 28 * Math.sin(angle * Math.PI / 180)}
          stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      ))}
      {/* Sun body */}
      <circle cx="32" cy="32" r="16" fill={a.cloth} />
      <circle cx="32" cy="32" r="14" fill={a.skin} />
      {/* Cheeks */}
      <circle cx="24" cy="34" r="3" fill={a.accent} opacity="0.4" />
      <circle cx="40" cy="34" r="3" fill={a.accent} opacity="0.4" />
      {/* Smile */}
      <path d="M26 36c2 3 8 3 10 0" stroke={a.dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <ellipse cx="27" cy="30" rx="1.5" ry="2" fill={a.dark} />
      <ellipse cx="37" cy="30" rx="1.5" ry="2" fill={a.dark} />
    </svg>
  )
}

function LoveIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Big central heart */}
      <path d="M32 52c-2-2-20-14-20-26 0-7 5-12 11-12 4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 5 11 12 0 12-18 24-20 26z" fill={a.accent} />
      <path d="M32 48c-2-2-16-12-16-22 0-6 4-10 9-10 3 0 5 2 7 4 2-2 4-4 7-4 5 0 9 4 9 10 0 10-14 20-16 22z" fill={a.cloth} />
      {/* Inner highlight */}
      <path d="M32 44c-1.5-1.5-12-9-12-17 0-4 3-7 6-7 2 0 4 1 5 3 1-2 3-3 5-3 3 0 6 3 6 7 0 8-10 15.5-10 17z" fill={a.skin} opacity="0.5" />
      {/* Small floating hearts */}
      <path d="M12 16c-.6-1-1.8-1.2-2.4-.6s-.4 1.6.2 2.4l2.2 2.2 2.2-2.2c.6-.8.8-1.8-.2-2.4s-1.8-.4-2.4.6z" fill={a.accent} opacity="0.4" />
      <path d="M54 12c-.6-1-1.8-1.2-2.4-.6s-.4 1.6.2 2.4l2.2 2.2 2.2-2.2c.6-.8.8-1.8-.2-2.4s-1.8-.4-2.4.6z" fill={a.accent} opacity="0.35" />
      <path d="M48 46c-.4-.7-1.2-.9-1.6-.4s-.3 1.1.1 1.6l1.5 1.5 1.5-1.5c.4-.5.5-1.2-.1-1.6s-1.2-.3-1.6.4z" fill={a.accent} opacity="0.3" />
    </svg>
  )
}

function AdventuresIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Mountain back */}
      <path d="M0 54l20-32 8 12 4-6 24 26z" fill={a.cloth} opacity="0.5" />
      {/* Mountain front */}
      <path d="M10 54l18-30 18 30z" fill={a.cloth} />
      {/* Snow cap */}
      <path d="M28 24l-5 8h10z" fill="white" opacity="0.7" />
      {/* Sun */}
      <circle cx="52" cy="14" r="6" fill={a.skin} />
      {/* Rays */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <line key={i} x1="52" y1="14" x2={52 + 10 * Math.cos(angle * Math.PI / 180)} y2={14 + 10 * Math.sin(angle * Math.PI / 180)}
          stroke={a.skin} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      ))}
      {/* Flag at peak */}
      <line x1="28" y1="24" x2="28" y2="16" stroke={a.dark} strokeWidth="1" />
      <path d="M28 16l7 3-7 3z" fill="#E8927C" opacity="0.7" />
      {/* Ground */}
      <rect x="0" y="52" width="64" height="12" fill={a.skin} opacity="0.3" />
      {/* Trees */}
      <path d="M6 54l3-8 3 8z" fill={a.dark} opacity="0.4" />
      <path d="M52 54l3-8 3 8z" fill={a.dark} opacity="0.4" />
    </svg>
  )
}

function MemoriesIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Camera body */}
      <rect x="10" y="20" width="44" height="32" rx="5" fill={a.cloth} />
      {/* Camera top bump */}
      <rect x="24" y="14" width="16" height="8" rx="3" fill={a.accent} />
      {/* Lens outer */}
      <circle cx="32" cy="36" r="12" fill={a.dark} />
      <circle cx="32" cy="36" r="10" fill={a.skin} />
      <circle cx="32" cy="36" r="7" fill={a.bg} />
      <circle cx="32" cy="36" r="4" fill={a.dark} opacity="0.6" />
      {/* Lens shine */}
      <circle cx="29" cy="33" r="2" fill="white" opacity="0.5" />
      {/* Flash */}
      <circle cx="46" cy="26" r="2.5" fill={a.skin} />
      {/* Button */}
      <circle cx="38" cy="17" r="2" fill={a.dark} opacity="0.4" />
      {/* Decorative sparkle */}
      <circle cx="10" cy="14" r="1.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="54" cy="16" r="1" fill="#C9A96E" opacity="0.4" />
    </svg>
  )
}

function GettingReadyIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Mirror frame */}
      <ellipse cx="32" cy="28" rx="18" ry="22" fill={a.cloth} />
      <ellipse cx="32" cy="28" rx="15" ry="19" fill={a.bg} />
      {/* Mirror stand */}
      <rect x="29" y="48" width="6" height="8" fill={a.cloth} />
      <ellipse cx="32" cy="57" rx="10" ry="3" fill={a.cloth} opacity="0.6" />
      {/* Reflection - person silhouette */}
      <circle cx="32" cy="22" r="6" fill={a.skin} opacity="0.7" />
      <path d="M26 21c1-3 3-5 6-5s5 2 6 5l-1 1c-1-2-3-3-5-3s-4 1-5 3z" fill={a.hair} opacity="0.6" />
      <path d="M32 28c-5 0-8 3-8 7v3h16v-3c0-4-3-7-8-7z" fill={a.cloth} opacity="0.4" />
      {/* Sparkles */}
      <circle cx="20" cy="16" r="1.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="44" cy="20" r="1" fill="#C9A96E" opacity="0.4" />
      <circle cx="38" cy="12" r="1.2" fill="#C9A96E" opacity="0.45" />
      {/* Lipstick */}
      <rect x="48" y="36" width="4" height="12" rx="2" fill={a.accent} />
      <rect x="48.5" y="33" width="3" height="4" rx="1" fill="#E8927C" />
    </svg>
  )
}

function PeacefulIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Lotus petals */}
      <ellipse cx="32" cy="40" rx="6" ry="14" fill={a.cloth} opacity="0.6" />
      <ellipse cx="32" cy="40" rx="6" ry="14" fill={a.cloth} opacity="0.5" transform="rotate(30 32 40)" />
      <ellipse cx="32" cy="40" rx="6" ry="14" fill={a.cloth} opacity="0.5" transform="rotate(-30 32 40)" />
      <ellipse cx="32" cy="40" rx="6" ry="14" fill={a.cloth} opacity="0.4" transform="rotate(60 32 40)" />
      <ellipse cx="32" cy="40" rx="6" ry="14" fill={a.cloth} opacity="0.4" transform="rotate(-60 32 40)" />
      {/* Center */}
      <circle cx="32" cy="38" r="6" fill={a.skin} />
      <circle cx="32" cy="38" r="4" fill={a.accent} opacity="0.5" />
      {/* Water reflection */}
      <ellipse cx="32" cy="54" rx="22" ry="4" fill={a.cloth} opacity="0.15" />
      {/* Zen circles */}
      <circle cx="32" cy="18" r="8" fill="none" stroke={a.cloth} strokeWidth="0.8" opacity="0.3" />
      <circle cx="32" cy="18" r="12" fill="none" stroke={a.cloth} strokeWidth="0.6" opacity="0.2" />
      <circle cx="32" cy="18" r="16" fill="none" stroke={a.cloth} strokeWidth="0.4" opacity="0.15" />
    </svg>
  )
}

function AffirmationsIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Scroll/paper */}
      <rect x="12" y="8" width="40" height="48" rx="4" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      {/* Curl top */}
      <path d="M12 12c0-4 3-6 6-4l-2 4z" fill={a.skin} />
      <path d="M52 12c0-4-3-6-6-4l2 4z" fill={a.skin} />
      {/* Text lines */}
      <rect x="20" y="18" width="24" height="2" rx="1" fill={a.cloth} opacity="0.3" />
      <rect x="20" y="24" width="20" height="2" rx="1" fill={a.cloth} opacity="0.25" />
      <rect x="20" y="30" width="22" height="2" rx="1" fill={a.cloth} opacity="0.3" />
      <rect x="20" y="36" width="18" height="2" rx="1" fill={a.cloth} opacity="0.25" />
      {/* Star decoration */}
      <path d="M32 44l2 4 4 0.5-3 3 0.7 4.5L32 54l-3.7 2 0.7-4.5-3-3L30 48z" fill="#C9A96E" opacity="0.6" />
      {/* Decorative corner flourish */}
      <path d="M16 14c2-2 4-2 6 0" stroke={a.accent} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M42 14c2-2 4-2 6 0" stroke={a.accent} strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  )
}

function OurPlaceIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Pin body */}
      <path d="M32 58l-14-20c-4-6-6-12-6-18 0-11 9-16 20-16s20 5 20 16c0 6-2 12-6 18z" fill={a.cloth} />
      <path d="M32 54l-11-16c-3-5-5-10-5-15 0-9 7-13 16-13s16 4 16 13c0 5-2 10-5 15z" fill={a.accent} opacity="0.5" />
      {/* Inner circle */}
      <circle cx="32" cy="24" r="10" fill={a.bg} />
      {/* Heart inside */}
      <path d="M32 32c-1-1.5-7-5-7-10 0-3 2-5 4-5 1.5 0 2.5 1 3 2 .5-1 1.5-2 3-2 2 0 4 2 4 5 0 5-6 8.5-7 10z" fill="#E8927C" opacity="0.6" />
    </svg>
  )
}

function HeartIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Decorative heart with patterns */}
      <path d="M32 54c-2-2-22-15-22-28 0-8 6-14 13-14 4 0 7 2 9 5 2-3 5-5 9-5 7 0 13 6 13 14 0 13-20 26-22 28z" fill={a.cloth} />
      {/* Inner pattern */}
      <path d="M32 48c-1.5-1.5-16-11-16-22 0-6 4-10 9-10 3 0 5 1.5 7 4 2-2.5 4-4 7-4 5 0 9 4 9 10 0 11-14.5 20.5-16 22z" fill={a.accent} opacity="0.6" />
      {/* Highlight */}
      <ellipse cx="24" cy="22" rx="4" ry="5" fill="white" opacity="0.2" transform="rotate(-20 24 22)" />
      {/* Band/ribbon */}
      <path d="M18 30c4 0 8 2 14 2s10-2 14-2" stroke={a.skin} strokeWidth="2" fill="none" opacity="0.5" />
      {/* Sparkles */}
      <circle cx="10" cy="18" r="1.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="54" cy="20" r="1" fill="#C9A96E" opacity="0.4" />
      <circle cx="8" cy="36" r="1" fill="#C9A96E" opacity="0.3" />
    </svg>
  )
}

function JournalIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Book cover */}
      <rect x="12" y="8" width="40" height="48" rx="3" fill={a.cloth} />
      {/* Spine */}
      <rect x="12" y="8" width="6" height="48" rx="2" fill={a.dark} opacity="0.3" />
      {/* Pages */}
      <rect x="16" y="10" width="34" height="44" rx="2" fill={a.bg} />
      {/* Page lines */}
      <rect x="22" y="18" width="22" height="1.5" rx="0.75" fill={a.cloth} opacity="0.2" />
      <rect x="22" y="24" width="20" height="1.5" rx="0.75" fill={a.cloth} opacity="0.2" />
      <rect x="22" y="30" width="18" height="1.5" rx="0.75" fill={a.cloth} opacity="0.2" />
      <rect x="22" y="36" width="22" height="1.5" rx="0.75" fill={a.cloth} opacity="0.2" />
      <rect x="22" y="42" width="16" height="1.5" rx="0.75" fill={a.cloth} opacity="0.2" />
      {/* Bookmark ribbon */}
      <path d="M40 8v16l-3-3-3 3V8" fill="#E8927C" opacity="0.6" />
      {/* Pen */}
      <line x1="48" y1="52" x2="56" y2="10" stroke={a.accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M56 10l1-3-3 1z" fill={a.dark} />
    </svg>
  )
}

function GrowthIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Pot */}
      <path d="M20 42h24l-3 14H23z" fill={a.cloth} />
      <rect x="18" y="40" width="28" height="5" rx="2" fill={a.accent} />
      {/* Soil */}
      <ellipse cx="32" cy="42" rx="10" ry="2" fill={a.dark} opacity="0.3" />
      {/* Stem */}
      <path d="M32 40c0-8-2-14-2-20" stroke={a.dark} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Leaves */}
      <path d="M30 30c-6-2-12-1-14 4 6 2 12-1 14-4z" fill={a.cloth} />
      <path d="M30 30c-3-5-1-12 4-14-3 5-1 12-4 14z" fill={a.accent} opacity="0.7" />
      <path d="M30 22c5-4 12-4 14 1-5-1-11 1-14-1z" fill={a.cloth} opacity="0.8" />
      {/* Flower */}
      <circle cx="30" cy="14" r="4" fill={a.skin} />
      <circle cx="30" cy="14" r="4" fill={a.accent} opacity="0.3" />
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <circle key={i} cx={30 + 5 * Math.cos(angle * Math.PI / 180)} cy={14 + 5 * Math.sin(angle * Math.PI / 180)} r="3" fill={a.skin} opacity="0.6" />
      ))}
      <circle cx="30" cy="14" r="2.5" fill="#C9A96E" opacity="0.6" />
      {/* Sparkles */}
      <circle cx="46" cy="12" r="1" fill="#C9A96E" opacity="0.4" />
      <circle cx="14" cy="18" r="1.2" fill="#C9A96E" opacity="0.35" />
    </svg>
  )
}

function SpecialIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Gift box */}
      <rect x="14" y="28" width="36" height="24" rx="3" fill={a.cloth} />
      {/* Lid */}
      <rect x="12" y="22" width="40" height="8" rx="3" fill={a.accent} />
      {/* Ribbon vertical */}
      <rect x="29" y="22" width="6" height="30" fill={a.skin} opacity="0.5" />
      {/* Ribbon horizontal */}
      <rect x="12" y="24" width="40" height="4" fill={a.skin} opacity="0.5" />
      {/* Bow */}
      <path d="M28 22c-3-2-6-1-6 2s3 4 6 2z" fill="#E8927C" opacity="0.7" />
      <path d="M36 22c3-2 6-1 6 2s-3 4-6 2z" fill="#E8927C" opacity="0.7" />
      <circle cx="32" cy="22" r="2.5" fill="#E8927C" />
      {/* Ribbon tails */}
      <path d="M26 22c-2-4-5-8-8-8" stroke="#E8927C" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M38 22c2-4 5-8 8-8" stroke="#E8927C" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Sparkles */}
      <circle cx="12" cy="12" r="1.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="52" cy="10" r="1" fill="#C9A96E" opacity="0.4" />
      <circle cx="8" cy="20" r="1" fill="#C9A96E" opacity="0.3" />
      <path d="M48 16l1 2 2 0-1.5 1.5.5 2-2-1-2 1 .5-2L46 18l2 0z" fill="#C9A96E" opacity="0.4" />
    </svg>
  )
}

function ReflectionsIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Cloud/thought bubble */}
      <ellipse cx="32" cy="28" rx="20" ry="16" fill={a.bg} stroke={a.cloth} strokeWidth="1" />
      <ellipse cx="22" cy="32" rx="10" ry="8" fill={a.bg} />
      <ellipse cx="42" cy="32" rx="10" ry="8" fill={a.bg} />
      <ellipse cx="32" cy="20" rx="12" ry="8" fill={a.bg} />
      {/* Thought dots */}
      <circle cx="24" cy="48" r="3" fill={a.cloth} opacity="0.5" />
      <circle cx="20" cy="54" r="2" fill={a.cloth} opacity="0.35" />
      <circle cx="17" cy="58" r="1.5" fill={a.cloth} opacity="0.2" />
      {/* Content inside - a small scene */}
      <circle cx="28" cy="26" r="2.5" fill={a.accent} opacity="0.5" />
      <circle cx="36" cy="26" r="2.5" fill={a.accent} opacity="0.5" />
      <path d="M27 30c2 2 6 2 8 0" stroke={a.accent} strokeWidth="1" fill="none" opacity="0.5" />
      {/* Stars */}
      <circle cx="32" cy="18" r="1" fill="#C9A96E" opacity="0.5" />
      <circle cx="38" cy="20" r="0.8" fill="#C9A96E" opacity="0.4" />
    </svg>
  )
}

function PlaylistIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Headphone band */}
      <path d="M12 32c0-11 9-20 20-20s20 9 20 20" stroke={a.cloth} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Left ear cup */}
      <rect x="8" y="28" width="10" height="16" rx="5" fill={a.cloth} />
      <rect x="10" y="30" width="6" height="12" rx="3" fill={a.accent} />
      {/* Right ear cup */}
      <rect x="46" y="28" width="10" height="16" rx="5" fill={a.cloth} />
      <rect x="48" y="30" width="6" height="12" rx="3" fill={a.accent} />
      {/* Music notes */}
      <path d="M28 46v-10" stroke={a.dark} strokeWidth="1.5" />
      <circle cx="26" cy="46" r="3" fill={a.dark} opacity="0.5" />
      <path d="M28 36c4-2 6-1 6 1" stroke={a.dark} strokeWidth="1.5" fill="none" />
      <path d="M34 46v-9" stroke={a.dark} strokeWidth="1.5" />
      <circle cx="32" cy="46" r="3" fill={a.dark} opacity="0.5" />
      {/* Sound waves */}
      <path d="M40 50c2-2 2-6 0-8" stroke={a.accent} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M44 52c3-3 3-10 0-12" stroke={a.accent} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Sparkle */}
      <circle cx="32" cy="18" r="1.5" fill="#C9A96E" opacity="0.5" />
    </svg>
  )
}

function TravelIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Suitcase body */}
      <rect x="14" y="22" width="36" height="28" rx="4" fill={a.cloth} />
      {/* Handle */}
      <path d="M24 22v-6c0-2 2-4 4-4h8c2 0 4 2 4 4v6" stroke={a.dark} strokeWidth="2" fill="none" />
      {/* Straps */}
      <rect x="14" y="32" width="36" height="4" fill={a.accent} opacity="0.5" />
      <rect x="14" y="38" width="36" height="4" fill={a.accent} opacity="0.5" />
      {/* Buckle */}
      <rect x="28" y="30" width="8" height="8" rx="1.5" fill={a.skin} stroke={a.dark} strokeWidth="0.8" />
      <rect x="30" y="32" width="4" height="4" rx="1" fill={a.dark} opacity="0.3" />
      {/* Wheels */}
      <circle cx="22" cy="52" r="2.5" fill={a.dark} opacity="0.5" />
      <circle cx="42" cy="52" r="2.5" fill={a.dark} opacity="0.5" />
      {/* Stickers */}
      <circle cx="20" cy="26" r="3" fill={a.skin} opacity="0.6" />
      <circle cx="44" cy="44" r="2.5" fill="#E8927C" opacity="0.4" />
      {/* Tag */}
      <rect x="46" y="24" width="8" height="5" rx="1" fill={a.skin} />
      <circle cx="47" cy="26" r="0.8" fill={a.dark} opacity="0.4" />
    </svg>
  )
}

function CelebrationIcon({ accent = 0 }: IconProps) {
  const a = getA(accent)
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* Cake base */}
      <rect x="14" y="34" width="36" height="18" rx="4" fill={a.cloth} />
      <rect x="14" y="34" width="36" height="4" rx="2" fill={a.accent} opacity="0.5" />
      {/* Cake top layer */}
      <rect x="18" y="24" width="28" height="12" rx="3" fill={a.skin} />
      <rect x="18" y="24" width="28" height="3" rx="1.5" fill={a.cloth} opacity="0.4" />
      {/* Frosting drips */}
      <path d="M18 27c0 2 2 4 4 3s2-3 0-3c2 0 4 2 4 0s2 3 4 2 2-3 0-2c2-1 4 2 4 0s2 2 4 1 2-3 0-2c2-1 4 2 4 0" stroke={a.bg} strokeWidth="1.5" fill="none" />
      {/* Candles */}
      <rect x="24" y="16" width="2" height="10" rx="1" fill={a.accent} />
      <rect x="31" y="14" width="2" height="12" rx="1" fill={a.accent} />
      <rect x="38" y="16" width="2" height="10" rx="1" fill={a.accent} />
      {/* Flames */}
      <ellipse cx="25" cy="14" rx="1.5" ry="3" fill="#C9A96E" />
      <ellipse cx="32" cy="12" rx="1.5" ry="3" fill="#C9A96E" />
      <ellipse cx="39" cy="14" rx="1.5" ry="3" fill="#C9A96E" />
      {/* Sparkles */}
      <circle cx="10" cy="20" r="1" fill="#C9A96E" opacity="0.4" />
      <circle cx="54" cy="18" r="1.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="8" cy="32" r="1" fill="#E8927C" opacity="0.3" />
      <circle cx="56" cy="30" r="0.8" fill="#E8927C" opacity="0.3" />
    </svg>
  )
}

// === ICON REGISTRY ===

export interface SpaceIconDef {
  id: string
  name: string
  category: string
  component: React.FC<IconProps>
}

export const iconCategories = [
  'People & Relationships',
  'Cozy & Lifestyle',
  'Adventures & Memories',
  'Moods & Feelings',
] as const

export const spaceIconDefs: SpaceIconDef[] = [
  // People & Relationships
  { id: 'couple', name: 'Couple', category: 'People & Relationships', component: CoupleIcon },
  { id: 'besties', name: 'Besties', category: 'People & Relationships', component: BestiesIcon },
  { id: 'squad', name: 'Squad', category: 'People & Relationships', component: SquadIcon },
  { id: 'family', name: 'Family', category: 'People & Relationships', component: FamilyIcon },
  { id: 'me-time', name: 'Me Time', category: 'People & Relationships', component: MeTimeIcon },
  { id: 'my-love', name: 'My Love', category: 'People & Relationships', component: MyLoveIcon },
  // Cozy & Lifestyle
  { id: 'coffee-dates', name: 'Coffee Dates', category: 'Cozy & Lifestyle', component: CoffeeDatesIcon },
  { id: 'home', name: 'Home', category: 'Cozy & Lifestyle', component: HomeIcon },
  { id: 'cheers', name: 'Cheers', category: 'Cozy & Lifestyle', component: CheersIcon },
  { id: 'comfort', name: 'Comfort', category: 'Cozy & Lifestyle', component: ComfortIcon },
  { id: 'sunshine', name: 'Sunshine', category: 'Cozy & Lifestyle', component: SunshineIcon },
  { id: 'love', name: 'Love', category: 'Cozy & Lifestyle', component: LoveIcon },
  // Adventures & Memories
  { id: 'adventures', name: 'Adventures', category: 'Adventures & Memories', component: AdventuresIcon },
  { id: 'memories', name: 'Memories', category: 'Adventures & Memories', component: MemoriesIcon },
  { id: 'getting-ready', name: 'Getting Ready', category: 'Adventures & Memories', component: GettingReadyIcon },
  { id: 'peaceful', name: 'Peaceful', category: 'Adventures & Memories', component: PeacefulIcon },
  { id: 'affirmations', name: 'Affirmations', category: 'Adventures & Memories', component: AffirmationsIcon },
  { id: 'our-place', name: 'Our Place', category: 'Adventures & Memories', component: OurPlaceIcon },
  { id: 'travel', name: 'Travel', category: 'Adventures & Memories', component: TravelIcon },
  { id: 'celebration', name: 'Celebration', category: 'Adventures & Memories', component: CelebrationIcon },
  // Moods & Feelings
  { id: 'heart', name: 'Heart', category: 'Moods & Feelings', component: HeartIcon },
  { id: 'journal', name: 'Journal', category: 'Moods & Feelings', component: JournalIcon },
  { id: 'growth', name: 'Growth', category: 'Moods & Feelings', component: GrowthIcon },
  { id: 'special', name: 'Special', category: 'Moods & Feelings', component: SpecialIcon },
  { id: 'reflections', name: 'Reflections', category: 'Moods & Feelings', component: ReflectionsIcon },
  { id: 'playlist', name: 'Playlist', category: 'Moods & Feelings', component: PlaylistIcon },
]

export function getIconsByCategory(category: string) {
  return spaceIconDefs.filter(d => d.category === category)
}

export function getIconDef(iconId: string): SpaceIconDef | undefined {
  // iconId can be "couple" or "couple-1" (with variation)
  const base = iconId.replace(/-[0-2]$/, '')
  return spaceIconDefs.find(d => d.id === base)
}

export function getIconVariation(iconId: string): number {
  const match = iconId.match(/-([0-2])$/)
  return match ? parseInt(match[1]) : 0
}

export function makeIconId(baseId: string, variation: number): string {
  return variation === 0 ? baseId : `${baseId}-${variation}`
}

// === COLOR PALETTES ===

export interface IconColor {
  id: string
  name: string
  classes: string
  preview: string  // hex for the preview dot
}

export const iconColors: IconColor[] = [
  { id: 'purple-pink', name: 'Lavender Rose', classes: 'from-purple-200/60 to-pink-200/60', preview: '#DDD6FE' },
  { id: 'amber-orange', name: 'Sunset', classes: 'from-amber-200/60 to-orange-200/60', preview: '#FDE68A' },
  { id: 'teal-cyan', name: 'Ocean', classes: 'from-teal-200/60 to-cyan-200/60', preview: '#99F6E4' },
  { id: 'rose-red', name: 'Berry', classes: 'from-rose-200/60 to-red-200/60', preview: '#FECDD3' },
  { id: 'indigo-blue', name: 'Twilight', classes: 'from-indigo-200/60 to-blue-200/60', preview: '#C7D2FE' },
  { id: 'lime-emerald', name: 'Forest', classes: 'from-lime-200/60 to-emerald-200/60', preview: '#D9F99D' },
  { id: 'peach-cream', name: 'Peach', classes: 'from-orange-100/70 to-amber-50/70', preview: '#FFE4CC' },
  { id: 'lavender', name: 'Iris', classes: 'from-violet-200/60 to-purple-100/60', preview: '#DDD6FE' },
  { id: 'sage-mint', name: 'Sage', classes: 'from-emerald-100/60 to-teal-100/60', preview: '#D1FAE5' },
  { id: 'blush', name: 'Blush', classes: 'from-rose-100/70 to-pink-100/70', preview: '#FFE4E6' },
  { id: 'golden', name: 'Honey', classes: 'from-amber-100/70 to-yellow-200/60', preview: '#FEF3C7' },
  { id: 'sky', name: 'Sky', classes: 'from-sky-200/60 to-sky-100/60', preview: '#BAE6FD' },
]

export function getColorClasses(colorId: string): string {
  const color = iconColors.find(c => c.id === colorId)
  return color?.classes || iconColors[0].classes
}

// === TAGLINES (mapped to icon categories) ===

export const iconTaglines: Record<string, string[]> = {
  'couple': [
    'Where every road becomes a story, together.',
    'Two hearts, one timeline.',
    'Our moments, our love.',
    'Side by side, memory by memory.',
  ],
  'besties': [
    'Friends who make life unforgettable.',
    'Laughter, late nights & lasting memories.',
    'The ones who get it.',
    'Partners in every adventure.',
  ],
  'squad': [
    'The crew that makes everything better.',
    'More the merrier, always.',
    'Together is our favorite place.',
    'Our chaos, our memories.',
  ],
  'family': [
    'Every family has a story. This is ours.',
    'Built on love, held together by memories.',
    'Where laughter echoes forever.',
    'Blood, bond, and beautiful chaos.',
  ],
  'me-time': [
    'A space just for me.',
    'My story, my way.',
    'Solo adventures, personal growth.',
    'The quiet chapters, lovingly kept.',
  ],
  'my-love': [
    'The moments that make the heart full.',
    'Love, in all its forms, preserved here.',
    'Every heartbeat holds a story.',
    'Where feelings find a home.',
  ],
  'coffee-dates': [
    'Good conversations, warm cups.',
    'Where ideas and lattes flow.',
    'The best things happen over coffee.',
    'Sip by sip, memory by memory.',
  ],
  'home': [
    'Home is where the memories are made.',
    'The little things that mean everything.',
    'Where ordinary becomes extraordinary.',
    'A life fully lived, beautifully remembered.',
  ],
  'cheers': [
    'Here\'s to the moments worth toasting.',
    'Big moments. Bigger memories.',
    'Joy, laughter, and everything in between.',
    'Life is short. Celebrate everything.',
  ],
  'comfort': [
    'Soft moments, warm hearts.',
    'Where comfort meets memory.',
    'The coziest corner of our story.',
    'Wrapped in memories.',
  ],
  'sunshine': [
    'Bright days, warm memories.',
    'Every sunrise tells a different story.',
    'Let the light in.',
    'Golden moments, sunny hearts.',
  ],
  'love': [
    'Love, in every form imaginable.',
    'The softest moments, held forever.',
    'A little corner for what matters most.',
    'Where love stories live.',
  ],
  'adventures': [
    'Where every road becomes a story.',
    'Miles traveled, memories made.',
    'The world, one memory at a time.',
    'Not all who wander are lost.',
  ],
  'memories': [
    'Captured moments, lasting forever.',
    'Through the lens of love.',
    'Every click tells a story.',
    'Frozen in time, alive in heart.',
  ],
  'getting-ready': [
    'The beautiful chaos before the moment.',
    'Behind every great photo is a story.',
    'Getting ready, together.',
    'The preparation is part of the fun.',
  ],
  'peaceful': [
    'In stillness, we find ourselves.',
    'Quiet moments, deep meaning.',
    'Peace is a place we carry within.',
    'Breathe in the memories.',
  ],
  'affirmations': [
    'Words that lift us up.',
    'Our story, in our words.',
    'The messages that matter.',
    'Written with love.',
  ],
  'our-place': [
    'Every place holds a story.',
    'Where we belong.',
    'The spots that shaped us.',
    'Our favorite corner of the world.',
  ],
  'travel': [
    'Adventures waiting to be remembered.',
    'Far from home, close to the heart.',
    'Passport stamps and precious moments.',
    'Wanderlust and wonderful memories.',
  ],
  'celebration': [
    'Life\'s best chapters, remembered together.',
    'Every reason to celebrate, captured here.',
    'The milestones that light up our story.',
    'Joy, laughter, and everything worth toasting.',
  ],
  'heart': [
    'Feelings too big for words.',
    'Every emotion, treasured.',
    'The heart remembers everything.',
    'Where love lives.',
  ],
  'journal': [
    'Pages of our story.',
    'Written one day at a time.',
    'The chapters that define us.',
    'Our story, our journal.',
  ],
  'growth': [
    'Blooming, one day at a time.',
    'The journey of becoming.',
    'From seeds to stories.',
    'Growing together, always.',
  ],
  'special': [
    'The moments that sparkle.',
    'Something extraordinary, captured here.',
    'Life\'s little treasures.',
    'For the moments that take your breath away.',
  ],
  'reflections': [
    'Looking back to see how far we\'ve come.',
    'Thoughts worth remembering.',
    'The moments we carry with us.',
    'Reflecting on what matters.',
  ],
  'playlist': [
    'The soundtrack of our lives.',
    'Every note, every memory.',
    'Music and memories, intertwined.',
    'The songs that tell our story.',
  ],
}

export function randomTaglineForIcon(iconId: string): string {
  const base = iconId.replace(/-[0-2]$/, '')
  const lines = iconTaglines[base]
  if (!lines) return 'A collection of precious moments.'
  return lines[Math.floor(Math.random() * lines.length)]
}

// === RENDER HELPER ===

export function SpaceIconRenderer({ iconId, size = 'lg' }: { iconId: string; size?: 'sm' | 'md' | 'lg' }) {
  const def = getIconDef(iconId)
  const variation = getIconVariation(iconId)

  if (!def) return <span className="text-4xl">✨</span>

  const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20'

  const IconComp = def.component
  return (
    <div className={`${sizeClass} relative z-10`}>
      <IconComp accent={variation} />
    </div>
  )
}
