// src/components/AquaCityIntro.jsx — slide 2  (z-index 2)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

// Glass box timing constants (ms)
// onEnter fires at 20% scroll ≈ 1.6s after section start (animDur 8s)
// fade-in: 0.4s, hold: 12.5s, fade-out: 0.5s → gone at ~15s from section start
const CARD_HOLD_MS  = 12500
const CARD_FADE_OUT = 0.5

export default function AquaCityIntro() {
  const cardRef      = useRef(null)
  const cardTimerRef = useRef(null)

  useEffect(() => {
    // Glass box — time-based (decoupled from scroll scrub)
    ScrollTrigger.create({
      trigger: '[data-section="aquacity-intro"]',
      start: '20% top',
      onEnter: () => {
        if (cardTimerRef.current) clearTimeout(cardTimerRef.current)
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        cardTimerRef.current = setTimeout(() => {
          gsap.to(cardRef.current, { opacity: 0, y: 40, scale: 0.95, duration: CARD_FADE_OUT, ease: 'power2.in' })
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
    <div data-section="aquacity-intro">
      <CanvasSection name="aquacity-intro" totalFrames={189} height="160vh" zIndex={2} focusX={0.35} holdLastRatio={0.021}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.25) 100%)',
        }} />
        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', bottom: '10%', left: '8%', width: 'min(84%, 640px)', textAlign: 'left', opacity: 0 }}>
          <GlassBox teal style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>AquaCity Varaždin</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2.2rem, 4.8vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0,
            }}>
              Od postojećeg prostora<br />
              do cjelogodišnje<br />
              <span style={{ fontWeight: 600 }}>destinacije</span>
            </h2>
            <p style={{
              color: 'rgba(245,243,234,0.50)', fontSize: 'clamp(0.65rem, 0.95vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300,
              letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem',
            }}>Vizija razvoja M.A.K Grupe · 2026</p>
          </GlassBox>
        </div>
      </CanvasSection>
    </div>
  )
}
