// src/components/AudioManager.jsx
// Starts on first scroll (satisfies browser autoplay policy), fades in, looping.
// Drop your track at public/audio/background.mp3
import { useEffect, useRef, useState } from 'react'

const TARGET_VOL = 0.32   // max volume (0–1)
const FADE_MS    = 3500   // fade-in duration in ms

export default function AudioManager() {
  const audioRef   = useRef(null)
  const [muted,    setMuted]   = useState(false)
  const [started,  setStarted] = useState(false)
  const mutedRef   = useRef(false)   // sync ref for closure inside fade

  useEffect(() => {
    const audio       = new Audio('/audio/background.mp3')
    audio.loop        = true
    audio.volume      = 0
    audioRef.current  = audio

    const fadeIn = () => {
      const steps    = 60
      const interval = FADE_MS / steps
      let   step     = 0
      const timer = setInterval(() => {
        step++
        if (!mutedRef.current) {
          audio.volume = Math.min(TARGET_VOL, TARGET_VOL * (step / steps))
        }
        if (step >= steps) clearInterval(timer)
      }, interval)
    }

    const start = () => {
      audio.play().then(() => {
        setStarted(true)
        fadeIn()
      }).catch(() => {
        // autoplay still blocked — silently ignore
      })
    }

    // Trigger on first scroll, touch, or click
    const handler = () => start()
    window.addEventListener('wheel',      handler, { once: true, passive: true })
    window.addEventListener('touchstart', handler, { once: true, passive: true })
    window.addEventListener('click',      handler, { once: true })

    return () => {
      audio.pause()
      audio.src = ''
      window.removeEventListener('wheel',      handler)
      window.removeEventListener('touchstart', handler)
      window.removeEventListener('click',      handler)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    const nowMuted = !muted
    mutedRef.current = nowMuted
    setMuted(nowMuted)

    if (nowMuted) {
      audio.volume = 0
    } else {
      // fade back in from 0
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
      title={muted ? 'Uključi glazbu' : 'Isključi glazbu'}
      style={{
        position:   'fixed',
        bottom:     '1.6rem',
        right:      '1.8rem',
        zIndex:     9999,
        width:      '2.6rem',
        height:     '2.6rem',
        borderRadius: '50%',
        border:     '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(6, 9, 6, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor:     'pointer',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:    0,
        opacity:    started ? 1 : 0,
        transition: 'opacity 0.6s ease, background 0.2s ease',
        pointerEvents: started ? 'auto' : 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,26,20,0.75)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(6, 9, 6, 0.55)'}
    >
      {muted ? <IconMuted /> : <IconSound />}
    </button>
  )
}

function IconSound() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function IconMuted() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
