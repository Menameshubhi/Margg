import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { features, intro, screens, why } from "../content"
import { useFitScale, useMedia } from "../hooks"
import Phone, { PHONE_H, PHONE_W, StaticPhone } from "./Phone"
import Bento from "./Bento"

// Desktop: a pinned 1280 x 832 canvas. Scrolling steps through five stages:
// 0 product intro, 1-3 the three features, 4 the feature grid.
export const STAGES = 5
const W = 1280
const H = 832
const ease = [0.22, 1, 0.36, 1]
const t = { duration: 0.8, ease }

// Phone position per stage (top-left of the 296 x 625 box, plus scale)
const phoneAt = [
  { x: 640 - PHONE_W / 2, y: 977 - PHONE_H / 2, scale: 454 / PHONE_W },
  { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
  { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
  { x: 640 - PHONE_W / 2, y: 162, scale: 1 },
  { x: 223 - PHONE_W / 2, y: 478 - PHONE_H / 2, scale: 277 / PHONE_W },
]
const phoneScreens = [screens.home, screens.roadmap, screens.interview, screens.mentor]
const screenFor = [0, 1, 2, 3, 0]

function PinnedStory() {
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const scale = useFitScale(W, H)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (p) => setStage(Math.min(STAGES - 1, Math.max(0, Math.floor(p * STAGES)))))

  return (
    <div ref={ref} className="story-track" data-snap-stages={STAGES}>
      <div className="story-sticky">
        <div className="canvas" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <motion.div className="s-title" initial={false} animate={{ opacity: stage === 0 ? 1 : 0, y: stage === 0 ? 0 : -50 }} transition={t}>
            <h2>{intro.title[0]}<br />{intro.title[1]}</h2>
            <p>{intro.text}</p>
          </motion.div>

          <motion.h2 className="s-why" initial={false} animate={{ opacity: stage >= 1 && stage <= 3 ? 1 : 0, x: stage >= 1 && stage <= 3 ? 0 : -40 }} transition={t}>
            {why}
          </motion.h2>

          {features.map((f, i) => (
            <motion.div key={f.key} className="s-feature" initial={false} animate={{ opacity: stage === i + 1 ? 1 : 0, y: stage === i + 1 ? 0 : stage > i + 1 ? -30 : 30 }} transition={t}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}

          <Phone
            screens={phoneScreens}
            active={screenFor[stage]}
            className="s-phone"
            initial={false}
            animate={phoneAt[stage]}
            transition={{ duration: 0.9, ease }}
          />

          <div className="s-bento" style={{ pointerEvents: stage === 4 ? "auto" : "none" }}>
            <Bento show={stage === 4} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Phones and tablets: no pinning, each feature is a normal block
function StackedStory() {
  return (
    <div className="story-stack" data-snap>
      <div className="s-title-stack">
        <h2>{intro.title[0]}<br />{intro.title[1]}</h2>
        <p>{intro.text}</p>
      </div>
      <StaticPhone screen={screens.home} scale={0.95} />
      <h2 className="why-stack">{why}</h2>
      {features.map((f) => (
        <div key={f.key} className="feature-stack">
          <StaticPhone screen={f.screen} scale={0.95} />
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
      <Bento animated={false} />
    </div>
  )
}

export default function Story() {
  const narrow = useMedia("(max-width: 900px)")
  return <section id="product" className="story">{narrow ? <StackedStory /> : <PinnedStory />}</section>
}
