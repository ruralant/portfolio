# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio + blog (antoniorossi.net). SvelteKit site deployed to Netlify with `adapter-netlify`. **Every page is prerendered at build time** (see Rendering); the only server code left in the Netlify function is the contact form endpoint.

## Stack

- SvelteKit 2 + **Svelte 5 (runes mode)** — `$props()`, `$state()`, `$derived()`, `$effect()`, `$bindable()`; render children with `{@render children?.()}`. Do **not** use legacy `export let`, `<slot>`, or `$:` reactive statements.
- **Tailwind CSS v4** — CSS-first config, **no `tailwind.config.js`** (all theme lives in `src/tailwind.css`).
- **mdsvex** for markdown content.
- **TypeScript** — source is `.ts` + `<script lang="ts">`; `tsconfig` is `strict` with `checkJs` for remaining `.js` config files. Type component props with a TS `interface Props` and annotate `$props()` (`let { ... }: Props = $props()`); type route `load`/`+server` handlers with the generated `./$types` (`PageServerLoad`, `LayoutServerLoad`, `PageLoad`, `RequestHandler`, `EntryGenerator`). Shared app types live in `src/lib/types.ts`; ambient declarations (`*.md`, enhanced images, `window.turnstile`) live in `src/app.d.ts`.
- Vite 8, Node 24 (`.nvmrc`, `engines`), `adapter-netlify`.
- **pnpm** is the package manager (`packageManager` in `package.json`). CI and Netlify install from `pnpm-lock.yaml` with a frozen lockfile, so add or update dependencies with `pnpm`, never `npm install`.

## Commands

- `npm run dev` (add `-- --open` to open a browser) — dev server
- `npm run build` / `npm run preview` (preview serves on `:4173`)
- `npm run check` — svelte-check, **fails on warnings** (keep it clean). No CI job or active git hook runs it (`.husky/_pre-push` is not a hook name husky v9 runs), so run it yourself.
- `npm run lint` — prettier check + eslint. Also not run in CI.
- `npm run format` — prettier write
- `npx playwright test` — E2E tests (no npm script; auto-runs `build && preview`). Single file: `npx playwright test tests/home.test.ts`. Specs live in `tests/`. This is the only thing CI runs (`.github/workflows/playwright.yml`).

## Rendering

- `export const prerender = true` in `src/routes/+layout.server.ts` prerenders every page. The adapter's function (`path: ["/*"]`, `preferStatic: true`) now only contains `api/contact`, so a page URL that wasn't built returns 404 in production, even though `npm run preview` would still render it on request.
- SvelteKit finds pages by crawling links from `prerender.entries: ["*"]`. Dynamic routes also list their params with an `entries` export in their `+page.server.ts` (`blog/[slug]`, `blog/tags/[tag]`). A new dynamic route with neither `entries` nor a crawlable link fails the build.
- **Loaders run on the server.** Every `load` lives in a `+page.server.ts` or `+layout.server.ts`, so data code such as `getPosts()` never ships to the browser, and client-side navigation reads the prerendered `__data.json` files. The one exception is `blog/[slug]/+page.ts`: it returns the post's markdown component, which a server load can't serialize, and it imports only that post. Pages built from a single markdown file (`now`, `colophon`) import it in `+page.svelte` instead of using a loader.
- Unpublished posts are built only when a built page links to them (the colophon links to two drafts); any other draft URL returns 404.
- `handleHttpError` is left at its default, so a broken internal link or a page that throws fails the build.
- Endpoints don't inherit the layout's `prerender`, so `rss.xml`, `api/posts.json`, `api/tags.json` and `api/tags/[tag].json` each export it, the last with its own `entries`. A server loader's `fetch` doesn't write the endpoint's response to disk, so an endpoint that doesn't opt in lands in the Netlify function. Endpoints sharing a path prefix need a file extension (`tags.json` beside `tags/`), or the build fails on a file/directory clash.
- Keep `export const prerender = false` in `src/routes/api/contact/+server.ts`. SvelteKit refuses to prerender a `+server` file with a `POST` handler.
- `tests/prerender.test.ts` fails if any page, published post or tag page is rendered on request instead of served as a static file, or if the JSON API stops being written to `build/`.

## Project values (these drive most decisions)

- **Energy efficiency / green software** is a stated core value. Images: use `<enhanced:img>` (or the `Image.svelte` wrapper) via `@sveltejs/enhanced-img`; set `quality=50`, prefer AVIF→WebP→JPEG, always `loading="lazy"` + `decoding="async"` + explicit `width`/`height`. Minimize JS, keep every page prerendered (see Rendering), avoid unnecessary deps.
- **Accessibility is required** — descriptive `alt` on images, `width`/`height` to prevent layout shift, `aria-label` on icon buttons, semantic HTML (`<nav>`/`<main>`/`<footer>`, proper heading order), keyboard navigation.
- **Never publish an email address** in pages, posts or feeds; link to `/contact` instead. `tests/no-email-address.test.ts` fails if `mailto:` or `@antoniorossi.net` appears in any HTML, XML, JSON or text file in `build/`.

## Conventions

- **Commits: Conventional Commits** (`feat:`, `fix:`, `chore:`, …) — enforced by commitlint + husky `commit-msg`; non-conforming messages are rejected.
- Prettier (`.prettierrc`): 2-space indent, **double quotes** (JS and HTML attrs), **no trailing commas**, printWidth 100, automatic Tailwind class sorting. The husky `pre-commit` hook runs `prettier:check` and rejects unformatted files, so run `npm run format` before committing.
- **Tailwind-first.** Reach for a scoped `<style>` block only for `@keyframes`, complex grid, or hover states that need a `:global(.dark)` wrapper.
- Type component props with a TS `interface Props` block above `let { ... }: Props = $props()`. Use `import type` for type-only imports (`verbatimModuleSyntax` is on).
- Import order: external deps → `$lib/*` → relative. `$lib` → `src/lib` (only custom alias).
- **Never nest links.** Post cards (`Article.svelte`, `BlogListItem.svelte`) make the title the only card link and stretch it over the card with `after:absolute after:inset-0`; the `Tag` links inside sit above it. Internal `href`s go through `resolve()` from `$app/paths` (enforced by eslint).
- No code comments unless the _why_ is non-obvious.

## Where things live

**Rule:** `$lib` holds only shared/cross-page code. A component used by exactly one page lives next to that page's route (non-`+` files in a route folder aren't routes).

- `src/routes/` — file-based pages + `+server.ts` API (`api/posts.json`, `api/tags.json`, `api/tags/[tag].json`, `api/contact`, `rss.xml`). Page-only components colocate here: `Hero`/`Contacts`/`Articles`/`Article` (home) at the root, `about/Skill.svelte`, `career/{Company,Timeline}.svelte`, `blog/{BlogListItem,Pagination}.svelte`, `contact/{ContactForm,Turnstile}.svelte`.
- `src/lib/components/` — shared cross-page components: `Header`, `Footer`, `Image`, `Logo`, `NavItem`, `Tag` (pill; a link when given `url`, otherwise a plain `<span>`), plus `icons/`
- `src/lib/layouts/` — mdsvex layouts (`Post.svelte`, `Now.svelte`, `Colophon.svelte`)
- `src/lib/blog/posts.ts` — canonical post loader (`getPosts()`) plus `getTags()`, used by the API endpoints, RSS, the blog list loader and prerender `entries`
- `src/blog/*.md` — blog posts (see Content)
- `src/now/now.md` — "now" page content; `src/colophon/colophon.md` — colophon content
- `src/lib/data/companies.json` — career / CV data
- `src/lib/utils.ts` — date / experience helpers
- `src/lib/stores/` — theme: `store.ts` holds a localStorage-backed writable factory (module-private `createWritableStore`; only the `theme` store is exported — follow that pattern for new persisted stores) and `theme.ts` has `toggleTheme`. The store starts in **dark** mode, but a first visit follows the OS `prefers-color-scheme`; after that the choice persists in localStorage.
- `src/tailwind.css` — all Tailwind theme configuration
- `static/admin/` — Sveltia CMS, served at `/admin`. `config.yml` mirrors the blog frontmatter contract below, so change both together.

## Tailwind theme (`src/tailwind.css`) — non-default, read before styling

- **Breakpoints are custom** (TW defaults cleared): `sm 375 · md 550 · md2 600 · md3 800 · lg 1000 · xl 1385 · xl2 3000`. Never assume stock Tailwind breakpoints.
- Custom colors: `space-grey` / `space-white`, `hero-color-1..6`, `progress-bar-blue`, etc.
- Custom fonts only: `font-Cormorant` (serif, headings), `font-Poppins` (sans), `font-Roboto` (serif, body).
- Dark mode = `.dark` class variant (`dark:` prefix). Custom utilities: `grid-cols-articles-{sm,md,lg}`.

## Content (mdsvex)

- **Blog:** add a `.md` to `src/blog/`. Required frontmatter: `title, slug, subtitle, category, tags: [..], published: true, date: YYYY-MM-DD, layout: development`. The filename must equal `slug`, and any value containing `: ` must be quoted, or the frontmatter fails to parse and the post silently drops out of every listing.
- `layout` maps to an mdsvex layout in `mdsvex.config.js`: `development` → `src/lib/layouts/Post.svelte`, `now` → `src/lib/layouts/Now.svelte`, `colophon` → `src/lib/layouts/Colophon.svelte`.
- Only `published: true` posts are listed; sorted by `date` descending. Canonical loader: `getPosts()` in `src/lib/blog/posts.ts`.
- In-post images: import them in a `<script>` block (`import cover from "$lib/assets/images/blog/foo.jpg?enhanced";`) and render them with the `Image` component (`<Image src={cover} alt="…" />`). Most posts and the CMS config use this pattern; `fetch-priority.md` is the one post that writes `<enhanced:img src="$lib/assets/images/blog/…" />` straight into the markdown.

## Contact form

- `/contact` posts JSON to `src/routes/api/contact/+server.ts`. The endpoint validates the fields, verifies the Cloudflare Turnstile token, then forwards the message as form-encoded data to `/__forms.html`, where Netlify Forms collects it.
- `static/__forms.html` exists only so Netlify's build-time parser registers the `contact` form. Keep its field names in sync with the endpoint.
- Env vars (see `.env.example`): `PUBLIC_TURNSTILE_SITE_KEY` falls back to Cloudflare's always-pass test key when unset, and is baked into the prerendered `/contact` page, so changing it needs a new deploy. `TURNSTILE_SECRET_KEY` is read by the function on each request and falls back only in `npm run dev`; in production a missing secret makes the endpoint return 503. `npm run dev` always skips the Netlify hand-off and logs the submission instead.
- Messages only arrive if Netlify form detection is enabled for the site and both keys are set in Netlify's environment variables.
