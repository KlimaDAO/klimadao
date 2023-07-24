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
const generates = Object.entries(schema).reduce(
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
            dynamicValues: true,
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
    // skipTypename: true,
  },
};

export default config;
