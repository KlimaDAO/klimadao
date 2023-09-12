import { FastifyInstance, RouteHandlerMethod } from "fastify";
import fs from "fs";
import path from "path";

const handler: RouteHandlerMethod = (_req, reply) => {
  try {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../referenceDocs.html"),
      "utf8"
    );
    return reply.status(200).type("text/html").send(html);
  } catch (error) {
    console.error(error);
    return reply.status(502).send(error?.message);
  }
};

// Render stoplight docs to the root
export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/",
    handler,
    schema: {
      hide: true, // hidden from docs
    },
  });
