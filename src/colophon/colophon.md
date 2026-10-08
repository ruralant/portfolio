---
title: Colophon
subtitle: A designer-y word for "how it's made"
lastUpdated: "October 2026"
layout: colophon
---

This site is designed, built and maintained by me. It's a small, deliberately
lightweight corner of the web — a place to write, share what I'm working on, and
keep learning in the open. This page documents how it's put together and the
choices behind it.

## About this site

The source code is [open on GitHub](https://github.com/ruralant). I rebuild and
refine it little by little rather than chasing a big redesign, so it grows the
same way I do — incrementally, and with intention.

## Technology

- **Framework**: [SvelteKit 3](https://svelte.dev/docs/kit) with [Svelte 5](https://svelte.dev) and its runes, written in [TypeScript](https://www.typescriptlang.org).
- **Content**: written in Markdown and processed with [mdsvex](https://mdsvex.pngwn.io), so posts and pages like this one are just files.
- **Images**: optimised at build time with [`@sveltejs/enhanced-img`](https://svelte.dev/docs/kit/images) into AVIF and WebP, in several widths sized to the column they sit in.
- **Code highlighting**: [Prism](https://prismjs.com) with the One Dark theme.
- **Hosting**: deployed on [Netlify](https://www.netlify.com).
- **Tooling**: [Vite](https://vite.dev), [ESLint](https://eslint.org) and [Prettier](https://prettier.io) keep the codebase tidy.
- **Testing**: end-to-end tests with [Playwright](https://playwright.dev).

## Typography

- **Display**: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), a condensed,
  editorial serif for titles and headings, with its italic for the odd accent.
- **Text**: [Geist](https://fonts.google.com/specimen/Geist), a clean sans-serif for everything you
  read.

Both are self-hosted as subsetted `woff2` files, about 53 KB for all three, so there's no
third-party request and only the glyphs the site actually needs are downloaded. Each font has a
local fallback resized to match its metrics, so the text doesn't jump when the web fonts arrive.

## Design

- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4 with the typography plugin.
- **Colour**: warm paper and ink, hairline rules instead of shadows, and a single terracotta accent
  borrowed from the lit windows of the solarpunk house on the home page, in both light and dark
  modes.
- **Illustration**: the solarpunk house on the home page is drawn by a small script that models the
  island in 3D and projects it to a flat SVG. Day and night share one cached file, and the moving
  parts animate only position and opacity, which are cheap for the browser to draw.
- The aim is calm, readable, and out of the way of the words.

## Energy & performance

This site is built to be light. There's very little JavaScript shipped to the
browser, fonts are subsetted, and every page is pre-rendered to static HTML at
build time, so nothing runs on a server when you visit. The only exception is
the contact form, which needs one small function to send a message.

Images are compressed hard and served in the size your screen actually needs: a
phone gets the narrow version instead of the desktop one. Sizing them to the
article column cut the images for reading every post on a typical phone from
about 1 MB to 330 KB.

I care about the energy cost of the web — you can
read more about that in my writing on
[sustainable](/blog/sustainable-web-manifesto) and
[regenerative](/blog/designing-regenerative-technologies) software.

## Accessibility

I aim to meet [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA: semantic HTML,
sufficient colour contrast, keyboard navigation and respect for reduced-motion
preferences. If something doesn't work for you, please
[let me know](/contact) — I'd genuinely like to fix it.

## Privacy

No invasive analytics, no advertising, no tracking cookies. I don't want your
data — I just want the site to be useful.

The one third-party script is on the [contact page](/contact):
[Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/)
checks that a message comes from a person rather than a bot, without a puzzle to
solve. Messages are then stored with [Netlify Forms](https://docs.netlify.com/forms/setup/),
and only I read them.

---

_This page was inspired by [Ky Decker's colophon](https://ky.fyi/colophon) and
the colophons of the wider indie web. If you have one too, I'd love to see it._
