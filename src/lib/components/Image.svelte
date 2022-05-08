<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  export let jpegImage;
  export let srcsetImage;
  export let wepImage;
  export let alt;
  export let width;
  export let height;
  export let placeholder;
  export let classes;
  export let loading = 'lazy';
  export let sizes;
  onMount(() => {
    if (browser) {
      document.lazyloadInstance.update();
    }
  });
</script>

<picture>
  <source
    data-sizes={sizes}
    data-srcset={wepImage}
    type="image/webp"
    {width}
    {height}
  />
  <source
    data-sizes={sizes}
    data-srcset={srcsetImage}
    type="image/jpeg"
    {width}
    {height}
  />
  <img
    class={classes}
    {alt}
    {loading}
    decoding="async"
    {width}
    {height}
    data-src={jpegImage}
    src={placeholder}
  />
</picture>
