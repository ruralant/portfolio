<script>
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656";
  import meImageWebp from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656&format=webp&srcset";
  import meImageSrcset from "$lib/assets/images/home/me-b-and-w.jpg?w=656&h=656&srcset";
  import Image from "$lib/components/Image.svelte";
</script>

<Image
  wepImage={meImageWebp}
  jpegImage={meImage}
  srcsetImage={meImageSrcset}
  alt={"myself speaking in public"}
  width={400}
  height={400}
  loading={"eager"}
  classes={"rounded-full overflow-hidden mt-10 xl:mt-0 lg:ml-20"}
/>
