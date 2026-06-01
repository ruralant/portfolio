---
title: Colophon
subtitle: A designer-y word for "how it's made"
lastUpdated: "June 2026"
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

- **Framework**: [SvelteKit](https://kit.svelte.dev) with [Svelte 5](https://svelte.dev) and its runes.
- **Content**: written in Markdown and processed with [mdsvex](https://mdsvex.pngwn.io), so posts and pages like this one are just files.
- **Images**: optimised at build time with [`@sveltejs/enhanced-img`](https://kit.svelte.dev/docs/images).
- **Code highlighting**: [Prism](https://prismjs.com) with the One Dark theme.
- **Hosting**: deployed on [Netlify](https://www.netlify.com).
- **Tooling**: [Vite](https://vite.dev), [ESLint](https://eslint.org) and [Prettier](https://prettier.io) keep the codebase tidy.
- **Testing**: end-to-end tests with [Playwright](https://playwright.dev).

## Typography

- **Headings**: [Cormorant](https://fonts.google.com/specimen/Cormorant), a high-contrast serif.
- **Body**: [Roboto Serif](https://fonts.google.com/specimen/Roboto+Serif), for comfortable long-form reading.
- **Accents**: [Poppins](https://fonts.google.com/specimen/Poppins).

All fonts are self-hosted as subsetted `woff2` files, so there's no third-party
request and only the glyphs the site actually needs are downloaded.

## Design

- **Styling**: [Tailwind CSS](https://tailwindcss.com) with the typography plugin.
- **Colour**: a restrained, mostly neutral palette with teal accents, in both light and dark modes.
- The aim is calm, readable, and out of the way of the words.

## Energy & performance

This site is built to be light. There's very little JavaScript shipped to the
browser, media is compressed, fonts are subsetted, and pages are pre-rendered to
static HTML wherever possible. I care about the energy cost of the web — you can
read more about that in my writing on
[sustainable](/blog/sustainable-web-manifesto) and
[regenerative](/blog/designing-regenerative-technologies) software.

## Accessibility

I aim to meet [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA: semantic HTML,
sufficient colour contrast, keyboard navigation and respect for reduced-motion
preferences. If something doesn't work for you, please
[let me know](mailto:info@antoniorossi.net) — I'd genuinely like to fix it.

## Privacy

No invasive analytics, no advertising, no tracking cookies. I don't want your
data — I just want the site to be useful.

---

_This page was inspired by [Ky Decker's colophon](https://ky.fyi/colophon) and
the colophons of the wider indie web. If you have one too, I'd love to see it._
