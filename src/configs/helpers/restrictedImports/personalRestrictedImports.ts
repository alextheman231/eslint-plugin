import type { RestrictedPathImport } from "src/utility/public/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";
import { combineRestrictedImports } from "src/utility/public";

const personalRestrictedImports = combineRestrictedImports(generalRestrictedImports, {
  paths: [
    ...["fs", "node:fs"].map((name) => {
      const restrictedImport: RestrictedPathImport = {
        message: "Please use node:fs/promises instead.",
        name,
      };
      return restrictedImport;
    }),
  ],
});

export default personalRestrictedImports;
