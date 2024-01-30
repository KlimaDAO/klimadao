import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserProfile } from "../../../models/UserProfile.model";
import { authenticateProfile } from "../auth";
import { Params, RequestBody, schema } from "./put.schema";

type PutRequest = FastifyRequest<{
  Body: Static<typeof RequestBody>;
  Params: Static<typeof Params>;
}>;

const handler = (fastify: FastifyInstance) =>
  async function (request: PutRequest, reply: FastifyReply) {
    const { username, description, profileImgUrl } = request.body;
    const { wallet } = request.params;
    const userProfile = request.userProfile;

    try {
      if (!userProfile) {
        return reply
          .code(404)
          .send({ error: "No user profile found for given handle or address" });
      }

      const updatedData: Partial<UserProfile> = {
        // username min 2 chars
        username: username || userProfile.username || userProfile.handle,
        description: description ?? userProfile.description ?? "",
        updatedAt: Date.now(),
        profileImgUrl: profileImgUrl ?? userProfile.profileImgUrl ?? "",
        nonce: (userProfile.nonce ?? 0) + 1,
        // handle is not editable
      };

      const db = fastify.firebase.firestore();
      // Try updating the user document with the specified data
      await db
        .collection("users")
        .doc(wallet.toUpperCase())
        .update(updatedData);

      // If the update is successful, return the new nonce
      return reply.code(200).send({
        nonce: updatedData.nonce,
        address: userProfile.address,
      });
    } catch (err) {
      console.error(err);
      // If an error occurs, return a 404 error with a message
      return reply
        .code(500)
        .send({ error: "There was an issue updating the document" });
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "PUT",
    url: "/users/:wallet",
    handler: handler(fastify),
    preHandler: authenticateProfile(fastify),
    schema,
  });
