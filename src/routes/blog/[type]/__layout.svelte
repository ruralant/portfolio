<script context="module">
  export async function load({ params }) {
    const posts = import.meta.globEager(`../../../posts/development/*.md`);
    const postList = Object.values(posts);
    const postsMeta = postList.map((post) => post.metadata);

    return {
      props: {
        posts: postsMeta,
        params,
      },
    };
  }
</script>

<script>
  export let posts;
  export let params;
</script>

<div class="text-black dark:text-white">
  <slot />
  <!-- <aside> -->
  <h5>Archive</h5>
  <ui>
    {#each posts as post}
      <div>
        <p>{post.title}</p>
        <a href={`/blog/${params.type}/${post.slug}`}>More...</a>
      </div>
    {/each}
  </ui>
  <!-- </aside> -->
</div>
