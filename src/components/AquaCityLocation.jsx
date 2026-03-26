// src/components/AquaCityLocation.jsx — slides 6–8  (z-index 4)
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityLocation() {
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-location"]',
        start: 'top top', end: 'bottom bottom', scrub: 1.2,
      },
    })
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.08)
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.13)
    tl.fromTo(bodyRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.22)
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-location">
      <CanvasSection name="aquacity-location" totalFrames={144} height="320vh" zIndex={4}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 35%)',
        }} />
        <div style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', maxWidth: '500px' }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>Strateška lokacija</p>
          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
          }}>
            Rijetka prednost<br />
            <span style={{ fontWeight: 600 }}>za Varaždin</span>
          </h2>
          <ul ref={bodyRef} style={{ opacity: 0, listStyle: 'none', padding: 0, margin: 0 }}>
            {['Prirodno jezero blizu urbanog središta', 'Zagreb · Slovenija · Austrija', 'Promet i vidljivost već postoje'].map((item) => (
              <li key={item} style={{
                color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                fontFamily: 'system-ui, sans-serif', fontWeight: 300, marginBottom: '0.6rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ color: '#c9a84c', fontSize: '0.6em' }}>■</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </CanvasSection>
    </div>
  )
}
