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

<ul class="border-line flex max-w-3xl flex-wrap gap-x-2 gap-y-3 border-t pt-10">
  {#each data.tags as tag (tag)}
    <li>
      <a
        class="border-line text-ink-soft hover:border-ink hover:text-ink inline-flex items-center rounded-full border px-4 py-1.5 text-[0.9375rem] no-underline transition-colors"
        href={resolve(`blog/tags/${encodeURIComponent(tag)}`)}
      >
        {tag}
      </a>
    </li>
  {/each}
</ul>
