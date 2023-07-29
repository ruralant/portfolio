<script>
  export let jpegImage;
  export let srcsetImage;
  export let wepImage;
  export let avifImage;
  export let alt;
  export let width;
  export let height;
  export let classes;
  export let feedImage = false;
  export let loading = "lazy";
  console.log("Image.svelte", {
    jpegImage,
    srcsetImage,
    wepImage,
    avifImage,
    alt,
    width,
    height,
    classes,
    feedImage,
    loading
  });
</script>

<picture class={`${feedImage ? "webfeedsFeaturedVisual" : null} flex justify-center`}>
  {#if avifImage}
    <source srcset={avifImage} type="image/avif" {width} {height} />
  {/if}
  <source srcset={wepImage} type="image/webp" {width} {height} />
  <source srcset={srcsetImage} type="image/jpeg" {width} {height} />
  <img class={classes} {alt} {loading} decoding="async" {width} {height} src={jpegImage} />
</picture>
