import personalRestrictedImports from "src/configs/helpers/restrictedImports/personalRestrictedImports";
import reactRestrictedImports from "src/configs/helpers/restrictedImports/reactRestrictedImports";
import { combineRestrictedImports } from "src/utility/public";

const neurosongsFrontEndRestrictedImports = combineRestrictedImports(
  personalRestrictedImports,
  reactRestrictedImports,
  {
    paths: [
      {
        importNames: ["PrismaClient"],
        message:
          "Do not use the Prisma Client directly in the front-end. Query an endpoint from the back-end instead.",
        name: "@neurosongs/types",
      },
      ...["LoaderProvider", "Loader"].map((importName) => {
        return {
          importNames: [importName],
          message: `Use the internal ${importName} from src/components/${importName} instead.`,
          name: "@alextheman/components",
        };
      }),
    ],
    patterns: [
      {
        group: ["@neurosongs/prisma-client"],
        message:
          "Do not use the Prisma Client directly in the front-end. Query an endpoint from the back-end instead.",
      },
    ],
  },
);

export default neurosongsFrontEndRestrictedImports;
