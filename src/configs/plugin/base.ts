import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

function pluginBase(plugin: Readonly<AlexPlugin>): Array<Linter.Config> {
  return [
    {
      name: "@alextheman/plugin/base",
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/use-normalized-imports": "error",
        "@alextheman/use-object-shorthand": "error",
      },
    },
  ];
}

export default pluginBase;
