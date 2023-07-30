export async function load() {
  const posts = import.meta.glob(`../../blog/*.md`, { eager: true });
  const postsMeta = Object.entries(posts)
    .map(([_, post]) => post.metadata)
    .filter((post) => post.published)
    .sort((post, next) => Date.parse(next.date) - Date.parse(post.date))
    .splice(0, 6);

  return {
    posts: postsMeta
  };
}
