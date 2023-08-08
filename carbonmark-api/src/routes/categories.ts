import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";
import { getAllCategories } from "src/utils/helpers/utils";

export const Category = Type.Object({ id: Type.String() });
export type CategoryType = Static<typeof Category>;

const schema = {
  response: {
    "2xx": Type.Array(Category),
  },
};

const handler =
  (fastify: FastifyInstance): RouteHandler =>
  async (_, reply) => {
    let response;
    try {
      response = await getAllCategories(fastify);
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
    url: "/categories",
    handler: handler(fastify),
    schema,
  });
