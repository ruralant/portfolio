<!-- @migration-task Error while migrating Svelte code: Encountered an export declaration pattern that is not supported for automigration. -->
<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  export let postData;
  export let postPath;
  export let { title, subtitle, tags, icon, date, type, slug } = postData;
</script>

<li
  class="h-72 w-full max-w-sm overflow-hidden rounded-md bg-almost-white p-6 shadow-md dark:bg-light-space-grey"
>
  <a class="flex h-full flex-col justify-between no-underline" href={postPath}>
    <div>
      <div
        class="mb-2 from-purple-600 to-red-500 font-Cormorant text-[1.7rem] font-bold text-neutral-800 bg-gradient-90 dark:from-purple-500 dark:to-red-400 dark:text-neutral-100"
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
