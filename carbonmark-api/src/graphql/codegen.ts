import type { CodegenConfig } from "@graphql-codegen/cli";
import { GRAPH_URLS } from "../constants/graphs.constants";

const GENERATED_DIR = "src/.generated/types";
const GENERATED_MOCKS_DIR = "src/.generated/mocks";
const DOCUMENTS_DIR = "src/graphql";

const plugins = [
  "typescript",
  "typescript-operations",
  "typescript-graphql-request",
];

const schema = GRAPH_URLS;

// Generate configuration for each schema entry
const generates = Object.entries(schema).reduce<CodegenConfig["generates"]>(
  (acc, [key, schema]) => ({
    ...acc,
    [`${GENERATED_DIR}/${key}.types.ts`]: {
      schema,
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      plugins,
    },
    [`${GENERATED_MOCKS_DIR}/${key}.mocks.ts`]: {
      schema,
      plugins: [
        {
          "typescript-mock-data": {
            typesFile: `${GENERATED_DIR}/${key}.types.ts`,
            typeNames: "change-case-all#pascalCase",
            transformUnderscore: false,
          },
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
    // skipTypename: true,
  },
};

export default config;
