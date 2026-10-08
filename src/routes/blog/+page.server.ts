import { getPosts } from "#lib/blog/posts.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return { posts: await getPosts() };
};
