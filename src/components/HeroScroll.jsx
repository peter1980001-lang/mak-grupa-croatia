// src/components/HeroScroll.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoSrc from '../assets/logo.jpeg'

export default function HeroScroll() {
  const containerRef   = useRef(null)
  const wrapperRef     = useRef(null)
  // Phase 1: project identity
  const titleRef       = useRef(null)
  const taglineRef     = useRef(null)
  const creditRef      = useRef(null)
  const disclaimerRef  = useRef(null)
  // Phase 2: MAK presents AquaCity
  const logoRef        = useRef(null)
  const predstavljaRef = useRef(null)
  const aquacityRef    = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Phase 1: fade in 0→10%, hold, fade out 50→60%
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0)
    tl.to(titleRef.current,
      { opacity: 0, y: -8, ease: 'none', duration: 0.10 }, 0.50)

    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.02)
    tl.to(taglineRef.current,
      { opacity: 0, y: -4, ease: 'none', duration: 0.10 }, 0.50)

    tl.fromTo(creditRef.current,
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.04)
    tl.to(creditRef.current,
      { opacity: 0, y: -4, ease: 'none', duration: 0.10 }, 0.50)

    tl.fromTo(disclaimerRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.10 }, 0.04)
    tl.to(disclaimerRef.current,
      { opacity: 0, ease: 'none', duration: 0.10 }, 0.50)

    // Phase 2: fade in 64→74%, hold until end
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, ease: 'none', duration: 0.10 }, 0.64)
    tl.fromTo(predstavljaRef.current,
      { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.66)
    tl.fromTo(aquacityRef.current,
      { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'none', duration: 0.10 }, 0.68)

    // Brief fade-out at very end — keeps hero hidden before AquaCityIntro snaps in
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.005 }, 0.995)

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <>
      <div ref={containerRef} style={{ height: '300vh' }} />

      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0f2a23',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        {/* ── Phase 1: project identity ── */}
        <div style={{
          position: 'absolute',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <h1
            ref={titleRef}
            style={{
              color: '#f5f3ea',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0,
              margin: 0,
              userSelect: 'none',
            }}
          >
            AquaCity Varaždin
          </h1>

          <p
            ref={taglineRef}
            style={{
              color: 'rgba(245,243,234,0.68)',
              fontSize: 'clamp(0.75rem, 1.5vw, 1.05rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.12em',
              opacity: 0,
              margin: 0,
              userSelect: 'none',
            }}
          >
            Aktivacija jezera u cjelogodišnju destinaciju
          </p>

          <p
            ref={creditRef}
            style={{
              color: 'rgba(245,243,234,0.38)',
              fontSize: 'clamp(0.6rem, 1vw, 0.78rem)',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginTop: '0.8rem',
              opacity: 0,
              userSelect: 'none',
            }}
          >
            M.A.K Grupa · Razvoj koncepata i strateških projekata
          </p>
        </div>

        {/* IP disclaimer bottom */}
        <p
          ref={disclaimerRef}
          style={{
            position: 'absolute',
            bottom: '13%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(245,243,234,0.22)',
            fontSize: 'clamp(0.5rem, 0.85vw, 0.7rem)',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          Ova prezentacija je vlasništvo M.A.K Grupe i namijenjena isključivo primatelju | 2026
        </p>

        {/* ── Phase 2: MAK Grupa presents AquaCity ── */}
        <img
          ref={logoRef}
          src={logoSrc}
          alt="MAK Grupa"
          style={{
            position: 'absolute',
            width: 'clamp(140px, 18vw, 240px)',
            top: '26%',
            opacity: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
          }}
        />

        <p
          ref={predstavljaRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(245,243,234,0.50)',
            fontSize: 'clamp(0.7rem, 1.4vw, 1rem)',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          Predstavlja
        </p>

        <p
          ref={aquacityRef}
          style={{
            position: 'absolute',
            top: '58%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#f5f3ea',
            fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          AquaCity Varaždin
        </p>
      </div>
    </>
  )
}
