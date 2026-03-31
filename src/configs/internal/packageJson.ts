import type { Linter } from "eslint";

import { generalPackageJson } from "src/configs/general";

const internalPackageJson: Array<Linter.Config> = [
  ...generalPackageJson,
  {
    files: ["**/package.json"],
    rules: {
      "package-json/restrict-dependency-ranges": [
        "error",
        {
          forDependencyTypes: ["dependencies", "devDependencies"],
          rangeType: "pin",
        },
      ],
    },
  },
];

export default internalPackageJson;
