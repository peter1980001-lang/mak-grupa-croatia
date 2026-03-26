// src/components/AquaCityProblem.jsx  — slides 3–5
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasSection from './CanvasSection'

export default function AquaCityProblem() {
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef     = useRef(null)
  const hookRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-section="aquacity-problem"]',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    // Label: 20→32%
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.20)
    // Headline: 26→42%
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none', duration: 0.16 }, 0.26)
    // Bullet body: 38→52%
    tl.fromTo(bodyRef.current,
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: 'none', duration: 0.14 }, 0.38)
    // Big hook line: 58→72%
    tl.fromTo(hookRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.14 }, 0.58)

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div data-section="aquacity-problem">
      <CanvasSection name="aquacity-problem" totalFrames={144} height="340vh">

        {/* Dark vignette — stronger on left for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
        }} />

        {/* Text — left-center */}
        <div style={{
          position: 'absolute', top: '50%', left: '8%',
          transform: 'translateY(-50%)', maxWidth: '520px',
        }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            AquaCity danas
          </p>

          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.5rem 0',
          }}>
            Jezero postoji.<br />
            <span style={{ fontWeight: 600 }}>Potencijal ne.</span>
          </h2>

          <ul ref={bodyRef} style={{
            opacity: 0, listStyle: 'none', padding: 0, margin: '0 0 2rem 0',
          }}>
            {[
              'Sadržaj ograničen na obalu',
              'Jezero nema aktivnu ulogu',
              'Kratki boravci, ograničena potrošnja',
            ].map((item) => (
              <li key={item} style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                fontFamily: 'system-ui, sans-serif', fontWeight: 300,
                letterSpacing: '0.02em', marginBottom: '0.6rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ color: '#c9a84c', fontSize: '0.6em' }}>■</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Hook line — bottom center */}
        <div ref={hookRef} style={{
          position: 'absolute', bottom: '10%',
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', opacity: 0,
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            letterSpacing: '0.05em',
            borderTop: '1px solid rgba(201,168,76,0.4)',
            paddingTop: '1rem',
          }}>
            Lokacija je snaga —{' '}
            <span style={{ color: '#c9a84c', fontWeight: 500 }}>
              iskorištenje je slabost
            </span>
          </p>
        </div>

      </CanvasSection>
    </div>
  )
}
