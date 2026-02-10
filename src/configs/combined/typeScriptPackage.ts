import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import combinedTypeScript from "src/configs/combined/typeScript";
import { internalJsdoc } from "src/configs/internal";

function combinedTypeScriptPackage(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript-package" },
    ...combinedTypeScript(plugin),
    ...internalJsdoc,
  ];
}

export default combinedTypeScriptPackage;
