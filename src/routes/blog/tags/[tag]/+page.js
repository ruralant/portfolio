export async function load({ fetch, params }) {
  const response = await fetch(`/api/tags/${params.tag}`);
  const posts = await response.json();

  return {
    tag: params.tag,
    posts
  };
}
