<script lang="ts">
  import { IMAGE_SIZES, IMAGE_SIZES_1X } from "#lib/grid/modes.js";
  import { grid } from "#lib/grid/state.svelte.js";

  interface Props {
    src: any;
    alt: string;
    class?: string;
    feedImage?: boolean;
    fetchpriority?: "auto" | "high" | "low";
    loading?: "eager" | "lazy";
    sizes?: string;
  }

  let {
    src,
    alt,
    class: cls = "rounded",
    feedImage = false,
    fetchpriority,
    loading,
    sizes = IMAGE_SIZES
  }: Props = $props();

  let shown = $state(false);

  /*
    Keep these in step with stamp() in netlify/edge-functions/grid-mode.ts, which writes the
    same attributes into the page, so hydration finds them unchanged.
  */
  const lean = $derived(grid.mode === "lean");
  const imageSizes = $derived(
    grid.mode && grid.mode !== "full" && sizes === IMAGE_SIZES ? IMAGE_SIZES_1X : sizes
  );
  const classes = $derived(
    [feedImage && "webfeedsFeaturedVisual", cls, !shown && "lean:hidden"].filter(Boolean).join(" ")
  );
</script>

<enhanced:img
  {src}
  {alt}
  class={classes}
  fetchpriority={lean ? undefined : fetchpriority}
  loading={lean && fetchpriority === "high" ? "lazy" : loading}
  sizes={imageSizes}
/>
{#if !shown}
  <button
    type="button"
    class="border-line-strong text-ink-soft hover:border-ink lean:flex hidden w-full cursor-pointer items-center justify-between gap-4 rounded border border-dashed px-4 py-3 text-left text-sm transition-colors"
    aria-label="Show image: {alt}"
    onclick={() => (shown = true)}
  >
    <span>{alt}</span>
    <span class="text-ink shrink-0">Show image</span>
  </button>
{/if}
