<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import BlogListItem from '$lib/components/blog/BlogListItem.svelte';
  export let posts;
</script>

<div class="text-neutral-800 dark:text-white w-full sm:my-9 ">
  <div class="flex items-center md:justify-center">
    <p class="m-0 leading-standard font-Cormorant text-3xl pl-4">
      Latest Articles
    </p>
    <a
      class="ml-6 inline-flex rounded-md shadow-sm px-2 py-1 bg-white dark:bg-neutral-800 text-sm "
      href="/"
    >
      <span class="text-neutral-600 dark:text-neutral-300 pointer-events-none "
        >Archive</span
      >
    </a>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each posts as post}
      <BlogListItem {post} />
    {/each}
  </ul>
</div>
