// src/components/PageCounter.jsx
// Fixed bottom-right pill showing current section / total.
// Listens to the Lenis scroll event (not native window scroll) so it
// updates correctly whether the user is scrolling manually or via autoplay.
import { useEffect, useState } from 'react'
import lenisRef from '../lib/lenisRef'

// Heights (in vh) for each section, in document order — must match HomePage.jsx
const SECTION_VH = [
  300, // HeroScroll
  320, // AquaCityIntro
  270, // static-identity
  340, // AquaCityProblem
  320, // AquaCityLocation
  290, // static-varazdin-transit
  320, // AquaCityVision
  350, // static-model
  330, // static-phases
  320, // AquaCityPhase1
  320, // AquaCityPhase2
  320, // AquaCityPhase3
  320, // AquaCityPhase4
  320, // AquaCityPhase5
  270, // static-full-vision
  370, // static-partnership
  280, // static-nextstep
  260, // static-contact
]
const TOTAL = SECTION_VH.length

function currentPage(scrollY) {
  const scrollVh = scrollY / window.innerHeight
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
    // Manual scroll: Lenis fires its own event (window.scrollY may lag)
    const updateLenis = ({ scroll }) => setPage(currentPage(scroll))
    // Autoplay: Lenis is stopped, so we catch the native scroll event fired
    // by window.scrollTo() in AutoPlay.jsx
    const updateNative = () => setPage(currentPage(window.scrollY))

    const id = setTimeout(() => {
      const lenis = lenisRef.current
      if (lenis) lenis.on('scroll', updateLenis)
    }, 0)
    window.addEventListener('scroll', updateNative, { passive: true })

    return () => {
      clearTimeout(id)
      const lenis = lenisRef.current
      if (lenis) lenis.off('scroll', updateLenis)
      window.removeEventListener('scroll', updateNative)
    }
  }, [])

  return (
    <div style={{
      position:            'fixed',
      bottom:              '1.6rem',
      right:               '8.4rem',
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
