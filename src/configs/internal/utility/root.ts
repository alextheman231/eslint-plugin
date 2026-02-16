import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import personalRestrictedImports from "src/configs/helpers/restrictedImports/personalRestrictedImports";
import internalUtilityBase from "src/configs/internal/utility/base";
import { combineRestrictedImports } from "src/utility/public";

function internalUtilityRoot(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...internalUtilityBase(plugin),
    {
      rules: {
        "no-restricted-imports": [
          "error",
          combineRestrictedImports(personalRestrictedImports, {
            patterns: [
              {
                group: ["node:"],
                message:
                  'Do not import node builtins from the root of utility. Please either refactor the usage so that the node builtin is not needed, or move this over to the "@alextheman/utility/node" entrypoint.',
              },
            ],
          }),
        ],
      },
    },
  ];
}

export default internalUtilityRoot;
