import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";

import internalTests from "src/configs/internal/tests";
import { pluginTests } from "src/configs/plugin";

function combinedTests(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [{ name: "@alextheman/combined/tests" }, ...pluginTests(plugin), ...internalTests];
}

export default combinedTests;
