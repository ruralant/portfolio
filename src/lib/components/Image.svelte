<script>
  /**
   * @typedef {Object} Props
   * @property {any} jpegImage
   * @property {any} wepImage
   * @property {any} avifImage
   * @property {any} alt
   * @property {any} width
   * @property {any} height
   * @property {any} classes
   * @property {boolean} [feedImage]
   * @property {string} [loading]
   */

  /** @type {Props} */
  let {
    jpegImage,
    wepImage,
    avifImage,
    alt,
    width,
    height,
    classes,
    feedImage = false,
    loading = "lazy"
  } = $props();
</script>

<picture class={`${feedImage ? "webfeedsFeaturedVisual" : null} flex justify-center`}>
  {#if avifImage}
    <source srcset={avifImage} type="image/avif" {width} {height} />
  {/if}
  <source srcset={wepImage} type="image/webp" {width} {height} />
  <source srcset={jpegImage} type="image/jpeg" {width} {height} />
  <img class={classes} {alt} {loading} decoding="async" {width} {height} src={jpegImage} />
</picture>
