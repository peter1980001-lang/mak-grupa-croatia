// src/components/SmoothScroll.jsx
// Initialises Lenis once for the whole page.
// Dispatches a custom 'lenis:scroll' event on window so other components
// (e.g. AudioManager) can react to scroll without accessing Lenis directly.
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis()
    let scrollEventFired = false

    lenis.on('scroll', () => {
      ScrollTrigger.update()
      if (!scrollEventFired) {
        scrollEventFired = true
        window.dispatchEvent(new Event('lenis:scroll'))
      }
    })

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll')
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return children
}
