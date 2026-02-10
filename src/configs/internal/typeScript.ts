import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import { fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";

import typeScriptLanguageOptions from "src/configs/helpers/typeScriptLanguageOptions";

function internalTypeScript(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: typeScriptLanguageOptions,
      name: "@alextheman/internal/typescript",
      plugins: {
        "@alextheman": plugin,
        "@typescript-eslint": fixupPluginRules(tseslint.plugin),
      },
      rules: {
        "@alextheman/standardise-error-messages": "error",
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/method-signature-style": ["error", "property"],
        // Explicit any can be helpful sometimes, so it's not worth erroring on every single one.
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ];
}

export default internalTypeScript;
