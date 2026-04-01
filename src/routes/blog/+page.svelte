<script>
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  import Pagination from "$lib/components/blog/Pagination.svelte";
  let { data } = $props();

  let currentPage = $state(1);
  const postsToDisplay = $derived(data.posts.slice((currentPage - 1) * 10, currentPage * 10));

  const goToPage = (page) => {
    currentPage = page;
  };
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex items-center md:justify-center">
    <h1
      class="font-Cormorant m-0 pt-10 pb-8 text-5xl leading-tight font-medium md:pt-0 md:text-6xl dark:text-neutral-100"
    >
      Latest Articles
    </h1>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each postsToDisplay as post}
      <BlogListItem {post} />
    {/each}
    {#if data.posts.length > 10}
      <Pagination total={data.posts.length} {goToPage} {currentPage} />
    {/if}
  </ul>
</div>
