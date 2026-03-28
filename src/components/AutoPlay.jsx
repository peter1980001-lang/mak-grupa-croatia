// src/components/AutoPlay.jsx
// Explore Mode      — Lenis smooth scroll, user-driven.
// Presentation Mode — lenis.scrollTo() with linear easing at constant speed.
//   One captain: Lenis owns scroll in both modes. No external window.scrollTo,
//   no ticker, no GSAP ScrollToPlugin, no conflicts.
import { useEffect, useRef, useState, useCallback } from 'react'
import lenisRef from '../lib/lenisRef'

const SPEED_PX_S = 180   // pixels per second
const PAUSE_MS   = 2000  // ms to wait after a manual scroll before resuming

export default function AutoPlay() {
  const [playing, setPlaying] = useState(false)
  const [done,    setDone]    = useState(false)
  const pauseTimer = useRef(null)

  // ── ask Lenis to scroll to the end from a given position ─────────────────
  const startFrom = useCallback((pos) => {
    const l = lenisRef.current
    if (!l) return
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const remaining = maxScroll - pos
    if (remaining <= 0) {
      setPlaying(false)
      setDone(true)
      return
    }
    l.scrollTo(maxScroll, {
      duration: remaining / SPEED_PX_S,
      easing:   (t) => t,          // linear — constant speed, no ease-in/out
      onComplete: () => {
        setPlaying(false)
        setDone(true)
      },
    })
  }, [])

  // ── start / pause / restart ───────────────────────────────────────────────
  const start = useCallback(() => {
    const l = lenisRef.current
    if (l) l.start()              // ensure Lenis is running
    const pos = lenisRef.current?.scroll ?? window.scrollY
    setPlaying(true)
    setDone(false)
    startFrom(pos)
  }, [startFrom])

  const pause = useCallback(() => {
    const l = lenisRef.current
    if (l) l.stop()               // halt Lenis mid-animation
    setPlaying(false)
  }, [])

  const restart = useCallback(() => {
    const l = lenisRef.current
    if (l) {
      l.stop()
      l.scrollTo(0, { immediate: true })
    }
    setTimeout(() => {
      const l2 = lenisRef.current
      if (l2) l2.start()
      setPlaying(true)
      setDone(false)
      startFrom(0)
    }, 80)
  }, [startFrom])

  // ── manual-scroll detection → pause temporarily ───────────────────────────
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      const l = lenisRef.current
      if (l) l.stop()
      setPlaying(false)

      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => {
        const l2 = lenisRef.current
        if (l2) l2.start()
        const pos = lenisRef.current?.scroll ?? window.scrollY
        setPlaying(true)
        startFrom(pos)
      }, PAUSE_MS)
    }

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing, startFrom])

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    const l = lenisRef.current
    if (l) l.stop()
    clearTimeout(pauseTimer.current)
  }, [])

  // ── button ────────────────────────────────────────────────────────────────
  const btn = {
    position:            'fixed',
    bottom:              '1.6rem',
    right:               '5rem',
    zIndex:              9999,
    width:               '2.6rem',
    height:              '2.6rem',
    borderRadius:        '50%',
    border:              '1px solid rgba(255,255,255,0.12)',
    background:          'rgba(6, 9, 6, 0.55)',
    backdropFilter:      'blur(16px)',
    WebkitBackdropFilter:'blur(16px)',
    cursor:              'pointer',
    display:             'flex',
    alignItems:          'center',
    justifyContent:      'center',
    padding:             0,
    transition:          'background 0.2s ease',
  }

  const handleClick = () => {
    if (done)    { restart(); return }
    if (playing) { pause(); clearTimeout(pauseTimer.current) }
    else         { start() }
  }

  const title = done ? 'Ponovi prezentaciju' : playing ? 'Pauziraj autoplay' : 'Pokreni autoplay'

  return (
    <button
      onClick={handleClick}
      title={title}
      style={btn}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,26,20,0.75)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(6, 9, 6, 0.55)'}
    >
      {done    ? <IconRestart /> :
       playing ? <IconPause />   : <IconPlay />}
    </button>
  )
}

// ── icons ──────────────────────────────────────────────────────────────────
function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)">
      <rect x="6"  y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function IconRestart() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.65)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  )
}
