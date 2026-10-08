<script lang="ts">
  import { resolve } from "$app/paths";
  import PostListItem from "#lib/components/PostListItem.svelte";
  import type { PostSummary } from "#lib/types.js";

  interface Props {
    posts: PostSummary[];
  }

  let { posts }: Props = $props();
</script>

<section aria-labelledby="latest-articles" class="md3:py-16 py-12">
  <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-8">
    <div>
      <p class="eyebrow">Writing</p>
      <h2
        id="latest-articles"
        class="md2:text-5xl text-ink mt-3 font-serif text-4xl leading-none tracking-tight"
      >
        Latest articles
      </h2>
    </div>
    <a class="link text-ink text-[0.9375rem]" href={resolve("blog")}>
      All articles<span aria-hidden="true"> →</span>
    </a>
  </div>
  <ul>
    {#each posts as post (post.path)}
      <PostListItem post={post.meta} />
    {/each}
  </ul>
</section>
