# CLAUDE.md — Project Context for Ankur Bhatnagar Resume

## What this project is

A personal interactive resume/portfolio website — a single-page, scroll-driven React app deployed (or deployable) to GitHub Pages. It is a **static site with no backend**. The sole purpose is to impress recruiters and showcase professional history. There is no multi-user functionality, auth, or API calls.

---

## Tech stack (what's actually used)

| Concern | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | `motion` (Framer Motion v12, package name is `motion`) |
| Scroll detection | `react-intersection-observer` |
| Icons | `lucide-react` |
| Package manager | pnpm (workspace root defined in `pnpm-workspace.yaml`) |

> **Note:** `react-router`, `@mui/material`, `recharts`, `react-dnd`, `react-hook-form`, `html2canvas`, `next-themes`, `react-slick`, `react-responsive-masonry`, and all shadcn/ui Radix primitives are installed but **not used**. They are scaffolding leftovers from the Figma Make template. Do not use them unless explicitly asked — the project should stay lean.

---

## Architecture

Single-page, anchor-scroll layout. No routing. Section order in `App.tsx` is the canonical render order:

```
ThemeProvider
  └── SoundProvider
        └── AppContent
              ├── Navigation (sticky, fixed)
              └── Hero → Summary → Skills → Experience → Projects → Achievements → Education → Contact
```

Each section is a self-contained component file under `src/app/components/`. Navigation tracks the active section via a `scroll` event listener, not a router.

### Providers

- **`ThemeProvider`** (`ThemeProvider.tsx`) — Manages `theme` (`'dark'|'light'`) and `displayMode` (`'normal'|'sunlight'`). Reads from `localStorage` on mount, auto-detects system preference if no saved value. Applies `.dark`/`.light`/`.sunlight-mode` CSS classes to `document.documentElement`. Use `useTheme()` hook to access.
- **`SoundProvider`** (`SoundProvider.tsx`) — Wraps `useSoundEffects`. Exposes `playSound(type)`, `toggleSound()`, `setVolume()`, `isEnabled`, `volume`. Use `useSound()` hook to access.
- **`useSoundEffects`** (`useSoundEffects.ts`) — Web Audio API oscillator-based sounds. Types: `'click' | 'hover' | 'toggle' | 'success' | 'transition' | 'whoosh' | 'pop'`. Settings persisted in `localStorage`. Throttles rapid repeats to 50ms.
- **`SettingsMenu`** (`SettingsMenu.tsx`) — Gear-icon dropdown in desktop nav. Contains toggles for dark/light, sunlight mode, and sound effects.

---

## Where resume content lives

All content is **hardcoded as TypeScript arrays inside each component file** — there is no external data file or CMS.

| Data | File |
|---|---|
| Work experience (6 roles) | `src/app/components/Experience.tsx` → `experiences[]` |
| Projects (5 items) | `src/app/components/Projects.tsx` → `projects[]` |
| Skills (5 categories) | `src/app/components/Skills.tsx` → `skillCategories[]` |
| Achievements + Certifications | `src/app/components/Achievements.tsx` |
| Education (2 entries) | `src/app/components/Education.tsx` → `education[]` |
| Summary stats + tagline | `src/app/components/Summary.tsx` (inline) |
| Hero copy + roles | `src/app/components/Hero.tsx` (inline) |

Years of experience is computed dynamically: `new Date('2013-06-01')` is the career start date.

---

## Design system

Defined in `src/styles/theme.css` as CSS custom properties. Never hardcode color hex values in components — always reference these variables:

```css
--bg-deep: #0D1117          /* page background */
--bg-surface: #161B22       /* card/surface background */
--bg-border: #21262D        /* subtle borders */
--accent-cyan: #00C8FF      /* primary accent, CTAs, skill bars */
--accent-amber: #F0883E     /* section numbers, secondary badges */
--text-primary: #E6EDF3     /* body text */
--text-muted: #8B949E       /* secondary/dimmed text */
--success-green: #3FB950    /* skill bar gradient */
```

**Typography** (CSS variables from `src/styles/fonts.css`):
- `--font-display` → IBM Plex Sans (section headings)
- `--font-body` → Fira Sans (paragraphs)
- `--font-ui` → Roboto (nav, UI chrome)
- `--font-mono` → JetBrains Mono (tech badges, code chips)

Three theme modes are supported:
- **Dark** (default) — original blue-black palette
- **Light** — blueprint-style light theme (cooler blues, dark text)
- **Sunlight** — warm cream, maximum contrast for outdoor use

All three override the same set of CSS variables. The toggle lives in `SettingsMenu` in the nav. Theme preference is persisted in `localStorage` under `portfolio-theme` and `portfolio-display-mode`.

---

## Coding conventions

- **TypeScript**: define interfaces at the top of each component file for the component's local data shapes. No shared type file unless a type is used across 3+ files.
- **Styling**: Tailwind utility classes for layout/spacing; inline `style={{ ... }}` referencing CSS variables for colors and fonts. Do not mix Tailwind color classes (e.g. `text-blue-500`) with the custom design tokens — always prefer the CSS variable.
- **Animations**: use `motion` from `'motion/react'` + `useInView` from `react-intersection-observer` for scroll-triggered animations. Keep animation variants co-located with the component that uses them.
- **Component exports**: named exports (`export function Foo`) not default exports, except `App.tsx` which uses a default export.
- **No comments** unless the logic is genuinely non-obvious (e.g. a complex animation timing calculation). Do not add descriptive/JSDoc comments.
- **No unused imports** — remove any import not referenced in the file.
- **File naming**: PascalCase for components (`Experience.tsx`), camelCase for hooks (`useFavicon.tsx`).

---

## Development commands

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build
```

---

## Deployment target

GitHub Pages via the `gh-pages` branch. Production URL: `https://bhatnagar-ankur.github.io/ankur-bhatnagar-site/`

Deploy steps (once `gh-pages` package is added):
```bash
npm run predeploy   # runs build
npm run deploy      # pushes dist/ to gh-pages branch
```

---

## Known cleanup needed

- Remove or prune unused dependencies from `package.json` (MUI, react-dnd, recharts, react-router, etc.) — they bloat the install without contributing to the build.
- `src/app/components/ui/` — directory of shadcn/ui components, none of which are imported. Can be deleted.
- `src/assets/profile.jpg` — unused (Hero uses `src/imports/Profile_Pic.jpg`). Can be deleted.

---

## Future considerations (not yet decided)

- A **blog section** is under consideration but not scoped. If added, it will likely be static markdown files rendered at build time — do not introduce a backend or CMS for this.
- No other sections, features, or breaking changes are planned at this time.

---

## CSS files load order

`src/styles/index.css` imports in this order:
1. `fonts.css` — Google Fonts `@import`
2. `tailwind.css` — Tailwind directives
3. `theme.css` — CSS custom properties (`:root`, `.light`, `.sunlight-mode`)
4. `blueprint.css` — global theme-transition animations + `body::before` grid overlay

---

## What NOT to do

- Do not add features that weren't asked for.
- Do not introduce MUI, recharts, or any of the currently-unused dependencies.
- Do not add a router (`react-router`) — navigation is scroll-based only.
- Do not write comments explaining what the code does — only write them for non-obvious WHY reasons.
- Do not create intermediary abstraction layers unless the same logic appears in 3+ places.
- Do not call `playSound()` directly in component render bodies — always put it inside `useEffect` or event handlers.
