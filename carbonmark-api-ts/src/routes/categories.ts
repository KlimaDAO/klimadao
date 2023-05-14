import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { getAllCategories } from "../helpers/utils";

export const Category = Type.Object({ id: Type.String() });
export type CategoryType = Static<typeof Category>;

const schema = {
  response: {
    "2xx": Type.Array(Category),
  },
};

const categories: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/categories", { schema }, async (request, reply) => {
    const categories = await getAllCategories(fastify);
    return reply.status(200).send(categories);
  });
};
export default categories;
