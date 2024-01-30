import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserProfile } from "../../models/UserProfile.model";
import { authenticateProfile } from "./auth";
import { RequestBody, ResponseBody, schema } from "./post.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
    reply: FastifyReply
  ) {
    // Destructure the wallet, username, handle, and description properties from the request body
    const { wallet, username, handle, description, profileImgUrl } =
      request.body;

    const userProfile = request.userProfile;
    if (userProfile) {
      return reply.status(409).send({
        error: "A user record already exists for this address",
      });
    }

    const createData: UserProfile = {
      handle: handle.toLowerCase(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      address: wallet.toLowerCase(),
      username,
      description,
      profileImgUrl,
      nonce: 1,
    };

    try {
      const db = fastify.firebase.firestore();
      db.settings({ ignoreUndefinedProperties: true });

      // Check if the handle already exists in our database
      const userSnapshot = await db
        .collection("users")
        .where("handle", "==", handle.toLowerCase())
        .limit(1)
        .get();

      if (!userSnapshot.empty) {
        return reply.code(400).send({
          error: "A user with this handle is already registered!",
        });
      }
      // Try creating a new user document with the specified data
      await db.collection("users").doc(wallet.toUpperCase()).set(createData);

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
    preHandler: authenticateProfile(fastify),
    schema,
  });
