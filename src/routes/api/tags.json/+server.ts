import { getTags } from "#lib/blog/posts.js";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  return Response.json(await getTags());
};
