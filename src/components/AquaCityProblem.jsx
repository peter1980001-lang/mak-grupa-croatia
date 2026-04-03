// src/components/AquaCityProblem.jsx — slides 3–5  (z-index 4)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityProblem() {
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-problem"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.03)
    tl.to(cardRef.current,
      { opacity: 0, x: -60, ease: 'none', duration: 0.08 }, 0.92)
    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-problem">
      <CanvasSection name="aquacity-problem" totalFrames={144} height="230vh" zIndex={4} focusX={0.3}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
        }} />

        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '540px', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>AquaCity danas</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Jezero postoji.<br />
              <span style={{ fontWeight: 600 }}>Potencijal nije iskorišten.</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.8rem 0' }}>
              {['Aktivnost ograničena na obalu', 'Jezero nema aktivnu ulogu', 'Kratki boravci, mala potrošnja'].map((item) => (
                <li key={item} style={{
                  color: 'rgba(245,243,234,0.75)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, marginBottom: '0.65rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ color: '#c8a96a', fontSize: '0.6em' }}>■</span>{item}
                </li>
              ))}
            </ul>
            <p style={{
              color: 'rgba(245,243,234,0.92)', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, letterSpacing: '0.05em',
              borderTop: '1px solid rgba(200,169,106,0.4)', paddingTop: '1rem', margin: 0,
            }}>
              Lokacija je snaga —{' '}
              <span style={{ color: '#c8a96a', fontWeight: 500 }}>iskorištenje je slabost</span>
            </p>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
