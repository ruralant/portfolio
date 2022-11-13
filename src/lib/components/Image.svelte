<script>
  export let jpegImage;
  export let srcsetImage;
  export let wepImage;
  export let alt;
  export let width;
  export let height;
  export let classes;
  export let loading = "lazy";
</script>

<picture>
  <source srcset={wepImage} type="image/webp" {width} {height} />
  <source srcset={srcsetImage} type="image/jpeg" {width} {height} />
  <img class={classes} {alt} {loading} decoding="async" {width} {height} src={jpegImage} />
</picture>
