// src/components/AutoPlay.jsx
// Drives the page at a constant scroll speed using the GSAP ticker.
// During playback Lenis is stopped; native window.scrollTo + manual
// ScrollTrigger.update() keep all GSAP animations perfectly in sync.
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import lenisRef from '../lib/lenisRef'

const SPEED_PX_S = 180   // pixels per second
const PAUSE_MS   = 2000  // ms to wait after a manual scroll before resuming

export default function AutoPlay() {
  const [playing, setPlaying] = useState(false)
  const [done,    setDone]    = useState(false)
  const posRef      = useRef(0)
  const pauseTimer  = useRef(null)
  const tickRef     = useRef(null)

  // ── define tick once, store in ref so gsap.ticker add/remove is stable ────
  useEffect(() => {
    function tick(_time, deltaTime) {
      // cap delta so a tab-switch doesn't cause a huge jump
      const dt = Math.min(deltaTime, 50) / 1000
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      posRef.current = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)

      // Lenis is stopped during autoplay — drive scroll directly and
      // call ScrollTrigger.update() manually so all GSAP animations sync.
      window.scrollTo(0, posRef.current)
      ScrollTrigger.update()

      if (posRef.current >= maxScroll) {
        gsap.ticker.remove(tickRef.current)
        const l = lenisRef.current
        if (l) l.start()
        setPlaying(false)
        setDone(true)
      }
    }
    tickRef.current = tick
  }, [])

  const start = useCallback(() => {
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(true)
    setDone(false)
    gsap.ticker.add(tickRef.current)
  }, [])

  const pause = useCallback(() => {
    gsap.ticker.remove(tickRef.current)
    const l = lenisRef.current
    if (l) l.start()
    setPlaying(false)
  }, [])

  const restart = useCallback(() => {
    gsap.ticker.remove(tickRef.current)
    posRef.current = 0
    const l = lenisRef.current
    if (l) l.scrollTo(0, { immediate: true })
    setTimeout(() => {
      setPlaying(true)
      setDone(false)
      gsap.ticker.add(tickRef.current)
    }, 80)
  }, [])

  // ── manual-scroll detection → pause temporarily ───────────────────────────
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      gsap.ticker.remove(tickRef.current)
      setPlaying(false)
      const l = lenisRef.current
      if (l) posRef.current = l.scroll ?? window.scrollY

      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => {
        setPlaying(true)
        gsap.ticker.add(tickRef.current)
      }, PAUSE_MS)
    }

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing])

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    gsap.ticker.remove(tickRef.current)
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
    else         { const l = lenisRef.current; posRef.current = l ? (l.scroll ?? window.scrollY) : window.scrollY; start() }
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
