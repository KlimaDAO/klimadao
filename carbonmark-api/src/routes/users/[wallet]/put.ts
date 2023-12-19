import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FirestoreUserDoc } from "../../models/FirestoreUserDoc.model";
import { verifyProfileSignature } from "../../utils/crypto.utils";
import { getFirestoreUserDoc } from "../../utils/helpers/users.utils";
import { Params, RequestBody, schema } from "./put.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Body: Static<typeof RequestBody>;
      Params: Static<typeof Params>;
    }>,
    reply: FastifyReply
  ) {
    const { username, description, profileImgUrl } = request.body;
    const { wallet } = request.params;

    const db = fastify.firebase.firestore();

    try {
      /** Get the existing doc with latest nonce */
      const userDoc = await getFirestoreUserDoc({
        docId: wallet.toUpperCase(),
        firestore: db,
      });
      if (!userDoc) {
        return reply
          .code(404)
          .send({ error: "No user profile found for given handle or address" });
      }

      const isAuthenticated = verifyProfileSignature({
        nonce: userDoc.nonce,
        expectedAddress: userDoc.address,
        signature: request.headers.authorization?.split(" ")[1] || "",
      });
      if (!isAuthenticated) {
        return reply.status(403).send();
      }

      const updatedData: Partial<FirestoreUserDoc> = {
        // username min 2 chars
        username: username || userDoc.username || userDoc.handle,
        description: description ?? userDoc.description ?? "",
        updatedAt: Date.now(),
        profileImgUrl: profileImgUrl ?? userDoc.profileImgUrl ?? "",
        nonce: (userDoc.nonce ?? 0) + 1,
        // handle is not editable
      };

      // Try updating the user document with the specified data
      await db
        .collection("users")
        .doc(wallet.toUpperCase())
        .update(updatedData);

      // If the update is successful, return the new nonce
      return reply.code(200).send({
        nonce: updatedData.nonce,
        address: userDoc.address,
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
    schema,
  });
