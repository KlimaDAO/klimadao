import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";

export const Category = Type.Object({ id: Type.String() });
export type CategoryType = Static<typeof Category>;

const categories: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Reply: Array<CategoryType> }>(
    "/categories",
    {
      schema: {
        response: {
          200: Type.Array(Category),
        },
      },
    },
    async (request, reply) => {
      //   try {
      // // Execute the GET_CATEGORIES query and store the result in the 'data' variable
      // const categories = await getAllCategories(fastify);
      return reply.status(200).send([{ id: "Bottles" }]);
    }
  );
};
export default categories;
