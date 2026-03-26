// src/components/AquaCityVision.jsx — slides 9–10 (uses aquacity-vision2 frames)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityVision() {
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const pillarsRef  = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-vision"]',
        start: 'top top', end: 'bottom bottom', scrub: 1.2,
      },
    })
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.20)
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none', duration: 0.18 }, 0.26)
    tl.fromTo(pillarsRef.current,
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: 'none', duration: 0.14 }, 0.44)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-vision">
      <CanvasSection name="aquacity-vision2" totalFrames={186} height="320vh">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%)',
        }} />

        {/* Centered text layout */}
        <div style={{
          position: 'absolute', bottom: '12%',
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', width: '80%', maxWidth: '700px',
        }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            Vizija
          </p>
          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 2rem 0',
          }}>
            Iz mjesta dolaska<br />
            u <span style={{ fontWeight: 600 }}>destinaciju ostanka</span>
          </h2>

          {/* Three pillars in a row */}
          <div ref={pillarsRef} style={{
            opacity: 0, display: 'flex', justifyContent: 'center', gap: '3rem',
          }}>
            {[
              { n: '01', label: 'Aktivno jezero' },
              { n: '02', label: 'Cijeli dan' },
              { n: '03', label: 'Cijelu godinu' },
            ].map((p) => (
              <div key={p.n} style={{ textAlign: 'center' }}>
                <p style={{
                  color: '#c9a84c', fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                  fontFamily: 'system-ui, sans-serif', fontWeight: 600,
                  letterSpacing: '0.05em', margin: '0 0 0.3rem 0',
                }}>{p.n}</p>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                  fontFamily: 'system-ui, sans-serif', fontWeight: 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CanvasSection>
    </div>
  )
}
