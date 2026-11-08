import z from "zod";

import createRule from "src/rules/helpers/createRule";
import createRuleSchemaFromZodSchema from "src/utility/public/createRuleSchemaFromZodSchema";

const noRelativeImportsOptionsSchema = z
  .object({
    depth: z.int().nonnegative(),
  })
  .partial();
export type NoRelativeImportsOptions = z.infer<typeof noRelativeImportsOptionsSchema>;
export function parseNoRelativeImportsOptions(data: unknown): NoRelativeImportsOptions {
  return noRelativeImportsOptionsSchema.parse(data);
}

const schema = createRuleSchemaFromZodSchema(noRelativeImportsOptionsSchema);

const noRelativeImports = createRule({
  name: "no-relative-imports",
  meta: {
    docs: { description: "Forbid the use of relative imports" },
    messages: {
      strictNoRelative: 'Relative import from "{{source}}" is not allowed.',
      rootOnly: 'Relative import from "{{source}}" is not allowed to leave the current folder.',
      exceededAllowedDepth:
        'Relative import from "{{source}}" is not allowed. Relative imports must be no more than {{depth}} level{{s}} deep.',
      stupidPath:
        "For the love of God, please do not mix relative path parts in your import statements like that! How can you possibly be ok with {{source}}?!",
    },
    type: "suggestion",
    schema,
    defaultOptions: [{ depth: undefined }],
  },
  create(context) {
    const { depth = undefined } = parseNoRelativeImportsOptions(context.options[0] ?? {});

    return {
      ImportDeclaration(node) {
        if (node.source.value.includes("./") || node.source.value.includes("../")) {
          if (depth === undefined) {
            return context.report({
              node,
              messageId: "strictNoRelative",
              data: {
                source: node.source.value,
              },
            });
          }

          const importPathParts = node.source.value.split("/");
          // If the path includes both ./ and ../, it's a stupid path and the user deserves to be mocked for trying to do this
          if (importPathParts.includes(".") && importPathParts.includes("..")) {
            return context.report({
              node,
              messageId: "stupidPath",
              data: {
                source: node.source.value,
              },
            });
          }

          // If the path includes ./ but doesn't start with ./ (and likewise for ../), it's also a stupid path that the user deserves to be mocked for
          if (
            (importPathParts.includes(".") && importPathParts[0] !== ".") ||
            (importPathParts.includes("..") && importPathParts[0] !== "..")
          ) {
            return context.report({
              node,
              messageId: "stupidPath",
              data: {
                source: node.source.value,
              },
            });
          }

          // Depth checks

          if (depth === 0 && importPathParts[0] === ".") {
            return;
          }

          let endOfRelativePathFound = false;
          for (const part of importPathParts.slice(0, depth + 1)) {
            if (part !== "..") {
              endOfRelativePathFound = true;
              break;
            }
          }

          if (!endOfRelativePathFound) {
            if (depth === 0) {
              return context.report({
                node,
                messageId: "rootOnly",
                data: {
                  source: node.source.value,
                },
              });
            }
            return context.report({
              node,
              messageId: "exceededAllowedDepth",
              data: {
                source: node.source.value,
                depth,
                s: depth !== 1 ? "s" : "",
              },
            });
          }
        }
      },
    };
  },
});

export default noRelativeImports;
