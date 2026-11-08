import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";

const noNamespaceImportsOptionsSchema = z
  .object({
    allow: z.array(z.string()),
  })
  .partial();
export type NoNamespaceImportsOptions = z.infer<typeof noNamespaceImportsOptionsSchema>;
export function parseNoNamespaceImportsOptions(data: unknown): NoNamespaceImportsOptions {
  return noNamespaceImportsOptionsSchema.parse(data);
}

const schema = createRuleSchemaFromZodSchema(noNamespaceImportsOptionsSchema);

const noNamespaceImports = createRule({
  name: "no-namespace-imports",
  meta: {
    docs: {
      description: "Forbid the use of import *",
    },
    messages: {
      message: 'Import * from "{{source}}" is not allowed. Please use named imports instead.',
    },
    type: "suggestion",
    schema,
    defaultOptions: [{ allow: [""] }],
  },
  create(context) {
    const { allow } = parseNoNamespaceImportsOptions(context.options[0] ?? { allow: [] });
    return {
      ImportDeclaration(node) {
        const allSpecifiers = node.specifiers;
        for (const specifier of allSpecifiers) {
          if (
            specifier.type === "ImportNamespaceSpecifier" &&
            !allow?.includes(node.source.value)
          ) {
            context.report({
              node,
              messageId: "message",
              data: {
                source: node.source.value,
              },
            });
            return;
          }
        }
      },
    };
  },
});

export default noNamespaceImports;
