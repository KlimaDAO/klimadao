import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/graphql/generated/marketplace.types.ts": {
      schema: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new",
      plugins: ["typescript", "typescript-operations"],
    },
    "src/graphql/generated/poolprices.types.ts": {
      schema: "https://api.thegraph.com/subgraphs/name/klimadao/klimadao-pairs",
      plugins: ["typescript"],
    },
  },
};

export default config;
