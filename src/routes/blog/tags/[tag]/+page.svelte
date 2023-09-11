<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  export let data;
  const { tag, posts } = data;
</script>

<div class="text-neutral-800 dark:text-neutral-50 w-full sm:my-9">
  <div class="flex items-center md:justify-center">
    <h1 class="m-0 leading-standard font-Cormorant text-3xl pl-4">
      This is what I wrote about <span class="capitalize">{tag}</span>
    </h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each posts as post}
      <BlogListItem post={post.meta} />
    {/each}
  </ul>
</div>
