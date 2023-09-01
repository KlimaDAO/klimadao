import { merge } from "lodash";
import { GRAPH_URLS, SANITY_URLS } from "./codegen.constants";

const GENERATED_DIR = "src/.generated/types";
const GENERATED_MOCKS_DIR = "src/.generated/mocks";
const DOCUMENTS_DIR = "src/graphql";

const plugins = [
  "typescript",
  "typescript-operations",
  "typescript-graphql-request",
];

const schemas = merge(GRAPH_URLS, SANITY_URLS);

//FIelds for which the returned value should be a positive integer
const positive_integer_fields = [
  "singleUnitPrice",
  "price",
  "previousPrice",
  "amount",
  "previousAmount",
];
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
      plugins,
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
            fieldGeneration: {
              _all: positive_integer_fields.reduce(
                (obj, field) => ({
                  ...obj,
                  [field]: {
                    generator: "integer",
                    arguments: [0, 100],
                  },
                }),
                {}
              ),
            },
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
  },
};

export default config;
