// src/components/AutoPlay.jsx
// Drives the page automatically at a constant scroll speed.
// Manual wheel / touch pauses it; a glass button lets the user
// play / pause / restart from anywhere on the page.
import { useEffect, useRef, useState, useCallback } from 'react'
import lenisRef from '../lib/lenisRef'

const SPEED_PX_S = 180   // pixels per second
const PAUSE_MS   = 2000  // how long a manual-scroll pause lasts

export default function AutoPlay() {
  const [playing, setPlaying]   = useState(false)
  const [done,    setDone]      = useState(false)
  const rafRef    = useRef(null)
  const prevTimeRef = useRef(null)
  const pauseTimer  = useRef(null)
  const posRef    = useRef(0)  // shadow of current scroll position

  // ── tick ──────────────────────────────────────────────────────────────────
  const tick = useCallback((timestamp) => {
    if (prevTimeRef.current == null) prevTimeRef.current = timestamp
    const dt = (timestamp - prevTimeRef.current) / 1000
    prevTimeRef.current = timestamp

    const lenis = lenisRef.current
    if (!lenis) { rafRef.current = requestAnimationFrame(tick); return }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    posRef.current  = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)

    lenis.scrollTo(posRef.current, { immediate: true, force: true })

    if (posRef.current >= maxScroll) {
      setPlaying(false)
      setDone(true)
      return
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // ── start / stop helpers ──────────────────────────────────────────────────
  const start = useCallback(() => {
    prevTimeRef.current = null
    setPlaying(true)
    setDone(false)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    setPlaying(false)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }, [])

  const restart = useCallback(() => {
    pause()
    posRef.current = 0
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    setTimeout(() => start(), 80)   // brief delay so scroll settles
  }, [pause, start])

  // ── manual-scroll detection → pause temporarily ───────────────────────────
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      pause()
      // sync shadow position with actual scroll so we resume from here
      posRef.current = window.scrollY
      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => {
        prevTimeRef.current = null
        setPlaying(true)
        rafRef.current = requestAnimationFrame(tick)
      }, PAUSE_MS)
    }
    window.addEventListener('wheel',      onManual, { passive: true })
    window.addEventListener('touchmove',  onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing, pause, tick])

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    clearTimeout(pauseTimer.current)
  }, [])

  // ── button ────────────────────────────────────────────────────────────────
  const btn = {
    position:       'fixed',
    bottom:         '1.6rem',
    right:          '5rem',      // sits left of the audio button (which is at 1.8rem)
    zIndex:         9999,
    width:          '2.6rem',
    height:         '2.6rem',
    borderRadius:   '50%',
    border:         '1px solid rgba(255,255,255,0.12)',
    background:     'rgba(6, 9, 6, 0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    cursor:         'pointer',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        0,
    transition:     'background 0.2s ease',
  }

  const handleClick = () => {
    if (done)    { restart(); return }
    if (playing) { pause()  ; clearTimeout(pauseTimer.current) }
    else         { prevTimeRef.current = null; posRef.current = window.scrollY; start() }
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
