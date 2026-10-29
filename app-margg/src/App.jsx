import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero, { Stats } from "./components/Hero"
import Story, { STAGES } from "./components/Story"
import { Contact, Download, Footer, Testimonials } from "./components/Sections"

const top = (el) => el.getBoundingClientRect().top + window.scrollY

// Every "step" the keyboard can jump to: each [data-snap] section, plus each stage of the pinned story
function stepPositions() {
  const ys = []
  document.querySelectorAll("[data-snap]").forEach((el) => ys.push(top(el) - Number(el.dataset.snapOffset || 0)))
  document.querySelectorAll("[data-snap-stages]").forEach((el) => {
    const y = top(el)
    const range = el.offsetHeight - window.innerHeight
    for (let k = 0; k < STAGES; k++) ys.push(k === 0 ? y : y + (range * (k + 0.5)) / STAGES)
  })
  return ys.sort((a, b) => a - b)
}

// One scroll (wheel tick, swipe or key press) moves exactly one step, like the prototype.
// Only on desktop widths; phones and tablets keep native scrolling.
function usePaging() {
  useEffect(() => {
    const NEXT = ["ArrowDown", "ArrowRight", "PageDown"]
    const PREV = ["ArrowUp", "ArrowLeft", "PageUp"]
    const wide = () => window.innerWidth > 900
    let stepAt = 0
    const go = (dir) => {
      const ys = stepPositions()
      const y = window.scrollY
      const target = dir > 0 ? ys.find((v) => v > y + 8) : [...ys].reverse().find((v) => v < y - 8)
      if (target !== undefined) window.scrollTo({ top: target, behavior: "smooth" })
    }

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target.closest?.("input, select, textarea, [contenteditable]")) return
      const next = NEXT.includes(e.key)
      if (!next && !PREV.includes(e.key)) return
      e.preventDefault()
      go(next ? 1 : -1)
    }

    // One step per gesture: after a step, further wheel events (trackpad inertia included) are ignored
    // until the wheel has been quiet for a moment, with a hard cap so it can never stay stuck.
    let locked = false
    let quietTimer = 0
    let acc = 0
    const unlock = () => { locked = false; acc = 0 }
    const onWheel = (e) => {
      if (!wide() || e.ctrlKey) return
      e.preventDefault()
      const now = performance.now()
      if (locked) {
        clearTimeout(quietTimer)
        // still moving: wait for a pause, but never longer than 1.4s after the step
        if (now - stepAt > 1400) return unlock()
        quietTimer = setTimeout(() => { if (performance.now() - stepAt > 650) unlock() }, 110)
        return
      }
      acc += e.deltaY
      if (Math.abs(acc) < 12) return
      locked = true
      stepAt = now
      go(acc > 0 ? 1 : -1)
      acc = 0
      clearTimeout(quietTimer)
      quietTimer = setTimeout(unlock, 700)
    }

    let startY = null
    const onTouchStart = (e) => { startY = e.touches[0].clientY }
    const onTouchMove = (e) => { if (wide()) e.preventDefault() }
    const onTouchEnd = (e) => {
      if (startY === null || !wide()) return
      const dy = startY - e.changedTouches[0].clientY
      startY = null
      if (Math.abs(dy) > 40 && performance.now() - stepAt > 750) { stepAt = performance.now(); go(dy > 0 ? 1 : -1) }
    }

    window.addEventListener("keydown", onKey)
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])
}

export default function App() {
  usePaging()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Story />
        <Testimonials />
        <Download />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
