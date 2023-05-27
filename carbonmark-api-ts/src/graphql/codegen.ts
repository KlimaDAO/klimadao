import type { CodegenConfig } from "@graphql-codegen/cli";

const GENERATED_DIR = ".generated/types";
const plugins = [
  "typescript",
  "typescript-operations",
  "typescript-generic-sdk",
];

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    [`${GENERATED_DIR}/marketplace.types.ts`]: {
      schema: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new",
      documents: "src/graphql/marketplace.gql",
      plugins,
    },

    [`${GENERATED_DIR}/offsets.types.ts`]: {
      schema:
        "https://api.thegraph.com/subgraphs/name/klimadao/polygon-bridged-carbon",
      documents: "src/graphql/offsets.gql",
      plugins,
    },
    [`${GENERATED_DIR}/assets.types.ts`]: {
      schema:
        "https://api.thegraph.com/subgraphs/name/cujowolf/polygon-carbon-holdings-mumbai",
      documents: "src/graphql/assets.gql",
      plugins,
    },
    [`${GENERATED_DIR}/tokens.types.ts`]: {
      schema: "https://api.thegraph.com/subgraphs/name/klimadao/klimadao-pairs",
      documents: "src/graphql/tokens.gql",
      plugins,
    },
  },
};

export default config;
