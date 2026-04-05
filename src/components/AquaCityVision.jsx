// src/components/AquaCityVision.jsx — slides 9–10  (z-index 7)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

const CARD_HOLD_MS  = 12500
const CARD_FADE_OUT = 0.5

export default function AquaCityVision() {
  const cardRef      = useRef(null)
  const cardTimerRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '[data-section="aquacity-vision"]',
      start: '20% top',
      onEnter: () => {
        if (cardTimerRef.current) clearTimeout(cardTimerRef.current)
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        cardTimerRef.current = setTimeout(() => {
          gsap.to(cardRef.current, { opacity: 0, y: -35, scale: 1.04, duration: CARD_FADE_OUT, ease: 'power2.in' })
        }, CARD_HOLD_MS)
      },
      onLeaveBack: () => {
        if (cardTimerRef.current) { clearTimeout(cardTimerRef.current); cardTimerRef.current = null }
        gsap.set(cardRef.current, { opacity: 0, y: 18, scale: 1 })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (cardTimerRef.current) clearTimeout(cardTimerRef.current)
    }
  }, [])

  return (
    <div data-section="aquacity-vision">
      <CanvasSection name="aquacity-vision2" totalFrames={189} height="320vh" zIndex={7} focusX={0.45} holdLastRatio={0.021}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%)',
        }} />
        <div ref={cardRef} className="slide-card" style={{
          position: 'absolute', top: '12%', right: '8%',
          textAlign: 'center', width: 'min(84%, 700px)', opacity: 0,
        }}>
          <GlassBox style={{ borderRadius: '16px', padding: '2.2rem 2.8rem',  }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Vizija</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
              fontWeight: 300,
              lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 2rem 0',
            }}>
              Iz mjesta dolaska<br />u <span style={{ fontWeight: 600 }}>destinaciju ostanka</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
              {[{ n: '01', label: 'Aktivno jezero' }, { n: '02', label: 'Sadržaj kroz cijeli dan' }, { n: '03', label: 'Cjelogodišnja aktivnost' }].map((p) => (
                <div key={p.n} style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#c8a96a', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 600,
                    letterSpacing: '0.05em', margin: '0 0 0.3rem 0',
                  }}>{p.n}</p>
                  <p style={{
                    color: 'rgba(245,243,234,0.70)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)',
                    fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300,
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
