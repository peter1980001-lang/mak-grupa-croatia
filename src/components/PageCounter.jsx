// src/components/PageCounter.jsx
// Fixed bottom-right pill that shows current section / total.
// Section boundaries are derived from the same vh heights used in HomePage.
import { useEffect, useState } from 'react'

// Heights (in vh) for each section, in document order:
// HeroScroll, AquaCityIntro, static-identity, AquaCityProblem,
// AquaCityLocation, static-varazdin-transit, AquaCityVision,
// static-model, static-phases, Phase1–5,
// static-full-vision, static-partnership, static-nextstep, static-contact
const SECTION_VH = [
  300, 320, 150, 340, 320, 160, 320, 180, 170,
  320, 320, 320, 320, 320, 160, 200, 150, 150,
]
const TOTAL = SECTION_VH.length

function currentPage() {
  const scrollVh = window.scrollY / window.innerHeight
  let cumulative = 0
  for (let i = 0; i < SECTION_VH.length; i++) {
    cumulative += SECTION_VH[i]
    if (scrollVh < cumulative) return i + 1
  }
  return TOTAL
}

const fmt = n => String(n).padStart(2, '0')

export default function PageCounter() {
  const [page, setPage] = useState(1)

  useEffect(() => {
    const update = () => setPage(currentPage())
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{
      position:            'fixed',
      bottom:              '1.6rem',
      right:               '8.4rem',   // sits left of the autoplay button (right: 5rem)
      zIndex:              9999,
      height:              '2.6rem',
      padding:             '0 0.9rem',
      borderRadius:        '99px',
      border:              '1px solid rgba(255,255,255,0.12)',
      background:          'rgba(6, 9, 6, 0.55)',
      backdropFilter:      'blur(16px)',
      WebkitBackdropFilter:'blur(16px)',
      display:             'flex',
      alignItems:          'center',
      gap:                 '0.3rem',
      fontFamily:          'system-ui, sans-serif',
      fontSize:            'clamp(0.6rem, 0.85vw, 0.72rem)',
      letterSpacing:       '0.12em',
      userSelect:          'none',
      pointerEvents:       'none',
    }}>
      <span style={{ color: '#c9a84c', fontWeight: 500 }}>{fmt(page)}</span>
      <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>/</span>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{fmt(TOTAL)}</span>
    </div>
  )
}
