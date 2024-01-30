import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { verifyProfileSignature } from "../../utils/crypto.utils";
import { getProfileByAddress } from "../../utils/helpers/users.utils";

const hasWalletParams = (params?: unknown): params is { wallet: string } => {
  if (!params || !Object.hasOwn(params, "wallet")) return false;
  return true;
};

const hasWalletBody = (body?: unknown): body is { wallet: string } => {
  if (!body || !Object.hasOwn(body, "wallet")) return false;
  return true;
};

// authenticate routes that require the SIGN_PROFILE_MESSAGE to be signed
export const authenticateProfile =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    let address: string;
    if (hasWalletParams(request.params)) {
      address = request.params.wallet;
    } else if (hasWalletBody(request.body)) {
      address = request.body.wallet;
    } else {
      return reply.status(400).send({
        error: "Can't authenticate profile without wallet",
      });
    }

    const profile = await getProfileByAddress({
      address,
      firebase: fastify.firebase,
    });
    const isAuthenticated = verifyProfileSignature({
      nonce: profile?.nonce,
      expectedAddress: profile?.address || address,
      signature: request.headers.authorization?.split(" ")[1] || "",
    });

    if (!isAuthenticated) {
      return reply.status(403).send({
        error: "Unauthorized profile operation",
      });
    }

    // pass to handler to avoid querying again
    request.userProfile = profile;
  };
