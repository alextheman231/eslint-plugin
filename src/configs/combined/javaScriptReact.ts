import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import combinedJavaScript from "src/configs/combined/javaScript";
import combinedReact from "src/configs/combined/react";

function combinedJavaScriptReact(plugin: Readonly<AlexPlugin>): Array<Linter.Config> {
  return [
    { name: "@alextheman/combined/javascript-react" },
    ...combinedJavaScript(plugin),
    ...combinedReact,
  ];
}

export default combinedJavaScriptReact;
