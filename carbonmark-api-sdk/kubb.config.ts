import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerClient from "@kubb/swagger-client";
import createSwaggerSWR from "@kubb/swagger-swr";
import createSwaggerTS from "@kubb/swagger-ts";

export default defineConfig(async () => {
  return {
    root: ".",
    input: {
      path: "./carbonmark-api.schema.json",
    },
    output: {
      clean: true,
      path: "./sdk",
    },
    hooks: {
      done: ["npx prettier --write ./sdk"],
    },
    plugins: [
      createSwagger({}),
      createSwaggerTS({}),
      createSwaggerClient({ client: "./client.ts" }),
      createSwaggerSWR({ client: "./client.ts" }),
    ],
  };
});
