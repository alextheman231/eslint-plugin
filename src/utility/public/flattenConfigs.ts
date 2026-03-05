import type { Linter } from "eslint";

import type { GetFlattenedConfigNames } from "src/utility/public/GetFlattenedConfigNames";

import createConfigGroup from "src/utility/private/createConfigGroup";

/**
 * Takes in a nested group of configs, and returns them flattened according to ESLint config naming conventions.
 *
 * @category Utility
 *
 * @template ConfigObject - The type of the input config object.
 *
 * @param config - A doubly-nested config object to pass in, where the key of the top-level object is the config group name, and the key of the nested object is the name of the config within the group (e.g. `groupName.configName`).
 *
 * @returns A single-layered object with the key flattened down to be `group-name/config-name`.
 *
 * @example
 *      flattenConfigs<AlexPluginConfigGroup>({
 *          general: {
 *              typeScript: generalTypeScriptConfig,
 *              javaScript: generalJavaScriptConfig,
 *              react: generalReactConfig,
 *              // ...
 *          }
 *          plugin: {
 *              base: pluginBaseConfig,
 *              tests: pluginTestsConfig,
 *              // ...
 *          }
 *      })
 *
 *      // Returns:
 *      {
 *          "general/typescript": generalTypeScriptConfig,
 *          "general/javascript": generalJavaScriptConfig,
 *          "general/react": generalReactConfig,
 *          // ...,
 *          "plugin/base": pluginBaseConfig,
 *          "plugin/tests": pluginTestsConfig
 *          // ...
 *      }
 */
function flattenConfigs<
  ConfigObject extends { [K in keyof ConfigObject]: Record<string, Array<Linter.Config>> },
>(config: ConfigObject): Record<GetFlattenedConfigNames<ConfigObject>, Array<Linter.Config>> {
  const allConfigs = {} as Record<GetFlattenedConfigNames<ConfigObject>, Array<Linter.Config>>;
  for (const configGroupEntries of Object.entries(config) as Array<
    Parameters<typeof createConfigGroup<ConfigObject>>
  >) {
    Object.assign(allConfigs, createConfigGroup<ConfigObject>(...configGroupEntries));
  }
  return allConfigs satisfies Record<GetFlattenedConfigNames<ConfigObject>, Array<Linter.Config>>;
}

export default flattenConfigs;
