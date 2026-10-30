import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { features, intro, screens, why } from "../content"
import { useFitScale, useMedia } from "../hooks"
import Phone, { PHONE_H, PHONE_W } from "./Phone"
import Bento from "./Bento"

// The product story is pinned while you scroll and steps through stages:
//   desktop (landscape 1280 x 832 canvas): 0 intro, 1-3 the three features, 4 the feature grid
//   tablet / phone (portrait 420 x 860 canvas): 0 intro, 1-3 the three features, then the grid flows below as normal cards
// Each canvas is scaled to fit the screen, so type and layout follow the screen size.
const ease = [0.22, 1, 0.36, 1]
const t = { duration: 0.8, ease }
const phoneScreens = [screens.home, screens.roadmap, screens.interview, screens.mentor]

const LAYOUTS = {
  desktop: {
    W: 1280, H: 832, stages: 5,
    screenFor: [0, 1, 2, 3, 0],
    phoneAt: [
      { x: 640 - PHONE_W / 2, y: 977 - PHONE_H / 2, scale: 454 / PHONE_W },
      { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
      { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
      { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
      { x: 223 - PHONE_W / 2, y: 478 - PHONE_H / 2, scale: 277 / PHONE_W },
    ],
  },
  compact: {
    W: 420, H: 860, stages: 4,
    screenFor: [0, 1, 2, 3],
    phoneAt: [
      { x: 210 - PHONE_W / 2, y: 478, scale: 1 },
      { x: 210 - PHONE_W / 2, y: 454 - PHONE_H / 2, scale: 0.84 },
      { x: 210 - PHONE_W / 2, y: 454 - PHONE_H / 2, scale: 0.84 },
      { x: 210 - PHONE_W / 2, y: 454 - PHONE_H / 2, scale: 0.84 },
    ],
  },
  // Phones: a bigger phone, with the feature text laid over its lower part on a fading gradient
  phone: {
    W: 420, H: 860, stages: 4,
    screenFor: [0, 1, 2, 3],
    phoneAt: [
      { x: 210 - PHONE_W / 2, y: 498, scale: 1.06 },
      { x: 210 - PHONE_W / 2, y: 610 - PHONE_H / 2, scale: 1.2 },
      { x: 210 - PHONE_W / 2, y: 610 - PHONE_H / 2, scale: 1.2 },
      { x: 210 - PHONE_W / 2, y: 610 - PHONE_H / 2, scale: 1.2 },
    ],
  },
}

// variant: "desktop" | "compact" (tablet) | "phone"
function PinnedStory({ variant }) {
  const compact = variant !== "desktop"
  const L = LAYOUTS[variant]
  const p = compact ? "c" : "s"
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const scale = useFitScale(L.W, L.H)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(Math.min(L.stages - 1, Math.max(0, Math.floor(v * L.stages)))))
  const inFeatures = stage >= 1 && stage <= 3

  return (
    <div ref={ref} className="story-track" style={{ height: L.stages * 100 + 120 + "vh" }} data-snap-stages={L.stages}>
      <div className="story-sticky">
        <div className={"canvas " + (compact ? "canvas-compact canvas-" + variant : "")} style={{ width: L.W, height: L.H, transform: `translate(-50%, -50%) scale(${scale})` }}>
          <motion.div className={p + "-title"} initial={false} animate={{ opacity: stage === 0 ? 1 : 0, y: stage === 0 ? 0 : -50 }} transition={t}>
            <h2>{intro.title[0]}<br />{intro.title[1]}</h2>
            <p>{intro.text}</p>
          </motion.div>

          <motion.h2 className={p + "-why"} initial={false} animate={{ opacity: inFeatures ? 1 : 0, x: inFeatures || compact ? 0 : -40, y: compact ? (inFeatures ? 0 : -24) : 0 }} transition={t}>
            {why}
          </motion.h2>

          {features.map((f, i) => (
            <motion.div key={f.key} className={p + "-feature"} initial={false} animate={{ opacity: stage === i + 1 ? 1 : 0, y: stage === i + 1 ? 0 : stage > i + 1 ? -30 : 30 }} transition={t}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}

          <Phone screens={phoneScreens} active={L.screenFor[stage]} className="s-phone" initial={false} animate={L.phoneAt[stage]} transition={{ duration: 0.9, ease }} />

          {!compact && (
            <div className="s-bento" style={{ pointerEvents: stage === 4 ? "auto" : "none" }}>
              <Bento show={stage === 4} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Story() {
  const compact = useMedia("(max-width: 1024px)")
  const phone = useMedia("(max-width: 720px)")
  const variant = phone ? "phone" : compact ? "compact" : "desktop"
  return (
    <section id="product" className="story">
      <PinnedStory key={variant} variant={variant} />
      {compact && (
        <div className="flow-wrap" data-snap>
          <Bento mode="flow" />
        </div>
      )}
    </section>
  )
}
