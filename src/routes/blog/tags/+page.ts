import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(`/api/tags`);
  const tagList: string[] = await response.json();

  return {
    tags: tagList
  };
};
