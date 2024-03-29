export async function load() {
  const posts = import.meta.glob(`../../blog/*.md`, { eager: true });
  const sortedPosts = Object.entries(posts)
    .map(([_, post]) => post.metadata)
    .filter((post) => post.published)
    .sort((post, next) => Date.parse(next.date) - Date.parse(post.date));

  return {
    posts: sortedPosts
  };
}
