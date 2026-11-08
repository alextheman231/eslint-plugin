import createRule from "src/rules/helpers/createRule";

const noPluginConfigAccessFromSrcConfigs = createRule({
  name: "no-plugin-configs-access-from-src-configs",
  meta: {
    docs: {
      description: "Forbid access of plugin.configs in src/configs",
    },
    messages: {
      message:
        "Do not access `plugin.configs` from a file in `src/configs`. Please import the corresponding config creator from `src/configs` instead and pass the plugin to that instead.",
    },
    type: "problem",
    schema: [],
    defaultOptions: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (context.filename.includes("src/configs")) {
          if (
            node.object.type === "Identifier" &&
            node.object?.name === "plugin" &&
            ((node.property.type === "Identifier" && node.property?.name === "configs") ||
              (node.property.type === "Literal" && node.property?.value === "configs"))
          ) {
            context.report({
              node,
              messageId: "message",
              data: {
                source: node.object,
              },
            });
          }
        }
      },
    };
  },
});

export default noPluginConfigAccessFromSrcConfigs;
