<script>
  export let wepImage;
  export let jpegImage;
  export let alt;
  export let width;
  export let height;
  export let placeholder;
  export let classes;
</script>

<picture>
  <source type="image/webp" srcset={wepImage} />
  <source type="image/jpeg" srcset={jpegImage} />
  <img src={jpegImage} {alt} {width} {height} {placeholder} class={classes} />
</picture>
