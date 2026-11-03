<script lang="ts">
  import { resolve } from "$app/paths";
  import PageHeader from "#lib/components/PageHeader.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Tags · Antonio Rossi</title>
  <meta name="description" content="Every topic Antonio Rossi has written about." />
</svelte:head>

<PageHeader eyebrow="Writing" title="Tags">
  Select a tag to see all the related posts, or go back to
  <a class="link text-ink" href={resolve("blog")}>all articles</a>.
</PageHeader>

<ul class="border-line md2:columns-2 md3:columns-3 max-w-3xl gap-x-10 border-t pt-8">
  {#each data.tags as tag (tag)}
    <li class="break-inside-avoid py-1.5">
      <a
        class="link text-ink-soft text-[1.0625rem]"
        href={resolve(`blog/tags/${encodeURIComponent(tag)}`)}
      >
        {tag}
      </a>
    </li>
  {/each}
</ul>
