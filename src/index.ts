// eslint-disable-next-line no-restricted-imports -- We need to import the plugin in the entrypoint because it's the entrypoint.
import alexPlugin from "src/alexPlugin";

export * from "src/configs/external";
export * from "src/utility/public";

export type { AlexPlugin } from "src/alexPlugin";

export type * from "src/configs/AlexPluginConfigGroup";

export default alexPlugin;
