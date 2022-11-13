export async function load({ params }) {
  const { type } = params;
  let posts;

  if (type === "development") {
    posts = import.meta.glob(`../../../blog/development/*.md`);
  } else if (type === "personal") {
    posts = import.meta.glob(`../../../blog/development/*.md`);
  }

  const postList = Object.keys(posts);
  const promises = postList.map((postPath) => import(postPath /* @vite-ignore */));
  const result = await Promise.all(promises);
  const postsMeta = result
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
