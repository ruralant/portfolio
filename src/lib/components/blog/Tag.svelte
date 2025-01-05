<script>
  let { tagName, url } = $props();
</script>

<button
  type="button"
  class="mr-2 inline-flex rounded-md bg-neutral-200 px-2 py-1 text-xs capitalize text-neutral-600 shadow-sm hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
  onclick={() => (window.location.href = url)}
>
  {tagName}
</button>
