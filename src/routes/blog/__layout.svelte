<script context="module">
  // necessary to load before render
  export async function load() {
    const posts = import.meta.globEager('../../blog/*.svx');
    const postList = Object.values(posts);
    const postsMeta = postList.map((post) => post.metadata);
    return {
      props: {
        posts: postsMeta,
        // params,
      },
    };
  }
</script>

<script>
  export let posts;
</script>

<div class="text-black dark:text-white">
  <slot />
  <aside>
    <h5>Blog Main</h5>
    <ui>
      <!-- {#each posts as post}
        <li>
          <a href={`/blog/${params.type}/${posts.slug}`}>{post.title}mmm</a>
        </li>
      {/each} -->
    </ui>
  </aside>
</div>

<style>
  h1 {
    font-size: 5em;
  }
</style>
