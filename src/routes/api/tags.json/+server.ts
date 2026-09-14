import { json } from "@sveltejs/kit";
import { getTags } from "$lib/blog/posts";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  return json(await getTags());
};
