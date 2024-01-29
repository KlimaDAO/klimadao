import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import { merge } from "lodash";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";
// eslint-disable-next-line @typescript-eslint/no-var-requires -- ugh

const PLUGINS = ["typescript-operations", "typescript-graphql-request"];

const tsConfig: TypeScriptPluginConfig = {
  namingConvention: { enumValues: "keep" },
};

const schemas = merge(GRAPH_URLS["polygon"], SANITY_URLS);

const GENERATED_DIR = `src/.generated/types`;
const GENERATED_MOCKS_DIR = `src/.generated/mocks`;
const DOCUMENTS_DIR = `src/graphql`;

// Generate configuration for each schema entry
const generates = Object.entries(schemas).reduce(
  (acc, [key, schema]) => ({
    ...acc,
    [`${GENERATED_DIR}/${key}.types.ts`]: {
      schema,
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      plugins: [
        {
          typescript: tsConfig,
        },
        ...PLUGINS,
      ],
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
          "typescript-mock-data": {
            typesFile: `../types/${key}.types.ts`,
            typeNames: "change-case-all#pascalCase",
            transformUnderscore: false,
            terminateCircularRelationships: true,
            scalars: {
              BigNumber: "'100000000000000000000'",
              BigInt: "'100000000000000000000'",
            },
          },
        },
      ],
    },
  }),
  {}
);

export default {
  overwrite: true,
  generates,
  config: {
    scalars: { BigInt: "string", ID: "string" },
    avoidOptionals: true,
  },
};
