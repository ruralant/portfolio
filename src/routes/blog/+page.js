export async function load() {
  const posts = import.meta.glob(`../../blog/*.md`, { eager: true });
  const postList = Object.values(posts);
  const postsMeta = postList
    .reduce((posts, next) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, [])
    .slice()
    .sort((post, next) => +new Date(next.date) - +new Date(post.date))
    .slice(0, 6);

  return {
    posts: postsMeta
  };
}
