<script context="module">
  export async function load() {
    const posts = import.meta.globEager(`../../posts/*/*.md`);
    const postList = Object.values(posts);
    const postsMeta = postList.map((post) => post.metadata);
    console.log('POSTS META', postsMeta);

    return {
      props: {
        posts: postsMeta,
      },
    };
  }
</script>

<script>
  import BlogListItem from '$lib/components/blog/BlogListItem.svelte';

  export let posts;
</script>

<div class="text-black dark:text-white w-full pb-20">
  <p class="title-text">Posts list</p>
  <ul class="flex flex-col items-center mt-10">
    {#each posts as post}
      <BlogListItem {post} />
    {/each}
  </ul>
</div>

<style>
  .title-text {
    font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #fff;
    background: linear-gradient(
      271deg,
      #8797e8 30%,
      #a162e8 50%,
      #f093b0 70%,
      #dab56c 94%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
    font-size: 6rem;
    /* padding-left: 10%; */
  }
</style>
