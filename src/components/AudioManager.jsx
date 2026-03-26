// src/components/AudioManager.jsx
// Lenis intercepts 'wheel' events — use 'scroll' on window instead.
// Button is always visible and also triggers start on first click.
import { useEffect, useRef, useState } from 'react'

const TARGET_VOL = 0.32
const FADE_STEPS = 60
const FADE_MS    = 3500

export default function AudioManager() {
  const audioRef  = useRef(null)
  const startedRef = useRef(false)
  const mutedRef  = useRef(false)
  const [muted,   setMuted]   = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio      = new Audio('/audio/background.mp3')
    audio.loop       = true
    audio.volume     = 0
    audioRef.current = audio

    const fadeIn = () => {
      let step = 0
      const interval = FADE_MS / FADE_STEPS
      const timer = setInterval(() => {
        step++
        if (!mutedRef.current) {
          audio.volume = Math.min(TARGET_VOL, TARGET_VOL * (step / FADE_STEPS))
        }
        if (step >= FADE_STEPS) clearInterval(timer)
      }, interval)
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      audio.play().then(() => {
        setStarted(true)
        fadeIn()
      }).catch(() => {
        startedRef.current = false // allow retry on next interaction
      })
    }

    // 'lenis:scroll' is dispatched by SmoothScroll on first Lenis scroll tick
    window.addEventListener('lenis:scroll', start)
    window.addEventListener('touchstart',   start, { passive: true })
    window.addEventListener('keydown',      start)

    return () => {
      audio.pause()
      audio.src = ''
      window.removeEventListener('lenis:scroll', start)
      window.removeEventListener('touchstart',   start)
      window.removeEventListener('keydown',      start)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    // If audio hasn't started yet, clicking the button starts it
    if (!startedRef.current) {
      startedRef.current = true
      audio.play().then(() => {
        setStarted(true)
        let step = 0
        const interval = FADE_MS / FADE_STEPS
        const timer = setInterval(() => {
          step++
          if (!mutedRef.current) {
            audio.volume = Math.min(TARGET_VOL, TARGET_VOL * (step / FADE_STEPS))
          }
          if (step >= FADE_STEPS) clearInterval(timer)
        }, interval)
      }).catch(() => {
        startedRef.current = false
      })
      return
    }

    const nowMuted = !muted
    mutedRef.current = nowMuted
    setMuted(nowMuted)

    if (nowMuted) {
      // smooth fade out
      const from = audio.volume
      let step = 0
      const timer = setInterval(() => {
        step++
        audio.volume = Math.max(0, from * (1 - step / 20))
        if (step >= 20) clearInterval(timer)
      }, 30)
    } else {
      // fade back in
      let vol = 0
      const timer = setInterval(() => {
        vol = Math.min(TARGET_VOL, vol + TARGET_VOL / 30)
        audio.volume = vol
        if (vol >= TARGET_VOL) clearInterval(timer)
      }, 50)
    }
  }

  return (
    <button
      onClick={toggle}
      title={!started ? 'Pokreni glazbu' : muted ? 'Uključi glazbu' : 'Isključi glazbu'}
      style={{
        position:       'fixed',
        bottom:         '1.6rem',
        right:          '1.8rem',
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
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,26,20,0.75)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(6, 9, 6, 0.55)'}
    >
      {(!started || muted) ? <IconMuted dim={!started} /> : <IconSound />}
    </button>
  )
}

function IconSound() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.65)" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function IconMuted({ dim }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={dim ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)'}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
