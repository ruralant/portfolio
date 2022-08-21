import 'prism-themes/themes/prism-one-dark.min.css';

export async function load({ params, url }) {
  const Post = await import(
    `../../../../blog/${params.type}/${params.slug}.md`
  );

  return {
  Post: Post.default,
};
}
