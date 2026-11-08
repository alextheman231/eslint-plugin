import type { TSESTree } from "@typescript-eslint/utils";

import createRule from "src/rules/helpers/createRule";
import checkCallExpression from "src/utility/public/checkCallExpression";

const noSkippedTests = createRule({
  name: "no-skipped-tests",
  meta: {
    docs: {
      description: "Forbid the use of describe.skip() and test.skip()",
    },
    messages: {
      message: "Unexpected skipped {{source}}.",
    },
    type: "suggestion",
    schema: [],
    defaultOptions: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          checkCallExpression(node, "describe", "skip") ||
          checkCallExpression(node, "test", "skip") ||
          checkCallExpression(node, "it", "skip")
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: ((node.callee as TSESTree.MemberExpression).object as TSESTree.Identifier)
                .name,
            },
          });
        }
      },
    };
  },
});

export default noSkippedTests;
