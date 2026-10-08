import { error } from "@sveltejs/kit";
import { getNowUpdates } from "#lib/now/updates.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const updates = await getNowUpdates();
  if (updates.length === 0) error(404, "Not found");

  return { updates };
};
