export async function load({ params, url }) {
  const { type } = params;
  let posts;
  if (type === "development") {
    posts = import.meta.glob(`../../../blog/development/*.md`, { eager: true });
  } else if (type === "personal") {
    posts = import.meta.glob(`../../../blog/personal/*.md`, { eager: true });
  }
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
