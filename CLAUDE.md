# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio + blog (antoniorossi.net). Static, fully prerendered SvelteKit site deployed to Netlify.

## Stack

- SvelteKit 2 + **Svelte 5 (runes mode)** — `$props()`, `$state()`, `$derived()`, `$effect()`, `$bindable()`; render children with `{@render children?.()}`. Do **not** use legacy `export let`, `<slot>`, or `$:` reactive statements.
- **Tailwind CSS v4** — CSS-first config, **no `tailwind.config.js`** (all theme lives in `src/tailwind.css`).
- **mdsvex** for markdown content.
- **TypeScript** — source is `.ts` + `<script lang="ts">`; `tsconfig` is `strict` with `checkJs` for remaining `.js` config files. `svelte-check` runs in CI (`npm run check`, fails on warnings). Type component props with a TS `interface Props` and annotate `$props()` (`let { ... }: Props = $props()`); type route `load`/`+server` handlers with the generated `./$types` (`PageLoad`, `LayoutLoad`, `RequestHandler`). Shared app types live in `src/lib/types.ts`; ambient module declarations (`*.md`, enhanced images) live in `src/app.d.ts`.
- Vite 8, Node 22, `adapter-netlify`.

## Commands

- `npm run dev` (add `-- --open` to open a browser) — dev server
- `npm run build` / `npm run preview` (preview serves on `:4173`)
- `npm run check` — svelte-check, **fails on warnings** (keep it clean)
- `npm run lint` — prettier check + eslint
- `npm run format` — prettier write
- `npx playwright test` — E2E tests (no npm script; auto-runs `build && preview`). Single file: `npx playwright test tests/home.test.ts`. Specs live in `tests/`.

## Project values (these drive most decisions)

- **Energy efficiency / green software** is a stated core value. Images: use `<enhanced:img>` (or the `Image.svelte` wrapper) via `@sveltejs/enhanced-img`; set `quality=50`, prefer AVIF→WebP→JPEG, always `loading="lazy"` + `decoding="async"` + explicit `width`/`height`. Minimize JS, lean on prerendering/static generation, avoid unnecessary deps.
- **Accessibility is required** — descriptive `alt` on images, `width`/`height` to prevent layout shift, `aria-label` on icon buttons, semantic HTML (`<nav>`/`<main>`/`<footer>`, proper heading order), keyboard navigation.

## Conventions

- **Commits: Conventional Commits** (`feat:`, `fix:`, `chore:`, …) — enforced by commitlint + husky `commit-msg`; non-conforming messages are rejected.
- Prettier (`.prettierrc`): 2-space indent, **double quotes** (JS and HTML attrs), **no trailing commas**, printWidth 100, automatic Tailwind class sorting. Run `npm run format` before committing.
- **Tailwind-first.** Reach for a scoped `<style>` block only for `@keyframes`, complex grid, or hover states that need a `:global(.dark)` wrapper.
- Type component props with a TS `interface Props` block above `let { ... }: Props = $props()`. Use `import type` for type-only imports (`verbatimModuleSyntax` is on).
- Import order: external deps → `$lib/*` → relative. `$lib` → `src/lib` (only custom alias).
- No code comments unless the _why_ is non-obvious.

## Where things live

**Rule:** `$lib` holds only shared/cross-page code. A component used by exactly one page lives next to that page's route (non-`+` files in a route folder aren't routes).

- `src/routes/` — file-based pages + `+server.js` API (`api/posts.json`, `api/tags`, `api/tags/[tag]`, `rss.xml`). Page-only components colocate here: `Hero`/`Contacts`/`Articles`/`Article` (home) at the root, `about/Skill.svelte`, `career/{Company,Timeline}.svelte`, `blog/{BlogListItem,Pagination}.svelte`.
- `src/lib/components/` — shared cross-page components: `Header`, `Footer`, `Image`, `Logo`, `NavItem`, `Tag` (general pill, used by blog/career/home), plus `icons/`
- `src/lib/layouts/` — mdsvex layouts (`Post.svelte`, `Now.svelte`, `Colophon.svelte`)
- `src/lib/blog/posts.js` — canonical post loader (`getPosts()`), used by API + RSS
- `src/blog/*.md` — blog posts (see Content)
- `src/now/now.md` — "now" page content; `src/colophon/colophon.md` — colophon content
- `src/lib/data/companies.json` — career / CV data
- `src/lib/utils.js` — date / experience helpers
- `src/lib/stores/` — theme: `store.js` holds a localStorage-backed writable factory (module-private `createWritableStore`; only the `theme` store is exported — follow that pattern for new persisted stores) and `theme.js` has `toggleTheme`. Default mode **dark**.
- `src/tailwind.css` — all Tailwind theme configuration

## Tailwind theme (`src/tailwind.css`) — non-default, read before styling

- **Breakpoints are custom** (TW defaults cleared): `sm 375 · md 550 · md2 600 · md3 800 · lg 1000 · xl 1385 · xl2 3000`. Never assume stock Tailwind breakpoints.
- Custom colors: `space-grey` / `space-white`, `hero-color-1..6`, `progress-bar-blue`, etc.
- Custom fonts only: `font-Cormorant` (serif, headings), `font-Poppins` (sans), `font-Roboto` (serif, body).
- Dark mode = `.dark` class variant (`dark:` prefix). Custom utilities: `grid-cols-articles-{sm,md,lg}`.

## Content (mdsvex)

- **Blog:** add a `.md` to `src/blog/`. Required frontmatter: `title, slug, subtitle, category, tags: [..], published: true, date: YYYY-MM-DD, layout: development`.
- `layout` maps to an mdsvex layout in `mdsvex.config.js`: `development` → `src/lib/layouts/Post.svelte`, `now` → `src/lib/layouts/Now.svelte`, `colophon` → `src/lib/layouts/Colophon.svelte`.
- Only `published: true` posts are listed; sorted by `date` descending. Canonical loader: `getPosts()` in `src/lib/blog/posts.js`.
- In-post images: `<enhanced:img src="$lib/assets/images/blog/foo.jpg?enhanced&w=1000&h=600" ... />`.
