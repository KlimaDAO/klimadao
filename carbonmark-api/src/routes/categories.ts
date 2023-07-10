import { getAllCategories } from "@/utils/helpers/utils";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";

export const Category = Type.Object({ id: Type.String() });
export type CategoryType = Static<typeof Category>;

const schema = {
  response: {
    "2xx": Type.Array(Category),
  },
};

const handler =
  (fastify: FastifyInstance): RouteHandler =>
  async (request, reply) => {
    const categories = await getAllCategories(fastify);
    return reply.status(200).send(categories);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/categories",
    handler: handler(fastify),
    schema,
  });
