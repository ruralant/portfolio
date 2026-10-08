<script lang="ts">
  import { resolve } from "$app/paths";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import PostListItem from "$lib/components/PostListItem.svelte";
  import type { PostMetadata } from "$lib/types";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Posts arrive newest first, so years come out in descending order too
  const years = $derived(
    data.posts.reduce<[number, PostMetadata[]][]>((groups, post) => {
      const year = new Date(post.date).getUTCFullYear();
      const last = groups.at(-1);
      if (last?.[0] === year) last[1].push(post);
      else groups.push([year, [post]]);
      return groups;
    }, [])
  );
</script>

<svelte:head>
  <title>Blog · Antonio Rossi</title>
  <meta
    name="description"
    content="Articles by Antonio Rossi on green software, web performance, TypeScript, React and the occasional life update."
  />
</svelte:head>

<PageHeader eyebrow="Writing" title="Latest Articles">
  Notes on green software, web performance, TypeScript and React, plus the occasional life update.
  <a class="link text-ink" href={resolve("/blog/tags")}>Browse by tag</a>.
</PageHeader>

<div class="space-y-4">
  {#each years as [year, posts] (year)}
    <section
      aria-labelledby="year-{year}"
      class="md3:grid-cols-[7rem_minmax(0,1fr)] border-line grid gap-x-10 border-t"
    >
      <h2
        id="year-{year}"
        class="md3:sticky md3:top-6 md3:self-start md3:pt-6 text-muted pt-8 font-serif text-3xl leading-none tabular-nums"
      >
        {year}
      </h2>
      <ul class="md3:[&>li:first-child]:border-t-0">
        {#each posts as post (post.slug)}
          <PostListItem {post} showTags showYear={false} />
        {/each}
      </ul>
    </section>
  {/each}
</div>
