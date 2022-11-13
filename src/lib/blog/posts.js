export async function getPosts() {
  const postList = Object.keys(import.meta.glob("../../blog/**/*.md"));
  const promises = postList.map((postPath) => import(postPath /* @vite-ignore */));
  const result = await Promise.all(promises);
  const posts = result
    .reduce((posts, next) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, [])
    .slice()
    .sort((post, next) => +new Date(next.date) - +new Date(post.date))
    .slice(0, 6);

  return posts;
}
