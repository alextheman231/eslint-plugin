import type { Linter } from "eslint";

import type { GetFlattenedConfigNames } from "src/utility/public/GetFlattenedConfigNames";

import camelToKebab from "src/utility/private/camelToKebab";

function createConfigGroup<
  ConfigObject extends { [K in keyof ConfigObject]: Record<string, Array<Linter.Config>> },
>(
  group: keyof ConfigObject,
  configs: Record<string, Array<Linter.Config>>,
): Record<GetFlattenedConfigNames<ConfigObject>, Array<Linter.Config>> {
  const newConfigs: Record<string, Array<Linter.Config>> = {};
  for (const key in configs) {
    newConfigs[`${camelToKebab(group as string)}/${camelToKebab(key)}`] = configs[key];
  }
  return newConfigs;
}

export default createConfigGroup;
