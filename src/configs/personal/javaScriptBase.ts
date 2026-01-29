import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";

import prettierConfig from "src/configs/external/prettierConfig";
import { sortClasses, sortExports, sortImports } from "src/configs/helpers";
import javaScriptLanguageOptions from "src/configs/helpers/javaScriptLanguageOptions";
import sortNamedImports from "src/configs/helpers/sorting/sortNamedImports";

function personalJavaScript(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      languageOptions: javaScriptLanguageOptions,
      name: "@alextheman/personal/javascript",
      plugins: {
        "@alextheman": plugin,
        perfectionist,
        prettier: prettierPlugin,
      },
      rules: {
        "@alextheman/no-relative-imports": "error",
        "arrow-body-style": ["error", "always"],
        curly: ["error", "all"],
        "func-style": ["error", "declaration", { allowArrowFunctions: false }],
        "no-else-return": "error",
        "no-implicit-coercion": ["error", { allow: ["!!"] }],
        "operator-assignment": ["error", "always"],
        "perfectionist/sort-classes": ["error", sortClasses],
        "perfectionist/sort-exports": ["error", sortExports],
        "perfectionist/sort-imports": ["error", sortImports],
        "perfectionist/sort-named-imports": ["error", sortNamedImports],
        "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
        "prefer-destructuring": "error",
        "prefer-template": "error",
        "prettier/prettier": ["warn", prettierConfig],
        "sort-vars": "error",
      },
    },
    {
      files: ["src/**/index.{js,jsx,ts,tsx}"],
      rules: {
        // Since index files generally tend to export files from the same folder, they tend to be more coupled with their location in the folder,
        // so it feels more natural to allow only root-level relative imports from an index file.
        "@alextheman/no-relative-imports": ["error", { depth: 0 }],
      },
    },
  ];
}

export default personalJavaScript;
