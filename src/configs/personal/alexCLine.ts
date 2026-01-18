import type { Linter } from "eslint";

import nodePlugin from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";

import sortObjects from "src/configs/helpers/sorting/sortObjects";

const personalAlexCLine: Linter.Config[] = [
  {
    files: ["src/**/*.ts"],
    name: "@alextheman/personal/alex-c-line",
    plugins: {
      n: nodePlugin,
    },
    rules: {
      // Gives a false positive on the entry file where it is actually needed
      "n/hashbang": "off",
    },
  },
  {
    files: ["src/commands/index.ts", "src/configs/internal/**"],
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-objects": ["error", sortObjects],
    },
  },
];

export default personalAlexCLine;
