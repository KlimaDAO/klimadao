import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerClient from "@kubb/swagger-client";
import createSwaggerSWR from "@kubb/swagger-swr";
import createSwaggerTS from "@kubb/swagger-ts";

export default defineConfig(async () => {
  return {
    root: ".",
    input: {
      path: "./.generated/carbonmark-api.schema.json",
    },
    output: {
      clean: true,
      path: "./.generated/carbonmark-api-sdk",
    },
    hooks: {
      done: ["npx prettier --write ./.generated/carbonmark-api-sdk"],
    },
    plugins: [
      createSwagger({}),
      createSwaggerTS({}),
      createSwaggerClient({
        client: "./lib/api/client.ts",
      }),
      createSwaggerSWR({}),
    ],
  };
});
