// src/components/HeroScroll.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import logoSrc from '../assets/logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScroll() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const logoRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    // Text: fade in 0→12%, hold, fade out 30→42%
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

    // Subtitle: fade in 52→68%, slightly after logo becomes visible
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.16 },
      0.52
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div ref={containerRef} style={{ height: '300vh' }} />

      <div
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
        {/* "Predstavlja" */}
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

        {/* Logo with radial vignette mask — fades into background */}
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

        {/* Subtitle — appears just after logo becomes visible */}
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
