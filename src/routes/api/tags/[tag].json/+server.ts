import { getPosts, getTags } from "#lib/blog/posts.js";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = async () => (await getTags()).map((tag) => ({ tag }));

export const GET: RequestHandler = async ({ params }) => {
  const posts = await getPosts();
  return Response.json(posts.filter((post) => post.tags.includes(params.tag)));
};
