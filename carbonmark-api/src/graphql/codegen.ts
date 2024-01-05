import type { CodegenConfig } from "@graphql-codegen/cli";
import { TypescriptMocksPluginConfig } from "graphql-codegen-typescript-mock-data";
import { merge, upperFirst } from "lodash";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";

const schemas = merge(GRAPH_URLS["polygon"], SANITY_URLS);

const GENERATED_DIR = `src/.generated/types`;
const GENERATED_MOCKS_DIR = `src/.generated/mocks`;
const DOCUMENTS_DIR = `src/graphql`;

const typescript_mock_data_config = (
  key: string
): TypescriptMocksPluginConfig => ({
  typesFile: `../types/${key}.types.ts`,
  typeNames: "change-case-all#pascalCase",
  transformUnderscore: false,
  terminateCircularRelationships: true,
  typesPrefix: `${upperFirst(key)}`,
  prefix: `a${upperFirst(key)}`,
  scalars: {
    BigNumber: "'100000000000000000000'",
    BigInt: "'100000000000000000000'",
  },
  fieldGeneration: {
    MarketplaceProject: {
      id: "'VCS-191-2008'",
      registry: "'VCS'",
      vintage: "'2008'",
      key: "'VCS-191'",
    },
  },
});

// Generate configuration for each schema entry
const generates: CodegenConfig["generates"] = Object.entries(schemas).reduce(
  (acc, [key, schema]) => ({
    ...acc,
    [`${GENERATED_DIR}/${key}.types.ts`]: {
      schema,
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        typesPrefix: `${upperFirst(key)}`,
      },
    },
    [`${GENERATED_MOCKS_DIR}/${key}.mocks.ts`]: {
      schema,
      plugins: [
        {
          add: {
            //We need to disable ts for generated mocks
            content: "//@ts-nocheck",
          },
        },
        {
          "typescript-mock-data": typescript_mock_data_config(key),
        },
      ],
    },
  }),
  {}
);

const config: CodegenConfig = {
  overwrite: true,
  generates,
  config: {
    scalars: { BigInt: "string", ID: "string" },
    avoidOptionals: true,
  },
};

export default config;
