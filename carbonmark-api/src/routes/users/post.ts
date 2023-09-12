import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestBody, schema } from "./post.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
    reply: FastifyReply
  ) {
    // Destructure the wallet, username, handle, and description properties from the request body
    const { wallet, username, handle, description, profileImgUrl } =
      request.body;

    const createData = {
      username,
      handle: handle.toLowerCase(),
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      profileImgUrl,
      address: wallet.toLowerCase(),
    };

    // Query the Firestore database for the user document with the specified wallet address
    const user = await fastify.firebase
      .firestore()
      .collection("users")
      .doc(wallet)
      .get();

    // If the user document exists, return a 403 error with a message
    if (user.exists) {
      return reply.code(403).send({
        code: 403,
        error: "This user is already registered!",
      });
    }

    const usersRef = fastify.firebase.firestore().collection("users");

    const userSnapshot = await usersRef
      .where("handle", "==", handle.toLowerCase())
      .limit(1)
      .get();
    // If no documents are found, return a 404 error
    if (!userSnapshot.empty) {
      return reply.code(403).send({
        code: 403,
        error: "This user is already registered!",
      });
    }

    try {
      // Try creating a new user document with the specified data
      await fastify.firebase
        .firestore()
        .collection("users")
        .doc(wallet.toUpperCase())
        .set(createData);

      // If the document is successfully created, return the request body
      return reply.send(request.body);
    } catch (err) {
      console.error(err);
      // If an error occurs, return the error in the response
      return reply.code(403).send({ error: err });
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "POST",
    url: "/users",
    onRequest: [fastify.authenticate],
    handler: handler(fastify),
    schema,
  });
