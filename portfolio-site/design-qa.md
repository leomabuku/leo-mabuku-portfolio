# Design QA — Cinematic Systems Portfolio

- Source visual truth: `qa/source-home-desktop.png` and `qa/source-home-mobile.png`
- Desktop implementation: `qa/final-home-desktop.png`
- Mobile implementation: `qa/final-home-mobile.png`
- Case-study implementation: `qa/final-tongalang-desktop.png`
- Combined comparisons: `qa/home-comparison-desktop.png` and `qa/home-comparison-mobile.png`
- Verified viewports: 1280 × 720, 768 × 900, and 390 × 844

## Comparison outcome

The redesign preserves the source identity: near-black surfaces, warm Cormorant Garamond display type, DM Sans utility text, electric-lime signals, the real monochrome portrait, square-edged editorial surfaces, and factual project evidence. The new composition deliberately increases depth and interaction without replacing the established visual language.

Desktop retains the source's split portrait hero and CTA hierarchy. The portrait remains the dominant real asset, now supplemented by a restrained scan line and an additive data-shift layer. Mobile changes from a static dark hero to a portrait-led cinematic crop; stronger foreground color and text shadow keep the small role and introduction readable over the image.

## Required fidelity surfaces

- Fonts and typography: the serif/sans pairing, display weight, compact metadata, uppercase role treatment, and lime emphasis remain consistent. Headlines wrap without horizontal document overflow at all verified sizes.
- Spacing and layout: the hero, capability beat, project runway, operational proof, and availability beat have distinct rhythm. Work cards, case content, and resume groups collapse without overlap. The case-study rail becomes a compact number rail at narrower desktop widths and a sticky horizontal rail below 1250px.
- Colors and tokens: the original background, warm-white text, muted copy, charcoal rules, and lime accent remain the only dominant visual tokens. Motion states do not introduce unrelated brand colors.
- Image quality and assets: all visible project and portrait imagery uses supplied real assets. No placeholder avatars, fake product screenshots, custom SVG illustrations, or CSS-drawn substitute imagery were introduced.
- Copy and content: visible claims remain grounded in the existing site data and verified evidence. No clients, employers, metrics, qualifications, or project outcomes were invented.
- Icons: Phosphor remains the single icon family. Command, navigation, contact, filter, and CTA icons have consistent stroke treatment and accessible labels where needed.
- States and interactions: navigation, mobile menu, Work filtering, shared project transitions, command search, Escape dismissal, case progress, focus feedback, downloads, and contact mailto preparation were checked. Hover video remains muted.
- Accessibility: semantic controls and landmarks, `aria-pressed`, live filter announcements, labeled dialog/search, visible focus, skip navigation, descriptive alt text, native scrolling, reduced-motion rules, and adaptive full/lite/reduced modes are present.

## Responsive and interaction verification

- 1280 × 720: full motion mode, WebGL portrait ready, no horizontal overflow, portrait fallback visible, command palette opens with Ctrl/Cmd+K and closes with Escape.
- 768 × 900: lite mode selected, WebGL omitted, no horizontal overflow, stable hero and two-column project sizing.
- 390 × 844: lite mode selected, WebGL omitted, mobile menu opens/closes with correct `aria-expanded`, project cards use a swipe-friendly rail, and the document has no horizontal overflow.
- Work filter: Android announces two matching projects and preserves pressed state; hidden cards remain in the document for reversible filtering.
- TongaLang: seven chapter targets and six interpreter-pipeline steps render; the sticky progress treatment no longer overlaps the case-study title.
- About, Resume, Contact: no horizontal overflow; the learning/building/operating story, four-part capability map, download links, contact field stages, and mailto workflow remain intact.
- Browser console: no errors or warnings in the final desktop pass.

## Resolved findings

1. P1 — the hero portrait was visually flattened because GSAP interpolated the parent filter from `contrast(0)`. The parent filter animation was removed; the source image remains visible beneath the additive WebGL layer.
2. P2 — the desktop case-study progress labels overlapped large titles around 1280px. Labels now collapse to a compact numbered rail and expand only on intentional hover.
3. P2 — Escape did not consistently dismiss the command palette in automation. Explicit keyboard dismissal was added while retaining native dialog behavior.
4. P2 — mobile supporting copy lost contrast over the portrait. Foreground color and restrained text shadow were strengthened at the mobile breakpoint.

## Performance notes

- Three.js is isolated in a deferred portrait chunk and is never requested in lite or reduced modes.
- The original portrait is present immediately as the content fallback; WebGL is enhancement-only and pauses offscreen or while the document is hidden.
- The main experience bundle builds separately from the deferred portrait scene. The build reports the Three.js chunk-size advisory, but that chunk is not part of the initial route payload.

No actionable P0, P1, or P2 design issues remain.

final result: passed
