import type { Linter } from "eslint";

import globals from "globals";

import testsRestrictedImports from "src/configs/helpers/restrictedImports/testsRestrictedImports";

const internalTests: Linter.Config[] = [
  {
    files: ["**/*.test.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
    name: "@alextheman/internal/tests",
    rules: {
      "no-restricted-globals": [
        "error",
        {
          message:
            "Do not use global describe function. Import test functions from vitest instead.",
          name: "describe",
        },
        {
          message: "Do not use global test function. Import test functions from vitest instead.",
          name: "test",
        },
        {
          message: "Do not use global expect function. Import test functions from vitest instead.",
          name: "expect",
        },
      ],
      "no-restricted-imports": ["error", testsRestrictedImports],
    },
  },
];

export default internalTests;
