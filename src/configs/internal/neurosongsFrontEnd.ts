import type { Linter } from "eslint";

import nodePlugin from "eslint-plugin-n";

import neurosongsFrontEndRestrictedImports from "src/configs/helpers/restrictedImports/neurosongsFrontEndRestrictedImports";

const internalNeurosongsFrontEnd: Linter.Config[] = [
  {
    name: "@alextheman/internal/neurosongs-front-end",
    plugins: {
      n: nodePlugin,
    },
    rules: {
      // This was giving false positives due to some packages existing at root-level package.json but not being defined in the app-level package.json, hence it is being disabled in Neurosongs.
      "n/no-extraneous-import": "off",
      "no-restricted-imports": ["error", neurosongsFrontEndRestrictedImports],
    },
  },
];

export default internalNeurosongsFrontEnd;
