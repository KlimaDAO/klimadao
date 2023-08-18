import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAllVintages } from "../utils/helpers/utils";

const schema = {
  summary: "Vintages",
  description: "Retrieve an array of the vintages of available carbon projects",
  response: {
    "2xx": {
      description: "Successful response",
      type: "array",
      items: {
        type: "string",
        examples: [
          [
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
          ],
        ],
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  async function (_: FastifyRequest, reply: FastifyReply) {
    let response;
    try {
      response = await getAllVintages(fastify);
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
    url: "/vintages",
    handler: handler(fastify),
    schema,
  });
