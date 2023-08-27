<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  import Pagination from "$lib/components/blog/Pagination.svelte";
  export let data;

  let postsToDisplay = data.posts.slice(0, 10);

  const nextPosts = (start, end) => {
    postsToDisplay = data.posts.slice(start, end);
  };
</script>

<div class="text-neutral-800 dark:text-neutral-50 w-full sm:my-9">
  <div class="flex items-center md:justify-center">
    <h1 class="m-0 leading-standard font-Cormorant text-3xl">Latest Articles</h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each postsToDisplay as post}
      <BlogListItem {post} />
    {/each}
    {#if data.posts.length > 10}
      <Pagination total={data.posts.length} {nextPosts} />
    {/if}
  </ul>
</div>
