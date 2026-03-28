import type { Linter } from "eslint";

import internalJsdoc from "src/configs/internal/jsdoc";

const internalComponents: Array<Linter.Config> = [
  ...internalJsdoc,
  {
    rules: {
      "jsdoc/check-param-names": "off",
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-tags": "off",
    },
  },
];

export default internalComponents;
