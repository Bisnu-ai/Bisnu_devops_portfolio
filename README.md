# Aditya Rao — Portfolio (Next.js)

A single-page developer portfolio, built with Next.js (App Router),
TypeScript, and Tailwind CSS. Themed around graphs and algorithms — the
hero has an animated BFS traversal, and skills are shown as a
dependency graph instead of progress bars.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- `next/font` for Fraunces (display), Inter (body), IBM Plex Mono (labels/code)

## Getting started
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Project structure
```
app/
  layout.tsx      # fonts, metadata, root HTML shell
  page.tsx         # all page content/sections
  globals.css      # design tokens (colors) + Tailwind theme mapping
components/
  Rail.tsx         # fixed left index nav, highlights active section
  HeroGraph.tsx     # animated BFS traversal graphic in the hero
  StackGraph.tsx    # skills dependency graph (SVG)
```

## Making it yours
1. **Content** — edit the copy directly in `app/page.tsx`: hero text,
   the `log` section, the `PROJECTS` array, the `COMMITS` array, and
   the contact links in `dispatch`.
2. **Skills graph** — edit the `NODES` / `LINKS` arrays in
   `components/StackGraph.tsx` to reflect your own stack.
3. **Colors** — all design tokens live in `app/globals.css` under
   `:root`. Change the hex values there to re-theme the whole site;
   they're mapped to Tailwind classes like `bg-pine`, `text-ink-soft`,
   `border-border`, etc. via the `@theme inline` block.
4. **Fonts** — swap the Google Fonts imports in `app/layout.tsx` if
   you want a different type pairing.

## Build & deploy
```bash
npm run build
npm start
```
Deploys as-is to Vercel, Netlify, or any Node host — no extra config
needed.
