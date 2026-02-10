import type { Linter } from "eslint";

import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";

import reactHooks from "src/configs/helpers/eslint-plugin-react-hooks";
import reactLanguageOptions from "src/configs/helpers/reactLanguageOptions";
import reactRestrictedImports from "src/configs/helpers/restrictedImports/reactRestrictedImports";

const internalReact: Linter.Config[] = [
  {
    languageOptions: reactLanguageOptions,
    name: "@alextheman/internal/react",
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-restricted-imports": ["error", reactRestrictedImports],
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/refs": "off",
      "react-refresh/only-export-components": "off",
      "react/jsx-boolean-value": "error",
    },
  },
];

export default internalReact;
