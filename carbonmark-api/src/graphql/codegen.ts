import { merge } from "lodash";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";

const schemas = merge(GRAPH_URLS["polygon"], SANITY_URLS);

const GENERATED_DIR = `src/.generated/types`;
const GENERATED_MOCKS_DIR = `src/.generated/mocks`;
const DOCUMENTS_DIR = `src/graphql`;

const ts_mock_plugin = (key: string) => ({
  typesFile: `../types/${key}.types.ts`,
  typeNames: "change-case-all#pascalCase",
  transformUnderscore: false,
  terminateCircularRelationships: true,
  scalars: {
    BigNumber: "'100000000000000000000'",
    BigInt: "'100000000000000000000'",
  },
});

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
        { typescript: {} },
        { "typescript-operations": {} },
        { "typescript-graphql-request": {} },
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
          "typescript-mock-data": ts_mock_plugin(key),
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
