const config = {
  "carbonmark-api": {
    input: "./.generated/carbonmark-api.schema.json",
    output: {
      client: "swr",
      mode: "split",
      target: "./.generated/carbonmark-api.sdk.ts",
    },
    override: {
      mutator: {
        path: "./lib/api/custom.mutator.ts",
        name: "customMutator",
      },
    },
  },
};
export default config;
