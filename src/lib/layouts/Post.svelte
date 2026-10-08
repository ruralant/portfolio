<script lang="ts">
  import Longform from "$lib/components/Longform.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import { formatDate, isoDate } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Props {
    category: string;
    title: string;
    subtitle: string;
    date: string | Date;
    tags?: string[];
    mainImage?: string;
    mainImageAlt?: string;
    slug: string;
    children?: Snippet;
  }

  let {
    category,
    title,
    subtitle,
    date,
    tags = [],
    mainImage,
    mainImageAlt,
    slug,
    children
  }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={subtitle} />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={subtitle} />
  <meta property="og:url" content={`https://www.antoniorossi.net/blog/${slug}`} />
  <meta property="og:image" itemprop="image" content={mainImage} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={subtitle} />
  <meta name="twitter:image" content={mainImage} />
  <meta name="twitter:image:alt" content={mainImageAlt} />
  <meta property="og:image:width" content="300" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ruralant" />
</svelte:head>

<Longform
  {title}
  {subtitle}
  back={{ url: "/blog", text: "All articles" }}
  eyebrow="{category} · {formatDate(date)}"
>
  {#snippet meta()}
    <div>
      <dt class="eyebrow">Published</dt>
      <dd class="text-ink mt-2"><time datetime={isoDate(date)}>{formatDate(date)}</time></dd>
    </div>
    <div>
      <dt class="eyebrow">Category</dt>
      <dd class="text-ink mt-2 capitalize">{category}</dd>
    </div>
    {#if tags.length > 0}
      <div>
        <dt class="eyebrow">Tags</dt>
        <dd class="mt-3 flex flex-wrap gap-1.5">
          {#each tags as tag (tag)}
            <Tag tagName={tag} url={`/blog/tags/${encodeURIComponent(tag)}`} />
          {/each}
        </dd>
      </div>
    {/if}
  {/snippet}

  {@render children?.()}
</Longform>
