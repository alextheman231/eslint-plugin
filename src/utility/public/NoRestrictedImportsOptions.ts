interface RestrictedPathImportBase {
  message: string;
  name: string;
  allowTypeImports?: boolean;
}

interface RestrictedPathImportImportNames extends RestrictedPathImportBase {
  importNames: Array<string>;
  allowImportNames?: never;
}

interface RestrictedPathImportAllowImportNames extends RestrictedPathImportBase {
  allowImportNames: Array<string>;
  importNames?: never;
}

export type RestrictedPathImport =
  | RestrictedPathImportBase
  | RestrictedPathImportImportNames
  | RestrictedPathImportAllowImportNames;

interface RestrictedPatternImportBase {
  caseSensitive?: boolean;
  message: string;
  allowTypeImports?: boolean;
}

interface RestrictedPatternImportGroup extends RestrictedPatternImportBase {
  group: Array<string>;
  regex?: never;
}

interface RestrictedPatternImportRegex extends RestrictedPatternImportBase {
  regex: string;
  group?: never;
}

interface RestrictedPatternImportImportNames extends RestrictedPatternImportBase {
  importNames: Array<string>;
  allowImportNames?: never;
  importNamePattern?: never;
  allowImportNamePattern?: never;
}

interface RestrictedPatternImportAllowImportNames extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames: Array<string>;
  importNamePattern?: never;
  allowImportNamePattern?: never;
}

interface RestrictedPatternImportImportNamePattern extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames?: never;
  importNamePattern: string;
  allowImportNamePattern?: never;
}
interface RestrictedPatternImportAllowImportNamePattern extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames?: never;
  importNamePattern?: never;
  allowImportNamePattern: string;
}

export type RestrictedPatternImport =
  | RestrictedPatternImportGroup
  | RestrictedPatternImportRegex
  | RestrictedPatternImportImportNames
  | RestrictedPatternImportAllowImportNames
  | RestrictedPatternImportImportNamePattern
  | RestrictedPatternImportAllowImportNamePattern;

interface NoRestrictedImportsOptionsPathsOnly {
  paths: Array<RestrictedPathImport>;
  patterns?: never;
}

interface NoRestrictedImportsOptionsPatternsOnly {
  paths?: never;
  patterns: Array<RestrictedPatternImport>;
}

interface NoRestrictedImportsOptionsPathsAndPatterns {
  paths: Array<RestrictedPathImport>;
  patterns: Array<RestrictedPatternImport>;
}

/**
 * Options for the built-in ESLint `no-restricted-imports` rule.
 *
 *  @category Rule Options
 */
export type NoRestrictedImportsOptions =
  | NoRestrictedImportsOptionsPathsOnly
  | NoRestrictedImportsOptionsPatternsOnly
  | NoRestrictedImportsOptionsPathsAndPatterns;
