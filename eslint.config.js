import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";
import svelteConfig from "./svelte.config.js";

export default [
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __APP_VERSION__: "readonly"
      },
      ecmaVersion: 2020,
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        svelteConfig
      }
    }
  },
  {
    ignores: [
      ".DS_Store",
      "node_modules/",
      "build/",
      ".svelte-kit/",
      "package/",
      "archive/",
      ".env",
      ".env.*",
      "!.env.example",
      ".claude/",
      ".vscode/",
      ".netlify/",
      ".fallow/",
      "test-results/",
      "playwright-report/",
      "blob-report/",
      "playwright/.cache/"
    ]
  }
];
