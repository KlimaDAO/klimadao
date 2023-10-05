import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerSWR from "@kubb/swagger-swr";
import createSwaggerTS from "@kubb/swagger-ts";

export default defineConfig(async () => {
  return {
    root: ".",
    clean: true,
    input: {
      path: "./.generated/carbonmark-api.schema.json",
    },
    output: {
      path: "./.generated/carbonmark-api-sdk",
    },
    hooks: {
      done: ["npx prettier --write ./.generated/carbonmark-api-sdk"],
    },
    plugins: [createSwagger({}), createSwaggerTS({}), createSwaggerSWR({})],
  };
});
