import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import jsdoc from "eslint-plugin-jsdoc";

import { combinedTypeScriptPackage } from "src/configs/combined";
import eslintPluginRestrictedImports from "src/configs/helpers/restrictedImports/eslintPluginRestrictedImports";

function internalEslintPluginBase(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    ...combinedTypeScriptPackage(plugin),
    {
      name: "@alextheman/internal/eslint-plugin-base",
      plugins: {
        "@alextheman": plugin,
        jsdoc,
      },
      rules: {
        "@alextheman/no-plugin-configs-access-from-src-configs": "error",
        "jsdoc/require-jsdoc": "off",
        "no-restricted-imports": ["error", eslintPluginRestrictedImports],
      },
    },
  ];
}

export default internalEslintPluginBase;
