// src/components/AquaCityIntro.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityIntro() {
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const footerRef   = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-intro"]',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.28)
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.18 }, 0.34)
    tl.fromTo(footerRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.50)

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-intro">
      <CanvasSection name="aquacity-intro" totalFrames={192} height="320vh">

        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.25) 100%)',
        }} />

        <div style={{ position: 'absolute', bottom: '12%', left: '8%', maxWidth: '600px' }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            AquaCity Varaždin
          </p>
          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0,
          }}>
            Od postojećeg prostora<br />
            do cjelogodišnje<br />
            <span style={{ fontWeight: 600 }}>destinacije</span>
          </h2>
          <p ref={footerRef} style={{
            opacity: 0, color: 'rgba(255,255,255,0.35)',
            fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem',
          }}>
            Vizija razvoja M.A.K Grupe · 2026
          </p>
        </div>

      </CanvasSection>
    </div>
  )
}
