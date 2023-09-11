import { Type } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type Body = {
  handle: string;
  wallet: string;
  username: string;
  description: string;
  profileImgUrl: string;
};

export const ValidHandle = Type.Intersect([
  Type.String({
    pattern: "^(?!0x)[a-zA-Z0-9]*$",
    description: "Handle cannot be an Ethereum address",
  }),
  Type.String({
    minLength: 3,
    maxLength: 24,
    description: "Handle must be longer than 3 and shorter than 24 characters",
  }),
]);

const schema = {
  summary: "Create user profile",
  tags: ["Users"],
  body: {
    type: "object",
    properties: {
      handle: ValidHandle,
      username: { type: "string", minLength: 2 },
      description: { type: "string", maxLength: 500 },
      wallet: { type: "string", minLength: 26, maxLength: 64 },
    },
    required: ["handle", "username", "wallet", "description"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        handle: { type: "string" },
        username: { type: "string" },
        wallet: { type: "string" },
        updatedAt: { type: "number" },
        createdAt: { type: "number" },
      },
    },
    "403": {
      type: "object",
      properties: {
        error: { type: "string" },
        code: { type: "number" },
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Body }>,
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
        code: 403,
        error: "A user with this handle is already registered!",
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
  await fastify.route<{ Body: Body }>({
    method: "POST",
    url: "/users",
    onRequest: [fastify.authenticate],
    schema,
    handler: handler(fastify),
  });
