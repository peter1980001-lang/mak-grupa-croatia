// src/components/AquaCityPhase3.jsx — inflatable water park  (z-index 12)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityPhase3() {
  const phaseRef = useRef(null)
  const cardRef  = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase3"]',
        start: 'top top', end: 'bottom bottom', scrub: true,
      },
    })
    tl.fromTo(phaseRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.06 }, 0.02)
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.04)
    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-phase3">
      <CanvasSection name="aquacity-phase3" totalFrames={174} height="320vh" zIndex={12} focusX={0.15}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.05) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)',
        }} />

        <div ref={phaseRef} style={{ position: 'absolute', top: '8%', left: '8%', opacity: 0 }}>
          <span style={{
            color: '#c9a84c', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            borderLeft: '2px solid #c9a84c', paddingLeft: '0.75rem',
          }}>Faza 3 · 2029</span>
        </div>

        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '500px', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c9a84c', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Vodeni park</p>
            <h2 style={{
              color: '#ffffff', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Aquapark na jezeru —<br /><span style={{ fontWeight: 600 }}>za sve uzraste</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['30+ vodenih atrakcija', 'Napuhavajuće platforme i tobogani', 'Najposjećeniji park u regiji'].map((item) => (
                <li key={item} style={{
                  color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontFamily: 'system-ui, sans-serif', fontWeight: 300, marginBottom: '0.65rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ color: '#c9a84c', fontSize: '0.6em' }}>■</span>{item}
                </li>
              ))}
            </ul>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
