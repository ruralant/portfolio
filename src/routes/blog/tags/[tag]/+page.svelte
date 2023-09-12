<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  export let data;
</script>

<div class="text-neutral-800 dark:text-neutral-100 w-full sm:my-9">
  <div class="flex items-center md:justify-center">
    <h1 class="m-0 leading-standard font-Cormorant text-3xl pl-4">
      This is what I wrote about <span class="capitalize">{data.tag}</span>
    </h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each data.posts as post}
      <BlogListItem post={post.meta} />
    {/each}
  </ul>
</div>
