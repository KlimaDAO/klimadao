import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerClient from "@kubb/swagger-client";
import createSwaggerSWR from "@kubb/swagger-swr";
import createSwaggerTS from "@kubb/swagger-ts";

/**
 * This is the configuration file for Kubb.
 * It uses several plugins to generate the API SDK.
 * - createSwagger: Generates the Swagger documentation.
 * - createSwaggerTS: Generates TypeScript definitions.
 * - createSwaggerClient: Generates the API client.
 * - createSwaggerSWR: Generates SWR hooks for the API client.
 */
export default defineConfig(async () => {
  return {
    root: ".",
    input: {
      path: "./carbonmark-api.schema.json",
    },
    output: {
      clean: true,
      path: "./package",
    },
    hooks: {
      done: ["npx prettier --write ./package"],
    },
    plugins: [
      createSwagger({}),
      createSwaggerTS({}),
      createSwaggerClient({ client: "./client.ts" }),
      createSwaggerSWR({ client: "./client.ts", output: "swr" }),
    ],
  };
});
