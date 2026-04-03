// src/components/AquaCityPhase4.jsx — wellness & fitness, year-round  (z-index 13)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityPhase4() {
  const phaseRef = useRef(null)
  const cardRef  = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase4"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(phaseRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.06 }, 0.02)
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.04)
    tl.to(cardRef.current,
      { opacity: 0, y: 45, x: -20, ease: 'none', duration: 0.08 }, 0.92)
    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-phase4">
      <CanvasSection name="aquacity-phase4" totalFrames={192} height="280vh" zIndex={13} focusX={0.65}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)',
        }} />

        <div ref={phaseRef} style={{ position: 'absolute', top: '8%', left: '8%', opacity: 0 }}>
          <span style={{
            color: '#c8a96a', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)',
            fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            borderLeft: '3px solid #c8a96a', paddingLeft: '1rem', textShadow: '0 0 18px rgba(200,169,106,0.5)',
          }}>Faza 4 — Wellness & Fitness</span>
        </div>

        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', bottom: '8%', left: '8%', width: 'min(84%, 500px)', textAlign: 'left', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Wellness & Fitness</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Aktivni odmor —<br /><span style={{ fontWeight: 600 }}>tijekom cijele godine</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Sauna i spa uz jezero', 'Outdoor fitness zona', 'Sadržaj izvan ljetne sezone', 'Novo iskustvo za građane i posjetitelje'].map((item) => (
                <li key={item} style={{
                  color: 'rgba(245,243,234,0.75)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, marginBottom: '0.65rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ color: '#c8a96a', fontSize: '0.6em' }}>■</span>{item}
                </li>
              ))}
            </ul>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
