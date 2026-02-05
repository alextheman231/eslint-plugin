import type { NoRestrictedImportsOptions } from "src/utility/public/NoRestrictedImportsOptions";

import personalRestrictedImports from "src/configs/helpers/restrictedImports/personalRestrictedImports";
import { combineRestrictedImports } from "src/utility/public";

const neurosongsBackEndRestrictedImports: NoRestrictedImportsOptions = combineRestrictedImports(
  personalRestrictedImports,
  {
    paths: [
      {
        importNames: ["setPrismaClient"],
        message: "Do not attempt to reset the Prisma Client outside setup files.",
        name: "src/database/client",
      },
      {
        message:
          "Do not use the generated Prisma types. Use the types exported from @neurosongs/types instead.",
        name: "@neurosongs/prisma-client/types",
      },
      {
        importNames: ["PrismaClient"],
        message: "Please use the PrismaClient from @neurosongs/types instead.",
        name: "@neurosongs/prisma-client/prisma",
      },
    ],
  },
);

export default neurosongsBackEndRestrictedImports;
