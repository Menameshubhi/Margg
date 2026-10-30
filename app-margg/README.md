# App landing page: Margg

Dark purple landing page for a learning app, built from the Figma prototype "Margg" (Landing Page, starting at the Intro frame).

## Status
- Local build: working (React + Vite + framer-motion). Run `npm install && npm run dev`.
- Framer: not started.
- Checked in the browser: hero, stats, the pinned product story and the feature grid at desktop width. Not yet checked after the last CSS tweaks: Testimonials, Download, Contact and Footer sections, tablet and phone widths.

## Sections (top to bottom)
Navbar, Hero (cycling role tiles), Stats (count-up), Product story (pinned: intro, Roadmap, Interview, Mentorship, feature grid), Testimonials (floating cards and ticker), Download, Contact (Learners / Instructors / Partners forms), Footer.

## Behaviour
- Breakpoints: desktop over 1024px, tablet 721-1024px, phone 720px and below. Type is fluid (`clamp()` with vw) and the pinned story canvases scale to the screen.
- Tablet and phone: native scrolling (no page-by-page paging). The product story is still pinned and scroll-driven, using a portrait canvas (intro, then the three features); the feature grid then flows below as cards that animate in (two across on tablet, one on phone). The hero tile grid is 3 columns on phones. Contact lines are hidden on phones (cards are stacked), the card still lights up and scrolls to the form.
- On desktop (wider than 1024px) every section is one full-viewport page and each scroll (wheel, swipe, or Up / Left / PageUp and Down / Right / PageDown keys) moves exactly one step: next section, or next stage of the pinned story. Keys are ignored while typing in a form. Content taller than the viewport is scaled down to fit (`Fit.jsx`). 
- Hero tiles highlight on hover (and click / keyboard focus); tiles never move, the highlight is drawn over them.
- The desktop pinned story is a 1280 x 832 canvas scaled to fit.
- Animation choices were not readable from the Figma API (no motion data), so they are interpretations: the phone glides between positions and the screen cross-fades, feature text slides, the grid cards fly in, the Intro highlight cycles, testimonial cards float.

## Placeholders to replace
- All copy is in `src/content.js` (brand renamed from SkillGig to Margg; testimonials, contact details and form fields for Instructors/Partners are invented).
- The map is a drawn placeholder, not a real map.
- Phone screens in `assets/screens/` come from the prototype. The prototype also contains watermarked stock photos; those were deliberately not used.

## Notes
- `backdrop-filter` on the small feature-grid cards caused a rendering glitch (cards painted blank), so only the navbar and hero tiles use it.
