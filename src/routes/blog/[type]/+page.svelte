<script>
  import { disableScrollHandling } from "$app/navigation";
  import { onMount } from "svelte";
  onMount(async () => {
    disableScrollHandling();
  });
  import BlogListItem from "$lib/components/blog/BlogListItem.svelte";
  export let data;
</script>

<div class="text-neutral-800 dark:text-white w-full sm:my-9">
  <div class="flex items-center md:justify-center">
    <h1 class="m-0 leading-standard font-Cormorant text-3xl pl-4">Latest Articles</h1>
    <a
      class="ml-6 inline-flex rounded-md shadow-sm px-2 py-1 bg-white dark:bg-neutral-800 text-sm"
      href="/"
    >
      <span class="text-neutral-600 dark:text-neutral-300 dark pointer-events-none">Archive</span>
    </a>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each data.posts as post}
      <BlogListItem {post} />
    {/each}
  </ul>
</div>
