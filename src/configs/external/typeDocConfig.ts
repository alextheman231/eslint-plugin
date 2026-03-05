import type { TypeDocOptions } from "typedoc";
import type { PluginOptions } from "typedoc-plugin-markdown";

function typeDocConfig(
  entryPoints: Array<string> = ["./src/index.ts"],
): TypeDocOptions & PluginOptions {
  return {
    disableSources: true,
    entryPoints,
    excludeNotDocumented: true,
    includeVersion: true,
    outputs: [
      {
        name: "html",
        options: {
          navigation: {
            excludeReferences: false,
            includeCategories: true,
            includeFolders: true,
            includeGroups: true,
          },
        },
        path: "docs/features/html",
      },
      {
        name: "markdown",
        path: "docs/features/markdown",
      },
    ],
    plugin: ["typedoc-plugin-markdown", "typedoc-rhineai-theme"],
  };
}

export default typeDocConfig;
