// src/components/HeroScroll.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoSrc from '../assets/logo.jpeg'

export default function HeroScroll() {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const textRef = useRef(null)
  const logoRef = useRef(null)
  const subtitleRef = useRef(null)
  const disclaimerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Logo: fade in 0→10%, hold, fade out 50→60%
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, ease: 'none', duration: 0.10 },
      0
    )
    tl.to(logoRef.current,
      { opacity: 0, scale: 0.98, ease: 'none', duration: 0.10 },
      0.50
    )

    // Subtitle: fade in 2→12%, hold, fade out 50→60%
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.10 },
      0.02
    )
    tl.to(subtitleRef.current,
      { opacity: 0, y: -4, ease: 'none', duration: 0.10 },
      0.50
    )

    // Disclaimer: fade in 4→14%, hold, fade out 50→60%
    tl.fromTo(disclaimerRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.10 },
      0.04
    )
    tl.to(disclaimerRef.current,
      { opacity: 0, y: -4, ease: 'none', duration: 0.10 },
      0.50
    )

    // "Predstavlja": fade in 64→74%, hold until end
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.10 },
      0.64
    )

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
          background: '#191a16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <p
          ref={textRef}
          style={{
            position: 'absolute',
            color: '#ffffff',
            fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          Predstavlja
        </p>

        <img
          ref={logoRef}
          src={logoSrc}
          alt="MAK Grupa"
          style={{
            position: 'absolute',
            width: 'clamp(280px, 42vw, 600px)',
            opacity: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
          }}
        />

        <p
          ref={subtitleRef}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(0.7rem, 1.4vw, 1rem)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          Razvoj koncepta i strateških projekata
        </p>

        <p
          ref={disclaimerRef}
          style={{
            position: 'absolute',
            bottom: '13%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.28)',
            fontSize: 'clamp(0.5rem, 0.85vw, 0.7rem)',
            fontFamily: 'system-ui, sans-serif',
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
      </div>
    </>
  )
}
