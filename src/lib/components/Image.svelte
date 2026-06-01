<script>
  /**
   * @typedef {Object} Props
   * @property {any} src
   * @property {string} alt
   * @property {string} [class]
   * @property {boolean} [feedImage]
   * @property {string} [fetchpriority]
   * @property {string} [loading]
   * @property {string} [sizes]
   */

  /** @type {Props} */
  let {
    src,
    alt,
    class: cls = "mt-6 mb-8 rounded-lg drop-shadow-md",
    feedImage = false,
    fetchpriority,
    loading,
    sizes
  } = $props();
</script>

<enhanced:img
  {src}
  {alt}
  class={feedImage ? `webfeedsFeaturedVisual ${cls}` : cls}
  {fetchpriority}
  {loading}
  {sizes}
/>
