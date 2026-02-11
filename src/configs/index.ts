import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";
import type { AlexFlattenedConfigName } from "src/configs/AlexPluginConfigGroup";

import {
  combinedJavaScript,
  combinedJavaScriptReact,
  combinedReact,
  combinedTests,
  combinedTypeScript,
  combinedTypeScriptPackage,
  combinedTypeScriptReact,
} from "src/configs/combined";
import {
  generalJavaScript,
  generalPackageJson,
  generalReact,
  generalTypeScript,
} from "src/configs/general";
import {
  internalAlexCLine,
  internalComponents,
  internalEslintPlugin,
  internalJavaScript,
  internalJsdoc,
  internalNeurosongsBackEnd,
  internalNeurosongsFrontEnd,
  internalReact,
  internalTests,
  internalTypeScript,
  internalUtility,
} from "src/configs/internal";
import { pluginBase, pluginTests } from "src/configs/plugin";
import flattenConfigs from "src/utility/public/flattenConfigs";

function createAlexPluginConfigs(
  plugin: Readonly<AlexPlugin>,
): Record<AlexFlattenedConfigName, Linter.Config[]> {
  return flattenConfigs({
    combined: {
      javascript: combinedJavaScript(plugin),
      javascriptReact: combinedJavaScriptReact(plugin),
      react: combinedReact,
      tests: combinedTests(plugin),
      typescript: combinedTypeScript(plugin),
      typescriptPackage: combinedTypeScriptPackage(plugin),
      typescriptReact: combinedTypeScriptReact(plugin),
    },
    general: {
      javascript: generalJavaScript,
      packageJson: generalPackageJson,
      react: generalReact,
      typescript: generalTypeScript,
    },
    internal: {
      alexCLine: internalAlexCLine(plugin),
      components: internalComponents,
      eslintPlugin: internalEslintPlugin(plugin),
      javascript: internalJavaScript(plugin),
      jsdoc: internalJsdoc,
      neurosongsBackEnd: internalNeurosongsBackEnd,
      neurosongsFrontEnd: internalNeurosongsFrontEnd,
      react: internalReact,
      tests: internalTests,
      typescript: internalTypeScript(plugin),
      utility: internalUtility(plugin),
    },
    plugin: {
      base: pluginBase(plugin),
      tests: pluginTests(plugin),
    },
  });
}

export default createAlexPluginConfigs;
