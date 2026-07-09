# UI/UX Audit — Ankur Bhatnagar Resume Website

**Evaluator perspective:** UI/UX Lead, 15+ years  
**Date:** July 8, 2026  
**Evaluation lens:** Modern aesthetics, persona alignment, recruiter + hiring manager + peer audience

---

## Executive Summary

The site is technically competent — clean React, well-structured CSS tokens, responsive — but it reads as a **polished template**, not a **portfolio that proves its owner leads 20+ designers and architects enterprise-scale UIs**. The gap between what the site *claims* (UI/UX Practice Head, Technical Architect) and what the site *demonstrates* is the core problem.

Robby Leonardi's resume works because the medium IS the message — a game designer's resume is a game. For Ankur, the equivalent should be: **a technical architect's resume that feels architected, a UX leader's portfolio that demonstrates UX thinking at every scroll position.** Right now it demonstrates competence with React and Framer Motion, but not design leadership.

---

## 1. What's Working

These deserve credit and should be preserved:

- **Blueprint/architect theme concept** — genuinely good identity direction for a Technical Architect. Just massively underexecuted.
- **Three theme modes** (dark, light, sunlight) — thoughtful, shows accessibility awareness.
- **CSS design token system** — well-organized variables, proper separation of concerns.
- **Fluid typography** — the `clamp()` system is solid responsive design.
- **Print/PDF export** — practical, shows product thinking.
- **Custom scrollbar** — small detail that shows care.
- **Sound effects concept** — bold and differentiating (needs better execution).
- **Font pairing** — IBM Plex Sans + Fira Sans + JetBrains Mono is a strong technical typographic palette.

---

## 2. UX Problems — Information Architecture & Flow

### 2.1 No narrative arc
The site is 8 sections stacked vertically with zero storytelling. Leonardi's site succeeds because scrolling IS the story — you experience a journey. Here, scrolling just reveals more cards. A UI/UX Practice Head should craft an experience with intentional pacing: tension, release, surprise, payoff.

**What to do:** Design a scroll journey with a beginning (who is Ankur), middle (proof of capability), and end (call to action). Each section transition should feel connected, not just "next card deck."

### 2.2 Hero → Summary redundancy
Hero says: "13+ Years, Technical Architect & UI/UX Practice Head, Bengaluru."  
Summary immediately repeats: "13+ years of experience... Technical Architect and UI/UX Practice Head."

The user reads essentially the same information twice within one viewport of scrolling. This is poor information economy.

**What to do:** Merge or sharply differentiate. Hero should be emotional/aspirational (who is this person, why should I care). Summary should be evidentiary (prove it with numbers and specifics). Currently both try to do both.

### 2.3 Experience section fights the user
Cards auto-expand on scroll (`useInView` triggers `setExpanded(true)`). This fights the user's scanning intent — when scrolling a timeline, you want to scan quickly and expand what interests you. Forced expansion removes agency and creates unexpected layout shifts.

**What to do:** Remove auto-expand. Let users click to expand. Or better: redesign the section so it doesn't need expand/collapse at all — show the essential information upfront with progressive disclosure for details.

### 2.4 Six identical experience cards, one company
All six roles are at DreamOrbit/Saksoft. The most compelling story here — growing from junior engineer to architect over 13 years at one company, surviving an acquisition — is completely buried under identical card layouts. Each card looks the same, reads the same way, and offers no visual sense of progression.

**What to do:** Visualize the *growth arc*. Show role escalation. Maybe the timeline line thickens or brightens as seniority increases. Maybe the cards grow in size. Maybe early roles are condensed and recent roles are expanded. Make the visual treatment match the career trajectory.

### 2.5 Skills section uses the most clichéd pattern in portfolios
Percentage skill bars ("Angular 95%", "SQL 55%") are universally considered the worst portfolio pattern by hiring managers. What does "95% Angular" mean? Compared to whom? It's meaningless, and it's the first thing experienced reviewers will judge.

**What to do:** Replace with something that communicates competence without false precision. Options: skill constellation/radar, technology timeline showing when each skill was adopted and how long it's been used, a "tech stack per project" matrix, or simply categorized tags with "primary / secondary / exploring" tiers.

### 2.6 No proof of work
For a UI/UX Practice Head, the most damning absence is: **where is the work?** No screenshots. No architecture diagrams. No before/after case studies. No design system artifacts. The Projects section is entirely text — descriptions and bullet points. This is a resume claiming design leadership with zero visual evidence.

**What to do:** Add visual artifacts for at least 2-3 key projects. Architecture diagrams, UI screenshots, design system documentation excerpts, team structure visuals. These don't need to be interactive — even static images would transform the credibility of the Projects section.

### 2.7 Contact section wastes a full viewport
`min-h-screen` on the Contact section gives 4 links and a copy button an entire viewport of space. It's a lot of emptiness for very little content.

**What to do:** Make Contact a tight, elegant footer — or combine it with a more interesting final experience (a CTA section with personality, a "what I'm looking for" statement, a parting interaction).

---

## 3. Micro-interactions & Animation — The Biggest Gap

### 3.1 One animation pattern for everything
Every section uses the exact same entrance:
```js
initial={{ opacity: 0, y: 40 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.8 }}
```
This is the Framer Motion equivalent of using one font for everything. It makes the site feel automated, not designed. A UI/UX Practice Head's portfolio should demonstrate animation vocabulary.

**What to do:** Vary entrances by section purpose:
- Hero: dramatic scale + blur reveal
- Stats: count-up with spring overshoot
- Timeline: draw-on SVG line + staggered card reveal from the line outward
- Skills: radial/organic growth animation
- Projects: masonry-style stagger with varied delays
- Achievements: tilt-in from perspective

### 3.2 No scroll-linked animations
The site uses `useInView` with `triggerOnce: true` for everything. Once triggered, the animation plays and that's it. There are zero scroll-linked (continuous) animations — no parallax, no scroll-driven progress, no elements that respond to scroll position.

Motion's `useScroll()` and `useTransform()` enable scroll-velocity-linked effects that feel alive rather than triggered.

**What to do:** Add:
- Parallax depth on the Hero (background grid scrolls slower than content)
- A scroll progress indicator (the blueprint line "drawing" as you scroll down)
- Section transitions that morph/blend rather than just appearing
- The timeline line animating its gradient position as you scroll through Experience

### 3.3 Hover states are all "scale"
Every interactive element: `hover:scale-[1.02]` or `hover:scale-105`. No variety. No personality.

**What to do:** Design hover states with intention:
- Cards: subtle 3D tilt (CSS perspective transform) + shadow shift
- Tech badges: inner glow that expands from center
- Timeline dots: pulse ring + tooltip preview
- Nav items: underline draw-on
- Contact links: icon animation (mail icon opens, phone icon vibrates)
- Profile image: the blueprint corners could animate into a full frame

### 3.4 Sound effects need refinement or removal
Raw Web Audio API oscillators sound like a tech demo, not a designed experience. The concept is bold and differentiating, but execution matters — poorly-done sound hurts more than no sound. Also, sound is unexpected on a resume; the first encounter needs to be a "delight" moment, not a "what was that?" moment.

**What to do:** Either invest in proper sound design (short, designed samples loaded as audio files, not synthesized) or scale back to a single, well-designed interaction sound for key moments only (like the theme toggle or scroll-to-section).

### 3.5 The role rotation animation is broken
The Hero cycles through roles with `key={currentRole}` which should trigger AnimatePresence — but the `exit` prop exists without an `AnimatePresence` wrapper in the JSX. The roles just snap-in with a slide-up, never smoothly exit.

**What to do:** Wrap in `<AnimatePresence mode="wait">` for proper enter/exit transitions. Consider a typing effect, a "blueprint annotation" reveal, or a morphing text transition for more personality.

### 3.6 Missing micro-interactions
Things a modern portfolio should have that this one doesn't:
- **Cursor effects** — Custom cursor or cursor-following highlight (subtle, not flashy)
- **Magnetic buttons** — Buttons that slightly attract toward the cursor on hover
- **Staggered list reveals** — Items entering one by one with organic timing
- **Transition connectors** — Visual elements that bridge section boundaries
- **Loading/intro animation** — The first impression is currently "things fade in." A brief, crafted intro sequence sets the tone.
- **Easter eggs** — For the peer audience especially. A Konami code, a console message, a hidden interaction.

---

## 4. Visual Design & Modern Aesthetics

### 4.1 Card fatigue
Every section is the same pattern: heading → grid of cards. Skills = cards. Projects = cards. Achievements = cards. Education = cards. This makes the site feel templated and monotonous.

**What to do:** Vary layouts by section. Timeline for experience (keep), constellation/radar for skills, editorial long-form for key projects, compact list for achievements, inline for education. Not every piece of information deserves a card.

### 4.2 The "01. 02. 03." numbering
This pattern is directly from Brittany Chiang's popular portfolio template (v4.brittanychiang.com) and has been so widely copied that experienced reviewers will immediately recognize it as a derivative. For someone positioning as a design leader, this is a credibility hit.

**What to do:** Either evolve it into something distinctly "blueprint" (section numbers as architectural drawing annotations — circled, with leader lines, with grid coordinates) or drop numbered sections entirely. The numbering doesn't add UX value; it's purely decorative.

### 4.3 Blueprint grid is wasted potential
The site's strongest visual differentiator — the architectural grid — exists at barely-visible opacity as a static background. It does no work. It could be the entire visual language.

**What to do:** Make the grid an active design element:
- Lines that brighten near the cursor
- Grid intersections that become interactive nodes
- Section boundaries marked with blueprint-style annotations ("SECTION A-3", "DETAIL VIEW", "REV. 03")
- Cards that feel "pinned" to the grid (alignment indicators, dimension callouts)
- Drawing-style reveals where content appears as if being drafted

### 4.4 Section differentiation is too subtle
Sections alternate between `--bg-deep` (#0D1117) and `--bg-surface` (#161B22). The difference is barely perceptible — they're both very dark blue-black. Without the section numbers, it's hard to tell where one section ends and another begins.

**What to do:** Use stronger visual section breaks. Options: a horizontal rule that animates in, a blueprint fold/unfold transition, a change in grid density, a decorative divider using the blueprint vocabulary (dimension lines, section markers, callout arrows).

### 4.5 Typography hierarchy is flat
Four fonts are loaded but everything reads at the same visual pace. There's no dramatic variation — no oversized pull quotes, no delicate annotations, no weight contrast that guides the eye.

**What to do:** Create clear typographic moments:
- Summary blockquote: larger, lighter weight, more breathing room
- Section headings: bolder, with blueprint-style annotation details
- Tech badges: smaller, tighter, "label" feel
- Key stats: dramatically oversized, with unit labels as annotations
- Timeline periods: handwriting-style or drafted-text feel

### 4.6 No imagery beyond the profile photo
The entire site is text, icons, and colored rectangles. For a UI/UX person, this is a missed opportunity. Visual variety makes a page memorable.

**What to do:** Add texture through:
- Project screenshots or mockups (even stylized/abstracted ones)
- An architecture diagram for at least one project
- A design system artifact (color palette, component library screenshot)
- SVG illustrations that reinforce the blueprint theme
- Background visual elements that add depth without competing

---

## 5. Uniqueness & Persona Alignment — The Core Gap

### 5.1 "ANKUR.DEV" branding is wrong for the persona
The nav logo says "ANKUR.DEV" — positioning as a developer. But the persona is UI/UX Practice Head and Technical Architect. "Dev" undersells the actual role and misaligns with the narrative.

**What to do:** Rebrand to something that signals architecture/leadership. Options: "A.BHATNAGAR" (professional), a monogram, or a blueprint-style stamp/seal. If keeping ".dev" format, at least "ANKUR.ARCH" or "ANKUR.UX" would be more accurate.

### 5.2 The site doesn't prove its central claim
The site claims "UI/UX Practice Head leading 20+ designers." But nothing in the site demonstrates UX thinking beyond basic competence. A recruiter evaluating a UX leader will evaluate the portfolio itself as evidence — and currently it says "I can use templates well," not "I think deeply about user experience."

**What to do:** The site's own UX should be the proof. Every decision — navigation pattern, information hierarchy, animation timing, progressive disclosure, interaction design — should feel intentional and defensible. If asked "why did you design it this way?", every answer should be a UX rationale, not "the template did it."

### 5.3 No AI narrative
Ankur has built internal GenAI tools, designs AI-centric problem statements for team evaluations, and lists AI as a core skill. But the AI story on the site is just a skill category card with "Claude 92%, Copilot 90%." This is a major differentiator left on the table.

**What to do:** Weave AI into the experience itself. Options:
- An AI-powered chatbot that can answer questions about Ankur's experience
- A section showing the AI workflows/tools he's built
- Interactive demos of AI-assisted design thinking
- At minimum, a dedicated section or expanded narrative about AI leadership (not just a skill list)

### 5.4 No design leadership evidence
The site shows technical skills but zero evidence of design leadership: no design process, no team management philosophy, no UX methodology, no design system examples.

**What to do:** Add a "How I Lead" or "My Approach" section (or integrate it into existing sections). Show: how you structure UX teams, your design review process, the design systems you've established, how you bridge UX intent with technical architecture. This is what separates a senior IC from a practice head.

### 5.5 The site could belong to anyone
Remove the name and photo, and nothing about this site's design language, interactions, or content strategy identifies it as belonging specifically to Ankur Bhatnagar. The blueprint theme is a start, but it's applied as a skin, not an identity.

**What to do (the big idea):** The blueprint metaphor should inform the entire experience:
- The page loads like a blueprint being unrolled
- Content reveals like architectural drawings being drafted
- Annotations appear in the margins, blueprint-style
- The scroll experience feels like exploring a master plan
- Interactive elements feel like technical instruments (zoom, measure, annotate)
- The career timeline reads like a construction timeline / Gantt chart
- Skills are rendered as a system architecture diagram

This doesn't mean "overpower with theme." It means using the theme as a *design language* that informs decisions at every level — spacing, animation style, typography treatment, interaction patterns — rather than just a background grid.

---

## 6. Prioritized Recommendations

### Tier 1 — Transformative (Do these first)

| # | Recommendation | Impact | Effort |
|---|---|---|---|
| 1 | **Replace skill bars** with constellation, radar, or categorized tiers | Eliminates biggest credibility issue | Medium |
| 2 | **Add visual proof** to Projects (screenshots, diagrams) | Proves design leadership | Medium |
| 3 | **Redesign Experience as a growth journey** (not 6 identical cards) | Creates narrative | High |
| 4 | **Create a signature scroll experience** — the "blueprint builds itself" concept | Differentiates from every other portfolio | High |
| 5 | **Fix the role-rotation animation** and add an intro sequence | First impression matters | Low |

### Tier 2 — Elevated Craft

| # | Recommendation | Impact | Effort |
|---|---|---|---|
| 6 | **Vary animation vocabulary** across sections | Removes template feel | Medium |
| 7 | **Add scroll-linked animations** (parallax, progress, continuous) | Modern interaction feel | Medium |
| 8 | **Design intentional hover states** per element type | Shows interaction design skill | Medium |
| 9 | **Activate the blueprint grid** (cursor response, brightness, annotations) | Theme becomes alive | Medium |
| 10 | **Add section transition connectors** | Creates visual continuity | Low |

### Tier 3 — Modern Polish

| # | Recommendation | Impact | Effort |
|---|---|---|---|
| 11 | **Reduce card density**, vary layouts by section | Less monotonous | Medium |
| 12 | **Evolve or drop "01. 02. 03."** numbering pattern | Removes template association | Low |
| 13 | **Rebrand "ANKUR.DEV"** to match persona | Correct positioning | Low |
| 14 | **Strengthen typography hierarchy** | Better visual rhythm | Low |
| 15 | **Add an AI narrative section** or integration | Differentiator | Medium |
| 16 | **Refine or simplify sound effects** | Quality over quantity | Medium |
| 17 | **Add Easter eggs** for peer audience | Memorability | Low |

---

## 7. The One-Line Summary

**The site proves you can build things. It needs to prove you can *design* things.**

A UI/UX Practice Head's portfolio is held to a different standard than a developer's. Every pixel, every transition, every information hierarchy choice is being evaluated as evidence of design thinking. The site needs to move from "competent template execution" to "intentional, opinionated, persona-driven experience design."
