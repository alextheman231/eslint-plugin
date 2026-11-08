import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";
import fixOnCondition from "src/utility/public/fixOnCondition";
import getImportSpecifiersAfterRemoving from "src/utility/public/getImportSpecifiersAfterRemoving";

const validTestFunctionsSchema = z.enum(["test", "it"]);
export type TestFunction = z.infer<typeof validTestFunctionsSchema>;
export function parseTestFunction(data: unknown): TestFunction {
  return validTestFunctionsSchema.parse(data);
}

const consistentTestFunctionOptionsSchema = z
  .object({
    preference: validTestFunctionsSchema,
    fixable: z.boolean(),
  })
  .partial();

export type ConsistentTestFunctionOptions = z.infer<typeof consistentTestFunctionOptionsSchema>;
export function parseConsistentTestFunctionOptions(data: unknown): ConsistentTestFunctionOptions {
  return consistentTestFunctionOptionsSchema.parse(data);
}

const defaultOptions: ConsistentTestFunctionOptions = { preference: "test", fixable: true };

const consistentTestFunction = createRule({
  name: "consistent-test-function",
  meta: {
    docs: {
      description: "Enforce a consistent function (either `test` or `it`)",
    },
    messages: {
      message: "Unexpected {{source}}. Please use {{preference}} instead.",
    },
    type: "suggestion",
    fixable: "code",
    schema: createRuleSchemaFromZodSchema(consistentTestFunctionOptionsSchema),
    defaultOptions: [defaultOptions],
  },
  create(context) {
    const { preference = "test", fixable = true } = parseConsistentTestFunctionOptions(
      context.options[0] ?? {},
    );

    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "it" &&
          preference === "test"
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: (node.callee as TSESTree.Identifier).name,
              preference,
            },
            fix: fixOnCondition(fixable, (fixer) => {
              return fixer.replaceText(node.callee, "test");
            }),
          });
        }

        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "test" &&
          preference === "it"
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: (node.callee as TSESTree.Identifier).name,
              preference,
            },
            fix: fixOnCondition(fixable, (fixer) => {
              return fixer.replaceText(node.callee, "it");
            }),
          });
        }
      },

      ImportDeclaration(node) {
        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === "it" &&
            preference === "test"
          ) {
            return context.report({
              node,
              messageId: "message",
              data: {
                source: specifier.imported.name,
                preference,
              },
              fix: fixOnCondition(fixable, (fixer) => {
                const importedNames = node.specifiers.map((specifier) => {
                  return specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                    specifier.imported.type === AST_NODE_TYPES.Identifier
                    ? specifier.imported.name
                    : "";
                });

                if (importedNames.includes("it") && importedNames.includes("test")) {
                  const newSpecifiers = getImportSpecifiersAfterRemoving(
                    context,
                    node.specifiers,
                    "it",
                  );
                  return fixer.replaceTextRange(
                    [
                      node.specifiers[0].range[0],
                      node.specifiers[node.specifiers.length - 1].range[1],
                    ],
                    newSpecifiers,
                  );
                }
                return fixer.replaceTextRange(
                  [specifier.imported.range[0], specifier.imported.range[1]],
                  preference,
                );
              }),
            });
          }

          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === "test" &&
            preference === "it"
          ) {
            return context.report({
              node,
              messageId: "message",
              data: {
                source: specifier.imported.name,
                preference,
              },
              fix: fixOnCondition(fixable, (fixer) => {
                const importedNames = node.specifiers.map((specifier) => {
                  return specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                    specifier.imported.type === AST_NODE_TYPES.Identifier
                    ? specifier.imported.name
                    : "";
                });

                if (importedNames.includes("it") && importedNames.includes("test")) {
                  const newSpecifiers = getImportSpecifiersAfterRemoving(
                    context,
                    node.specifiers,
                    "test",
                  );
                  return fixer.replaceTextRange(
                    [
                      node.specifiers[0].range[0],
                      node.specifiers[node.specifiers.length - 1].range[1],
                    ],
                    newSpecifiers,
                  );
                }
                return fixer.replaceTextRange(
                  [specifier.imported.range[0], specifier.imported.range[1]],
                  preference,
                );
              }),
            });
          }
        }
      },
    };
  },
});

export default consistentTestFunction;
