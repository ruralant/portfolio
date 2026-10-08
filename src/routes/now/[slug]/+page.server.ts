import { error, redirect } from "@sveltejs/kit";
import { getNowUpdates } from "#lib/now/updates.js";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () =>
  (await getNowUpdates()).map(({ slug }) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
  const updates = await getNowUpdates();
  // The latest update lives at /now; its own URL only becomes a page once a newer one replaces it.
  if (updates[0]?.slug === params.slug) redirect(307, "/now");
  if (!updates.some(({ slug }) => slug === params.slug)) error(404, "Not found");

  return { updates };
};
