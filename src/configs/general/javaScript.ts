import type { Linter } from "eslint";

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";

import javaScriptLanguageOptions from "src/configs/helpers/javaScriptLanguageOptions";
import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";
import unusedVarsIgnorePatterns from "src/configs/helpers/unusedVarsIgnorePatterns";

const generalJavaScript: Linter.Config[] = [
  js.configs.recommended,
  prettierConfig,
  nodePlugin.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["dist"],
    languageOptions: javaScriptLanguageOptions,
    name: "@alextheman/general/javascript",
    plugins: {
      import: importPlugin,
      n: nodePlugin,
    },
    rules: {
      eqeqeq: "error",
      "import/no-unresolved": "error",
      "n/file-extension-in-import": [
        "error",
        "always",
        {
          ".js": "never",
          ".jsx": "never",
          ".ts": "never",
          ".tsx": "never",
        },
      ],
      // Gives false positives and is already covered by import/no-unresolved (or the TypeScript compiler in TypeScript projects)
      "n/no-missing-import": "off",
      "n/no-path-concat": "error",
      // Was causing false positives with Prisma and dotenv.
      "n/no-unpublished-import": "off",
      "n/prefer-node-protocol": "error",
      "no-cond-assign": "error",
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "no-duplicate-imports": "error",
      "no-eval": "error",
      "no-lonely-if": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-restricted-imports": ["error", generalRestrictedImports],
      "no-undef": "error",
      "no-unused-vars": ["error", unusedVarsIgnorePatterns],
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "prefer-const": "error",
    },
    settings: {
      "import/resolver": {
        node: true,
      },
    },
  },
];

export default generalJavaScript;
