import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import nodePlugin from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";

import { combinedTypeScript } from "src/configs/combined";
import sortObjects from "src/configs/helpers/sorting/sortObjects";

function internalAlexCLine(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    ...combinedTypeScript(plugin),
    {
      files: ["src/**/*.ts"],
      name: "@alextheman/internal/alex-c-line",
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
}

export default internalAlexCLine;
