<script>
  let { text, url } = $props();
</script>

<a
  class="rounded-md bg-white px-4 py-2 text-sm font-normal text-neutral-600 shadow-sm dark:bg-neutral-800 dark:text-neutral-300"
  href={url}
>
  {text}
</a>
