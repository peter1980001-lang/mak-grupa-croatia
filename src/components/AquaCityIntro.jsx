// src/components/AquaCityIntro.jsx — slide 2  (z-index 2)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityIntro() {
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-intro"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.03)
    tl.to(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95, ease: 'none', duration: 0.08 }, 0.92)
    tl.to({}, { duration: 0 }, 1) // anchor timeline to full scroll range
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-intro">
      <CanvasSection name="aquacity-intro" totalFrames={192} height="160vh" zIndex={2} focusX={0.35}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.25) 100%)',
        }} />
        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', bottom: '10%', left: '8%', width: 'min(84%, 640px)', textAlign: 'left', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem', background: 'rgba(8, 12, 8, 0.72)' }}>
            <p style={{
              color: '#c9a84c', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>AquaCity Varaždin</p>
            <h2 style={{
              color: '#ffffff', fontSize: 'clamp(2.2rem, 4.8vw, 4rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 300,
              lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0,
            }}>
              Od postojećeg prostora<br />
              do cjelogodišnje<br />
              <span style={{ fontWeight: 600 }}>destinacije</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.65rem, 0.95vw, 0.8rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 300,
              letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem',
            }}>Vizija razvoja M.A.K Grupe · 2026</p>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
