import { getNowSummary } from "#lib/now/updates.js";
import type { PostSummary } from "#lib/types.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/posts.json");
  const posts: PostSummary[] = await response.json();
  return { posts, now: await getNowSummary() };
};
