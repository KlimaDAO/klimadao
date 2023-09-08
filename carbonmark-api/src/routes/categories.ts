import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";
import { getAllCategories } from "../utils/helpers/utils";

export const Category = Type.Object({ id: Type.String() });
export type CategoryType = Static<typeof Category>;

const schema = {
  summary: "Categories",
  description:
    "A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.",
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: Category,
          },
          examples: [
            [
              {
                id: "Blue Carbon",
              },
              {
                id: "Forestry",
              },
              {
                id: "Other",
              },
            ],
          ],
        },
      },
    },
  },
};

const handler =
  (fastify: FastifyInstance): RouteHandler =>
  async (_, reply) => {
    let response;
    try {
      response = await getAllCategories(fastify);
    } catch (error) {
      // Return bad gateway and pass the error
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
