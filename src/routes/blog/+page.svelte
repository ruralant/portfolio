<script>
  import { writable } from "svelte/store";
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  import Pagination from "$lib/components/blog/Pagination.svelte";
  let { data } = $props();

  const postsToDisplay = writable(data.posts.slice(0, 10));
  const currentPage = writable(1);

  const nextPosts = (start, end) => {
    postsToDisplay.set(data.posts.slice(start, end));
    currentPage.set(end / 10);
  };
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex items-center md:justify-center">
    <h1 class="font-Cormorant m-0 text-3xl leading-[1.15]">Latest Articles</h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each $postsToDisplay as post}
      <BlogListItem {post} />
    {/each}
    {#if data.posts.length > 10}
      <Pagination total={data.posts.length} {nextPosts} {currentPage} />
    {/if}
  </ul>
</div>
