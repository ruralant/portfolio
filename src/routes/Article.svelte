<script lang="ts">
  import { resolve } from "$app/paths";
  import Tag from "$lib/components/Tag.svelte";
  import type { PostMetadata, Pathname } from "$lib/types";

  interface Props {
    postData: PostMetadata;
    postPath: Pathname;
  }

  let { postData, postPath }: Props = $props();
  const title = $derived(postData.title);
  const subtitle = $derived(postData.subtitle);
  const tags = $derived(postData.tags);
</script>

<li
  class="bg-almost-white dark:bg-light-space-grey relative flex h-72 w-full max-w-sm flex-col justify-between overflow-hidden rounded-md p-6 shadow-md"
>
  <div>
    <a
      class="no-underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-teal-600 focus-visible:after:ring-inset dark:focus-visible:after:ring-teal-400"
      href={resolve(postPath)}
    >
      <div
        class="font-Cormorant mb-2 bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-[1.7rem] font-bold text-transparent dark:from-purple-500 dark:to-red-400"
      >
        {title}
      </div>
    </a>
    <p class="font-text-neutral-800 font-Poppins dark:text-neutral-100">
      {subtitle}
    </p>
  </div>
  <div>
    {#each tags as tag (tag)}
      <Tag tagName={tag} url={`/blog/tags/${encodeURIComponent(tag)}`} />
    {/each}
  </div>
</li>
