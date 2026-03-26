// src/components/AquaCityPhase1.jsx — slides 18–19
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityPhase1() {
  const phaseRef    = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase1"]',
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
    <div data-section="aquacity-phase1">
      <CanvasSection name="aquacity-phase1" totalFrames={170} height="320vh">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
        }} />

        {/* Phase badge — top left */}
        <div ref={phaseRef} style={{
          position: 'absolute', top: '8%', left: '8%',
          opacity: 0, display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{
            color: '#c9a84c', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            borderLeft: '2px solid #c9a84c', paddingLeft: '0.75rem',
          }}>
            Faza 1 · 2027
          </span>
        </div>

        <div style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '500px' }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            Aktivacija jezera
          </p>
          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
          }}>
            Jezero postaje<br />
            <span style={{ fontWeight: 600 }}>prostor boravka</span>
          </h2>
          <ul ref={bodyRef} style={{ opacity: 0, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Električni PLJUS brodići',
              'Plutajuće platforme na vodi',
              'Novo iskustvo za posjetitelje',
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
