import { json } from "@sveltejs/kit";
import { getPosts } from "$lib/blog/posts.js";

export const GET = async () => {
  const posts = await getPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
  return json(tags);
};
