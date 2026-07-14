# Design QA

- Source visual truth: `C:\Users\leokm\.codex\generated_images\019f60f2-32ff-7ca0-b37d-335186e93842\exec-87b42a65-8cda-484c-9b3b-1f18294336f0.png`
- Implementation screenshot: `C:\Users\leokm\OneDrive\Documents\portfolio website\portfolio-site\implementation-desktop.png`
- Combined comparison: `C:\Users\leokm\OneDrive\Documents\portfolio website\portfolio-site\qa-comparison.png`
- Viewport: 1280 × 720, DPR 1.5
- State: homepage, default desktop state

## Full-view comparison evidence

The browser-rendered implementation preserves the source hierarchy: two-column portrait hero, oversized warm-white/lime serif name, compact navigation, restrained supporting copy, lime primary action, structured selected-systems rows, mindset band and contact footer. The real GitHub portrait necessarily differs from the generated portrait but uses the same monochrome, edge-faded treatment.

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond and DM Sans reproduce the source's editorial serif/sans pairing, display scale, compact metadata and readable body hierarchy.
- Spacing and layout rhythm: hero proportions, content gutter, project-table density and full-width section separators align with the approved target. Responsive rules convert projects into a horizontal snap rail below 760px.
- Colors and tokens: near-black background, charcoal separators, warm-white text, muted gray copy and electric-lime accents match the source.
- Image quality and assets: the real public GitHub portrait is locally stored, sharp, monochrome and cropped with the approved edge fade. Standard UI symbols use Phosphor Icons; no placeholder or CSS-drawn imagery remains.
- Copy and content: all visible claims are derived from user-supplied identity details or public repository evidence. No employer, qualification, metric, client or business name was invented.

## Focused comparison evidence

The hero was inspected at full browser resolution after replacing the remote image with a local optimized source. The portrait loads at full natural resolution; display type, CTA alignment and navigation remain legible. Project rows were inspected in the DOM for all four projects, including problem, contribution, stack and repository links.

## Interaction and accessibility verification

- Primary Work navigation completed successfully and rendered the expected page heading.
- WhatsApp resolves to `https://wa.me/260770464736`; GitHub, LinkedIn and email links use the verified destinations.
- Five routes render from the static production build.
- Keyboard skip link, semantic landmarks, descriptive project link labels and reduced-motion rules are present.
- Browser console contained no errors or warnings.
- Desktop document width stayed within the viewport with no horizontal page overflow.
- Mobile CSS was checked for single-column navigation, portrait stacking and horizontal project-card scrolling; the in-app browser did not expose a viewport-resize control for a second screenshot.

## Comparison history

1. P1: initial capture hid reveal-managed content and did not load the newly added local portrait. Fixed by making content visible without JavaScript and restarting the preview after adding the local image.
2. Post-fix evidence: the refreshed browser capture shows complete hero typography, working portrait treatment, CTA hierarchy and project content with no console errors.

## Findings

No actionable P0, P1 or P2 issues remain. The generated portrait pose cannot be matched exactly because using Leo's real photo is an intentional truthfulness constraint.

## Follow-up polish

- Replace the current GitHub photo with a higher-resolution studio portrait when supplied.
- Add project screenshots after Leo approves representative imagery.

final result: passed
