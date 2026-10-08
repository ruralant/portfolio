<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    eyebrow: string;
    title: string | Snippet;
    /** Optional lede under the title */
    children?: Snippet;
  }

  let { eyebrow, title, children }: Props = $props();
</script>

<header class="md3:pb-16 max-w-3xl pb-12">
  <p class="eyebrow">{eyebrow}</p>
  <h1
    class="md2:text-6xl text-ink mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance"
  >
    {#if typeof title === "string"}{title}{:else}{@render title()}{/if}
  </h1>
  {#if children}
    <div class="md2:text-xl text-ink-soft mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
      {@render children()}
    </div>
  {/if}
</header>
