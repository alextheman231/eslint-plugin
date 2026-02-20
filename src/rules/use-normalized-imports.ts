import { normalizeImportPath } from "@alextheman/utility/node";
import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";
import fixOnCondition from "src/utility/public/fixOnCondition";

const useNormalizedImportsOptionsSchema = z
  .object({
    fixable: z.boolean(),
  })
  .partial();
export type UseNormalizedImportsOptions = z.infer<typeof useNormalizedImportsOptionsSchema>;
export function parseUseNormalizedImportsOptions(data: unknown) {
  return useNormalizedImportsOptionsSchema.parse(data);
}

const schema = createRuleSchemaFromZodSchema(useNormalizedImportsOptionsSchema);

const useNormalizedImports = createRule({
  name: "use-normalized-imports",
  meta: {
    docs: {
      description:
        "Enforce the usage of normalized imports (i.e. import paths that you would only get from path.posix.normalize())",
    },
    messages: {
      pathNotNormalized:
        "Import path {{nonNormalized}} is not normalised. Please use {{normalized}} instead.",
    },
    type: "suggestion",
    schema,
    fixable: "code",
  },
  defaultOptions: [{ fixable: true }],
  create(context) {
    const { fixable = true } = parseUseNormalizedImportsOptions(
      context.options[0] ?? { fixable: true },
    );
    return {
      ImportDeclaration(node) {
        const normalizedPath = normalizeImportPath(node.source.value);

        if (node.source.value !== normalizedPath) {
          return context.report({
            node,
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: node.source.value,
              normalized: normalizedPath,
            },
            fix: fixOnCondition(fixable, (fixer) => {
              const [quote] = node.source.raw;
              return fixer.replaceText(node.source, `${quote}${normalizedPath}${quote}`);
            }),
          });
        }
      },
    };
  },
});

export default useNormalizedImports;
