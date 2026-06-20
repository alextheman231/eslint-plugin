import type { RuleTester, RuleTesterInitOptions } from "eslint-vitest-rule-tester";

// eslint-disable-next-line no-restricted-imports -- We need to import the regular rule tester here so that the rest of the code can use our custom one.
import { createRuleTester as createVitestRuleTester } from "eslint-vitest-rule-tester";

function createRuleTester<RuleOptions = any, MessageId extends string = string>(
  options: RuleTesterInitOptions,
): RuleTester<RuleOptions, MessageId> {
  const { languageOptions } = options;
  return createVitestRuleTester<RuleOptions, MessageId>({
    languageOptions: {
      ecmaVersion: "latest",
      ...languageOptions,
    },
    ...options,
  });
}

export default createRuleTester;
