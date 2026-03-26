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

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const container = containerRef.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // "Predstavlja" fades in 0→25%, holds, fades out 50→65%
    tl.fromTo(textRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, ease: 'none', duration: 0.25 },
      0
    )
    tl.to(textRef.current,
      { opacity: 0, y: -12, ease: 'none', duration: 0.15 },
      0.5
    )

    // Logo fades in 55→85%
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, ease: 'none', duration: 0.3 },
      0.55
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Scroll container — drives the timeline */}
      <div ref={containerRef} style={{ height: '350vh' }} />

      {/* Fixed viewport */}
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
        {/* "Predstavlja" text */}
        <p
          ref={textRef}
          style={{
            position: 'absolute',
            color: '#ffffff',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          Predstavlja
        </p>

        {/* Logo */}
        <img
          ref={logoRef}
          src={logoSrc}
          alt="MAK Grupa"
          style={{
            position: 'absolute',
            width: 'clamp(280px, 40vw, 580px)',
            opacity: 0,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </>
  )
}
