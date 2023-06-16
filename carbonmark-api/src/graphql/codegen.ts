import type { CodegenConfig } from "@graphql-codegen/cli";

const GENERATED_DIR = ".generated/types";
const DOCUMENTS_DIR = "src/graphql";
const GRAPH_API_ROOT = "https://api.thegraph.com/subgraphs/name";

const plugins = [
  "typescript",
  "typescript-operations",
  "typescript-graphql-request",
];

const schema = {
  marketplace: `${GRAPH_API_ROOT}/najada/marketplace-new`,
  tokens: `${GRAPH_API_ROOT}/klimadao/klimadao-pairs`,
  assets: `${GRAPH_API_ROOT}/cujowolf/polygon-carbon-holdings-mumbai`,
  offsets: `${GRAPH_API_ROOT}/klimadao/polygon-bridged-carbon`,
};

// Generate configuration for each schema entry
const generates = Object.entries(schema).reduce<CodegenConfig["generates"]>(
  (acc, [key, schema]) => ({
    ...acc,
    [`${GENERATED_DIR}/${key}.types.ts`]: {
      schema,
      documents: `${DOCUMENTS_DIR}/${key}.gql`,
      plugins,
    },
  }),
  {}
);

const config: CodegenConfig = {
  overwrite: true,
  generates,
  config: {
    scalars: { BigInt: "string", ID: "string" },
    skipTypename: true,
  },
};

export default config;
