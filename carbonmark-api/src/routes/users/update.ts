import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const schema = {
  summary: "Update user profile",
  tags: ["Users"],
  body: {
    type: "object",
    properties: {
      //@todo update to hash length
      wallet: { type: "string", minLength: 3 },
      handle: { type: "string", minLength: 3 },
      username: { type: "string", minLength: 2 },
      description: { type: "string", minLength: 2, maxLength: 500 },
      profileImgUrl: { type: "string", nullable: true },
    },
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        handle: { type: "string" },
        username: { type: "string" },
        wallet: { type: "string" },
        description: { type: "string" },
        profileImgUrl: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
      },
    },
  },
};

type Body = {
  handle: string;
  wallet: string;
  username: string;
  description: string;
  profileImgUrl: string;
};

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Body }>,
    reply: FastifyReply
  ) {
    // Destructure the wallet, username, and description properties from the request body
    const { wallet, username, description, profileImgUrl, handle } =
      request.body;

    try {
      const updatedData = {
        username,
        description,
        handle,
        updatedAt: Date.now(),
        profileImgUrl:
          profileImgUrl && profileImgUrl.length ? profileImgUrl : null,
      };

      // Try updating the user document with the specified data
      await fastify.firebase
        .firestore()
        .collection("users")
        .doc(wallet.toUpperCase())
        .update(updatedData);
      // If the update is successful, return the request body
      return reply.send(request.body);
    } catch (err) {
      console.error(err);
      // If an error occurs, return a 404 error with a message
      return reply
        .code(403)
        .send({ code: 404, error: "There was an issue updating the document" });
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route<{ Body: Body }>({
    method: "PUT",
    url: "/users/:wallet",
    onRequest: [fastify.authenticate],
    schema,
    handler: handler(fastify),
  });
