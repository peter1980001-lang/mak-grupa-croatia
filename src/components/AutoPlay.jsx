// src/components/AutoPlay.jsx
// Explore Mode  — Lenis smooth scroll, user-driven, no autoplay.
// Presentation Mode — GSAP ScrollToPlugin animates scroll at constant speed.
//   Lenis is stopped; GSAP + ScrollTrigger are from the same system → no conflict.
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import lenisRef from '../lib/lenisRef'

gsap.registerPlugin(ScrollToPlugin)

const SPEED_PX_S = 180   // pixels per second
const PAUSE_MS   = 2000  // ms to wait after a manual scroll before resuming

export default function AutoPlay() {
  const [playing, setPlaying] = useState(false)
  const [done,    setDone]    = useState(false)
  const tweenRef   = useRef(null)
  const pauseTimer = useRef(null)

  // ── create and start a scroll tween from a given position ─────────────────
  const startTween = useCallback((fromPos) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const remaining = maxScroll - fromPos
    if (remaining <= 0) {
      const l = lenisRef.current
      if (l) l.start()
      setPlaying(false)
      setDone(true)
      return
    }

    tweenRef.current = gsap.to(window, {
      scrollTo: { y: maxScroll },
      duration: remaining / SPEED_PX_S,
      ease: 'none',
      onComplete: () => {
        const l = lenisRef.current
        if (l) l.start()
        setPlaying(false)
        setDone(true)
      },
    })
  }, [])

  // ── start / pause / restart ───────────────────────────────────────────────
  const start = useCallback(() => {
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(true)
    setDone(false)
    startTween(window.scrollY)
  }, [startTween])

  const pause = useCallback(() => {
    tweenRef.current?.pause()
    const l = lenisRef.current
    if (l) l.start()
    setPlaying(false)
  }, [])

  const restart = useCallback(() => {
    tweenRef.current?.kill()
    tweenRef.current = null
    const l = lenisRef.current
    if (l) l.stop()
    window.scrollTo(0, 0)
    setTimeout(() => {
      setPlaying(true)
      setDone(false)
      startTween(0)
    }, 80)
  }, [startTween])

  // ── manual-scroll detection → pause temporarily ───────────────────────────
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      tweenRef.current?.pause()
      setPlaying(false)
      const l = lenisRef.current
      if (l) l.start()

      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => {
        const l2 = lenisRef.current
        if (l2) l2.stop()
        setPlaying(true)
        startTween(window.scrollY)
      }, PAUSE_MS)
    }

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing, startTween])

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    tweenRef.current?.kill()
    clearTimeout(pauseTimer.current)
    const l = lenisRef.current
    if (l) l.start()
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
