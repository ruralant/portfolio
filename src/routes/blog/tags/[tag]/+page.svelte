<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  let { data } = $props();
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex items-center md:justify-center">
    <h1 class="font-Cormorant m-0 pl-4 text-center text-3xl leading-[1.15]">
      This is what I wrote about <span class="capitalize">{data.tag}</span>
    </h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each data.posts as post}
      <BlogListItem post={post.meta} />
    {/each}
  </ul>
</div>
