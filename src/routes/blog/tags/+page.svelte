<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  let { data } = $props();
</script>

<div class="w-full text-neutral-800 dark:text-neutral-100 sm:my-9">
  <div class="flex flex-col items-center md:justify-center">
    <h1 class="m-0 pl-4 font-Cormorant text-3xl leading-standard">Tags</h1>
    <h2 class="mb-5 mt-4 pl-4 font-Cormorant text-xl leading-standard">
      Select a tag to see all the related posts
    </h2>
  </div>
  <ul class="flex flex-wrap items-center justify-around gap-4 md:mt-5">
    {#each data.tags as tag}
      <Tag tagName={tag} url={`/blog/tags/${tag}`} />
    {/each}
  </ul>
</div>
