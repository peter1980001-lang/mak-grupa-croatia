// src/components/AquaCityIntro.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TOTAL_FRAMES = 192
const FRAME_PATH = (i) =>
  `/frames/aquacity-intro/frame_${String(i + 1).padStart(4, '0')}.jpg`

export default function AquaCityIntro() {
  const containerRef = useRef(null)
  const wrapperRef  = useRef(null)
  const canvasRef   = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const footerRef   = useRef(null)
  const framesRef   = useRef([])
  const loadedRef   = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // Match canvas to screen resolution
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(framesRef.current[loadedRef.current] || null)
    }
    window.addEventListener('resize', resize)
    resize()

    function drawFrame(img) {
      if (!img || !img.complete) return
      const { width: cw, height: ch } = canvas
      const iw = img.naturalWidth, ih = img.naturalHeight
      const scale = Math.max(cw / iw, ch / ih)
      const sw = iw * scale, sh = ih * scale
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
    }

    // Preload all frames
    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => { loadedRef.current++ }
      return img
    })
    framesRef.current = images

    // Canvas scrub via ScrollTrigger
    let currentFrame = 0
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        )
        if (idx !== currentFrame) {
          currentFrame = idx
          drawFrame(images[idx])
        }
      },
    })

    // Text + wrapper opacity
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.08 }, 0)
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.28)
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: 'none', duration: 0.18 }, 0.34)
    tl.fromTo(footerRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.50)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.12 }, 0.88)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} style={{ height: '320vh' }} />

      <div
        ref={wrapperRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1,
          overflow: 'hidden', opacity: 0,
        }}
      >
        {/* Canvas — frame-perfect image scrub */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.25) 100%)',
        }} />

        {/* Text — bottom-left */}
        <div style={{ position: 'absolute', bottom: '12%', left: '8%', maxWidth: '600px' }}>
          <p ref={labelRef} style={{
            opacity: 0, color: '#c9a84c',
            fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            AquaCity Varaždin
          </p>

          <h2 ref={headlineRef} style={{
            opacity: 0, color: '#ffffff',
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0,
          }}>
            Od postojećeg prostora<br />
            do cjelogodišnje<br />
            <span style={{ fontWeight: 600 }}>destinacije</span>
          </h2>

          <p ref={footerRef} style={{
            opacity: 0, color: 'rgba(255,255,255,0.35)',
            fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            fontFamily: 'system-ui, sans-serif', fontWeight: 300,
            letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem',
          }}>
            Vizija razvoja M.A.K Grupe · 2026
          </p>
        </div>
      </div>
    </>
  )
}
