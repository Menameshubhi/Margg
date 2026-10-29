import { motion } from "framer-motion"

// Phone mockup drawn in CSS, built at 296 x 625 and scaled by its parent.
// Pass several screens and an `active` index to cross-fade between them.
export const PHONE_W = 296
export const PHONE_H = 625

export default function Phone({ screens, active = 0, className = "", ...rest }) {
  return (
    <motion.div className={"phone " + className} {...rest}>
      <div className="phone-screen">
        {screens.map((src, i) => (
          <img key={src + i} src={src} alt="" className={i === active ? "is-on" : ""} draggable="false" />
        ))}
      </div>
      <span className="phone-island" />
    </motion.div>
  )
}

// Fixed-size wrapper so a scaled phone still takes up the right space in normal flow
export function StaticPhone({ screen, scale = 1 }) {
  return (
    <div style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
      <div style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Phone screens={[screen]} />
      </div>
    </div>
  )
}
