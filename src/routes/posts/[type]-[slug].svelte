<script context="module">
  export async function load({ page }) {
    try {
      const Post = await import(
        `../../posts/${page.params.type}/${page.params.slug}.md`
      );

      return {
        props: {
          Post: Post.default,
        },
      };
    } catch (e) {
      // return {
      // 	status: 307,
      // 	redirect: '/posts'
      // };
      return {
        status: 404,
        error: 'Post not found',
      };
    }
  }
</script>

<script>
  export let Post;
</script>

<Post />
