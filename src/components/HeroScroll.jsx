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

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    // "Predstavlja": fade in 0→12%, fade out 30→42%
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.12 },
      0
    )
    tl.to(textRef.current,
      { opacity: 0, y: -10, ease: 'none', duration: 0.12 },
      0.30
    )

    // Logo: fade in 38→65%
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, ease: 'none', duration: 0.27 },
      0.38
    )

    // Subtitle: fade in 52→68%
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.16 },
      0.52
    )

    // Whole section fades out 95→100%
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.05 },
      0.95
    )

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
      </div>
    </>
  )
}
