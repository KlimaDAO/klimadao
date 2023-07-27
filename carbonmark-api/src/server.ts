import fastify from "fastify";
import app from "./app";

const PORT = 3003;

/**
 * This server is required for local development because the API is deployed
 * via Vercel serverless which handles incoming requests. By separating concerns (server & app)
 * we can easily switch deployment environments and test.
 *
 * **Note** This is not required for tests as we use `app.inject` to mock requests to the FastifyInstance
 */
async function main() {
  const server = fastify();
  try {
    await server.register(app);
    await server.listen({ port: PORT });

    console.info(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
  }
}

main();
