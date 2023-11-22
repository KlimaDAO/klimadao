import { FastifyInstance } from "fastify";
import { schema } from "./get.schema";

const handler = () =>
  function () {
    throw Error("Arg, this failed!");
  };

export default (fastify: FastifyInstance) =>
  fastify.route({
    method: "GET",
    url: "/error",
    handler: handler(),
    schema,
  });
