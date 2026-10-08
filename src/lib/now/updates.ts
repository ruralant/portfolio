import type { NowMetadata, NowUpdate } from "#lib/types.js";

/** Every now page entry, newest first. The first one is what /now shows. */
export async function getNowUpdates(): Promise<NowUpdate[]> {
  const modules = import.meta.glob<NowMetadata>("../../now/*.md", {
    eager: true,
    import: "metadata"
  });

  return Object.entries(modules)
    .map(([path, metadata]) => ({ ...metadata, slug: path.slice(path.lastIndexOf("/") + 1, -3) }))
    .sort((update, next) => Date.parse(next.date) - Date.parse(update.date));
}
