import { getPosts } from "#lib/blog/posts.js";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = await getPosts();
  return Response.json(posts.slice(0, 6).map((meta) => ({ meta, path: `/blog/${meta.slug}` })));
};
