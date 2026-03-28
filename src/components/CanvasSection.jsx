// src/components/CanvasSection.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CanvasSection({
  name,
  totalFrames,
  height = '320vh',
  zIndex = 1,
  // focusX / focusY: 0 = left/top, 0.5 = center (default), 1 = right/bottom
  // On portrait mobile the frame is wider than the viewport; these shift the
  // visible crop area so the important part of each video stays on screen.
  focusX = 0.5,
  focusY = 0.5,
  children,
}) {
  const containerRef = useRef(null)
  const wrapperRef   = useRef(null)
  const canvasRef    = useRef(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    const frames  = []
    let loaded    = 0
    let current   = -1

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      if (frames[current]?.complete) draw(frames[current])
    }
    window.addEventListener('resize', resize)
    resize()

    function draw(img) {
      if (!img?.complete) return
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const sw = img.naturalWidth  * scale
      const sh = img.naturalHeight * scale
      // Focal-point offset: clamp so the image never draws outside canvas
      const x = Math.min(0, Math.max(cw - sw, (cw - sw) * focusX))
      const y = Math.min(0, Math.max(ch - sh, (ch - sh) * focusY))
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, sw, sh)
    }

    window.dispatchEvent(new CustomEvent('frames-registered', { detail: { count: totalFrames } }))

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      img.src = `/frames/${name}/frame_${String(i + 1).padStart(4, '0')}.webp`
      img.onload = img.onerror = () => {
        loaded++
        window.dispatchEvent(new CustomEvent('frame-loaded'))
        if (loaded === 1 && img.complete && img.naturalWidth > 0) draw(img)
      }
      frames.push(img)
    }

    // Canvas scrub — all frames play in first 90% of scroll, last frame holds for final 10%
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const ratio = self.progress
        const idx   = Math.min(totalFrames - 1, Math.floor(ratio * totalFrames))
        if (idx !== current) { current = idx; draw(frames[idx]) }
      },
    })

    // Fade in 0→3%, fade out 96→100% — essential to prevent canvas sections bleeding into each other
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    tl.fromTo(wrapperRef.current,
      { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.001 }, 0)
    tl.to(wrapperRef.current,
      { opacity: 0, ease: 'none', duration: 0.005 }, 0.995)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [name, totalFrames, focusX, focusY])

  return (
    <>
      <div ref={containerRef} style={{ height }} />
      <div ref={wrapperRef} style={{
        position: 'fixed', inset: 0,
        zIndex, overflow: 'hidden', opacity: 0,
      }}>
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
        }} />
        {children}
      </div>
    </>
  )
}
