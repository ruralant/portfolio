<script context="module">
  export async function load({ params, url }) {
    const Post = await import(
      `../../../posts/${params.type}/${params.slug}.md`
    );

    return {
      props: {
        Post: Post.default,
      },
    };
  }
</script>

<script>
  export let Post;
</script>

<svelte:component this={Post} />
