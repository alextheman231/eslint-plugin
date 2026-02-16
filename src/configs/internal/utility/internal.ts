import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import internalUtilityBase from "src/configs/internal/utility/base";

function internalUtilityRoot(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...internalUtilityBase(plugin),
    {
      rules: {
        "jsdoc/require-jsdoc": "off",
      },
    },
  ];
}

export default internalUtilityRoot;
