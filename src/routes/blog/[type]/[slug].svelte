<script context="module">
  export async function load({ page }) {
    console.log('PARAMS', page);

    const Post = await import(
      `../../../posts/${page.params.type}/${page.params.slug}.svx`
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
