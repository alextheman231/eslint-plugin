import type { NoRestrictedImportsOptions } from "src/configs/helpers";

import { omitProperties } from "@alextheman/utility";

/**
 * Combines multiple option groups for the native ESLint `no-restricted-imports` rule, without overwriting previous configurations.
 *
 * @category Utility
 *
 * @param groups - Option groups to combine, applied in the order provided.
 *
 * @returns A new object combining all paths and patterns from the given groups, suitable as an option to pass to `no-restricted-imports`.
 */
function combineRestrictedImports(
  ...groups: Array<NoRestrictedImportsOptions>
): NoRestrictedImportsOptions {
  const paths: NoRestrictedImportsOptions["paths"] = [];
  const patterns: NoRestrictedImportsOptions["patterns"] = [];

  for (const group of groups) {
    if (group.paths) {
      paths.push(...group.paths);
    }
    if (group.patterns) {
      patterns.push(...group.patterns);
    }
  }

  const combinedGroup = { paths, patterns };

  if (combinedGroup.paths.length === 0) {
    return omitProperties(combinedGroup, "paths");
  }
  if (combinedGroup.patterns.length === 0) {
    return omitProperties(combinedGroup, "patterns");
  }
  return combinedGroup;
}

export default combineRestrictedImports;
