export async function load({ params }) {
  const Post = await import(`../../../blog/${params.slug}.md`);

  return {
    Post: Post.default
  };
}
