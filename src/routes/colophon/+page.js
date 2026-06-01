import { redirect } from "@sveltejs/kit";

export async function load() {
  try {
    const Post = await import("../../colophon/colophon.md");

    return {
      Post: Post.default
    };
  } catch (e) {
    console.error(e);
    redirect(307, "/");
  }
}
