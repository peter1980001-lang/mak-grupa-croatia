// src/components/CanvasSection.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CanvasSection({
  name,
  totalFrames,
  height = '320vh',
  zIndex = 1,
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
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
    }

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      img.src = `/frames/${name}/frame_${String(i + 1).padStart(4, '0')}.jpg`
      img.onload = () => { loaded++; if (loaded === 1) draw(img) }
      frames.push(img)
    }

    // Canvas scrub
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames))
        if (idx !== current) { current = idx; draw(frames[idx]) }
      },
    })

    // Fade in only — no fade out (next section covers this one via z-index)
    gsap.fromTo(wrapperRef.current,
      { opacity: 0 },
      {
        opacity: 1, ease: 'none', duration: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [name, totalFrames])

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
