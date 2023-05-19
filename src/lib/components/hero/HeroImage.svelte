<script>
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656";
  import meImageWebp from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656&format=webp&srcset";
  import meImageSrcset from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656&srcset";
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
