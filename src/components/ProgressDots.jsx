// src/components/ProgressDots.jsx
// Progress bar with prominent dots — filling track + hover enlarge
import { useEffect, useState } from 'react'
import lenisRef from '../lib/lenisRef'

const SECTIONS = [
  null,                                           //  0 Hero
  '[data-section="aquacity-intro"]',              //  1
  '[data-section="static-identity"]',             //  2
  '[data-section="aquacity-problem"]',            //  3
  '[data-section="aquacity-location"]',           //  4
  '[data-section="static-varazdin-transit"]',     //  5
  '[data-section="aquacity-vision"]',             //  6
  '[data-section="static-model"]',                //  7
  '[data-section="static-phases"]',               //  8
  '[data-section="aquacity-phase1"]',             //  9
  '[data-section="aquacity-phase2"]',             // 10
  '[data-section="aquacity-phase3"]',             // 11
  '[data-section="aquacity-phase4"]',             // 12
  '[data-section="aquacity-phase5"]',             // 13
  '[data-section="static-full-vision"]',          // 14
  '[data-section="static-partnership"]',          // 15
  '[data-section="static-public"]',               // 16
  '[data-section="static-change"]',               // 17
  '[data-section="static-nextstep"]',             // 18
  '[data-section="static-contact"]',              // 19
]

const TOTAL = SECTIONS.length          // 20
const DOT_GAP = 18                     // px between dot centres → total track width

function getCurrentDot(scrollY) {
  for (let i = TOTAL - 1; i >= 1; i--) {
    const el = document.querySelector(SECTIONS[i])
    if (!el) continue
    if (scrollY >= el.offsetTop - window.innerHeight * 0.35) return i
  }
  return 0
}

function scrollToSection(i) {
  const l = lenisRef.current
  if (!l) return
  const sel = SECTIONS[i]
  if (!sel) {
    l.scrollTo(0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) })
    return
  }
  const el = document.querySelector(sel)
  if (!el) return
  l.scrollTo(el.offsetTop, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) })
}

function Dot({ i, current }) {
  const [hovered, setHovered] = useState(false)
  const isActive = i === current
  const isDone   = i < current

  const size = hovered ? 12 : isActive ? 9 : 6

  return (
    <button
      onClick={() => scrollToSection(i)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Slide ${i + 1}`}
      style={{
        position:     'relative',
        zIndex:       2,
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: '50%',
        border:       isActive ? '1.5px solid rgba(61,143,163,0.6)' : 'none',
        padding:      0,
        cursor:       'pointer',
        flexShrink:   0,
        background:   isActive
          ? '#3d8fa3'
          : isDone
            ? 'rgba(200,169,106,0.65)'
            : hovered
              ? 'rgba(255,255,255,0.35)'
              : 'rgba(255,255,255,0.18)',
        boxShadow:    isActive ? '0 0 8px rgba(61,143,163,0.55)' : 'none',
        transition:   'all 0.25s ease',
      }}
    />
  )
}

export default function ProgressDots() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const onScroll = () => setCurrent(getCurrentDot(window.scrollY))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // fill % = current dot index / (total - 1)
  const fillPct = (current / (TOTAL - 1)) * 100

  return (
    <div style={{
      position:  'fixed',
      bottom:    '1.65rem',
      left:      '50%',
      transform: 'translateX(-50%)',
      zIndex:    9999,
      display:   'flex',
      alignItems: 'center',
      gap:       `${DOT_GAP - 6}px`,  // visual gap between dots
    }}>
      {/* Track sits behind the dots row */}
      <div style={{
        position:   'absolute',
        left:       0,
        right:      0,
        top:        '50%',
        transform:  'translateY(-50%)',
        height:     '2px',
        background: 'rgba(255,255,255,0.10)',
        borderRadius: '2px',
        overflow:   'hidden',
      }}>
        {/* Filled portion */}
        <div style={{
          height:     '100%',
          width:      `${fillPct}%`,
          background: 'linear-gradient(to right, rgba(200,169,106,0.55), #3d8fa3)',
          borderRadius: '2px',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {SECTIONS.map((_, i) => (
        <Dot key={i} i={i} current={current} />
      ))}
    </div>
  )
}
