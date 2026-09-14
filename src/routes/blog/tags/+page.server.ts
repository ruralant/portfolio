import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/tags.json");
  const tags: string[] = await response.json();
  return { tags };
};
