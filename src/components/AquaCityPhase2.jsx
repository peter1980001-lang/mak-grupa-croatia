// src/components/AquaCityPhase2.jsx — slides 20–23
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityPhase2() {
  const phaseRef    = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase2"]',
        start: 'top top', end: 'bottom bottom', scrub: 1.2,
      },
    })
    tl.fromTo(phaseRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.10 }, 0.18)
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.24)
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none', duration: 0.16 }, 0.30)
    tl.fromTo(bodyRef.current,
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: 'none', duration: 0.14 }, 0.46)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-phase2">
      <CanvasSection name="aquacity-phase2" totalFrames={185} height="320vh">
        {/* Darker night-scene vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.4) 100%)',
        }} />

        {/* Phase badge */}
        <div ref={phaseRef} style={{
          position: 'absolute', top: '8%', left: '8%',
          opacity: 0, display: 'flex', alignItems: 'center',
        }}>
          <span style={{
            color: '#c9a84c', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            borderLeft: '2px solid #c9a84c', paddingLeft: '0.75rem',
          }}>
            Faza 2 · 2028
          </span>
        </div>

        {/* Text bottom-left */}
        <div style={{ position: 'absolute', bottom: '12%', left: '8%', maxWidth: '520px' }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            Večernji sadržaji
          </p>
          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
          }}>
            Kino na jezeru —<br />
            <span style={{ fontWeight: 600 }}>pod otvorenim nebom</span>
          </h2>
          <ul ref={bodyRef} style={{ opacity: 0, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Vanjski LED ekran na vodi',
              'Filmovi, sport, kulturna događanja',
              'AquaCity aktivan dan i noć',
            ].map((item) => (
              <li key={item} style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                fontFamily: 'system-ui, sans-serif', fontWeight: 300,
                marginBottom: '0.6rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ color: '#c9a84c', fontSize: '0.6em' }}>■</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CanvasSection>
    </div>
  )
}
