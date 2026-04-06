// src/components/LoadingScreen.jsx
// Full-screen overlay shown while canvas frame sequences are loading.
// CanvasSection dispatches 'frames-registered' (with count) and 'frame-loaded'
// events; this component tracks progress and fades out when done.
import { useState, useEffect, useRef } from 'react'
import logoSrc from '../assets/logo.jpeg'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [fading,   setFading]   = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const totalRef  = useRef(0)
  const loadedRef = useRef(0)

  useEffect(() => {
    const onRegister = (e) => {
      totalRef.current += e.detail.count
    }

    const onLoad = () => {
      loadedRef.current++
      const pct = totalRef.current > 0
        ? Math.min(100, Math.round((loadedRef.current / totalRef.current) * 100))
        : 0
      setProgress(pct)
      if (pct >= 100) {
        setFading(true)
        setTimeout(() => setHidden(true), 900)
      }
    }

    window.addEventListener('frames-registered', onRegister)
    window.addEventListener('frame-loaded',      onLoad)
    return () => {
      window.removeEventListener('frames-registered', onRegister)
      window.removeEventListener('frame-loaded',      onLoad)
    }
  }, [])

  if (hidden) return null

  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      zIndex:         99999,
      background:     '#060906',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '2.4rem',
      opacity:        fading ? 0 : 1,
      transition:     'opacity 0.9s ease',
      pointerEvents:  fading ? 'none' : 'all',
    }}>

      {/* Text + progress bar */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          color:          'rgba(255,255,255,0.4)',
          fontFamily:     'system-ui, sans-serif',
          fontWeight:     300,
          fontSize:       'clamp(0.62rem, 0.95vw, 0.78rem)',
          letterSpacing:  '0.3em',
          textTransform:  'uppercase',
          margin:         '0 0 1.4rem 0',
        }}>
          AquaCity Varaždin
        </p>

        {/* Track */}
        <div style={{
          width:      'clamp(180px, 22vw, 260px)',
          height:     '1px',
          background: 'rgba(255,255,255,0.08)',
          position:   'relative',
          margin:     '0 auto',
        }}>
          {/* Fill */}
          <div style={{
            position:   'absolute',
            left:       0,
            top:        0,
            height:     '100%',
            width:      `${progress}%`,
            background: '#3d8fa3',
            transition: 'width 0.25s ease',
          }} />
        </div>
      </div>

    </div>
  )
}
