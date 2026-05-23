# Aurokit AI

Premium marketing website for an AI automation studio. Built with Next.js 15, GSAP, Lenis smooth scroll, and a WebGL shader hero background.

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | Next.js | 15.5.18 |
| UI Runtime | React | 19.0.0 |
| Language | TypeScript | 5.7.2 |
| Styling | Tailwind CSS | 3.4.16 |
| Animation | GSAP + ScrollTrigger | 3.12.5 |
| Smooth Scroll | Lenis | 1.1.18 |
| Fonts | Google Fonts (via next/font) | — |

---

## Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Yeiad-Explore/aurokit_website.git
cd aurokit_website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in values:

```bash
cp .env.example .env.local
```

`.env.example` contains:

```env
NEXT_PUBLIC_SITE_URL=https://aurokit.ai
```

> In development this falls back to the Vercel URL or `http://localhost:3000` automatically — you do not need to set it locally unless you want a specific value.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads on file changes.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## Project Structure

```
aurokit-ai/
├── app/
│   ├── layout.tsx        # Root layout, metadata, font variables
│   ├── page.tsx          # Home page — assembles all sections
│   ├── fonts.ts          # Google Fonts config (Geist, Geist Mono, Instrument Serif)
│   └── globals.css       # Design tokens, global utilities, animations
├── components/
│   ├── Navbar.tsx        # Fixed navigation with glass pill style
│   ├── Hero.tsx          # Hero section — animated headline + floating badges
│   ├── HeroShader.tsx    # WebGL2 canvas — FBM warp field + bloom effects
│   ├── TrustStrip.tsx    # Infinite marquee of client logos
│   ├── Capabilities.tsx  # 6 service cards with SVG glyphs
│   ├── Process.tsx       # 4-phase process with scroll-driven progress rail
│   ├── Showcase.tsx      # Case study cards with outcome metrics
│   ├── Metrics.tsx       # Animated telemetry counters and sparklines
│   ├── Manifesto.tsx     # Full-screen scroll-scrubbed word-by-word reveal
│   ├── CTA.tsx           # Contact section with pricing and stats
│   ├── Footer.tsx        # Links, social, build version
│   ├── SmoothScroll.tsx  # Lenis smooth scroll provider
│   ├── Reveals.tsx       # Global scroll-triggered fade-in animations
│   └── GlassCard.tsx     # Reusable glass morphism card
├── lib/
│   └── gsap.ts           # GSAP + ScrollTrigger initialisation
├── public/               # Static assets (images, favicons, etc.)
├── .env.example          # Environment variable template
├── next.config.ts        # Next.js config (strict mode, GSAP optimisation)
├── tailwind.config.ts    # Tailwind — custom colours, fonts, animations
├── tsconfig.json         # TypeScript config (strict, ES2022, @/* alias)
└── postcss.config.mjs    # PostCSS with Tailwind + Autoprefixer
```

---

## Page Sections

The home page renders these sections in order:

1. **Navbar** — Fixed, glass morphism navigation
2. **Hero** — Animated headline, WebGL shader background, floating telemetry badges
3. **TrustStrip** — Scrolling client marquee
4. **Capabilities** — Six service areas (Orchestration, Pipelines, Copilots, Infrastructure, Evaluation, Handoff)
5. **Process** — Four-phase engagement methodology with scroll-animated progress rail
6. **Showcase** — Three case studies with outcome metrics
7. **Metrics** — Live-updating counters (operator hours, time-to-ship, eval pass rate, retention)
8. **Manifesto** — Scroll-scrubbed word-by-word philosophy reveal
9. **CTA** — Contact info, pricing floor, equity options
10. **Footer** — Navigation links, social, build version

---

## Design System

### Colour Palette

Defined in `tailwind.config.ts`:

| Group | Purpose | Example token |
|---|---|---|
| `ink` | Backgrounds | `ink-base` (#030405), `ink-elevated`, `ink-panel` |
| `text` | Foreground | `text-primary` (#F4F6F4), `text-secondary`, `text-muted` |
| `glow` | Accents | `glow-mist` (sage green), `glow-cyan`, `glow-violet` |

### Typography

| Font | Variable | Usage |
|---|---|---|
| Geist | `--font-geist` | Body, headings, display |
| Geist Mono | `--font-geist-mono` | UI labels, metrics, code |
| Instrument Serif (italic) | `--font-instrument` | Stylistic emphasis in headings |

### Utility Classes

| Class | Effect |
|---|---|
| `.glass-chromatic` | Backdrop blur + animated conic-gradient border |
| `.text-chromatic` | Animated cyan → violet gradient text |
| `.eyebrow` | Small pill badge for section labels |
| `.btn-primary` | Solid white CTA button with shimmer hover |
| `.btn-secondary` | Glass bordered button |
| `.reveal-init` | Default state for scroll-reveal elements |
| `.tabular` | Monospace number alignment |

---

## Animation Architecture

### GSAP

Configured in `lib/gsap.ts`. The `ScrollTrigger` plugin is registered globally. Import from this file rather than directly from `gsap` to avoid duplicate registrations:

```ts
import { gsap, ScrollTrigger } from "@/lib/gsap";
```

### Smooth Scroll (Lenis)

`SmoothScroll.tsx` wraps the entire app. Lenis drives the scroll position and is synced with the GSAP ticker so `ScrollTrigger` offsets remain accurate.

### WebGL Hero (HeroShader)

A fullscreen `<canvas>` renders a WebGL2 shader with:
- FBM (Fractal Brownian Motion) warp field for organic fluid motion
- Three soft colour blooms (mist, cyan, violet) that parallax with mouse movement
- Chromatic dispersion at bloom edges
- Film grain and vignette overlay
- Renders at 1.5× device pixel ratio; scales with `ResizeObserver`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for Open Graph metadata. Defaults to Vercel URL in preview/production, `http://localhost:3000` in dev. |

---

## Deployment

The project is configured for zero-config deployment on **Vercel**.

### Deploy to Vercel

1. Push to GitHub
2. Import the repository in [vercel.com/new](https://vercel.com/new)
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain in Vercel's environment variable settings
4. Deploy

### Manual Production Build

```bash
npm run build
npm run start
```

The build output goes to `.next/`. The server listens on port 3000 by default.

---

## Security

Next.js is pinned to `15.5.18` which resolves **CVE-2025-66478**. Keep Next.js up to date:

```bash
# Check for a newer patched release
npm show next@15 version

# Update
npm install next@<latest-15.x>
```

---

## Troubleshooting

**Port already in use**

Next.js will automatically pick the next available port (e.g. 3001). You can also specify a port explicitly:

```bash
npm run dev -- --port 4000
```

**WebGL not rendering**

The shader requires WebGL2. Ensure you are using a modern browser (Chrome 56+, Firefox 51+, Safari 15+). The rest of the page renders normally if WebGL2 is unavailable.

**GSAP ScrollTrigger out of sync**

This usually happens if Lenis and GSAP ticker are not connected. Ensure `SmoothScroll.tsx` is present as a wrapper in `app/layout.tsx` and that animations import from `@/lib/gsap`.
