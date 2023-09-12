<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  export let data;
</script>

<div class="text-neutral-800 dark:text-neutral-100 w-full sm:my-9">
  <div class="flex flex-col items-center md:justify-center">
    <h1 class="m-0 leading-standard font-Cormorant text-3xl pl-4">Tags</h1>
    <h2 class="mt-4 mb-5 leading-standard font-Cormorant text-xl pl-4">
      Select a tag to see all the related posts
    </h2>
  </div>
  <ul class="flex flex-wrap justify-around gap-4 items-center md:mt-5">
    {#each data.tags as tag}
      <Tag tagName={tag} url={`/blog/tags/${tag}`} />
    {/each}
  </ul>
</div>
