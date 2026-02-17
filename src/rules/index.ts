import consistentTestFunction from "src/rules/consistent-test-function";
import hasStandards from "src/rules/has-standards";
import noIsolatedTests from "src/rules/no-isolated-tests";
import noNamespaceImports from "src/rules/no-namespace-imports";
import noPluginConfigAccessFromSrcConfigs from "src/rules/no-plugin-configs-access-from-src-configs";
import noRelativeImports from "src/rules/no-relative-imports";
import noSkippedTests from "src/rules/no-skipped-tests";
import standardiseErrorMessages from "src/rules/standardise-error-messages";
import useNormalizedImports from "src/rules/use-normalized-imports";
import useObjectShorthand from "src/rules/use-object-shorthand";

export default {
  "consistent-test-function": consistentTestFunction,
  "has-standards": hasStandards,
  "no-isolated-tests": noIsolatedTests,
  "no-namespace-imports": noNamespaceImports,
  "no-plugin-configs-access-from-src-configs": noPluginConfigAccessFromSrcConfigs,
  "no-relative-imports": noRelativeImports,
  "no-skipped-tests": noSkippedTests,
  "standardise-error-messages": standardiseErrorMessages,
  "use-normalized-imports": useNormalizedImports,
  "use-object-shorthand": useObjectShorthand,
};
