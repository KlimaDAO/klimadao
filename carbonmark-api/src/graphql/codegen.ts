import { merge } from "lodash";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";

const GENERATED_DIR = "src/.generated/types";
const GENERATED_MOCKS_DIR = "src/.generated/mocks";
const DOCUMENTS_DIR = "src/graphql";

const PLUGINS = [
  "typescript",
  "typescript-operations",
  "typescript-graphql-request",
];

//Only generate types and mocks from polygon schema. @todo confirm that the testnet schemas do not diverge.
const schemas = merge(GRAPH_URLS["polygon"], SANITY_URLS);

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
      plugins: PLUGINS,
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
          },
        },
      ],
    },
  }),
  {}
);

const config = {
  overwrite: true,
  generates,
  config: {
    scalars: { BigInt: "string", ID: "string" },
    avoidOptionals: true,
  },
};

export default config;
