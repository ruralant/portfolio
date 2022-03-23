<script context="module">
  export async function load() {
    const posts = import.meta.globEager(`../../posts/*/*.md`);
    const postList = Object.values(posts);
    const postsMeta = postList.reduce((posts, next) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, []);

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

<div class="text-neutral-800 dark:text-white w-full sm:mt-9">
  <div class="flex items-center md:justify-center">
    <p class="title-text front-Cormorant text-3xl pl-4">Latest Articles</p>
    <a class="ml-6 inline-flex rounded-md shadow-sm px-2 py-1 bg-white text-sm">
      <span class="text-black">Archive</span>
    </a>
  </div>
  <ul class="flex flex-col items-center md:mt-5">
    {#each posts as post}
      <BlogListItem {post} />
    {/each}
  </ul>
</div>

<style>
  .title-text {
    /* font-weight: 500; */
    margin: 0;
    line-height: 1.15;
  }
</style>
