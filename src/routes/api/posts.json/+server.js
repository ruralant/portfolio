import { json } from "@sveltejs/kit";

export const GET = async () => {
  const postsFiles = import.meta.glob("../../../blog/*.md");

  // Convert to array and process in a single pass
  const posts = await Promise.all(
    Object.entries(postsFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      return {
        meta: metadata,
        path: path.slice(2, -3),
        image: metadata.image || "/default-blog-image.jpg"
      };
    })
  );

  // Chain operations efficiently and be explicit with types
  return json(
    posts
      .filter((post) => post.meta.published)
      .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date))
      .slice(0, 6)
  );
};
