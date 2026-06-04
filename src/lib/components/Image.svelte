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
    class: cls = "mt-6 mb-8 rounded-lg drop-shadow-md",
    feedImage = false,
    fetchpriority,
    loading,
    sizes
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
