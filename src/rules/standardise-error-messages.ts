import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";

const standardiseErrorMessagesOptionsSchema = z
  .object({
    regex: z.string(),
  })
  .partial();
export type StandardiseErrorMessagesOptions = z.infer<typeof standardiseErrorMessagesOptionsSchema>;
export function parseStandardiseErrorMessagesOptions(
  data: unknown,
): StandardiseErrorMessagesOptions {
  return standardiseErrorMessagesOptionsSchema.parse(data);
}

const schema = createRuleSchemaFromZodSchema(standardiseErrorMessagesOptionsSchema);

const defaultErrorRegex = "^[A-Z]+(?:_[A-Z]+)*$";
function checkCurrentNode(
  context: Readonly<
    RuleContext<
      "message",
      Array<{
        regex: string;
      }>
    >
  >,
  node: TSESTree.CallExpression | TSESTree.NewExpression,
) {
  const { regex: errorRegex = defaultErrorRegex } = parseStandardiseErrorMessagesOptions(
    context.options[0] ?? { regex: defaultErrorRegex },
  );
  if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === "Error") {
    const [errorArgument] = node.arguments;
    const errorMessage = errorArgument.type === AST_NODE_TYPES.Literal ? errorArgument.value : "";
    if (!RegExp(errorRegex).test(typeof errorMessage === "string" ? errorMessage : "")) {
      return context.report({
        node,
        messageId: "message",
        data: {
          error: errorMessage,
          regex: errorRegex,
        },
      });
    }
  }
}

const standardiseErrorMessages = createRule({
  name: "standardise-error-messages",
  meta: {
    docs: {
      description: "Enforce a consistent standard for error messages.",
    },
    messages: {
      message: "Expected error message {{error}} to match {{regex}}.",
    },
    type: "suggestion",
    schema,
    defaultOptions: [{ regex: defaultErrorRegex }],
  },
  create(context) {
    return {
      CallExpression(node) {
        return checkCurrentNode(context, node);
      },
      NewExpression(node) {
        return checkCurrentNode(context, node);
      },
    };
  },
});

export default standardiseErrorMessages;
