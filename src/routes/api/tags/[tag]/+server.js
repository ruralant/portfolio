import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
  const postsFiles = import.meta.glob("../../../../blog/*.md");
  const iterablePostsFiles = Object.entries(postsFiles);
  const posts = await Promise.all(
    iterablePostsFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice(2, -3);

      return {
        meta: metadata,
        path: postPath
      };
    })
  );

  const sortedPosts = posts
    .filter((post) => post.meta.tags.includes(params.tag) && post.meta.published)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

  return json(sortedPosts);
};
