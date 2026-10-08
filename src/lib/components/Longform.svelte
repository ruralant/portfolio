<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Snippet } from "svelte";
  import type { Path } from "$app/types";

  interface Props {
    title: string;
    subtitle: string;
    back: { url: Path; text: string };
    /** Short line above the title on small screens, where the side column is hidden */
    eyebrow: string;
    /** Definition-list rows for the side column */
    meta: Snippet;
    /** Rendered after the article body, outside the prose styles */
    appendix?: Snippet;
    children?: Snippet;
  }

  let { title, subtitle, back, eyebrow, meta, appendix, children }: Props = $props();

  const backLink = "text-sm text-muted no-underline transition-colors hover:text-ink";
</script>

<article
  class="md3:grid md3:grid-cols-[10rem_minmax(0,1fr)] md3:gap-x-12 lg:grid-cols-[12rem_minmax(0,42rem)] lg:gap-x-16"
>
  <aside class="md3:mb-0 mb-10">
    <div class="md3:sticky md3:top-8">
      <a class={backLink} href={resolve(back.url)}>
        <span aria-hidden="true">←</span>
        {back.text}
      </a>
      <dl class="md3:block mt-10 hidden space-y-6 text-sm">
        {@render meta()}
      </dl>
    </div>
  </aside>

  <div class="min-w-0">
    <header class="border-line border-b pb-10">
      <p class="md3:hidden eyebrow">{eyebrow}</p>
      <h1
        class="md2:text-6xl md3:mt-0 text-ink mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance"
      >
        {title}
      </h1>
      <p class="md2:text-xl text-ink-soft mt-6 text-lg leading-relaxed text-pretty">{subtitle}</p>
    </header>

    <div class="prose prose-lg mt-10 max-w-none">
      {@render children?.()}
    </div>

    {@render appendix?.()}

    <footer class="border-line mt-16 border-t pt-8">
      <a class={backLink} href={resolve(back.url)}>
        <span aria-hidden="true">←</span>
        {back.text}
      </a>
    </footer>
  </div>
</article>
