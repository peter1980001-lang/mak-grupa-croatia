// src/components/StaticSlide.jsx — full-screen dark "breath" slide between animated sections
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Mouse parallax depth per layer — layer1 slowest (bg), layer3 fastest (fg)
const DEPTHS = [0.012, 0.026, 0.044]

// Extension per layer to prevent edge gaps during parallax movement (%)
const OVERSIZE = 6

export default function StaticSlide({ id, zIndex, height = '150vh', children }) {
  const containerRef = useRef(null)
  const wrapperRef   = useRef(null)
  const layerRefs    = [useRef(null), useRef(null), useRef(null)]

  // Detect if parallax layers exist for this slide
  const hasParallax = Boolean(id)

  // Resolve file extension — static-partnership layer1 is jpg, rest png
  function layerSrc(slideId, n) {
    if (slideId === 'static-partnership' && n === 1) return `/parallax/${slideId}/layer${n}.jpg`
    return `/parallax/${slideId}/layer${n}.png`
  }

  // ── scroll fade in/out ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.08 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.08 }, 0.92)

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  // ── mouse parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasParallax) return

    const onMove = (e) => {
      // Normalise to -1 … +1 from screen center
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2

      layerRefs.forEach((ref, i) => {
        if (!ref.current) return
        const depth = DEPTHS[i]
        const x = -cx * depth * window.innerWidth
        const y = -cy * depth * window.innerHeight
        gsap.to(ref.current, {
          x, y,
          duration: 1.1 + i * 0.3,   // each layer reacts at slightly different lag
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [hasParallax])

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
          overflow: 'hidden',
        }}
      >
        {/* Parallax background layers */}
        {hasParallax && [1, 2, 3].map((n, i) => (
          <div
            key={n}
            ref={layerRefs[i]}
            style={{
              position: 'absolute',
              inset: `-${OVERSIZE}%`,
              backgroundImage: `url(${layerSrc(id, n)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform',
            }}
          />
        ))}

        {/* Slide content sits on top of layers */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    </>
  )
}
