# CLAUDE.md — Toolio

## Project Overview

Developer tools showcase. Astro 6 static frontend with cinematic Runway-inspired design.

## Commands

```bash
yarn dev          # Astro dev server (:4321)
yarn build        # Astro static build
yarn preview      # Preview built site
yarn lint:ox      # Oxlint fast pre-lint (eqeqeq, no-console, no-unused-vars)
yarn lint:fix     # ESLint autofix
yarn tsc          # TypeScript check
yarn test         # Vitest run
yarn test:coverage # Vitest with coverage
yarn validate     # Full: lint:ox + lint:fix + tsc -b + test:coverage
```

## Architecture

- **Frontend**: Astro 6 (static SSG) + Tailwind CSS v4 + Web Components (`@e1011/es-kit`)
- **3D**: Three.js + postprocessing for visual effects (hyperspeed, floating-lines)
- **No backend** — pure static site

## Key Conventions

- Web components use `@ced('tag-name')` from `@e1011/es-kit/utils` — NOT `@e1011/es-kit` (that pulls React)
- Theme switching: `setThemeClassNames` + `observeThemePreference` from `@e1011/es-kit/utils/ui`
- JSON data files in `src/data/` drive pages — edit data there, not in page templates
- Semantic CSS tokens: use `bg-t-bg`, `text-t-text`, `text-t-accent`, `bg-t-surface`, `border-t-border` etc.
- Dark theme is default; design follows Runway-inspired cinematic aesthetic (see DESIGN.md)
- No semicolons, single quotes (Prettier config)
- Import sorting via `eslint-plugin-simple-import-sort`
- Extract static data (links, icons, maps) into `*.helpers.ts` files next to the component
- Oxlint (`oxlintrc.json`) runs as a fast pre-lint pass before ESLint

## File Layout

```
src/components/  → Web Components (molecules/ for simple, compounds/ for complex composites)
src/data/        → JSON content files (home, tools, about, docs)
src/layouts/     → Layout.astro
src/pages/       → 4 Astro pages (index, tools, about, docs)
src/styles/      → global.css (design system)
src/types/       → TypeScript declarations (globals.d.ts, lucide.d.ts)
```

## Don't

- Don't import from `@e1011/es-kit` directly — always use `/utils` subpath
- Don't hardcode colors — use CSS custom property tokens (`var(--t-*)`)
- Don't add React — this project uses vanilla Web Components
- Don't use shadows in the UI — depth comes from photography and section backgrounds (Runway philosophy)
