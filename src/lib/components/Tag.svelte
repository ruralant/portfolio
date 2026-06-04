<script lang="ts">
  interface Props {
    tagName: string;
    url: string | undefined;
  }

  let { tagName, url }: Props = $props();
</script>

<button
  type="button"
  class="mr-2 inline-flex rounded-md bg-neutral-200 px-2 py-1 text-xs text-neutral-600 capitalize shadow-xs hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
  onclick={() => url && (window.location.href = url)}
>
  {tagName}
</button>
