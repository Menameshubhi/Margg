import { useEffect, useRef, useState } from "react"
import Fit from "./Fit"
import { reveal } from "../reveal"
import { motion } from "framer-motion"
import logoMark from "../../assets/logo-mark.svg"
import { brand, contactIntro, download, footer, footerPitch, marquee, roles, screens, testimonials } from "../content"

function initials(name) {
  return name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("")
}

export function Testimonials() {
  const rot = [-3, 2, -4, 2, -1, 3, -2, 1.5, -3]
  return (
    <section id="testimonials" data-snap className="testi">
     <Fit>
      <div className="testi-panel">
        {testimonials.map((q, i) => (
         <motion.div key={q.name} className="quote-wrap" {...reveal(i % 3 + Math.floor(i / 3), 60)}>
          <motion.figure
            className="quote"
            style={{ "--r": rot[i % rot.length] + "deg", "--d": (i % 3) * 0.7 + "s" }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <blockquote>{q.text}</blockquote>
            <figcaption>
              <span className="avatar" aria-hidden="true">{initials(q.name)}</span>
              <span><b>{q.name}</b><small>{q.role}</small></span>
            </figcaption>
          </motion.figure>
         </motion.div>
        ))}
      </div>
      <div className="marquee" aria-label={marquee}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1, 2, 3].map((n) => (
            <span key={n}>{marquee}<i> • </i></span>
          ))}
        </div>
      </div>
     </Fit>
    </section>
  )
}

export function Download() {
  return (
    <section id="download" data-snap className="download">
     <Fit top={130}>
      <motion.div className="dl-card" {...reveal(0, 60)}>
        <div className="dl-copy">
          <h2>{download.title}</h2>
          <p>{download.text}</p>
          <a className="btn-white" href={download.href}>{download.button}</a>
        </div>
        <div className="dl-phone"><div className="dl-phone-inner"><img src={screens.home} alt="" /></div></div>
      </motion.div>
     </Fit>
    </section>
  )
}

function RoleIcon({ kind }) {
  if (kind === "cap") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 2 11l14 7 14-7-14-7Z" /><path d="M8 15v7c0 2 4 4 8 4s8-2 8-4v-7l-8 4-8-4Z" opacity=".6" /></svg>
  if (kind === "user") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="9" r="6" /><path d="M5 28c0-6 5-10 11-10s11 4 11 10H5Z" opacity=".6" /></svg>
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h7a2 2 0 0 1 2 2v7H1V9a2 2 0 0 1 2-2h9Zm2 0h4V5h-4v2Z" /><path d="M1 18h30v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8Z" opacity=".6" /></svg>
}

// One continuous section like the design: role cards, dotted lines that join them to the form, then the form.
// Nothing is selected at first; picking a card lights its line, opens the form and scrolls down to it.
export function Contact() {
  const [role, setRole] = useState(null)
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)
  const r = role === null ? null : roles[role]
  const submit = (e) => { e.preventDefault(); setSent(true) }

  // Runs after the form has rendered, so the scroll target exists
  useEffect(() => {
    if (role === null || !formRef.current) return
    const y = formRef.current.getBoundingClientRect().top + window.scrollY - 110
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [role])

  const pick = (i) => {
    setSent(false)
    if (i === role) { // same card again: just take us back to the form
      const y = formRef.current.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: "smooth" })
    } else setRole(i)
  }

  return (
    <section id="contact" data-snap className="contact">
      <div className="glow g1" />
      <motion.div className="contact-head" {...reveal(0)}>
        <h2>{contactIntro.title}</h2>
        <p>{contactIntro.text}</p>
      </motion.div>

      <motion.div className="roles" role="group" aria-label="Who are you? Pick one to open its form" {...reveal(1)}>
        {roles.map((x, i) => (
          <button key={x.key} className={"role" + (i === role ? " is-on" : "")} aria-pressed={i === role} onClick={() => pick(i)}>
            <RoleIcon kind={x.icon} />
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </button>
        ))}
      </motion.div>

      <svg className="links" viewBox="0 0 960 230" preserveAspectRatio="none" aria-hidden="true">
        {[[160, 0], [480, 1], [800, 2]].map(([x, i]) => (
          <path key={i} d={`M${x} 0 V70 L480 160 V230`} className={i === role ? "on" : ""} />
        ))}
      </svg>

      {r && (
        <div ref={formRef} data-snap data-snap-offset="110" className="form-wrap">
          <motion.form className="form" onSubmit={submit} key={r.key} {...reveal(0, 30)}>
            <h3>Drop your details</h3>
            <p className="form-sub">We will contact you real soon!</p>
            <div className="fields">
              {r.fields.map((f) => (
                <label key={f.name}>
                  <span>{f.label}</span>
                  {f.options ? (
                    <select name={f.name} defaultValue={f.options[0]}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                  ) : (
                    <input name={f.name} type={f.type || "text"} placeholder={f.placeholder} required />
                  )}
                </label>
              ))}
            </div>
            <label className="check"><input type="checkbox" defaultChecked /><i aria-hidden="true" />{r.newsletter}</label>
            <div className="form-foot">
              <button className="btn-white" type="submit">Submit</button>
              {sent && <span role="status" className="sent">Thanks! We’ll be in touch shortly.</span>}
            </div>
          </motion.form>
        </div>
      )}
    </section>
  )
}

export function Footer() {
  return (
    <footer id="footer" data-snap className="footer">
     <Fit top={150}>
      <motion.div className="footer-brand" {...reveal(0)}>
        <img src={logoMark} alt="" width="48" height="62" />
        <b>{brand.name}</b>
      </motion.div>
      <motion.p className="footer-pitch" {...reveal(1)}>{footerPitch}</motion.p>

      <motion.div className="touch" {...reveal(2)}>
        <div>
          <h3>Get in touch with us-</h3>
          <ul>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>{footer.address}</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.2Z" /></svg>{footer.phones}</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v.5l-10 6.5L2 6.5V6a1 1 0 0 1 1-1Zm-1 4.3 10 6.5 10-6.5V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.3Z" /></svg>{footer.email}</li>
          </ul>
        </div>
        <div className="map" role="img" aria-label="Map placeholder: replace with your office location">
          <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="320" height="200" fill="#8fd3e6" />
            <path d="M70 0c30 30 60 40 70 70s30 40 40 80-20 50-30 50H70c-20-40-50-60-50-100S50 20 70 0Z" fill="#d7e6c8" />
            <path d="M0 120c40-10 80 0 120 20s120 20 200 0" fill="none" stroke="#fff" strokeWidth="4" opacity=".8" />
            <path d="M110 0c20 60 10 110 40 200" fill="none" stroke="#fff" strokeWidth="3" opacity=".7" />
            <path d="M156 60a9 9 0 1 1 .01 0c0 12-9 22-9 22s-9-10-9-22a9 9 0 0 1 18 0Z" transform="translate(-6 -6)" fill="#e5484d" />
          </svg>
        </div>
      </motion.div>

      <motion.div className="bottom-bar" {...reveal(3, 30)}>
        <span>{footer.copyright}</span>
        {footer.links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        <span>{footer.built}</span>
      </motion.div>
     </Fit>
    </footer>
  )
}
