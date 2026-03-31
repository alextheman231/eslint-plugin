import type { Linter } from "eslint";

import type { GetFlattenedConfigNames } from "src/utility/public/GetFlattenedConfigNames";

export type GeneralConfig = "javascript" | "typescript" | "react" | "packageJson";
export type PluginConfig = "base" | "tests";
export type InternalConfig =
  | "javascript"
  | "typescript"
  | "react"
  | "tests"
  | "eslintPluginBase"
  | "eslintPluginConfigs"
  | "eslintPluginRules"
  | "eslintPluginUtility"
  | "neurosongsBackEnd"
  | "neurosongsFrontEnd"
  | "utilityBase"
  | "utilityRoot"
  | "utilityInternal"
  | "alexCLine"
  | "jsdoc"
  | "components"
  | "packageJson";
export type CombinedConfig =
  | "javascript"
  | "typescript"
  | "react"
  | "tests"
  | "typescriptReact"
  | "javascriptReact"
  | "typescriptPackage";

export interface AlexPluginConfigObject {
  general: Record<GeneralConfig, Array<Linter.Config>>;
  plugin: Record<PluginConfig, Array<Linter.Config>>;
  internal: Record<InternalConfig, Array<Linter.Config>>;
  combined: Record<CombinedConfig, Array<Linter.Config>>;
}

export type AlexConfigGroupName = keyof AlexPluginConfigObject;

export type AlexFlattenedConfigName = GetFlattenedConfigNames<AlexPluginConfigObject>;
export type AlexPluginConfigFlattened = Record<AlexFlattenedConfigName, Array<Linter.Config>>;
