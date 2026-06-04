import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  try {
    const Post = await import("../../now/now.md");

    return {
      Post: Post.default
    };
  } catch (e) {
    console.error(e);
    redirect(307, "/");
  }
};
