import type { Linter } from "eslint";

import reactRefresh from "eslint-plugin-react-refresh";

import reactHooks from "src/configs/helpers/eslint-plugin-react-hooks";
import reactLanguageOptions from "src/configs/helpers/reactLanguageOptions";
import reactRestrictedImports from "src/configs/helpers/restrictedImports/reactRestrictedImports";

const internalReact: Array<Linter.Config> = [
  {
    languageOptions: reactLanguageOptions,
    name: "@alextheman/internal/react",
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-restricted-imports": ["error", reactRestrictedImports],
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/refs": "off",
      "react-refresh/only-export-components": "off",
      // "@eslint-react/jsx-boolean-value": "error", // TODO: Use @eslint-react/kit
    },
  },
];

export default internalReact;
