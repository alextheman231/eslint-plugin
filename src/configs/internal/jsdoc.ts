import type { Linter } from "eslint";

import jsdoc from "eslint-plugin-jsdoc";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";

const internalJsdoc: Linter.Config[] = [
  jsdoc.configs["flat/recommended-typescript-error"],
  {
    rules: {
      "jsdoc/check-tag-names": ["error", { definedTags: ["category", "note"] }],
      "jsdoc/require-jsdoc": ["warn", requireJsdocOptions],
      "jsdoc/require-tags": [
        "error",
        {
          tags: ["ExportNamedDeclaration", "ExportDefaultDeclaration"].map((context) => {
            return {
              context,
              tag: "category",
            };
          }),
        },
      ],
      "jsdoc/sort-tags": [
        "error",
        {
          tagSequence: [
            { tags: ["category"] },
            { tags: ["deprecated"] },
            { tags: ["template"] },
            { tags: ["param"] },
            { tags: ["throws"] },
            { tags: ["returns"] },
            { tags: ["example"] },
          ],
        },
      ],
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
    },
  },
];

export default internalJsdoc;
