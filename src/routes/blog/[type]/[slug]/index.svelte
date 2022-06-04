<script context="module">
  import 'prism-themes/themes/prism-one-dark.min.css';

  export async function load({ params, url }) {
    const Post = await import(
      `../../../../blog/${params.type}/${params.slug}.md`
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
