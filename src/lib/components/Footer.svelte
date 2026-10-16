<script lang="ts">
  import { resolve } from "$app/paths";
  import { navigation } from "#lib/navigation.js";

  const year = new Date().getFullYear();
  const footerLink = "text-ink-soft no-underline transition-colors hover:text-accent";
</script>

<footer class="md2:px-8 max-w-content mx-auto w-full px-5">
  <div class="md3:grid-cols-[1fr_auto] border-line grid gap-10 border-t pt-12 pb-10">
    <div>
      <p class="tracking-title font-serif text-[1.75rem] leading-none">Antonio Rossi</p>
      <p class="text-muted mt-3 max-w-xs text-sm leading-relaxed">
        Software engineer in Reading, UK, writing about green software and a lighter web.
      </p>
      <a
        class="group border-line-strong hover:border-ink mt-6 inline-flex items-stretch overflow-hidden rounded-full border text-xs leading-none no-underline transition-colors"
        href="https://www.websitecarbon.com/website/antoniorossi-net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="text-ink-soft px-3 py-2 tabular-nums">0.01 g CO<sub>2</sub>/view</span>
        <span
          class="border-line-strong bg-surface text-ink group-hover:border-ink group-hover:text-accent border-l px-3 py-2 font-medium transition-colors"
        >
          Website Carbon<span aria-hidden="true"> ↗</span><span class="sr-only">
            (opens in a new tab)</span
          >
        </span>
      </a>
      <p class="text-muted mt-2 text-xs">Cleaner than 98% of pages tested</p>
    </div>

    <div class="grid grid-cols-2 gap-x-16 gap-y-8 text-sm">
      <nav aria-label="Site">
        <p class="eyebrow">Site</p>
        <ul class="mt-4 space-y-2.5">
          {#each navigation as item (item.url)}
            <li><a class={footerLink} href={resolve(item.url)}>{item.text}</a></li>
          {/each}
        </ul>
      </nav>
      <nav aria-label="Elsewhere">
        <p class="eyebrow">Elsewhere</p>
        <ul class="mt-4 space-y-2.5">
          <li><a class={footerLink} href={resolve("contact")}>Contact</a></li>
          <li>
            <a
              class={footerLink}
              href="https://www.linkedin.com/in/antoniorossii/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn<span aria-hidden="true"> ↗</span><span class="sr-only">
                (opens in a new tab)</span
              >
            </a>
          </li>
          <li><a class={footerLink} href={resolve("rss.xml")}>RSS feed</a></li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="text-muted flex flex-wrap justify-between gap-2 pb-10 text-xs tabular-nums">
    <p>© 2016–{year} Antonio Rossi</p>
    <p>v{__APP_VERSION__}</p>
  </div>
</footer>
