// src/components/AutoPlay.jsx
// Waypoint-based presentation autoplay.
// Each entry defines a CSS selector for a slide's scroll container
// and the exact number of seconds to spend scrolling through it.
// Tune PLAN to adjust timing for every individual slide.
import { useEffect, useRef, useState, useCallback } from 'react'
import lenisRef from '../lib/lenisRef'

// ─── per-slide timing config ──────────────────────────────────────────────────
// sel:  data-section selector of the slide's scroll container div
// dur:  seconds to scroll through this slide during autoplay
const PLAN = [
  { sel: null,                                      dur: 14 },  // Hero (7s title + 7s Predstavlja)
  { sel: '[data-section="aquacity-intro"]',          dur: 8  },  // Od postojećeg prostora cinematic
  { sel: '[data-section="static-identity"]',         dur: 5  },  // Mjesto koje generacije već poznaju
  { sel: '[data-section="aquacity-problem"]',        dur: 8  },  // Jezero postoji cinematic
  { sel: '[data-section="aquacity-location"]',       dur: 8  },  // Strateška lokacija cinematic
  { sel: '[data-section="static-varazdin-transit"]', dur: 6  },  // Varaždin kao točka prolaza
  { sel: '[data-section="aquacity-vision"]',         dur: 8  },  // Vizija cinematic
  { sel: '[data-section="static-model"]',            dur: 7  },  // Model razvoja
  { sel: '[data-section="static-phases"]',           dur: 6  },  // 5 faza transformacije
  { sel: '[data-section="aquacity-phase1"]',         dur: 14 },  // Faza 1 (2 cards)
  { sel: '[data-section="aquacity-phase2"]',         dur: 8  },  // Faza 2
  { sel: '[data-section="aquacity-phase3"]',         dur: 8  },  // Faza 3
  { sel: '[data-section="aquacity-phase4"]',         dur: 8  },  // Faza 4
  { sel: '[data-section="aquacity-phase5"]',         dur: 8  },  // Faza 5
  { sel: '[data-section="static-full-vision"]',      dur: 6  },  // Cjelovita vizija
  { sel: '[data-section="static-partnership"]',      dur: 6  },  // Model suradnje
  { sel: '[data-section="static-public"]',           dur: 5  },  // Prostor ostaje javan
  { sel: '[data-section="static-change"]',           dur: 5  },  // Što se mijenja
  { sel: '[data-section="static-nextstep"]',         dur: 7  },  // Sljedeći korak
  { sel: '[data-section="static-contact"]',          dur: 8  },  // Zaključak + kontakt
]

const PAUSE_MS = 2000  // ms before resuming after manual scroll

// ─── helpers ─────────────────────────────────────────────────────────────────
function getSectionEnd(sel) {
  if (!sel) {
    // Hero: first child div of the page (300vh scroll container)
    const el = document.querySelector('[data-section]')
    return el ? el.offsetTop : window.innerHeight * 3
  }
  const el = document.querySelector(sel)
  if (!el) return null
  return el.offsetTop + el.offsetHeight
}

function getCurrentStepIndex(scrollY) {
  // Find which plan step contains the current scroll position
  for (let i = PLAN.length - 1; i >= 0; i--) {
    const end = getSectionEnd(PLAN[i].sel)
    if (end === null) continue
    const start = i === 0 ? 0 : (getSectionEnd(PLAN[i - 1].sel) ?? 0)
    if (scrollY >= start) return i
  }
  return 0
}

// ─── component ───────────────────────────────────────────────────────────────
export default function AutoPlay() {
  const [playing, setPlaying] = useState(false)
  const [done,    setDone]    = useState(false)
  const stepRef     = useRef(0)
  const pauseTimer  = useRef(null)
  const activeRef   = useRef(false)  // true while autoplay is running

  const runStep = useCallback((idx) => {
    if (!activeRef.current) return
    if (idx >= PLAN.length) {
      activeRef.current = false
      setPlaying(false)
      setDone(true)
      return
    }

    const { sel, dur } = PLAN[idx]
    const target = getSectionEnd(sel)
    if (target === null) { runStep(idx + 1); return }

    const l = lenisRef.current
    if (!l) return

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const clampedTarget = Math.min(target, maxScroll)
    const currentPos = l.scroll ?? window.scrollY

    if (clampedTarget <= currentPos + 2) {
      // Already past this section, skip
      stepRef.current = idx + 1
      runStep(idx + 1)
      return
    }

    stepRef.current = idx
    l.scrollTo(clampedTarget, {
      duration: dur,
      easing: (t) => t,  // linear — constant speed within each slide
      onComplete: () => {
        if (!activeRef.current) return
        runStep(idx + 1)
      },
    })
  }, [])

  const start = useCallback(() => {
    const l = lenisRef.current
    if (!l) return
    l.start()
    activeRef.current = true
    setPlaying(true)
    setDone(false)
    window.dispatchEvent(new CustomEvent('autoplay:resume'))
    const pos = l.scroll ?? window.scrollY
    const idx = getCurrentStepIndex(pos)
    runStep(idx)
  }, [runStep])

  const pause = useCallback(() => {
    activeRef.current = false
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(false)
    window.dispatchEvent(new CustomEvent('autoplay:pause'))
  }, [])

  const restart = useCallback(() => {
    activeRef.current = false
    const l = lenisRef.current
    if (l) {
      l.stop()
      l.scrollTo(0, { immediate: true })
    }
    clearTimeout(pauseTimer.current)
    setTimeout(() => {
      const l2 = lenisRef.current
      if (l2) l2.start()
      activeRef.current = true
      setPlaying(true)
      setDone(false)
      window.dispatchEvent(new CustomEvent('autoplay:resume'))
      runStep(0)
    }, 80)
  }, [runStep])

  // manual scroll → pause, resume after PAUSE_MS
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      activeRef.current = false
      const l = lenisRef.current
      if (l) l.stop()
      setPlaying(false)
      window.dispatchEvent(new CustomEvent('autoplay:pause'))

      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => {
        const l2 = lenisRef.current
        if (l2) l2.start()
        activeRef.current = true
        setPlaying(true)
        window.dispatchEvent(new CustomEvent('autoplay:resume'))
        const pos = l2?.scroll ?? window.scrollY
        const idx = getCurrentStepIndex(pos)
        runStep(idx)
      }, PAUSE_MS)
    }

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing, runStep])

  useEffect(() => () => {
    activeRef.current = false
    const l = lenisRef.current
    if (l) l.stop()
    clearTimeout(pauseTimer.current)
  }, [])

  // ── button ──────────────────────────────────────────────────────────────────
  const btn = {
    position: 'fixed', bottom: '1.6rem', right: '5rem', zIndex: 9999,
    width: '2.6rem', height: '2.6rem', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(6, 9, 6, 0.55)',
    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: 0, transition: 'background 0.2s ease',
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
