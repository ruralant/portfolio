import { json } from "@sveltejs/kit";
import { getPosts } from "$lib/blog/posts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const posts = await getPosts();
  return json(posts.filter((post) => post.tags.includes(params.tag)));
};
