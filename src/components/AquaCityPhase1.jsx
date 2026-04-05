// src/components/AquaCityPhase1.jsx — slides 18–19  (z-index 10)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

export default function AquaCityPhase1() {
  const phaseRef = useRef(null)
  const cardRef  = useRef(null)
  const card2Ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase1"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })

    // Phase label — visible throughout
    tl.fromTo(phaseRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.06 }, 0.02)

    // Card 1 (Jezero postaje) — top-left, first half
    tl.fromTo(cardRef.current,
      { opacity: 0, x: -18 }, { opacity: 1, x: 0, ease: 'none', duration: 0.10 }, 0.04)
    tl.to(cardRef.current,
      { opacity: 0, x: -30, ease: 'none', duration: 0.08 }, 0.40)

    // Card 2 (Vremenski okvir) — top-right, second half
    tl.fromTo(card2Ref.current,
      { opacity: 0, x: 18 }, { opacity: 1, x: 0, ease: 'none', duration: 0.10 }, 0.42)
    tl.to(card2Ref.current,
      { opacity: 0, y: -30, ease: 'none', duration: 0.08 }, 0.92)

    tl.to({}, { duration: 0 }, 1)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-phase1">
      <CanvasSection name="aquacity-phase1" totalFrames={192} height="500vh" zIndex={10} focusX={0.25} holdLastRatio={0.14}>

        {/* Left overlay for card 1 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }} />
        {/* Right overlay for card 2 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
        }} />

        {/* Phase label */}
        <div ref={phaseRef} style={{ position: 'absolute', top: '8%', left: '8%', opacity: 0 }}>
          <span style={{
            color: '#c8a96a', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)',
            fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            borderLeft: '3px solid #c8a96a', paddingLeft: '1rem', textShadow: '0 0 18px rgba(200,169,106,0.5)',
          }}>Faza 1 — Aktivacija jezera</span>
        </div>

        {/* Card 1: Jezero postaje — top-left, first half */}
        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', top: '12%', left: '8%', width: 'min(84%, 520px)', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Aktivacija jezera</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Jezero postaje<br /><span style={{ fontWeight: 600 }}>prostor boravka</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Električni PLJUS brodići', 'Plutajuće platforme', 'Boravak na vodi', 'Novo iskustvo za posjetitelje i građane'].map((item) => (
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

        {/* Card 2: Vremenski okvir — top-right, second half */}
        <div ref={card2Ref} className="slide-card" style={{ position: 'absolute', top: '12%', right: '8%', width: 'min(84%, 500px)', opacity: 0 }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Vremenski okvir</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Brza i kontrolirana<br /><span style={{ fontWeight: 600 }}>implementacija</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.4rem 0' }}>
              {[
                'Faza 1: unutar 2 mjeseca od odobrenja i dozvola',
                'Daljnje faze razvijaju se postupno, uz potrebna odobrenja',
                'Svaki korak temeljen na stvarnim rezultatima',
              ].map((item) => (
                <li key={item} style={{
                  color: 'rgba(245,243,234,0.75)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, marginBottom: '0.65rem',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                }}>
                  <span style={{ color: '#c8a96a', fontSize: '0.6em', marginTop: '0.4em', flexShrink: 0 }}>■</span>{item}
                </li>
              ))}
            </ul>
            <p style={{
              color: 'rgba(245,243,234,0.55)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300,
              borderTop: '1px solid rgba(200,169,106,0.25)', paddingTop: '1rem', margin: 0, fontStyle: 'italic',
            }}>
              Projekt se razvija u skladu s propisima i u suradnji s nadležnim tijelima
            </p>
          </GlassBox>
        </div>

      </CanvasSection>
    </div>
  )
}
