<script>
  import { page } from "$app/stores";

  const {
    status,
    error: { message }
  } = $page;
  const title = `${status}: ${message}`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="flex flex-col justify-center items-center">
  <div class="text-5xl md:text-4xl mt-10 mb-10">😱</div>
  <h1 class="text-4xl text-neutral-800 dark:text-neutral-100 mb-3">
    Wops, Something weird happened
  </h1>
  <h2 class="text-3xl text-neutral-800 dark:text-neutral-100 mb-3">
    If you were looking for a blog post, I made some changes on the structure of the website.
  </h2>
  <h2 class="text-xl text-neutral-800 dark:text-neutral-100">
    You can find all the blog posts <a class="underline font-medium text-teal-500" href="/blog"
      >here</a
    >.
  </h2>
</div>
