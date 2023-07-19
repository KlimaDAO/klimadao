import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";
import { getAllCountries } from "../utils/helpers/utils";

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
    let response;
    try {
      response = await getAllCountries(fastify);
    } catch (error: any) {
      //Return bad gateway and pass the error
      console.error(error);
      return reply.status(502).send(error?.message);
    }
    return reply.status(200).send(response);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/countries",
    schema,
    handler: handler(fastify),
  });
