import { useEffect, useState } from "react"

// True while the media query matches (re-evaluated on change)
export function useMedia(query) {
  const [match, setMatch] = useState(() => (typeof window === "undefined" ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [query])
  return match
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)")

// Scale factor that fits a fixed design canvas (w x h) inside the viewport
export function useFitScale(w, h) {
  const calc = () => Math.min(window.innerWidth / w, window.innerHeight / h)
  const [scale, setScale] = useState(() => (typeof window === "undefined" ? 1 : calc()))
  useEffect(() => {
    const on = () => setScale(calc())
    on()
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [w, h])
  return scale
}
