## Goal

Rebuild hermes-agent.nousresearch.com as a single-page clone with all its motion (hover, scroll, slide, reveal), all its artwork — but with the palette inverted: white background, black text, black-and-white engraving imagery.

## Page structure (single route, `/`)

1. **Sticky header** — NOUS · DOCS · centered HERMES AGENT wordmark with Discord/GitHub icons · PRODUCTS dropdown · INSTALL →
2. **Hero** — "OPEN SOURCE • MIT LICENSE" eyebrow, giant serif headline "THE AGENT THAT GROWS WITH YOU", install-desktop-app button, tabbed terminal install snippet (macOS/Linux | Windows) with copy-to-clipboard; large Hermes engraving artwork on the right
3. **Platform downloads** — three cards (Mac OS / Windows / Linux) each with its platform artwork, OS requirement label, and download link
4. **Feature / Preview toggle + numbered feature sections** — #1 Connect "Lives Everywhere", #2 Remember "Persistent Memory", #3 Schedule "Focused Automation", #4 Delegate "Tasks Multiplied", #5 Search "Browse the Web", #6 Experiment "Isolated Sandboxing" — each with its illustration and copy
5. **Showcase** — the full-width `showcase.webp` app screenshot section
6. **Install section** (anchor `#install`) and **footer** with the Hermes badge artwork

Copy is transcribed verbatim from the live site.

## Motion and interaction

- Scroll-triggered reveals: staggered fade + rise on section entry via IntersectionObserver
- Parallax drift on hero and feature artwork as you scroll
- Sticky/pinned feature sections where the numbered list advances as you scroll
- Hover effects: card lift + border/invert on platform cards, animated underline on nav links, arrow slide on CTAs, image scale-on-hover
- Slide transitions on the install-tab switcher and the Feature/Preview toggle
- Header shrink/background shift on scroll; copy button with a "copied" state animation
- Respects `prefers-reduced-motion`

## Color inversion

- Background white, foreground near-black, subtle grey borders/surfaces — all as semantic tokens in `src/styles.css` (no hardcoded color classes)
- The engraving/artwork images are recolored to black-on-white to match, instead of the original blue
- Typography matched to the original: high-contrast display serif for headings, monospace for labels/eyebrows/terminal, loaded via `<link>` in the root route

## Technical notes

- One route file `src/routes/index.tsx` replacing the placeholder, with section components under `src/components/`
- Original artwork (hero engraving, 3 platform arts, 6 feature illustrations, badge, showcase) is downloaded from the source site, converted to monochrome white-background versions, and stored as CDN-hosted project assets
- Animations built with CSS + IntersectionObserver hooks (plus Motion for React where spring/stagger sequencing helps); no backend needed
- Route-level `head()` with Hermes-specific title, description, og/twitter tags

## Out of scope

Working downloads/installers, docs pages, and the Products dropdown destinations — nav items link out to the real URLs or are inert anchors.
