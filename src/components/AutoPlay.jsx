// src/components/AutoPlay.jsx
// Waypoint-based presentation autoplay.
//
// type:'video'  → scrolls through animation in animDur seconds, then holds
//                 the last frame for HOLD_MS before moving on.
// type:'static' → scrolls through the slide in dur seconds, then moves on.
//
// Tune PLAN and HOLD_MS to adjust timing for every slide.
import { useEffect, useRef, useState, useCallback } from 'react'
import lenisRef from '../lib/lenisRef'

const HOLD_MS   = 7000  // ms to hold finished frame / static slide
const PAUSE_MS  = 2000  // ms before auto-resuming after manual scroll

// ─── per-slide timing ─────────────────────────────────────────────────────────
// video:  animDur = seconds to play through the frames
//         holdRatio = fraction of section height where last frame is held
//                     (must match the holdLastRatio prop on CanvasSection)
// static: dur = seconds to display the slide
const PLAN = [
  { sel: null,                                       type: 'static', dur: 14      },  // Hero (7s title + 7s Predstavlja)
  { sel: '[data-section="aquacity-intro"]',           type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="static-identity"]',          type: 'static', dur: 7       },
  { sel: '[data-section="aquacity-problem"]',         type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="aquacity-location"]',        type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="static-varazdin-transit"]',  type: 'static', dur: 7       },
  { sel: '[data-section="aquacity-vision"]',          type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="static-model"]',             type: 'static', dur: 7       },
  { sel: '[data-section="static-phases"]',            type: 'static', dur: 7       },
  { sel: '[data-section="aquacity-phase1"]',          type: 'video',  animDur: 15, holdRatio: 0.14 },  // 7s card1 + 8s card2
  { sel: '[data-section="aquacity-phase2"]',          type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="aquacity-phase3"]',          type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="aquacity-phase4"]',          type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="aquacity-phase5"]',          type: 'video',  animDur: 8,  holdRatio: 0    },
  { sel: '[data-section="static-full-vision"]',       type: 'static', dur: 7       },
  { sel: '[data-section="static-partnership"]',       type: 'static', dur: 7       },
  { sel: '[data-section="static-public"]',            type: 'static', dur: 7       },
  { sel: '[data-section="static-change"]',            type: 'static', dur: 7       },
  { sel: '[data-section="static-nextstep"]',          type: 'static', dur: 7       },
  { sel: '[data-section="static-contact"]',           type: 'static', dur: 7       },
]

// ─── helpers ──────────────────────────────────────────────────────────────────
function getSectionEl(sel) {
  if (!sel) return null
  return document.querySelector(sel)
}

function getSectionBounds(sel) {
  if (!sel) {
    // Hero: use first data-section element's top as the end of hero
    const first = document.querySelector('[data-section]')
    return { start: 0, end: first ? first.offsetTop : window.innerHeight * 3 }
  }
  const el = getSectionEl(sel)
  if (!el) return null
  return { start: el.offsetTop, end: el.offsetTop + el.offsetHeight }
}

function getCurrentStepIndex(scrollY) {
  for (let i = PLAN.length - 1; i >= 0; i--) {
    const b = getSectionBounds(PLAN[i].sel)
    if (!b) continue
    if (scrollY >= b.start - 10) return i
  }
  return 0
}

// ─── component ────────────────────────────────────────────────────────────────
export default function AutoPlay() {
  const [playing, setPlaying] = useState(false)
  const [done,    setDone]    = useState(false)
  const activeRef   = useRef(false)
  const holdTimer   = useRef(null)
  const pauseTimer  = useRef(null)

  const clearTimers = () => {
    clearTimeout(holdTimer.current)
    clearTimeout(pauseTimer.current)
  }

  const runStep = useCallback((idx) => {
    if (!activeRef.current) return
    if (idx >= PLAN.length) {
      activeRef.current = false
      setPlaying(false)
      setDone(true)
      return
    }

    const step = PLAN[idx]
    const bounds = getSectionBounds(step.sel)
    if (!bounds) { runStep(idx + 1); return }

    const l = lenisRef.current
    if (!l) return

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const currentPos = l.scroll ?? window.scrollY

    if (step.type === 'video') {
      // Scroll through animation portion at animDur speed
      const animEnd = Math.min(
        bounds.start + bounds.end - bounds.start - (bounds.end - bounds.start) * step.holdRatio,
        bounds.end,
        maxScroll
      )
      // Simpler: animEnd = bounds.end - sectionHeight * holdRatio
      const sectionHeight = bounds.end - bounds.start
      const animTarget = Math.min(bounds.start + sectionHeight * (1 - step.holdRatio), maxScroll)

      if (animTarget <= currentPos + 2) {
        // Already past animation — just hold then advance
        holdTimer.current = setTimeout(() => {
          if (!activeRef.current) return
          runStep(idx + 1)
        }, HOLD_MS)
        return
      }

      l.scrollTo(animTarget, {
        duration: step.animDur,
        easing: (t) => t,
        onComplete: () => {
          if (!activeRef.current) return
          // Hold on last frame for HOLD_MS, then advance
          holdTimer.current = setTimeout(() => {
            if (!activeRef.current) return
            runStep(idx + 1)
          }, HOLD_MS)
        },
      })

    } else {
      // Static slide — scroll to end over dur seconds
      const target = Math.min(bounds.end, maxScroll)

      if (target <= currentPos + 2) {
        runStep(idx + 1)
        return
      }

      l.scrollTo(target, {
        duration: step.dur,
        easing: (t) => t,
        onComplete: () => {
          if (!activeRef.current) return
          runStep(idx + 1)
        },
      })
    }
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
    runStep(getCurrentStepIndex(pos))
  }, [runStep])

  const pause = useCallback(() => {
    activeRef.current = false
    clearTimers()
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(false)
    window.dispatchEvent(new CustomEvent('autoplay:pause'))
  }, [])

  const restart = useCallback(() => {
    activeRef.current = false
    clearTimers()
    const l = lenisRef.current
    if (l) { l.stop(); l.scrollTo(0, { immediate: true }) }
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

  // Manual scroll → pause, resume after PAUSE_MS
  useEffect(() => {
    const onManual = () => {
      if (!playing) return
      activeRef.current = false
      clearTimers()
      const l = lenisRef.current
      if (l) l.stop()
      setPlaying(false)
      window.dispatchEvent(new CustomEvent('autoplay:pause'))

      pauseTimer.current = setTimeout(() => {
        const l2 = lenisRef.current
        if (l2) l2.start()
        activeRef.current = true
        setPlaying(true)
        window.dispatchEvent(new CustomEvent('autoplay:resume'))
        const pos = l2?.scroll ?? window.scrollY
        runStep(getCurrentStepIndex(pos))
      }, PAUSE_MS)
    }

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
    }
  }, [playing, runStep])

  useEffect(() => () => {
    activeRef.current = false
    clearTimers()
    lenisRef.current?.stop()
  }, [])

  // ── button ───────────────────────────────────────────────────────────────────
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
    if (playing) { pause() }
    else         { start() }
  }

  return (
    <button
      onClick={handleClick}
      title={done ? 'Ponovi prezentaciju' : playing ? 'Pauziraj autoplay' : 'Pokreni autoplay'}
      style={btn}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,26,20,0.75)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(6, 9, 6, 0.55)'}
    >
      {done ? <IconRestart /> : playing ? <IconPause /> : <IconPlay />}
    </button>
  )
}

function IconPlay() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)"><polygon points="5,3 19,12 5,21" /></svg>
}
function IconPause() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
}
function IconRestart() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" /></svg>
}
