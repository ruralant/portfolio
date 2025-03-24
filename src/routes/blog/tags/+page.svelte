<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  let { data } = $props();
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex flex-col items-center md:justify-center">
    <h1 class="font-Cormorant m-0 pl-4 text-3xl leading-[1.15]">Tags</h1>
    <h2 class="font-Cormorant mt-4 mb-5 pl-4 text-xl leading-[1.15]">
      Select a tag to see all the related posts
    </h2>
  </div>
  <ul class="flex flex-wrap items-center justify-around gap-4 md:mt-5">
    {#each data.tags as tag}
      <Tag tagName={tag} url={`/blog/tags/${tag}`} />
    {/each}
  </ul>
</div>
