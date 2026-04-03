// src/components/AquaCityLocation.jsx — slides 6–8  (z-index 5)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityLocation() {
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-location"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.03)
    tl.to(cardRef.current,
      { opacity: 0, x: -50, rotation: -1.5, ease: 'none', duration: 0.09 }, 0.91)
    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-location">
      <CanvasSection name="aquacity-location" totalFrames={192} height="320vh" zIndex={5} focusX={0.3}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 35%)',
        }} />
        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '520px', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c9a84c', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Strateška lokacija</p>
            <h2 style={{
              color: '#f0ebe0', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Rijetka prednost<br />
              <span style={{ fontWeight: 600 }}>za Varaždin</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Prirodno jezero blizu urbanog središta', 'Zagreb · Slovenija · Austrija', 'Promet i vidljivost već postoje'].map((item) => (
                <li key={item} style={{
                  color: 'rgba(240,235,224,0.75)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, marginBottom: '0.65rem',
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
