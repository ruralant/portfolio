<script>
  export let tagName;
  export let url;
</script>

<a
  class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
  href={url}
>
  {tagName}
</a>
