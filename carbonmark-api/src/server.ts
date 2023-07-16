import fastify from "fastify";
import app from "./app";

const PORT = 3003;

async function main() {
  const server = fastify();
  try {
    await server.register(app);
    await server.listen({ port: PORT });

    console.info(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
