import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import perfectionist from "eslint-plugin-perfectionist";

import { sortObjects } from "src/configs/helpers";
import internalEslintPluginBase from "src/configs/internal/eslintPlugin/base";

function internalEslintPluginRules(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...internalEslintPluginBase(plugin),
    {
      files: ["index.ts"],
      name: "@alextheman/internal/eslint-plugin-rules",
      plugins: {
        perfectionist,
      },
      rules: {
        "perfectionist/sort-objects": ["error", sortObjects],
      },
    },
  ];
}

export default internalEslintPluginRules;
