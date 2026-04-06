// src/components/AquaCityPhase2.jsx — slides 20–23  (z-index 11)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'
import GlassBox from './GlassBox'

const CARD_HOLD_MS  = 12500
const CARD_FADE_OUT = 0.5

export default function AquaCityPhase2() {
  const phaseRef     = useRef(null)
  const cardRef      = useRef(null)
  const cardTimerRef = useRef(null)

  useEffect(() => {
    // Phase label — scroll-driven fade-in only
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-phase2"]',
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })
    tl.fromTo(phaseRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.06 }, 0.02)
    tl.to({}, { duration: 0 }, 1)

    // Glass box — time-based
    ScrollTrigger.create({
      trigger: '[data-section="aquacity-phase2"]',
      start: '20% top',
      onEnter: () => {
        if (cardTimerRef.current) clearTimeout(cardTimerRef.current)
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: -18 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        cardTimerRef.current = setTimeout(() => {
          gsap.to(cardRef.current, { opacity: 0, y: -35, x: 25, duration: CARD_FADE_OUT, ease: 'power2.in' })
        }, CARD_HOLD_MS)
      },
      onLeaveBack: () => {
        if (cardTimerRef.current) { clearTimeout(cardTimerRef.current); cardTimerRef.current = null }
        gsap.set(cardRef.current, { opacity: 0, y: -18, x: 0 })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (cardTimerRef.current) clearTimeout(cardTimerRef.current)
    }
  }, [])

  return (
    <div data-section="aquacity-phase2">
      <CanvasSection name="aquacity-phase2" totalFrames={189} height="280vh" zIndex={11} focusX={0.18} holdLastRatio={0.021}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.4) 100%)',
        }} />

        <div ref={phaseRef} style={{ position: 'absolute', top: '8%', left: '8%', opacity: 0 }}>
          <span style={{
            color: '#c8a96a', fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)',
            fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            borderLeft: '3px solid #3d8fa3', paddingLeft: '1rem', textShadow: '0 0 18px rgba(61,143,163,0.4)',
          }}>Faza 2 — Večernji sadržaji</span>
        </div>

        <div ref={cardRef} className="slide-card" style={{ position: 'absolute', top: '12%', right: '8%', maxWidth: '540px', opacity: 0 }}>
          <GlassBox teal style={{ borderRadius: '16px', padding: '2rem 2.4rem' }}>
            <p style={{
              color: '#c8a96a', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>Večernji sadržaji</p>
            <h2 style={{
              color: '#f5f3ea', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
            }}>
              Kino na jezeru —<br /><span style={{ fontWeight: 600 }}>pod otvorenim nebom</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['LED ekran na vodi', 'Filmovi, sport i događanja', 'Večernji boravak na jezeru', 'Razlog za večernji izlaz uz jezero'].map((item) => (
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
