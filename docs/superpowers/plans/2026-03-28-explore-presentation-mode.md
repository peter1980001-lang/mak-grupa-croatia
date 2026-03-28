# Explore / Presentation Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix autoplay stutter by stopping Lenis during Presentation Mode so it no longer fights the AutoPlay ticker for scroll control.

**Architecture:** When play is pressed, `lenis.stop()` pauses Lenis' internal RAF processing. AutoPlay drives scroll via `window.scrollTo(0, pos)` and calls `ScrollTrigger.update()` manually each frame. When autoplay pauses or the user manually scrolls, `lenis.start()` resumes smooth Explore Mode. All other components are untouched.

**Tech Stack:** React 19, GSAP 3 (ticker + ScrollTrigger), Lenis 1.3, Vite

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/components/AutoPlay.jsx` | Modify | All 6 changes below |

No other files change.

---

### Task 1: Add ScrollTrigger import to AutoPlay.jsx

**Files:**
- Modify: `src/components/AutoPlay.jsx:7`

The tick function will need to call `ScrollTrigger.update()` manually. It's already registered in `SmoothScroll.jsx` — we just need to import it here.

- [ ] **Step 1: Add the import**

Open `src/components/AutoPlay.jsx`. The current imports are:

```javascript
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import lenisRef from '../lib/lenisRef'
```

Change to:

```javascript
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import lenisRef from '../lib/lenisRef'
```

- [ ] **Step 2: Verify the dev server still starts without errors**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
npm run dev
```

Expected: no import errors, page loads.

- [ ] **Step 3: Commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "feat: import ScrollTrigger in AutoPlay"
```

---

### Task 2: Replace `l.scrollTo` with `window.scrollTo` + `ScrollTrigger.update()` in `tick()`

**Files:**
- Modify: `src/components/AutoPlay.jsx:24-43`

This is the core fix. The tick function currently calls `l.scrollTo(pos, { immediate: true })` — that's what conflicts with Lenis' own `raf()` call. We replace it with `window.scrollTo(0, pos)` (bypasses Lenis entirely) and call `ScrollTrigger.update()` so all GSAP animations stay in sync.

Also: when autoplay finishes naturally (reached end), Lenis must be restarted so the user can scroll freely again.

- [ ] **Step 1: Replace the tick function body**

Find this block (lines ~24–43):

```javascript
  useEffect(() => {
    function tick(_time, deltaTime) {
      const l = lenisRef.current
      if (!l) return
      // cap delta so a tab-switch doesn't cause a huge jump
      const dt = Math.min(deltaTime, 50) / 1000
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      posRef.current  = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)

      // Let Lenis move the scroll — it fires its own 'scroll' event which
      // already calls ScrollTrigger.update() via SmoothScroll.jsx.
      l.scrollTo(posRef.current, { immediate: true })

      if (posRef.current >= maxScroll) {
        gsap.ticker.remove(tickRef.current)
        setPlaying(false)
        setDone(true)
      }
    }
    tickRef.current = tick
  }, [])
```

Replace with:

```javascript
  useEffect(() => {
    function tick(_time, deltaTime) {
      // cap delta so a tab-switch doesn't cause a huge jump
      const dt = Math.min(deltaTime, 50) / 1000
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      posRef.current = Math.min(posRef.current + SPEED_PX_S * dt, maxScroll)

      // Lenis is stopped during autoplay — drive scroll directly and
      // call ScrollTrigger.update() manually so all GSAP animations sync.
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
    tickRef.current = tick
  }, [])
```

- [ ] **Step 2: Manually verify in browser**

Start dev server (`npm run dev`), open the page, press the play button. Scroll should move automatically. Check:
- No stutter (previously stuttered on canvas sections)
- Canvas frame scrubbing still works during autoplay
- Page counter still updates during autoplay

- [ ] **Step 3: Commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "fix: drive scroll via window.scrollTo during autoplay, remove Lenis conflict"
```

---

### Task 3: Stop Lenis in `start()`, resume in `pause()`

**Files:**
- Modify: `src/components/AutoPlay.jsx:45-54`

Without this, pressing play leaves Lenis running — it will still try to handle user scroll events and its own velocity while the ticker drives `window.scrollTo`. The fix: `lenis.stop()` before the ticker starts, `lenis.start()` after the ticker stops.

- [ ] **Step 1: Update `start()`**

Find:

```javascript
  const start = useCallback(() => {
    setPlaying(true)
    setDone(false)
    gsap.ticker.add(tickRef.current)
  }, [])
```

Replace with:

```javascript
  const start = useCallback(() => {
    const l = lenisRef.current
    if (l) l.stop()
    setPlaying(true)
    setDone(false)
    gsap.ticker.add(tickRef.current)
  }, [])
```

- [ ] **Step 2: Update `pause()`**

Find:

```javascript
  const pause = useCallback(() => {
    gsap.ticker.remove(tickRef.current)
    setPlaying(false)
  }, [])
```

Replace with:

```javascript
  const pause = useCallback(() => {
    gsap.ticker.remove(tickRef.current)
    const l = lenisRef.current
    if (l) l.start()
    setPlaying(false)
  }, [])
```

- [ ] **Step 3: Manually verify in browser**

- Press play → autoplay runs smoothly (Lenis stopped, no conflict)
- Press pause → Lenis resumes, manual scroll is smooth again
- Press play again → resumes from current position, smooth

- [ ] **Step 4: Commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "fix: stop Lenis on autoplay start, resume on pause"
```

---

### Task 4: Fix `restart()` to use `window.scrollTo` and manage Lenis

**Files:**
- Modify: `src/components/AutoPlay.jsx:56-66`

`restart()` is called when the user clicks the button after autoplay has finished (icon becomes a restart arrow). It currently uses `l.scrollTo(0, { immediate: true })` — same conflict. Replace with `window.scrollTo(0, 0)` and stop Lenis before the ticker restarts.

- [ ] **Step 1: Update `restart()`**

Find:

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

Replace with:

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

- [ ] **Step 2: Manually verify in browser**

Let autoplay run to the end (or temporarily lower `SPEED_PX_S` to 5000 to reach end faster). Click the restart icon. Check:
- Page jumps to top cleanly
- Autoplay restarts from the beginning without stutter

- [ ] **Step 3: Commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "fix: use window.scrollTo in restart(), stop Lenis before ticker"
```

---

### Task 5: Fix `onManual()` — resume Lenis on manual scroll, stop again on autoplay resume

**Files:**
- Modify: `src/components/AutoPlay.jsx:69-91`

When the user manually scrolls during autoplay, the current code stops the ticker but leaves Lenis stopped. The user's manual scroll has no smooth scrolling. Fix: call `lenis.start()` immediately when manual scroll is detected. When the 2-second pause timer fires and autoplay resumes, call `lenis.stop()` again before restarting the ticker.

- [ ] **Step 1: Update `onManual` inside the useEffect**

Find the entire `onManual` useEffect (lines ~69–91):

```javascript
  useEffect(() => {
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

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing])
```

Replace with:

```javascript
  useEffect(() => {
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

    window.addEventListener('wheel',     onManual, { passive: true })
    window.addEventListener('touchmove', onManual, { passive: true })
    return () => {
      window.removeEventListener('wheel',     onManual)
      window.removeEventListener('touchmove', onManual)
      clearTimeout(pauseTimer.current)
    }
  }, [playing])
```

- [ ] **Step 2: Manually verify in browser**

- Press play to start autoplay
- Scroll manually mid-autoplay → smooth Lenis scroll takes over immediately
- Stop scrolling → after 2 seconds, autoplay resumes from current position without stutter
- Repeat a few times to confirm the cycle is stable

- [ ] **Step 3: Commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "fix: resume Lenis on manual scroll during autoplay, stop before ticker resumes"
```

---

### Task 6: Final end-to-end verification

No code changes. Verify everything works together.

- [ ] **Step 1: Full autoplay run**

Start the dev server. Press play. Watch the entire presentation run from start to finish:
- No stutter on any section
- Canvas sections (AquaCityIntro, Phase 1–5) scrub frames smoothly
- Page counter increments correctly
- Audio fades in as expected
- Restart icon appears at the end

- [ ] **Step 2: Explore Mode verification**

Without pressing play, scroll manually through the whole presentation:
- Lenis smooth scroll works as before
- All GSAP animations trigger correctly
- Canvas frame scrubbing works correctly

- [ ] **Step 3: Mixed mode verification**

- Press play
- Scroll manually mid-way (autoplay pauses, Lenis resumes smooth)
- Wait 2 seconds (autoplay resumes from current position, no stutter)
- Press pause button (Lenis resumes, manual scroll is smooth)
- Press play again (continues from current position, no stutter)

- [ ] **Step 4: Build check**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
npm run build
```

Expected: build completes successfully, no errors.

- [ ] **Step 5: Final commit**

```bash
cd /c/Users/ibrah/Documents/MAK_GRUPA_CROATIA
git add src/components/AutoPlay.jsx
git commit -m "fix: complete Explore/Presentation Mode separation — no stutter"
```
