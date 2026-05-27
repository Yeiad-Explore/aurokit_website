# Aurokit UI — Component Reference

Complete documentation for every component, primitive, utility, and design token in the Aurokit website.

---

## Table of Contents

1. [Design System Foundations](#1-design-system-foundations)
2. [System Primitives](#2-system-primitives)
   - [GlassCard](#glasscard)
   - [SmoothScroll](#smoothscroll)
   - [Reveals](#reveals)
   - [lib/gsap.ts](#libgsapts)
3. [Layout & Navigation](#3-layout--navigation)
   - [Navbar](#navbar)
   - [Footer](#footer)
4. [Page Sections (top → bottom)](#4-page-sections-top--bottom)
   - [Hero](#hero)
   - [HeroShader](#heroshader)
   - [TrustStrip](#truststrip)
   - [Capabilities](#capabilities)
   - [PipelineSandbox](#pipelinesandbox)
   - [Process](#process)
   - [Showcase](#showcase)
   - [Metrics](#metrics)
   - [ROICalculator](#roicalculator)
   - [Manifesto](#manifesto)
   - [CTA](#cta)
5. [CSS Utilities Reference](#5-css-utilities-reference)

---

## 1. Design System Foundations

### Color Tokens (`tailwind.config.ts`)

| Token | Hex | Role |
|---|---|---|
| `ink-base` | `#030405` | Page background |
| `ink-elevated` | `#07090A` | Slightly lifted surface |
| `ink-panel` | `#0B0D0E` | Card surface |
| `ink-deep` | `#050607` | Deepest black (CTA button text) |
| `text-primary` | `#F4F6F4` | Body text |
| `text-secondary` | `#A8B0AA` | Secondary labels |
| `text-muted` | `#6E7670` | Tertiary / placeholders |
| `glow-mist` | `#DDEBE1` | Primary accent — mint-white |
| `glow-cyan` | `#D8EFEA` | Pale cyan accent |
| `glow-violet` | `#C7B6E6` | Muted violet accent |
| `glow-sage` | `#AAB8AA` | Mid-tone sage |
| `glow-lime` | `#DCE7BA` | Warm lime |
| `glow-coral` | `#F07367` | Alert / warm accent |
| `glow-gold` | `#D9C16E` | Gold accent |

### Typography

| Variable | Stack | Usage |
|---|---|---|
| `--font-sans` / `font-display` | System sans (custom variable) | All headings and display text |
| `--font-mono` | System monospace | Tags, labels, telemetry, code |
| `--font-serif` | Georgia fallback | Italic emphasis phrases in headlines |

Letter spacing utilities extend Tailwind: `tightest (-0.055em)`, `tighter (-0.045em)`, `tight (-0.025em)`.

### Easing Constants

```css
--ease-soft:    cubic-bezier(0.16, 1, 0.3, 1)   /* expo-out — fast entry, long tail */
--ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1) /* overshoot + settle */
```

---

## 2. System Primitives

### `GlassCard`

**File:** `components/GlassCard.tsx`  
**The foundational interactive panel.** All card-shaped surfaces in the page extend this component. It provides three layered interactive effects that activate on hover.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Card content |
| `className` | `string` | `""` | Additional Tailwind classes |
| `hoverable` | `boolean` | `true` | Set `false` to disable pointer events (decorative cards) |
| `spotlight` | `boolean` | `true` | Enables the cursor-following radial glow layers |
| `tilt` | `boolean` | `true` | Enables GSAP 3D perspective tilt |
| `tiltStrength` | `number` | `5` | Max rotation in degrees (each axis). Use `2–3` on large full-width cards |
| `...HTMLAttributes` | — | — | All native div props forwarded |

#### Interactive Layers

Three named `<span>` elements are injected as siblings inside the card root. Each is `position: absolute`, `pointer-events: none`, and activated via `data-spot="on"` on the host:

1. **`.glass-spot`** — A large `460px` radial gradient (`glow-cyan` → `glow-violet` → transparent) sitting at `z-index: 1`, behind content. Uses `mix-blend-mode: screen` so it lifts text luminance rather than washing it. Fades in over `600ms`.

2. **`.glass-glare`** — A tight `200px` radial gradient of near-white (`rgba(255,255,255,0.22)`) with `mix-blend-mode: overlay`. Acts as the specular highlight on the glass surface — the bright dot that moves with the cursor. Fades in over `450ms`.

3. **`.glass-spot-edge`** — Sits at `z-index: 3` (above content), masked to the `1px` border ring only via `mask-composite: exclude`. A `300px` radial gradient illuminates the nearest edge — the border closest to the cursor glows white-to-cyan-to-violet.

#### 3D Tilt (GSAP)

On `mount`: `gsap.set` writes `transformPerspective: 1100`, `transformOrigin: center`, `transformStyle: preserve-3d` once. The host element gets `data-tilt="on"` which removes the CSS `transform` transition so GSAP owns the property exclusively.

On `pointermove` (RAF-throttled): calculates `rotationY = (nx - 0.5) * 2 * tiltStrength` and `rotationX = (0.5 - ny) * 2 * tiltStrength` from the normalized cursor position inside the card. Runs `gsap.to` with `power3.out, 0.55s`.

On `pointerleave`: snaps back to `rotationX/Y/y = 0` with `elastic.out(1, 0.45)` over `1.1s` — the glass settles like a physical object.

**Accessibility:** `prefers-reduced-motion: reduce` is checked on mount; the tilt animations are bypassed entirely when set. CSS transition durations are also killed globally by the existing `@media (prefers-reduced-motion)` rule.

#### CSS rules (in `globals.css`)

```css
.glass-chromatic[data-tilt="on"]           /* removes CSS transform transition */
.glass-chromatic[data-tilt="on"]:hover     /* prevents CSS hover transform conflict */
.glass-chromatic[data-spot="on"] > .glass-spot
.glass-chromatic[data-spot="on"] > .glass-glare
.glass-chromatic[data-spot="on"] > .glass-spot-edge  /* opacity: 1 */
```

---

### `SmoothScroll`

**File:** `components/SmoothScroll.tsx`  
**Renders nothing.** Initializes Lenis for physics-based smooth scrolling, then bridges it to GSAP's RAF ticker so `ScrollTrigger` reads Lenis's virtual scroll position instead of native scroll.

```
Lenis(duration: 1.15, lerp: 0.085, smoothWheel: true)
  → lenis.on("scroll", ScrollTrigger.update)
  → gsap.ticker.add(lenis.raf)
  → gsap.ticker.lagSmoothing(0)
```

Mounted once in `app/page.tsx` before all sections. Cleans up on unmount: removes ticker, calls `lenis.destroy()`.

---

### `Reveals`

**File:** `components/Reveals.tsx`  
**Renders nothing.** A global scroll-animation registration component.

- **`.reveal` class** — Any element carrying this class gets a one-shot `opacity: 0 → 1, y: 28 → 0` tween (`expo.out, 1.0s`) when it enters the viewport at `top 85%`.
- **`[data-parallax]` attribute** — Any element with this attribute scrolls at a speed offset. `data-parallax="0.15"` means the element drifts `yPercent: -15%` over its full scroll range. Fully scrubbed.

Usage example:
```tsx
<div className="reveal">...</div>
<div data-parallax="0.2">...</div>
```

---

### `lib/gsap.ts`

**File:** `lib/gsap.ts`

Centralised GSAP bootstrap. Registers `ScrollTrigger` once (client-side guard) and exports shared instances so all components import from one place, avoiding duplicate plugin registration.

Exports:
- `gsap` — the GSAP core instance
- `ScrollTrigger` — registered plugin
- `applyMagneticEffect(el, strength?)` — utility function

#### `applyMagneticEffect(el, strength = 0.35)`

Attaches a `pointermove` listener to `window` and calculates the distance from the cursor to the element's center. While within `maxDist = max(width, height) * 1.25`:

- Pulls the element toward the cursor: `x = dx * strength * (1 - dist/maxDist)`, same for y
- Uses `gsap.to` with `expo.out, 0.45s, overwrite: auto`

When the cursor exits the radius: snaps back to `x: 0, y: 0` with `elastic.out(1.1, 0.45)` over `0.75s`.

Returns a cleanup function that removes the listener and calls `gsap.killTweensOf`.

Currently applied to:
- `Hero` — `.btn-primary` (strength `0.35`), `.btn-secondary` (strength `0.28`)
- `Navbar` — "Book intro" button (strength `0.3`)

---

## 3. Layout & Navigation

### `Navbar`

**File:** `components/Navbar.tsx`

A `position: fixed` floating pill at `top: 20px`, centered with `-translate-x-1/2`. Compresses to `scale(0.98)` and shifts to `top: 12px` after `40px` of scroll (via `window.scroll` listener).

**Structure:**
- **Logo mark** — Three-layer concentric circle: outer gradient ring (`glow-mist → glow-cyan → glow-violet`), dark cutout middle, white-to-mist inner fill.
- **Nav links** — Four anchor links (`Capabilities`, `Process`, `Work`, `Telemetry`) hidden on mobile, shown at `sm:`. Each has `rounded-full` pill hover state.
- **"Book intro" CTA** — White pill button with a diagonal arrow SVG. Has `applyMagneticEffect` applied at strength `0.3` via `useRef`.

CSS class: `.pill-glass` — `bg-ink-deep/55`, `border-white/8`, `backdrop-blur(22px)`, deep box-shadow.

---

### `Footer`

**File:** `components/Footer.tsx`

**Structure:**
- **Oversized wordmark watermark** — `22vw` "aurokit" text, `pointer-events: none`, `position: absolute`, bottom-anchored, clipped with a `linear-gradient → transparent` text fill. Pure decoration.
- **Brand column** — Logo mark (same as Navbar), one-line descriptor, live status indicator using `.node-dot`.
- **Four link columns** — Studio, Work, Resources, Contact — each with `FLink` items that reveal a `→` arrow on hover via opacity + translate transition.
- **Bottom bar** — Copyright, version tag (`v04.2.1`), Privacy / Terms / Status links.

---

## 4. Page Sections (top → bottom)

### `Hero`

**File:** `components/Hero.tsx`

The page's above-the-fold section. `pt-[140px] pb-[110px]` at mobile, `pt-[170px] pb-[140px]` at md.

**Background layers (back → front):**
1. `HeroShader` WebGL2 canvas (full bleed, `z-index: -10`)
2. Bottom-fade gradient (`to-ink-base`) to blend canvas into page
3. `.bg-grid` — subtle 56px dot grid with radial mask

**GSAP entrance timeline** (`expo.out` defaults):
| Target | From | Delay |
|---|---|---|
| `.hero-eyebrow` | `y: 14, opacity: 0` | `0.2s` |
| `.hero-headline .word` | `yPercent: 110, opacity: 0, stagger: 0.06` | `0.3s` |
| `.hero-sub` | `y: 16, opacity: 0` | `0.85s` |
| `.hero-cta > *` | `y: 14, opacity: 0, stagger: 0.08` | `1.0s` |
| `.hero-float` | `opacity: 0, y: 12, stagger: 0.07` | `0.6s` |
| `.hero-meta` | `y: 10, opacity: 0, stagger: 0.06` | `1.2s` |

**Word splitting:** Headlines are split into `<Word>` wrappers — each renders `overflow-hidden` + inner `.word` span for the `yPercent: 110` curtain reveal.

**Floating telemetry labels** (`FloatingLabel`, hidden below `md`):
- `ORCH-04` — top-left, "14 agents idle"
- `LAT-AVG` — top-right, "218ms · p99 612ms"
- `TASKS-24H` — bottom-left, "42,118 actions"
- `CONFIDENCE` — bottom-right, "0.94 mean"

Each `FloatingLabel` has a `.node-dot` connector and a `backdrop-blur` chip.

**CTA buttons** — `.btn-primary` ("Start an engagement") and `.btn-secondary` ("How we work"). Both have `applyMagneticEffect` refs.

**Meta strip** — 4-column grid at the bottom: Founded, Stack, Engagement, SLA.

---

### `HeroShader`

**File:** `components/HeroShader.tsx`

A WebGL2 canvas that fills the Hero section background. Uses a custom GLSL fragment shader.

**Shader pipeline:**
1. **FBM (Fractal Brownian Motion)** — 5-octave noise field warps the UV coordinates, creating organic, slowly drifting flow.
2. **Three soft bloom spots** — `smoothstep`-based radial gradients at fixed positions, each tinted: `colA` (mist-green `#DDEAE2`), `colB` (pale cyan `#D8EFEA`), `colC` (muted violet `#C7B6E6`). Intensities: `0.55`, `0.42`, `0.18` respectively.
3. **Chromatic dispersion** — Subtle `r`/`b` channel offset at the `field` edges: `col.r += edge * 0.05`, `col.b += edge * 0.07`.
4. **Vignette** — Radial `smoothstep` darkening from `1.15` to `0.30` radius.
5. **Bottom fade** — `smoothstep(0.0, 0.32, uv.y)` — canvas fades into the page background.
6. **Film grain** — `(hash(uv * res + time) - 0.5) * 0.022` per-frame noise.
7. **Tone curve** — `col / (1 + col * 0.45)` soft tonemapping.

**Spring physics mouse tracking:**
```
stiffness = 0.03
damping   = 0.85
vx += (tx - x) * stiffness
vx *= damping
x  += vx
```
Smooth, inertial pointer lag. Blooms glide toward the cursor and drift back slightly when the mouse stops.

DPR capped at `1.5` for performance. `ResizeObserver` handles viewport changes.

---

### `TrustStrip`

**File:** `components/TrustStrip.tsx`

A full-width `border-y` section between Hero and Capabilities.

- **Left column** — Static label "// Operators trust us" + subtitle.
- **Marquee** — 10 company names duplicated (`[...ENTITIES, ...ENTITIES]`) in a `display: flex, width: max-content` container animated via `@keyframes marquee` (38s linear). Masked with `mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)` for fade-in/out at edges.

---

### `Capabilities`

**File:** `components/Capabilities.tsx`

Six capability cards in a responsive `1 / sm:2 / lg:3` column grid.

**Section header:** Standard two-column header (7-col headline + 5-col descriptor) with `.reveal` class.

**Each `GlassCard`** contains:
- Monospace tag (`01 / Orchestration`, etc.)
- SVG glyph in a `40×40` circle (custom per-capability, described below)
- Title + body paragraph
- 2–3 feature bullet pills (`.rounded-full, border-white/10, font-mono`)

**SVG Glyphs** (all `20×20 viewBox`, `aria-hidden`):

| Capability | Glyph | Description |
|---|---|---|
| Orchestration | `OrbitGlyph` | Planet with equatorial ellipse + center dot |
| Pipelines | `FlowGlyph` | Three nodes connected by bezier curves |
| Copilots | `ChatGlyph` | Chat bubble with three colored dots |
| Infra | `ChipGlyph` | Nested squares (chip die) with pin dots |
| Evaluation | `GraphGlyph` | Rising polyline with baseline |
| Handoff | `HandoffGlyph` | Left-to-right arrow with endpoint dot |

---

### `PipelineSandbox`

**File:** `components/PipelineSandbox.tsx`

An interactive three-panel simulation of a multi-agent pipeline. State machine driven by React `useState`.

**Left panel — Intake Triggers:**
Three buttons: "Inbound Invoice", "Support Ticket", "PR Review". Clicking calls `triggerPipeline(name)`. Disabled with `opacity-50` while running.

**Middle panel — Visual Pipeline:**
Four nodes rendered vertically: `Intake → Orchestration → Eval Harness → Dispatch`. Each node shows:
- A `40×40` circle that glows `border-glow-cyan, shadow-glow-cyan` when active, fills `glow-violet/20` when past.
- A `2px` vertical connecting line between nodes that animates `scaleY: 0 → 1` via `@keyframes pulse-down` when active or past.
- Node label text that transitions from `text-white/40` → `text-white` when active.

Ambient background gradient transitions between `glow-mist/20`, `glow-cyan/20`, `glow-violet/20`, and `white/10` depending on active node index.

**Right panel — Live Console Log:**
Monospace terminal with macOS-style traffic light dots. Renders `LogEntry[]` with `timestamp`, `message`, `type`. Type colors: `success → text-glow-cyan`, `warning → text-yellow-400`, `info → text-white/80`. Auto-scrolls via `scrollTop = scrollHeight` in a `useEffect` watching `logs`. Shows `animate-pulse` dot while running.

**State machine timing:** Each step fires after `1000 + random * 500ms`. Four steps, then `setIsRunning(false)`.

---

### `Process`

**File:** `components/Process.tsx`

Four-phase engagement process. Two-column layout: sticky left title + right scrolling steps.

**Progress rail:**
A `1px` vertical line running the full height of the steps column (`left-[18px]`). Has an inner `.process-rail-fill` div (`bg-gradient: glow-mist → glow-cyan → glow-violet`) with `scaleY: 0` origin at top, scrubbed via `ScrollTrigger` (`start: "top 70%", end: "bottom 70%"`) as the user scrolls through the section.

**Step nodes (`.process-node`):**
Each `01–04` node is a `40×40 / md:48×48` circle. `ScrollTrigger.create` toggles class `.is-active` when the node is between `top 60%` and `bottom 40%` of the viewport. Active state: `border-glow-mist/45 + box-shadow glow + background glow-mist/6` (injected via `<style jsx>`).

**Step content:**
Each `<li>` has title, body paragraph, and artifact pills (same style as Capabilities). Animated in via `opacity: 0, y: 32 → expo.out` ScrollTrigger when entering viewport.

---

### `Showcase`

**File:** `components/Showcase.tsx`

Three case studies in an asymmetric `7 + 5` column grid.

**Featured case** (`CASES[0]`, `lg:col-span-7`):
Rendered with `large={true}` which adds a `180px` SVG visual area between the description and the outcome metric. Larger typographic scale throughout.

**Two compact cases** (`CASES[1]`, `CASES[2]`, `lg:col-span-5`):
Standard `Case` component without the visual area. Metric displayed at `text-[30px]` vs `44px` for the featured card.

**`Case` component:**
- Sector (monospace, upper) + client name
- "Case · 24" badge (rounded pill)
- Headline + body (`dangerouslySetInnerHTML` for HTML entities)
- Optional SVG visual panel
- Outcome grid: large metric number + label + up to 3 tag pills

**SVG Visuals** (`aria-hidden`):

| Case | Visual | Description |
|---|---|---|
| Halcyon Press | `PathVisual` | `560×160` flow graph: bezier path through 5 labeled nodes with vertical grid lines |
| Karst Logistics | `BarsVisual` | `180×60` bar chart of 10 bars with increasing opacity |
| Vector Studio | `RingVisual` | `80×80` donut ring at ~94% fill |

---

### `Metrics`

**File:** `components/Metrics.tsx`

Data telemetry section. `lg:grid-cols-12` layout with a large 7-col card and stacked 5-col cards.

**Large card (`lg:col-span-7`) — Hours Reclaimed:**
- `[data-counter="48230"]` — animated number count-up on scroll enter (GSAP `expo.out, 1.6s`).
- 36-bar animated chart (`m-bar` class). Bars use `scaleY: 0 → 1` on ScrollTrigger with `stagger: 0.04`.
- QoQ badge (`↑ 38% qoq`) in mist-colored pill.
- Quarter axis labels below the bars.

**Top-right card — Two KPI stats:**
- "Median time to ship": `[data-counter="23"]` days
- "Mean eval pass": `[data-counter="0.942" data-decimals="3"]`
Both animate via the same `data-counter` ScrollTrigger pattern.

**Middle-right card — Partner Retention:**
- `120×120` SVG donut chart. Static at 81% fill (`strokeDasharray="326", strokeDashoffset="60"`). `-rotate-90` to start from top.
- Centered overlay: `26px` "81%" label + "retention" caption.
- Descriptive text beside the ring.

**Bottom-right — Three `Mini` cards:**
A `grid-cols-3` row of compact `GlassCard` instances:
- Languages: `11`
- Models in rotation: `14`
- Continents: `4`

**`Mini` component:** label (mono, upper, `10px`) + value (`22px` display, `tabular-nums`).

---

### `ROICalculator`

**File:** `components/ROICalculator.tsx`

Interactive value estimator. `lg:grid-cols-2` layout.

**Left panel — Controls:**
Two range sliders in a `GlassCard`:
- **Monthly Manual Hours** — `min:10, max:1000, step:10`. Tracks state `hours`.
- **Hourly Operator Rate** — `min:20, max:200, step:5`. Tracks state `rate`.

Both sliders use `background: linear-gradient(to right, #D8EFEA <fill>%, rgba(...) <fill>%)` inline style for a filled-track visual. Styled with `accent-glow-cyan` and `appearance: none`.

**Right panel — Results:**
Three computed outputs, updated live:
- `hoursSavedPerYear = hours * 12`
- `annualCapitalReclaimed = hoursSavedPerYear * rate` (displayed in `text-glow-cyan`)
- `paybackMonths = round((25000 / capitalReclaimed) * 12)`, clamped `1–24`, shown in a `glow-violet/10` rounded badge

**Animated Sparkline:**
A `100×100 viewBox` SVG using a quadratic bezier path. Path recalculates on every `annualCapitalReclaimed` change via `useEffect`:
```
ratio = min(1, capitalReclaimed / (maxSavings * 0.2))
peak  = 100 - ratio * 80
d     = "M 0 100 Q 25 ${peak+20} 50 ${peak} T 100 ${peak-10}"
```
Stroke uses a `linearGradient` (`glow-cyan, opacity 0.2 → 1`). Transitions via `transition-all duration-700 ease-out`. "Now" / "Year 1" axis labels.

---

### `Manifesto`

**File:** `components/Manifesto.tsx`

A full-section scroll-driven reading experience.

**Text:** 11 phrase tokens rendered as `.manifesto-word` inline spans. Three phrases are rendered in `font-serif italic text-chromatic`: "small, sharp systems", "quietly", "Monday morning.".

**GSAP scroll animation:**
`gsap.fromTo(words, { opacity: 0.18 }, { opacity: 1, stagger: 0.25 })` — words light up sequentially as the user scrolls through the section (`start: "top 70%", end: "bottom 50%", scrub: 0.8`). Words that haven't been reached sit at `18%` opacity (near-invisible, not hidden).

**Flanking sidebar labels** (`.manifesto-side`, `md:` only):
- Left: "Manifesto" + "— scroll to read —"
- Right: "Est. 2023" + "— Bangalore · Remote —"

Both scroll at `yPercent: -30` parallax (scrubbed, full section range).

---

### `CTA`

**File:** `components/CTA.tsx`

Full-width contact card. `max-w-[1200px]`, centered.

**Ambient glow overlays** inside the GlassCard (not via the spotlight system — hardcoded radial blurs):
- Top-right: `rgba(221,235,225,0.30)` mist, `blur(40px)`
- Bottom-left: `rgba(199,182,230,0.22)` violet, `blur(40px)`

**Left column (7-col):**
- Eyebrow: "Q2 2026 — 3 slots open"
- Headline with `.text-chromatic` italic phrase
- Two CTAs: `mailto:hello@aurokit.ai` (`.btn-primary`) + "Book a 20-min intro" (`.btn-secondary`)

**Right column (5-col):**
- `2×2` grid of `Stat` cards (plain `rounded-2xl border` boxes, not `GlassCard`):
  - First response / Time to first run / Engagement floor / Equity option
- "Currently shipping" status panel — `.node-dot` + monospace label + plain text description of active engagements.

---

## 5. CSS Utilities Reference

Defined in `app/globals.css`. Used directly as class names throughout the codebase.

| Class | Description |
|---|---|
| `.glass-chromatic` | Base glass card: `bg-gradient(white/5.5 → white/1.2)`, `border-white/8`, `border-radius: 24px`, `backdrop-blur(18px)`, `overflow: hidden`, `isolation: isolate`. Includes conic `::before` border + top-edge `::after` highlight. |
| `.glass-spot` | Pointer-following ambient spotlight layer. Injected by `GlassCard`. |
| `.glass-glare` | Tight specular highlight layer. Injected by `GlassCard` when `tilt={true}`. |
| `.glass-spot-edge` | Border illumination ring layer. Injected by `GlassCard`. |
| `.pill-glass` | Navbar pill: dark glass, `backdrop-blur(22px)`, medium shadow. |
| `.bloom-tr` | Top-right ambient bloom decoration: `70vw` radial gradient, `blur(40px)`. |
| `.bloom-bl` | Bottom-left ambient bloom decoration: `60vw` radial, violet tint. |
| `.btn-primary` | White pill CTA button. Height `44px`, `border-radius: 999px`. Has `::after` shimmer sweep on hover. |
| `.btn-secondary` | Ghost pill CTA button. `bg-white/4.5`, `border-white/10`, `backdrop-blur(12px)`. |
| `.btn-arrow` | Arrow span inside CTA buttons. `translateX(3px)` on parent hover. |
| `.eyebrow` | Monospace pill label with animated `.dot`. Used above all section headings. |
| `.text-chromatic` | Animated gradient text: white → cyan → violet → white shimmer. `background-size: 200%`, `14s linear infinite`. |
| `.reveal-init` | Scroll reveal starting state: `opacity: 0, translateY(28px)`. Applied before GSAP takes over. |
| `.reveal` | Applied to elements for automatic Reveals.tsx scroll animation. |
| `.marquee` | Infinite horizontal scroll container. `animation: marquee 38s linear infinite`. |
| `.bg-grid` | Subtle `56px` dot grid background with radial mask. Used in Hero. |
| `.noise-overlay` | Fixed SVG fractal noise layer, `opacity: 0.04, mix-blend-mode: overlay`. Renders above everything (`z-index: 1`). |
| `.node-dot` | `6×6px` mist-green circle with double ring glow. Used as live status indicators. |
| `.tabular` | `font-variant-numeric: tabular-nums`. Applied to all counter displays. |
| `.connector-line` | Horizontal gradient line `(transparent → white/22% → transparent)`. Used for floating label connectors. |
| `.hairline` | `1px` horizontal divider with fade-out edges. |

### Keyframes

| Name | Effect |
|---|---|
| `drift` | `translate3d(0,0,0) → translate3d(2%, -3%, 0) scale(1.08)`. Used for hero background blob decorations. |
| `shimmer` | `backgroundPosition: 0% 50% → 200% 50%`. Powers `.text-chromatic` and `.btn-primary::after`. |
| `rise` | `opacity: 0, translateY(18px) → full`. One-shot entrance animation. |
| `pulse-down` | `scaleY: 0 → 1`, `opacity: 0 → 0.8`. Pipeline connector line fill animation. |
| `marquee` | `translateX(0 → -50%)`. TrustStrip infinite scroll. |
| `chromatic-spin` | CSS `@property --angle` counter from `140deg → 500deg` over 18s. Animates the conic border on `.glass-chromatic`. |
