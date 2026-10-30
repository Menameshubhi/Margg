import { useLayoutEffect, useRef, useState } from "react"
import { useMedia } from "../hooks"

// Desktop (wider than 1024px): centres its content in a full-viewport page and scales it down if it is taller than the space below the navbar.
// Tablet / phone: renders the content at natural size.
export default function Fit({ children, top = 100, bottom = 24 }) {
  const inner = useRef(null)
  const [scale, setScale] = useState(1)
  const narrow = useMedia("(max-width: 1024px)")

  useLayoutEffect(() => {
    if (narrow || !inner.current) return setScale(1)
    const el = inner.current
    const calc = () => {
      const avail = window.innerHeight - top - bottom
      setScale(Math.min(1, avail / el.scrollHeight, window.innerWidth / el.scrollWidth))
    }
    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(el)
    window.addEventListener("resize", calc)
    return () => { ro.disconnect(); window.removeEventListener("resize", calc) }
  }, [narrow, top, bottom])

  if (narrow) return <>{children}</>
  return (
    <div className="fit" style={{ paddingTop: top, paddingBottom: bottom }}>
      <div ref={inner} className="fit-inner" style={{ transform: `scale(${scale})` }}>{children}</div>
    </div>
  )
}
