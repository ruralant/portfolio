<!-- @migration-task Error while migrating Svelte code: Encountered an export declaration pattern that is not supported for automigration. -->
<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  export let postData;
  export let postPath;
  export let { title, subtitle, tags } = postData;
</script>

<li
  class="bg-almost-white dark:bg-light-space-grey h-72 w-full max-w-sm overflow-hidden rounded-md p-6 shadow-md"
>
  <a class="flex h-full flex-col justify-between no-underline" href={postPath}>
    <div>
      <div
        class="font-Cormorant mb-2 bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-[1.7rem] font-bold text-transparent dark:from-purple-500 dark:to-red-400"
      >
        {title}
      </div>
      <p class="font-text-neutral-800 font-Poppins dark:text-neutral-100">
        {subtitle}
      </p>
    </div>
    <div>
      {#each tags as tag}
        <Tag tagName={tag} url={`/blog/tags/${tag}`} />
      {/each}
    </div>
  </a>
</li>
