import { getAllCountries } from "@/utils/helpers/utils";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";

export const Country = Type.Object({
  id: Type.String(),
});
export type CategoryType = Static<typeof Country>;

const schema = {
  response: {
    "2xx": Type.Array(Country),
  },
};

const handler = (fastify: FastifyInstance): RouteHandler =>
  async function (request, reply) {
    const countries = await getAllCountries(fastify);
    return reply.status(200).send(countries);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/countries",
    schema,
    handler: handler(fastify),
  });
