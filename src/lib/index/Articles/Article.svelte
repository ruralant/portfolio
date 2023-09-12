<script>
  import Tag from "$lib/components/blog/Tag.svelte";
  export let postData;
  export let postPath;
  export let { title, subtitle, tags, icon, date, type, slug } = postData;
</script>

<li
  class="w-full max-w-sm h-72 rounded-md overflow-hidden bg-almost-white dark:bg-light-space-grey shadow-md p-6"
>
  <a class="h-full flex flex-col justify-between" href={postPath}>
    <div>
      <div
        class="font-Cormorant text-neutral-800 dark:text-neutral-100 bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400 font-bold text-[1.7rem] mb-2"
      >
        {title}
      </div>
      <p class="font-Poppins font-text-neutral-800 dark:text-neutral-100">
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
