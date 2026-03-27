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
        end: 'bottom bottom',
        scrub: true,
      },
    })
    // Soft fade in over first 12% of scroll, hold, then fade out over last 12%
    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.001 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.005 }, 0.995)

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
