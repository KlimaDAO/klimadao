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
        client: {
          importPath: "../client",
        },
      }),
      createSwaggerSWR({
        client: { importPath: "../client" },
        /**
         * Unfortunately we need to disable hook generation for PUT and POST calls.
         * This should be temporary until the issue can be resolved, see:
         * https://github.com/KlimaDAO/klimadao/issues/2089
         *  */
        exclude: [
          {
            type: "method",
            pattern: "post|put",
          },
        ],
      }),
    ],
  };
});
