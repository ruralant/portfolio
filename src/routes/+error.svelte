<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import PageHeader from "#lib/components/PageHeader.svelte";

  const title = $derived(`${page.status}: ${page.error?.message}`);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<PageHeader eyebrow="Error {page.status}" title="Oops, something weird happened">
  If you were looking for a blog post, I recently made some changes to the structure of the website.
  You can find all the blog posts <a class="link text-ink" href={resolve("blog")}>here</a>, or head
  back <a class="link text-ink" href={resolve("/")}>home</a>.
</PageHeader>
