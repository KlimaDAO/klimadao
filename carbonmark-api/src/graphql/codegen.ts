import { GRAPH_URLS } from "../constants/graphs.constants";

const GENERATED_DIR = "src/.generated";
const DOCUMENTS_DIR = "src/graphql";

const schema = GRAPH_URLS;

// Generate configuration for each schema entry
const generates = Object.entries(schema).reduce(
  (acc, [key, schema]) => ({
    ...acc,
    // ----- Types and Operations ----- //
    [`${GENERATED_DIR}/types/${key}.types.ts`]: {
      schema,
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      config: {
        scalars: { BigInt: "string", ID: "string", String: "string" },
      },
      plugins: ["typescript", "typescript-operations"],
    },
    // ----- SDK ----- //
    [`${GENERATED_DIR}/sdk/${key}.sdk.ts`]: {
      schema,
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      plugins: [
        {
          add: {
            content: `import * as Types from "../types/${key}.types"`,
          },
        },
        {
          "typescript-graphql-request": {
            typesPrefix: "Types.",
          },
        },
      ],
    },
    // ----- Mocks ----- //
    [`${GENERATED_DIR}/mocks/${key}.mocks.ts`]: {
      schema,
      plugins: [
        {
          add: {
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
    // ----- Validation Schema ---- //
    [`${GENERATED_DIR}/schema/${key}.schema.ts`]: {
      schema,
      plugins: ["typescript-validation-schema"],
      config: {
        importFrom: `../types/${key}.types`,
      },
    },
  }),
  {}
);

const config = {
  generates,
  overwrite: true,
  config: {
    schema: "zod",
    scalars: { BigInt: "string", ID: "string", String: "string" },
  },
};

export default config;
