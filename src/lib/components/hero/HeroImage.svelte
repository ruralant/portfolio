<script>
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg";
  import meImageWebp from "$lib/assets/images/home/me-b-w.webp";
  import meImageAvif from "$lib/assets/images/home/me-b-w.avif";
  import Image from "$lib/components/Image.svelte";

  let { width, height, classes } = $props();
</script>

<Image
  wepImage={meImageWebp}
  jpegImage={meImage}
  avifImage={meImageAvif}
  alt={"myself speaking in public"}
  {width}
  {height}
  loading={"eager"}
  {classes}
/>
