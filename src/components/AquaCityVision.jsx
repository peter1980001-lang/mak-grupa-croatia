// src/components/AquaCityVision.jsx — slides 9–10  (z-index 7)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityVision() {
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-vision"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.03)
    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-vision">
      <CanvasSection name="aquacity-vision2" totalFrames={186} height="320vh" zIndex={7} focusX={0.45}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%)',
        }} />
        <div ref={cardRef} className="slide-card slide-card--center" style={{
          position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', width: '80%', maxWidth: '700px', opacity: 0,
        }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2.2rem 2.8rem' }}>
            <p style={{
              color: '#c9a84c', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Vizija</p>
            <h2 style={{
              color: '#ffffff', fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
              fontFamily: 'system-ui, sans-serif', fontWeight: 300,
              lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 2rem 0',
            }}>
              Iz mjesta dolaska<br />u <span style={{ fontWeight: 600 }}>destinaciju ostanka</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
              {[{ n: '01', label: 'Aktivno jezero' }, { n: '02', label: 'Cijeli dan' }, { n: '03', label: 'Cijelu godinu' }].map((p) => (
                <div key={p.n} style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#c9a84c', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontFamily: 'system-ui, sans-serif', fontWeight: 600,
                    letterSpacing: '0.05em', margin: '0 0 0.3rem 0',
                  }}>{p.n}</p>
                  <p style={{
                    color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)',
                    fontFamily: 'system-ui, sans-serif', fontWeight: 300,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{p.label}</p>
                </div>
              ))}
            </div>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
