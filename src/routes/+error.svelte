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
<div class="flex flex-col items-center justify-center">
  <div class="mt-10 mb-5 text-4xl md:mb-10 md:text-5xl">😱</div>
  <h1 class="mb-3 text-center text-3xl text-neutral-800 md:text-4xl dark:text-neutral-100">
    Oops, Something weird happened
  </h1>
  <h2 class="mb-3 text-center text-2xl text-neutral-800 md:text-3xl dark:text-neutral-100">
    If you were looking for a blog post, I recently made some changes on the structure of the
    website.
  </h2>
  <h2 class="text-xl text-neutral-800 dark:text-neutral-100">
    You can find all the blog posts <a class="font-medium text-teal-500 underline" href="/blog"
      >here</a
    >.
  </h2>
</div>
