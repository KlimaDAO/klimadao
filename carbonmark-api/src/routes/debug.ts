import { FastifyPluginAsync, RouteHandlerMethod } from "fastify";

/** Selected ENVs to display */
const DEBUG_KEYS = [
  "POOL_PRICES_GRAPH_API_URL",
  "ASSETS_GRAPH_API_URL",
  "CARBON_OFFSETS_GRAPH_API_URL",
  "GRAPH_API_URL",
  "VERCEL_ENV",
];

const schema = {
  response: {
    200: {
      type: "object",
      properties: {
        POOL_PRICES_GRAPH_API_URL: { type: "string" },
        ASSETS_GRAPH_API_URL: { type: "string" },
        CARBON_OFFSETS_GRAPH_API_URL: { type: "string" },
        GRAPH_API_URL: { type: "string" },
        VERCEL_ENV: { type: "string" },
      },
    },
  },
};

const handler: RouteHandlerMethod = function (_, reply) {
  const envs = DEBUG_KEYS.reduce(
    (res, curr) => ({ ...res, [curr]: process.env[curr] }),
    {}
  );
  return reply.send(JSON.stringify(envs, null, 2));
};

const countries: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.route({
    method: "GET",
    url: "/debug",
    schema,
    handler,
  });
};

export default countries;
