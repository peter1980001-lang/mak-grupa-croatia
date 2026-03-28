// src/components/StaticSlide.jsx — full-screen dark "breath" slide between animated sections
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function StaticSlide({ id, zIndex, height = '150vh', children }) {
  const containerRef = useRef(null)
  const wrapperRef   = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    // Fade in over first 8% of scroll, hold, fade out over last 8%
    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.08 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.08 }, 0.92)

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <>
      <div ref={containerRef} data-section={id} style={{ height }} />
      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0d0e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex,
          opacity: 0,
        }}
      >
        {children}
      </div>
    </>
  )
}
