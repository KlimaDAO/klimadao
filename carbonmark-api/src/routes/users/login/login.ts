import { generateNonce } from "@/utils/crypto.utils";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const schema = {
  body: {
    type: "object",
    properties: {
      wallet: { type: "string", minLength: 26, maxLength: 64 },
    },
    required: ["wallet"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        nonce: { type: "string" },
      },
    },
  },
};

type Body = {
  wallet: string;
};

function handler(request: FastifyRequest<{ Body: Body }>, reply: FastifyReply) {
  const users = request.server.users;

  // Get the wallet address from the request body
  const walletAddress = request.body.wallet;
  // If the wallet address is not provided, return a 400 Bad Request error
  if (!walletAddress) {
    return reply.code(400).send("Bad Request");
  }
  // Check if the wallet address is already in the users object
  if (users[walletAddress]) {
    // If the wallet address is found, return the nonce associated with it
    return reply.send({ nonce: users[walletAddress].nonce });
  }
  // Generate a new nonce
  const nonce = generateNonce();
  // Add the wallet address and nonce to the users object
  users[walletAddress] = { walletAddress, nonce };
  // Return the nonce
  return reply.send({ nonce });
}

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "POST",
    url: "/users/login",
    schema,
    handler,
  });
