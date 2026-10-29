import { motion } from "framer-motion"
import { community, screens } from "../content"

function Flame() {
  return (
    <svg viewBox="0 0 48 64" width="40" height="54" aria-hidden="true">
      <defs>
        <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E8590C" />
          <stop offset="0.6" stopColor="#FF922B" />
          <stop offset="1" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path d="M24 2c2 12 18 18 18 38a18 18 0 0 1-36 0c0-8 4-13 8-17 0 6 3 9 6 9-2-12 0-22 4-30Z" fill="url(#flame)" />
      <path d="M24 30c6 6 10 9 10 16a10 10 0 0 1-20 0c0-5 4-8 6-11 1 3 2 4 4 4-1-3 0-6 0-9Z" fill="#FFE8A3" opacity=".9" />
    </svg>
  )
}

const days = ["Mon", "Tue", "Wed", "Thu"]

// Each card flies in from the right with its own delay when `show` turns on
export default function Bento({ show = true, animated = true }) {
  const card = (i) =>
    animated
      ? { initial: false, animate: { opacity: show ? 1 : 0, x: show ? 0 : 80, y: show ? 0 : 24 }, transition: { duration: 0.6, delay: show ? 0.12 + i * 0.08 : 0, ease: [0.22, 1, 0.36, 1] } }
      : {}

  return (
    <div className="bento">
     <div className="brow brow-1">
      <motion.article className="bcard b-roadmap" {...card(0)}>
        <h3>Roadmap Based Learning</h3>
        <p>Your personalised blueprint to success</p>
        <img src={screens.roadmap} alt="" className="b-roadmap-img" />
      </motion.article>

      <motion.article className="bcard b-mentor" {...card(1)}>
        <h3>One-on-One Mentorship</h3>
        <div className="b-mini-phone"><img src={screens.mentor} alt="" /></div>
      </motion.article>

      <motion.article className="bcard b-community" {...card(2)}>
        <h3>Community</h3>
        <div className="bubbles">
          {community.map((c, i) => (
            <span key={c.name} className={"bubble bubble-" + i}>
              <b>{c.name}</b>
              {c.text}
            </span>
          ))}
        </div>
      </motion.article>

     </div>
     <div className="brow brow-2">
      <div className="b-col">
        <motion.article className="bcard b-focus" {...card(3)}>
          <svg className="ring" viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r="70" className="ring-bg" />
            <circle cx="80" cy="80" r="70" className="ring-fg" />
          </svg>
          <div className="ring-text"><b>23:00</b><span>Focus</span></div>
          <div className="focus-copy">
            <h3>Focus Timer</h3>
            <p>Your personalised blueprint to success</p>
          </div>
        </motion.article>

        <motion.article className="bcard b-streak" {...card(4)}>
          <h3>Streaks</h3>
          <Flame />
          <div className="streak-days">
            {days.map((d, i) => (
              <span key={d} className={i === 1 ? "miss" : "hit"}><small>{d}</small><i /></span>
            ))}
          </div>
        </motion.article>
      </div>

      <motion.article className="bcard b-prep" {...card(5)}>
        <h3>Interview Prep Materials</h3>
        <img src={screens.robot} alt="" className="prep-robot" />
        <div className="prep-quiz"><img src={screens.quiz} alt="" /></div>
        <blockquote className="prep-card">“ Users often perceive aesthetically pleasing design as design that’s more usable.</blockquote>
      </motion.article>
     </div>
    </div>
  )
}
