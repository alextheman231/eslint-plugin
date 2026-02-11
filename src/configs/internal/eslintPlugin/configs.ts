import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import perfectionist from "eslint-plugin-perfectionist";

import { sortObjects } from "src/configs/helpers";
import internalEslintPluginBase from "src/configs/internal/eslintPlugin/base";

function internalEslintPluginConfigs(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...internalEslintPluginBase(plugin),
    {
      files: ["**/*.ts"],
      name: "@alextheman/internal/eslint-plugin-configs",
      plugins: {
        perfectionist,
      },
      rules: {
        "perfectionist/sort-objects": ["error", sortObjects],
      },
    },
  ];
}

export default internalEslintPluginConfigs;
