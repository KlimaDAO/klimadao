import { generate } from "@graphql-codegen/cli";
import { merge } from "lodash";
import { NetworkParam } from "src/models/NetworkParam.model";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";
// eslint-disable-next-line @typescript-eslint/no-var-requires -- ugh
const inquirer = require("inquirer");

const PLUGINS = [
  "typescript",
  "typescript-operations",
  "typescript-graphql-request",
];
const questions = [
  {
    type: "list",
    name: "network",
    message: "Select a network",
    choices: ["polygon", "mumbai"],
    default: "polygon",
  },
];

async function main() {
  const { network } = await inquirer.prompt(questions);

  const schemas = merge(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typescript gymnastics
    GRAPH_URLS[network as NetworkParam],
    SANITY_URLS
  );

  const GENERATED_DIR = `src/.generated/${network}/types`;
  const GENERATED_MOCKS_DIR = `src/.generated/${network}/mocks`;
  const DOCUMENTS_DIR = `src/graphql/${network}`;

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
  // Generate the code
  await generate(config, true);
}

main();
