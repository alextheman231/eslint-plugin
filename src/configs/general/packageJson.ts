import type { Linter } from "eslint";

import packageJson from "eslint-plugin-package-json";

const generalPackageJson: Array<Linter.Config> = [
  packageJson.configs.recommended,
  {
    plugins: {
      "package-json": packageJson,
    },
    rules: {
      "package-json/scripts-name-casing": "error",
    },
  },
];

export default generalPackageJson;
