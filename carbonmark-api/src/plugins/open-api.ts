import fp from "fastify-plugin";
import fs from "fs";

/*
Since fastify-openapi-docs uses an onRoute hook, you have to either:

* use `await register...`
* wrap you routes definitions in a plugin

See: https://www.fastify.io/docs/latest/Guides/Migration-Guide-V4/#synchronous-route-definitions
*/
export default fp(async function (fastify) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires -- this package does not yet support es module imports
  await fastify.register(require("@fastify/swagger"), {
    routePrefix: "/documentation",
    openapi: {
      info: {
        title: "Marketplace swagger",
        description: "Fastify swagger API for Marketplace",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "category", description: "Code related end-points" },
        { name: "country", description: "Code related end-points" },
        { name: "project", description: "Code related end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["wallet", "email"],
          properties: {
            wallet: { type: "string", format: "address" },
            handle: { type: "string" },
            username: { type: "string" },
            description: { type: "string", format: "text" },
            listings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  totalAmountToSell: { type: "number" },
                  tokenAddress: { type: "address" },
                  active: { type: "boolean" },
                  deleted: { type: "boolean", items: [] },
                  batches: { type: "array", items: [] },
                  batchPrices: { type: "array" },
                  singleUnitPrice: { type: "number" },
                  project: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      category: { type: "string" },
                    },
                  },
                },
              },
            },
            activities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  amount: { type: "number" },
                  previousAmount: { type: "number" },
                  price: { type: "number" },
                  previousPrice: { type: "number" },
                  timeStamp: { type: "number" },
                  project: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                    },
                  },
                  seller: {
                    type: "object",
                    properties: {
                      id: { type: "address" },
                    },
                  },
                  buyer: {
                    type: "object",
                    properties: {
                      id: { type: "address" },
                    },
                  },
                },
              },
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "number" },
            key: { type: "string" },
            projectID: { type: "string" },
            name: { type: "string" },
            methodology: { type: "string" },
            vintage: { type: "number" },
            projectAddress: { type: "address" },
            registry: { type: "string" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        Country: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    exposeRoute: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires -- this package does not yet support es module imports
  await fastify.register(require("@fastify/swagger-ui"));

  fastify.ready((err) => {
    if (err) throw err;
    const specification = fastify.swagger();
    fs.writeFileSync(
      "src/.generated/openapi.json",
      JSON.stringify(specification, null, 2)
    );
  });
});

declare module "fastify" {
  interface FastifyInstance {
    swagger: () => any;
  }
}
