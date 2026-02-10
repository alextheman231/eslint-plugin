import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import combinedJavaScript from "src/configs/combined/javaScript";
import { generalTypeScript } from "src/configs/general";
import { internalJavaScript, internalTypeScript } from "src/configs/internal";

function combinedTypeScript(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript" },
    ...combinedJavaScript(plugin),
    ...generalTypeScript,
    ...internalJavaScript(plugin),
    ...internalTypeScript(plugin),
  ];
}

export default combinedTypeScript;
