import path from "path";
import { escapeSvelte } from "mdsvex";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

// mdsvex's built-in highlighter bundles an old Prism core but loads grammars from the installed
// prismjs, and the newer javascript grammar throws against it. Load everything from one Prism.
/**
 * @param {string} code
 * @param {string | null | undefined} lang
 */
function highlighter(code, lang) {
  const language = lang?.toLowerCase() || "plaintext";
  if (!Prism.languages[language]) loadLanguages([language]);
  const grammar = Prism.languages[language] ?? Prism.languages.plaintext;
  const html = escapeSvelte(Prism.highlight(code, grammar, language));
  return `<pre class="language-${language}">{@html \`<code class="language-${language}">${html}</code>\`}</pre>`;
}

/** @satisfies {import("mdsvex").MdsvexOptions} */
const config = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool"
  },
  layout: {
    development: path.resolve("src/lib/layouts/Post.svelte"),
    now: path.resolve("src/lib/layouts/Now.svelte"),
    colophon: path.resolve("src/lib/layouts/Colophon.svelte")
  },
  highlight: {
    highlighter
  },
  remarkPlugins: [],
  rehypePlugins: []
};

export default config;
