import type { Linter } from "eslint";

import tseslint from "typescript-eslint";

import generalJavaScript from "src/configs/general/javaScript";
import typeScriptLanguageOptions from "src/configs/helpers/typeScriptLanguageOptions";
import unusedVarsIgnorePatterns from "src/configs/helpers/unusedVarsIgnorePatterns";

const generalTypeScript: Linter.Config[] = [
  ...tseslint.configs.recommended,
  ...generalJavaScript,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: typeScriptLanguageOptions,
    name: "@alextheman/general/typescript",
    rules: {
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-redeclare": ["error", { ignoreDeclarationMerge: true }],
      "@typescript-eslint/no-unused-vars": ["error", unusedVarsIgnorePatterns],
      // Disable import/no-unresolved (enabled in general/javascript, being extended here) because the TypeScript compiler already catches unused imports for us.
      "import/no-unresolved": "off",
      // Disable regular no-redeclare in favour of TypeScript-specific version since that will flag type redeclarations when we do const MyType = {}; export type MyType = ...
      "no-redeclare": "off",
      // Disable no-undef because undefined variables tend to be better caught by the TypeScript compiler.
      "no-undef": "off",
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
    },
  },
];

export default generalTypeScript;
