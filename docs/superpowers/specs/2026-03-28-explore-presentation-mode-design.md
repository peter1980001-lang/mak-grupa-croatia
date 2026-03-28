# Explore / Presentation Mode — Design Spec

**Date:** 2026-03-28
**Project:** MAK_GRUPA_CROATIA
**Scope:** `src/components/AutoPlay.jsx` only

---

## Problem

Stutter during autoplay. Root cause: `AutoPlay.jsx` calls `l.scrollTo(pos, { immediate: true })` on every GSAP ticker frame. In the same frame, `SmoothScroll.jsx` calls `lenis.raf()` — also on the GSAP ticker. Lenis tries to interpolate toward its own internal target while AutoPlay immediately overrides it. Two systems writing to scroll position in the same animation frame → stutter.

---

## Solution

**`lenis.stop()` during Presentation Mode.** When autoplay runs, Lenis is paused — its `raf()` call becomes a no-op internally. AutoPlay drives scroll via `window.scrollTo()` directly and manually calls `ScrollTrigger.update()` so all GSAP animations stay in sync. When autoplay pauses or the user manually scrolls, `lenis.start()` resumes smooth Explore Mode immediately.

---

## Architecture

No new files. No new state. Only `AutoPlay.jsx` changes.

```
Explore Mode (playing = false)
  Lenis: running
  GSAP ticker tick(): not registered
  Scroll control: Lenis (smooth, user-driven)
  ScrollTrigger.update(): called by Lenis' scroll event (via SmoothScroll.jsx)

Presentation Mode (playing = true)
  Lenis: stopped (lenis.stop())
  GSAP ticker tick(): registered, runs every frame
  Scroll control: window.scrollTo(0, posRef.current)
  ScrollTrigger.update(): called manually inside tick()
```

Transition: Play button click → `lenis.stop()` → ticker starts (Presentation Mode)
Transition: Pause / manual scroll → ticker stops → `lenis.start()` (Explore Mode)

---

## Changes

All changes are in `src/components/AutoPlay.jsx`.

### 1. `tick()` — replace `l.scrollTo` with `window.scrollTo` + manual `ScrollTrigger.update()`

**Before:**
```javascript
function tick(_time, deltaTime) {
  const l = lenisRef.current
  if (!l) return
  const dt = Math.min(deltaTime, 50) / 1000
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  posRef.current = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)
  l.scrollTo(posRef.current, { immediate: true })
  if (posRef.current >= maxScroll) {
    gsap.ticker.remove(tickRef.current)
    setPlaying(false)
    setDone(true)
  }
}
```

**After:**
```javascript
function tick(_time, deltaTime) {
  const dt = Math.min(deltaTime, 50) / 1000
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  posRef.current = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)
  window.scrollTo(0, posRef.current)
  ScrollTrigger.update()
  if (posRef.current >= maxScroll) {
    gsap.ticker.remove(tickRef.current)
    const l = lenisRef.current
    if (l) l.start()
    setPlaying(false)
    setDone(true)
  }
}
```

Note: `ScrollTrigger` import added at top of file.

### 2. `start()` — stop Lenis before starting ticker

**Before:**
```javascript
const start = useCallback(() => {
  setPlaying(true)
  setDone(false)
  gsap.ticker.add(tickRef.current)
}, [])
```

**After:**
```javascript
const start = useCallback(() => {
  const l = lenisRef.current
  if (l) l.stop()
  setPlaying(true)
  setDone(false)
  gsap.ticker.add(tickRef.current)
}, [])
```

### 3. `pause()` — resume Lenis after stopping ticker

**Before:**
```javascript
const pause = useCallback(() => {
  gsap.ticker.remove(tickRef.current)
  setPlaying(false)
}, [])
```

**After:**
```javascript
const pause = useCallback(() => {
  gsap.ticker.remove(tickRef.current)
  const l = lenisRef.current
  if (l) l.start()
  setPlaying(false)
}, [])
```

### 4. `restart()` — stop Lenis on start, resume Lenis on scroll-to-zero, stop again before ticker

**Before:**
```javascript
const restart = useCallback(() => {
  gsap.ticker.remove(tickRef.current)
  posRef.current = 0
  const l = lenisRef.current
  if (l) l.scrollTo(0, { immediate: true })
  setTimeout(() => {
    setPlaying(true)
    setDone(false)
    gsap.ticker.add(tickRef.current)
  }, 80)
}, [])
```

**After:**
```javascript
const restart = useCallback(() => {
  gsap.ticker.remove(tickRef.current)
  posRef.current = 0
  window.scrollTo(0, 0)
  ScrollTrigger.update()
  setTimeout(() => {
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(true)
    setDone(false)
    gsap.ticker.add(tickRef.current)
  }, 80)
}, [])
```

### 5. `onManual()` — resume Lenis on manual scroll, stop again on autoplay resume

**Before:**
```javascript
const onManual = () => {
  if (!playing) return
  gsap.ticker.remove(tickRef.current)
  setPlaying(false)
  const l = lenisRef.current
  if (l) posRef.current = l.scroll ?? window.scrollY

  clearTimeout(pauseTimer.current)
  pauseTimer.current = setTimeout(() => {
    setPlaying(true)
    gsap.ticker.add(tickRef.current)
  }, PAUSE_MS)
}
```

**After:**
```javascript
const onManual = () => {
  if (!playing) return
  gsap.ticker.remove(tickRef.current)
  setPlaying(false)
  const l = lenisRef.current
  if (l) {
    l.start()
    posRef.current = l.scroll ?? window.scrollY
  } else {
    posRef.current = window.scrollY
  }

  clearTimeout(pauseTimer.current)
  pauseTimer.current = setTimeout(() => {
    const l2 = lenisRef.current
    if (l2) l2.stop()
    setPlaying(true)
    gsap.ticker.add(tickRef.current)
  }, PAUSE_MS)
}
```

### 6. Import `ScrollTrigger`

Add to imports at top of file:
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```

---

## What does NOT change

- `SmoothScroll.jsx` — untouched
- `CanvasSection.jsx` — untouched (ScrollTrigger scrub still works via manual `ScrollTrigger.update()`)
- `PageCounter.jsx` — untouched (window scroll event still fires from `window.scrollTo()`)
- `AudioManager.jsx` — untouched
- All other components — untouched

---

## Expected Result

- Explore Mode: Lenis smooth scroll, user scrolls freely, all animations run normally
- Presentation Mode: `window.scrollTo()` drives scroll at constant speed, `ScrollTrigger.update()` keeps all GSAP animations and canvas frame scrubber in sync, zero conflict with Lenis
- Manual scroll during Presentation Mode: Lenis immediately resumes, smooth. After 2s pause, Presentation Mode picks up from current position
- No stutter
