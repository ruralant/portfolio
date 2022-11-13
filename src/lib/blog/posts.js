export async function getPosts() {
  const posts = Object.entries(import.meta.glob("../../blog/**/*.md", { eager: true }))
    .reduce((posts, [, next]) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, [])
    .slice()
    .sort((post, next) => +new Date(next.date) - +new Date(post.date));

  return posts;
}
