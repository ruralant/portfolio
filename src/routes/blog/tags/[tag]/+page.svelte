<script lang="ts">
  import { resolve } from "$app/paths";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import PostListItem from "$lib/components/PostListItem.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.tag} · Antonio Rossi</title>
  <meta name="description" content="Articles by Antonio Rossi about {data.tag}." />
</svelte:head>

<PageHeader eyebrow="Tag">
  {#snippet title()}
    This is what I wrote about <em class="text-accent">{data.tag}</em>
  {/snippet}
  {data.posts.length}
  {data.posts.length === 1 ? "article" : "articles"}.
  <a class="link text-ink" href={resolve("/blog/tags")}>All tags</a> ·
  <a class="link text-ink" href={resolve("/blog")}>All articles</a>
</PageHeader>

<ul class="border-line border-b">
  {#each data.posts as post (post.slug)}
    <PostListItem {post} headingLevel={2} showTags />
  {/each}
</ul>
