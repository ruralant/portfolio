<script context="module">
  export async function load({ params, url }) {
    console.log('URL', url);
    console.log('PARAMS', params);

    const Post = await import(
      `../../../posts/${params.type}/${params.slug}.svx`
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
