import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

// eslint-disable-next-line @alextheman/no-namespace-imports
import * as tsResolver from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import-x";
import tseslint from "typescript-eslint";

import typeScriptLanguageOptions from "src/configs/helpers/typeScriptLanguageOptions";

function internalTypeScript(plugin: Readonly<AlexPlugin>): Array<Linter.Config> {
  return [
    {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: typeScriptLanguageOptions,
      name: "@alextheman/internal/typescript",
      plugins: {
        "@alextheman": plugin,
        "@typescript-eslint": tseslint.plugin,
        "import-x": importPlugin,
      },
      rules: {
        "@alextheman/standardise-error-messages": "off",
        "@typescript-eslint/array-type": ["error", { default: "generic" }],
        "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/method-signature-style": ["error", "property"],
        // Explicit any can be helpful sometimes, so it's not worth erroring on every single one.
        "@typescript-eslint/no-explicit-any": "off",
        // This rule conflicts with my const object + CreateEnumType pattern, therefore it may be disabled.
        "@typescript-eslint/no-redeclare": "off",
        "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      },
      settings: {
        "import-x/resolver": {
          name: "tsResolver",
          options: {
            node: true,
          },
          resolver: tsResolver,
        },
      },
    },
  ];
}

export default internalTypeScript;
