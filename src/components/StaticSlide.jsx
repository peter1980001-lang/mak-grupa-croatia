// src/components/StaticSlide.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const OVERSIZE = 8

// Per-slide config: layer count, mouse depth, scroll travel per layer
const SLIDE_CONFIG = {
  'static-identity':        { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-varazdin-transit':{ count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-model':           { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-phases':          { count: 5, depths: [0.006, 0.012, 0.020, 0.030, 0.042], travel: [20, 40, 65, 95, 130] },
  'static-full-vision':     { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-partnership':     { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-nextstep':        { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
  'static-contact':         { count: 4, depths: [0.006, 0.014, 0.024, 0.036], travel: [20, 45, 75, 110] },
}

function layerSrc(slideId, n) {
  if (n === 1) return `/parallax/${slideId}/layer${n}.webp`
  return `/parallax/${slideId}/layer${n}.png`
}

export default function StaticSlide({ id, zIndex, height = '150vh', children }) {
  const containerRef = useRef(null)
  const wrapperRef   = useRef(null)
  const layerRefs    = useRef([])
  const hasParallax  = Boolean(id && SLIDE_CONFIG[id])
  const cfg          = hasParallax ? SLIDE_CONFIG[id] : null

  // Initialise refs array to match layer count
  if (hasParallax && layerRefs.current.length !== cfg.count) {
    layerRefs.current = Array.from({ length: cfg.count }, () => ({ current: null }))
  }

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

    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.08 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.08 }, 0.92)

    if (hasParallax) {
      layerRefs.current.forEach((ref, i) => {
        if (!ref.current) return
        const travel = cfg.travel[i]
        tl.fromTo(ref.current,
          { y: -travel / 2 },
          { y:  travel / 2, ease: 'none', duration: 1 },
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

      layerRefs.current.forEach((ref, i) => {
        if (!ref.current) return
        const mx = -cx * cfg.depths[i] * window.innerWidth
        gsap.to(ref.current, {
          x: mx,
          duration: 1.0 + i * 0.25,
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
        {hasParallax && Array.from({ length: cfg.count }, (_, i) => {
          const n = i + 1
          return (
            <div
              key={n}
              ref={el => layerRefs.current[i] = { current: el }}
              style={{
                position: 'absolute',
                inset: n === 1 ? 0 : `-${OVERSIZE}%`,
                backgroundImage: `url(${layerSrc(id, n)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                willChange: 'transform',
              }}
            />
          )
        })}

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
