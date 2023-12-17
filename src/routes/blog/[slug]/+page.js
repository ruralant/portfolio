import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  console.log(params.slug);
  try {
    const Post = await import(`../../../blog/${params.slug}.md`);

    return {
      Post: Post.default
    };
  } catch (e) {
    console.error(e);
    redirect(307, "/blog");
  }
}
