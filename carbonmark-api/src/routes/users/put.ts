import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestBody, schema } from "./put.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
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

      // Check if the handle already exists in our database
      const usersRef = fastify.firebase.firestore().collection("users");

      const userSnapshot = await usersRef
        .where("handle", "==", handle.toLowerCase())
        .limit(1)
        .get();

      if (!userSnapshot.empty) {
        return reply.code(403).send({
          code: 403,
          error: "A user with this handle is already registered!",
        });
      }

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
  await fastify.route({
    method: "PUT",
    url: "/users/:wallet",
    onRequest: [fastify.authenticate],
    handler: handler(fastify),
    schema,
  });
