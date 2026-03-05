import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

/**
 * Returns a comma-separated string of import specifiers, excluding the specified import.
 *
 * Useful for auto-fixable rules that remove a specific import from an import statement.
 *
 * @category Utility
 *
 * @template RuleOptions - The type of the RuleOptions from the given context.
 *
 * @param context - The current ESLint rule context.
 * @param specifiers - Array of import clause nodes.
 * @param importToRemove - The import name to remove from the list.
 *
 * @returns A comma-separated string of import specifiers after removing the specified import.
 */
function getImportSpecifiersAfterRemoving<RuleOptions>(
  context: Readonly<RuleContext<"message", [RuleOptions]>>,
  specifiers: Array<TSESTree.ImportClause>,
  importToRemove: string,
): string {
  return specifiers
    .filter((specifier) => {
      return !(
        ((specifier as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name ===
        importToRemove
      );
    })
    .map((specifier) => {
      return context.sourceCode.getText(specifier);
    })
    .join(", ");
}

export default getImportSpecifiersAfterRemoving;
