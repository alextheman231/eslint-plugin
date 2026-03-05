import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";
import type { ConsistentTestFunctionOptions } from "src/rules/consistent-test-function";

function pluginTests(plugin: Readonly<AlexPlugin>): Array<Linter.Config> {
  return [
    {
      files: ["**/*.test.ts"],
      name: "@alextheman/plugin/tests",
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/consistent-test-function": [
          "error",
          { preference: "test" } as ConsistentTestFunctionOptions,
        ],
        "@alextheman/no-isolated-tests": "error",
        "@alextheman/no-skipped-tests": "warn",
      },
    },
  ];
}

export default pluginTests;
