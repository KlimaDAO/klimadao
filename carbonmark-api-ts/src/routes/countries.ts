import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { getAllCountries } from "../helpers/utils";

export const Country = Type.Object({
  id: Type.String(),
});
export type CategoryType = Static<typeof Country>;

const schema = {
  response: {
    "2xx": Type.Array(Country),
  },
};

const countries: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/countries", { schema }, async function (_, reply) {
    const countries = await getAllCountries(fastify);
    return reply.status(200).send(countries);
  });
};

export default countries;
