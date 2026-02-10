import type { Linter } from "eslint";

import internalJsdoc from "src/configs/internal/jsdoc";

const internalComponents: Linter.Config[] = [
  ...internalJsdoc,
  {
    rules: {
      "jsdoc/check-param-names": "off",
      "jsdoc/require-param": ["error", { checkDestructured: false }],
      // Not really helpful in components, since most of the time, they will be returning a ReactNode. It's more helpful to
      // document the prop types and purpose of the component instead.
      "jsdoc/require-returns": "off",
    },
  },
];

export default internalComponents;
