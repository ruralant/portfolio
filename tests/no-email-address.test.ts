import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const ADDRESS = /mailto:|@antoniorossi\.net/i;
const BUILD = fileURLToPath(new URL("../build/", import.meta.url));

test.describe("Email address", () => {
  // Every page, post, tag page, feed and data file is prerendered into build/.
  test("should not be published in any built file", () => {
    const files = readdirSync(BUILD, { recursive: true, encoding: "utf8" }).filter(
      (file) => /\.(html|xml|json|txt)$/.test(file) && !file.startsWith("admin")
    );
    const offenders = files.filter((file) => ADDRESS.test(readFileSync(join(BUILD, file), "utf8")));

    expect(files.some((file) => file.endsWith(".html"))).toBe(true);
    expect(offenders).toEqual([]);
  });
});
