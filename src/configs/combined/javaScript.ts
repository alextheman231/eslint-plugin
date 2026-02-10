import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import combinedTests from "src/configs/combined/tests";
import generalJavaScript from "src/configs/general/javaScript";
import internalJavaScript from "src/configs/internal/javaScript";
import { pluginBase } from "src/configs/plugin";

function combinedJavaScript(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      name: "@alextheman/combined/javascript",
    },
    ...pluginBase(plugin),
    ...generalJavaScript,
    ...internalJavaScript(plugin),
    ...combinedTests(plugin),
  ];
}

export default combinedJavaScript;
