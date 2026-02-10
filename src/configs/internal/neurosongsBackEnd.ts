import type { Linter } from "eslint";

import nodePlugin from "eslint-plugin-n";

import neurosongsBackEndRestrictedImports from "src/configs/helpers/restrictedImports/neurosongsBackEndRestrictedImports";

const internalNeurosongsBackEnd: Linter.Config[] = [
  {
    name: "@alextheman/internal/neurosongs-back-end",
    plugins: {
      n: nodePlugin,
    },
    rules: {
      // This was giving false positives due to some packages existing at root-level package.json but not being defined in the app-level package.json, hence it is being disabled in Neurosongs.
      "n/no-extraneous-import": "off",
      "no-restricted-imports": ["error", neurosongsBackEndRestrictedImports],
    },
  },
  {
    files: ["src/database/**/*.ts", "tests/test-utilities/setup.ts"],
    rules: {
      // Setup files should be able to set the PrismaClient and use the regular PrismaClient from @neurosongs/prisma-client/prisma.
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["src/server/routers/errors.ts", "src/server/validators/**/*.ts"],
    rules: {
      /* Function declarations in these files need to be arrow functions so we can type the whole signature
      using the Express types. */
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
    },
  },
];

export default internalNeurosongsBackEnd;
