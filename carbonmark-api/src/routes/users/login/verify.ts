import { verifyMessage } from "ethers-v6";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateNonce } from "../../../utils/crypto.utils";

type Body = {
  signature: string;
  wallet: string;
};

const schema = {
  summary: "Verify signed data",
  description:
    "Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      wallet: { type: "string", minLength: 26, maxLength: 64 },
      signature: { type: "string" },
    },
    required: ["wallet", "signature"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  function (request: FastifyRequest<{ Body: Body }>, reply: FastifyReply) {
    const users = request.server.users;

    // Destructure the wallet address and signature from the request body
    const { signature, wallet } = request.body;

    // Get the user from the users object
    const dbUser = users[wallet];

    // Create the signed message to verify
    const signedMessage = process.env.AUTHENTICATION_MESSAGE + dbUser.nonce;

    // Verify the signature
    const signerWalletAddress = verifyMessage(signedMessage, signature);

    // If the signature is invalid, send a 401 Unauthorized response
    if (
      signerWalletAddress.toLowerCase() !== dbUser.walletAddress.toLowerCase()
    ) {
      return reply.code(401).send(`Unauthorized: Invalid signature`);
    }

    // Create a JWT token for the user
    const token = fastify.jwt.sign({ wallet });

    // Save the token to the session
    request.session.token = token;

    // Generate a new nonce for the user
    users[wallet].nonce = generateNonce();

    // Send the token back to the client
    return reply.send({ token });
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "POST",
    url: "/users/login/verify",
    schema,
    handler: handler(fastify),
  });
