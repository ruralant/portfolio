<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  import Pagination from "$lib/components/blog/Pagination.svelte";
  export let data;

  let postsToDisplay = data.posts.slice(0, 10);
  let currentPage = 1;

  const nextPosts = (start, end) => {
    postsToDisplay = data.posts.slice(start, end);
    currentPage = end / 10;
  };
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex items-center md:justify-center">
    <h1 class="m-0 font-Cormorant text-3xl leading-standard">Latest Articles</h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each postsToDisplay as post}
      <BlogListItem {post} />
    {/each}
    {#if data.posts.length > 10}
      <Pagination total={data.posts.length} {nextPosts} {currentPage} />
    {/if}
  </ul>
</div>
