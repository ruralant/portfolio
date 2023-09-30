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
  <h1 class="text-neutral-800 dark:text-neutral-100">Something weird happened</h1>
  <h2 class="text-neutral-800 dark:text-neutral-100">{title}</h2>
</div>
