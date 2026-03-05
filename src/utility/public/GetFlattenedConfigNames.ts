import type { Linter } from "eslint";

import type { CamelToKebab } from "src/utility/private/camelToKebab";

/**
 * A helper type to turn the keys of a doubly-nested object into a flattened ESLint config key.
 *
 * @category Utility
 *
 * @example
 * ```typescript
 * type ConfigNames = GetFlattenedConfigNames<{ general: { typescriptReact }}> // "general/typescript-react"
 * ```
 */
export type GetFlattenedConfigNames<
  ConfigObject extends { [K in keyof ConfigObject]: Record<string, Array<Linter.Config>> },
> = {
  [Group in keyof ConfigObject &
    string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof ConfigObject[Group] & string>}`;
}[keyof ConfigObject & string];
