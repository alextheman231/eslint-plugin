import { normaliseIndents, parseZodSchema } from "@alextheman/utility";
import z from "zod";

import createRule from "src/rules/helpers/createRule";
import { createRuleSchemaFromZodSchema, fixOnCondition } from "src/utility/public";

const hasStandardsOptionsSchema = z
  .object({
    fixable: z.boolean(),
  })
  .partial();
export type HasStandardsOptions = z.infer<typeof hasStandardsOptionsSchema>;
export function parseHasStandardsOptions(input: unknown): HasStandardsOptions {
  return parseZodSchema(hasStandardsOptionsSchema, input);
}
const defaultOptions: HasStandardsOptions = { fixable: true };

const targetValue: string = "I have standards, you'd better have some too!";

const hasStandards = createRule({
  name: "no-isolated-tests",
  meta: {
    docs: {
      description: normaliseIndents`
        Enforces that any string literal must contain the phrase "${targetValue}"
        This is a very pointless rule in practice, but it helps with the end-to-end tests as a nice trivial rule to test entrypoints with. Please do not actually use this in practice.`,
    },
    messages: {
      message: "Set your standards and you'll do great.",
    },
    type: "suggestion",
    schema: createRuleSchemaFromZodSchema(hasStandardsOptionsSchema),
    fixable: "code",
  },
  defaultOptions: [defaultOptions],
  create(context) {
    const { fixable = false } = parseHasStandardsOptions(context.options[0] ?? {});
    return {
      Literal(node) {
        if (node.value !== targetValue) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: node,
              value: node.value,
            },
            fix: fixOnCondition(fixable, (fixer) => {
              return fixer.replaceText(node, targetValue);
            }),
          });
        }
      },
    };
  },
});

export default hasStandards;
