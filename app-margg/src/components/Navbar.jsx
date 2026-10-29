import { useEffect, useState } from "react"
import logoMark from "../../assets/logo-mark.svg"
import { brand, nav } from "../content"

export function Logo() {
  return (
    <a className="logo" href="#home" aria-label={brand.name}>
      <img src={logoMark} alt="" width="31" height="40" />
      <span className="logo-text">
        <span className="logo-word">{brand.name.toUpperCase()}</span>
        <span className="logo-tag">{brand.tagline}</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [active, setActive] = useState("#home")
  const [open, setOpen] = useState(false)

  // Highlight the link whose section contains the middle of the viewport
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const on = () => {
      const mid = window.scrollY + window.innerHeight * 0.4
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) current = id
      })
      setActive("#" + current)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Main">
        <Logo />
        <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <ul className={"nav-links" + (open ? " is-open" : "")}>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className={active === n.href ? "is-active" : ""} aria-current={active === n.href ? "page" : undefined} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
