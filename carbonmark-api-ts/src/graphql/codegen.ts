import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/graphql/generated/marketplace.types.ts": {
      schema: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      documents: "src/graphql/marketplace.gql",
    },
    "src/graphql/generated/poolprices.types.ts": {
      schema: "https://api.thegraph.com/subgraphs/name/klimadao/klimadao-pairs",
      plugins: ["typescript"],
      // documents: "src/graphql/poolprices.gql",
    },
    "src/graphql/generated/offsets.types.ts": {
      schema:
        "https://api.thegraph.com/subgraphs/name/klimadao/polygon-bridged-carbon",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      documents: "src/graphql/offsets.gql",
    },
    "src/graphql/generated/assets.types.ts": {
      schema:
        "https://api.thegraph.com/subgraphs/name/cujowolf/polygon-carbon-holdings-mumbai",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      documents: "src/graphql/assets.gql",
    },
  },
};

export default config;
