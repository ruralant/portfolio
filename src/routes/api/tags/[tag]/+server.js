import { json } from "@sveltejs/kit";
import { getPosts } from "$lib/blog/posts.js";

export const GET = async ({ params }) => {
  const posts = await getPosts();
  return json(posts.filter((post) => post.tags.includes(params.tag)));
};
