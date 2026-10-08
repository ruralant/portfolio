<script lang="ts">
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
    class: cls = "rounded-xl",
    feedImage = false,
    fetchpriority,
    loading,
    // The article column (Longform): 42rem wide from `lg`, beside a 12rem column from `md3`
    sizes = "(min-width: 1000px) 672px, (min-width: 800px) calc(100vw - 272px), (min-width: 600px) calc(100vw - 64px), calc(100vw - 40px)"
  }: Props = $props();
</script>

<enhanced:img
  {src}
  {alt}
  class={feedImage ? `webfeedsFeaturedVisual ${cls}` : cls}
  {fetchpriority}
  {loading}
  {sizes}
/>
