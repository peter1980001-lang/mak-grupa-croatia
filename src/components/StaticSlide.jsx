// src/components/StaticSlide.jsx — full-screen dark "breath" slide between animated sections
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Mouse parallax depth per layer — layer1 slowest (bg), layer3 fastest (fg)
const MOUSE_DEPTHS = [0.012, 0.026, 0.044]

// Scroll parallax — how many px each layer travels vertically across the full slide scroll
const SCROLL_TRAVEL = [40, 80, 130]

// Oversize to prevent edge gaps during movement (%)
const OVERSIZE = 8

function layerSrc(slideId, n) {
  if (slideId === 'static-partnership' && n === 1) return `/parallax/${slideId}/layer${n}.jpg`
  return `/parallax/${slideId}/layer${n}.png`
}

export default function StaticSlide({ id, zIndex, height = '150vh', children }) {
  const containerRef = useRef(null)
  const wrapperRef   = useRef(null)
  const layerRefs    = [useRef(null), useRef(null), useRef(null)]
  const mouseXY      = useRef({ x: 0, y: 0 })
  const hasParallax  = Boolean(id)

  // ── scroll: fade + layer Y travel ────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Fade in/out
    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.08 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.08 }, 0.92)

    // Scroll parallax — each layer shifts Y as slide scrolls
    if (hasParallax) {
      layerRefs.forEach((ref, i) => {
        if (!ref.current) return
        tl.fromTo(ref.current,
          { y: -SCROLL_TRAVEL[i] / 2 },
          { y:  SCROLL_TRAVEL[i] / 2, ease: 'none', duration: 1 },
          0
        )
      })
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [hasParallax])

  // ── mouse parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasParallax) return

    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      mouseXY.current = { x: cx, y: cy }

      layerRefs.forEach((ref, i) => {
        if (!ref.current) return
        const depth = MOUSE_DEPTHS[i]
        const mx = -cx * depth * window.innerWidth
        const my = -cy * depth * window.innerHeight
        gsap.to(ref.current, {
          x: mx,
          duration: 1.1 + i * 0.3,
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

        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {children}
        </div>
      </div>
    </>
  )
}
