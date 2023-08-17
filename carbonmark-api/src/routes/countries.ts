import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";
import { getAllCountries } from "../utils/helpers/utils";

export const Country = Type.Object({
  id: Type.String(),
});
export type CategoryType = Static<typeof Country>;

const schema = {
  summary: "Get the list of countries carbon projects are from",
  description:
    "Retrieve an array containing the countries that carbon projects originate from",
  tags: ["countries"],
  response: {
    "2xx": {
      description: "Successful response",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      example: [
        {
          id: "Brazil",
        },
        {
          id: "Bulgaria",
        },
        {
          id: "China",
        },
      ],
    },
  },
};

const handler = (fastify: FastifyInstance): RouteHandler =>
  async function (request, reply) {
    let response;
    try {
      response = await getAllCountries(fastify);
    } catch (error) {
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
