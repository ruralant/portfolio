import { json } from '@sveltejs/kit';

export const GET = async () => {
  const developmentPostsFiles = import.meta.glob('../../blog/development/*.md');
  const personalPostsFiles = import.meta.glob('../../blog/personal/*.md');
  const iterablePostsFiles = Object.entries(developmentPostsFiles).concat(
    Object.entries(personalPostsFiles)
  );
  const allPosts = await Promise.all(
    iterablePostsFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice(2, -3);

      return {
        meta: metadata,
        path: postPath,
      };
    })
  );

  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    .filter((post) => post.meta.published);

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  // return json(sortedPosts);
  return {
    body: sortedPosts,
  };
};
