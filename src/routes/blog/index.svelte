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
  export let posts;
</script>

<div class="text-black dark:text-white">
  <p>Posts list</p>
  {#each posts as post}
    <ul>
      <li class="flex">
        <a href={`/blog/${post.type}/${post.slug}`}>{post.title}</a>
        -
        <p>{post.date}</p>
      </li>
    </ul>
  {/each}
</div>
