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
      handle: handle.toLowerCase(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      address: wallet.toLowerCase(),
      username,
      description,
      profileImgUrl,
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
        error: "This wallet address is already registered!",
      });
    }

    // Check if the handle already exists in our database
    const usersRef = fastify.firebase.firestore().collection("users");

    const userSnapshot = await usersRef
      .where("handle", "==", handle.toLowerCase())
      .limit(1)
      .get();

    if (!userSnapshot.empty) {
      return reply.code(403).send({
        error: "A user with this handle is already registered!",
      });
    }

    try {
      // Try creating a new user document with the specified data
      const document = await fastify.firebase
        .firestore()
        .collection("users")
        .doc(wallet.toUpperCase())
        .set(createData);

      // If the document is successfully created, return the request body
      return reply.send(document);
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
