import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { verifyProfileSignature } from "../../utils/crypto.utils";
import { FirestoreUserDoc } from "../../utils/firebase.utils";
import { RequestBody, ResponseBody, schema } from "./post.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
    reply: FastifyReply
  ) {
    // Destructure the wallet, username, handle, and description properties from the request body
    const { wallet, username, handle, description, profileImgUrl } =
      request.body;

    const createData: FirestoreUserDoc = {
      handle: handle.toLowerCase(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      address: wallet.toLowerCase(),
      username,
      description,
      profileImgUrl,
      nonce: 1,
    };

    // Query the Firestore database for the user document with the specified wallet address
    const user = await fastify.firebase
      .firestore()
      .collection("users")
      .doc(wallet)
      .get();

    // If the user document exists, return a 403 error with a message
    if (user.exists) {
      return reply.code(400).send({
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
      return reply.code(400).send({
        error: "A user with this handle is already registered!",
      });
    }

    const isAuthenticated = verifyProfileSignature({
      // first signature is without nonce
      expectedAddress: createData.address,
      signature: request.headers.authorization?.split(" ")[1] || "",
    });

    if (!isAuthenticated) {
      return reply.status(403).send({
        error: "Unauthorized: invalid signature.",
      });
    }

    try {
      // Try creating a new user document with the specified data
      await fastify.firebase
        .firestore()
        .collection("users")
        .doc(wallet.toUpperCase())
        .set(createData);

      // If the document is successfully created, return the new nonce
      return reply.code(200).send({
        nonce: createData.nonce,
        address: createData.address,
      });
    } catch (err) {
      console.error(err);
      // If an error occurs, return the error in the response
      return reply.code(500).send({ error: err });
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route<{
    Body: Static<typeof RequestBody>;
    Reply: typeof ResponseBody | { error: string };
  }>({
    method: "POST",
    url: "/users",
    handler: handler(fastify),
    schema,
  });
