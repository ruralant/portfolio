import { json } from "@sveltejs/kit";

export const GET = async () => {
  const postsFiles = import.meta.glob("../../../blog/*.md");
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
  const tags = posts
    .filter((post) => post.meta.published)
    .map((post) => post.meta.tags)
    .flat();
  const uniqueTags = [...new Set(tags)];
  const sortedTags = uniqueTags.sort((a, b) => a.localeCompare(b));
  return json(sortedTags);
};
