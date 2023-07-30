<script>
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg?w=570&h=570";
  import meImageWebp from "$lib/assets/images/home/me-b-and-w.jpg?w=570&h=570&format=webp&as=srcset";
  import meImageSrcset from "$lib/assets/images/home/me-b-and-w.jpg?w=570&h=570&format=jpeg&as=srcset";
  import Image from "$lib/components/Image.svelte";

  export let width;
  export let height;
  export let classes;
</script>

<Image
  wepImage={meImageWebp}
  jpegImage={meImage}
  srcsetImage={meImageSrcset}
  alt={"myself speaking in public"}
  {width}
  {height}
  loading={"eager"}
  {classes}
/>
