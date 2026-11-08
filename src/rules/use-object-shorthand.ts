import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";
import fixOnCondition from "src/utility/public/fixOnCondition";

const useObjectShorthandOptionsSchema = z
  .object({
    fixable: z.boolean(),
  })
  .partial();
export type UseObjectShorthandOptions = z.infer<typeof useObjectShorthandOptionsSchema>;
export function parseUseObjectShorthandOptions(data: unknown): UseObjectShorthandOptions {
  return useObjectShorthandOptionsSchema.parse(data);
}

const useObjectShorthand = createRule({
  name: "use-object-shorthand",
  meta: {
    docs: {
      description:
        'Encourage the use of object shorthand (e.g. const property = "Hello"; const object = { property });',
    },
    messages: {
      useShorthand: "{ {{source}} } is not allowed. Please use the object shorthand.",
    },
    type: "suggestion",
    fixable: "code",
    schema: createRuleSchemaFromZodSchema(useObjectShorthandOptionsSchema),
    defaultOptions: [{ fixable: true }],
  },
  create(context) {
    const { fixable = true } = parseUseObjectShorthandOptions(
      context.options[0] ?? { fixable: true },
    );
    return {
      Property(node) {
        if (
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.value.type === AST_NODE_TYPES.Identifier &&
          node.key.name === node.value.name &&
          !node.shorthand
        ) {
          context.report({
            node,
            messageId: "useShorthand",
            data: {
              source: context.sourceCode.getText(node),
            },
            fix: fixOnCondition(fixable, (fixer) => {
              const key = node.key as TSESTree.Identifier;
              return fixer.replaceTextRange([node.range[0], node.range[1]], key.name);
            }),
          });
        }
      },
    };
  },
});

export default useObjectShorthand;
