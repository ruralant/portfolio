export async function getPosts() {
  const posts = Object.values(import.meta.glob("../../blog/*.md", { eager: true }))
    .map((post) => post.metadata)
    .filter((post) => post.published)
    .sort((post, next) => Date.parse(next.date) - Date.parse(post.date));

  return posts;
}
