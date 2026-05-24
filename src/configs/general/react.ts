import type { Linter } from "eslint";

import reactPlugin from "@eslint-react/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactRefresh from "eslint-plugin-react-refresh";

import reactHooks from "src/configs/helpers/eslint-plugin-react-hooks";
import reactLanguageOptions from "src/configs/helpers/reactLanguageOptions";

const generalReact: Array<Linter.Config> = [
  jsxA11y.configs.recommended,
  {
    languageOptions: reactLanguageOptions,
    name: "@alextheman/general/react",
    plugins: {
      "@eslint-react": reactPlugin,
      "@stylistic": stylistic,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs["flat/recommended"].rules,
      ...reactPlugin.configs["recommended-typescript"].rules,
      // "react/jsx-props-no-spread-multi": "error", // TODO: Use @eslint-react/kit for this
      "@eslint-react/dom-no-dangerously-set-innerhtml": "error",
      "@eslint-react/no-array-index-key": "off",
      "@eslint-react/no-context-provider": "error",
      "@eslint-react/no-use-context": "error",
      // "react/destructuring-assignment": ["error", "always", { destructureInSignature: "always" }], // TODO: Use @eslint-react/kit for this
      "@eslint-react/use-state": "error",
      "@stylistic/jsx-curly-brace-presence": [
        "error",
        { children: "never", propElementValues: "always", props: "never" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default generalReact;
