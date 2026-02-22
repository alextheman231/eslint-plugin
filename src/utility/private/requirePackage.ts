import { DataError } from "@alextheman/utility";

function requirePackage<PackageType>(
  requiredPackage: string,
  configName: string = "[UNKNOWN]",
): PackageType {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(requiredPackage) as PackageType;
  } catch {
    throw new DataError(
      {
        configName,
        requiredPackage,
      },
      "REQUIRED_MISSING_PACKAGE",
      `@alextheman/eslint-plugin: Config "${configName}" requires "${requiredPackage}". Install it as a devDependency to use this config.`,
    );
  }
}

export default requirePackage;
