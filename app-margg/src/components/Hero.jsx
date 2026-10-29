import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "framer-motion"
import { hero, stats } from "../content"
import { reveal } from "../reveal"
import { useReducedMotion } from "../hooks"

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6 })
  const reduced = useReducedMotion()
  const decimals = Number.isInteger(value) ? 0 : 1
  const [shown, setShown] = useState(reduced ? value : 0)
  useEffect(() => {
    if (reduced) return setShown(value)
    if (!inView) return setShown(0) // reset so the count plays again every time the metrics scroll into view
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setShown(v) })
    return () => c.stop()
  }, [inView, value, reduced])
  return <span ref={ref}>{shown.toFixed(decimals)}{suffix}</span>
}

export function Stats() {
  return (
    <section id="stats" data-snap data-snap-offset="130" className="stats">
      <ul className="stats-row">
        {stats.map((s, i) => (
          <motion.li key={s.label} className="stat" {...reveal(i, 70)}>
            <strong><CountUp value={s.value} suffix={s.suffix} /></strong>
            <span>{s.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  // The highlight walks through the tiles on a loop
  useEffect(() => {
    if (paused || reduced) return
    const t = setInterval(() => setActive((a) => (a + 1) % hero.tiles.length), 2200)
    return () => clearInterval(t)
  }, [paused, reduced])

  return (
    <section id="home" data-snap className="hero">
      <div className="glow g1" /><div className="glow g2" /><div className="glow g3" />
      <div className="hero-inner">
        <motion.div className="hero-copy" {...reveal(0, 50)}>
          <h1>{hero.title}</h1>
          <p>{hero.text}</p>
        </motion.div>
        <motion.div className="tiles" {...reveal(2, 50)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {hero.tiles.map((t, i) => {
            const on = i === active
            const flip = i % 4 === 3 // last column: the highlight grows leftwards so it stays inside the grid
            return (
              <button
                key={i}
                className={"tile" + (on ? " is-active" : "")}
                // pointermove (not enter) so a still cursor never re-triggers; tiles never move, so hover is stable
                onPointerMove={() => !on && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={t.label}
              >
                <img src={t.icon} alt="" />
                {on && (
                  <motion.span
                    className={"tile-pop" + (flip ? " flip" : "")}
                    initial={{ opacity: 0, scaleX: 0.55 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  >
                    <img src={t.icon} alt="" />
                    <span>{t.label}</span>
                  </motion.span>
                )}
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
