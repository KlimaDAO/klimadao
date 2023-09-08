import { FastifyInstance, RouteHandlerMethod, RouteOptions } from "fastify";
import { pick } from "lodash";
import { version as VERSION } from "../../package.json";

/** Selected ENVs to display */
const DEBUG_KEYS = [
  "POOL_PRICES_GRAPH_API_URL",
  "ASSETS_GRAPH_API_URL",
  "CARBON_OFFSETS_GRAPH_API_URL",
  "GRAPH_API_URL",
  "VERCEL_ENV",
];

const schema = {
  hide: true,
  response: {
    200: {
      description: "Debug information",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              POOL_PRICES_GRAPH_API_URL: { type: "string" },
              ASSETS_GRAPH_API_URL: { type: "string" },
              CARBON_OFFSETS_GRAPH_API_URL: { type: "string" },
              GRAPH_API_URL: { type: "string" },
              VERCEL_ENV: { type: "string" },
              VERSION: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const handler: RouteHandlerMethod = function (_, reply) {
  const envs = pick(process.env, DEBUG_KEYS);
  return reply.send(JSON.stringify({ ...envs, VERSION }, null, 2));
};

const config: RouteOptions = {
  method: "GET",
  url: "/debug",
  schema,
  handler,
};

export default async (fastify: FastifyInstance) => await fastify.route(config);
