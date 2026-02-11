import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";
import internalEslintPluginBase from "src/configs/internal/eslintPlugin/base";

function internalEslintPluginUtility(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...internalEslintPluginBase(plugin),
    {
      files: ["**/*.ts"],
      name: "@alextheman/internal/eslint-plugin-utility",
      rules: {
        "jsdoc/require-jsdoc": ["error", requireJsdocOptions],
      },
    },
  ];
}

export default internalEslintPluginUtility;
