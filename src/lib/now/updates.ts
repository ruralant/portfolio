import type { NowMetadata, NowSummary, NowUpdate, TextPart } from "#lib/types.js";

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

// Links keep their text and bold loses its markers; _x_ and *x* become emphasis
const toTextParts = (line: string): TextPart[] =>
  line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .split(/(_[^_]+_|\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      /^([_*]).+\1$/.test(part)
        ? { text: part.slice(1, -1), emphasis: true }
        : { text: part, emphasis: false }
    );

/** The newest update's first bullet under each `##` heading, for the home page */
export async function getNowSummary(limit = 3): Promise<NowSummary | undefined> {
  const [latest] = await getNowUpdates();
  if (!latest) return undefined;

  const sources = import.meta.glob<string>("../../now/*.md", { query: "?raw", import: "default" });
  const source = await sources[`../../now/${latest.slug}.md`]();
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "");

  const sections: NowSummary["sections"] = [];
  let heading: string | undefined;
  for (const line of body.split("\n")) {
    const title = line.match(/^##\s+(.+)/);
    const bullet = line.match(/^[-*]\s+(.+)/);
    if (title) heading = title[1].trim();
    else if (bullet && heading) {
      sections.push({ heading, point: toTextParts(bullet[1].trim()) });
      heading = undefined;
    }
  }

  return { date: latest.date, sections: sections.slice(0, limit) };
}
