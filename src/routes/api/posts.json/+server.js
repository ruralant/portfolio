import { json } from "@sveltejs/kit";
import { getPosts } from "$lib/blog/posts.js";

export const GET = async () => {
  const posts = await getPosts();
  return json(posts.slice(0, 6).map((meta) => ({ meta, path: `/blog/${meta.slug}` })));
};
