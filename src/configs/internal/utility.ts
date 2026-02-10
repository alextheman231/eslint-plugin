import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import { fixupPluginRules } from "@eslint/compat";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";

import { combinedTypeScriptPackage } from "src/configs/combined";
import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";

function internalUtility(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    ...combinedTypeScriptPackage(plugin),
    {
      name: "@alextheman/internal/utility",
      plugins: {
        "@typescript-eslint": fixupPluginRules(tseslint.plugin),
        jsdoc,
      },
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "jsdoc/require-jsdoc": ["error", requireJsdocOptions],
      },
    },
  ];
}

export default internalUtility;
