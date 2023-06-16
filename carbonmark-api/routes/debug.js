/** Selected ENVs to display */
const DEBUG_KEYS = [
  "POOL_PRICES_GRAPH_API_URL",
  "ASSETS_GRAPH_API_URL",
  "CARBON_OFFSETS_GRAPH_API_URL",
  "GRAPH_API_URL",
  "VERCEL_ENV",
];

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    path: "/debug",
    handler: async function (request, reply) {
      const envs = DEBUG_KEYS.reduce(
        (res, curr) => ({ ...res, [curr]: process.env[curr] }),
        {}
      );
      return reply.send(JSON.stringify(envs, null, 2));
    },
  });
};
