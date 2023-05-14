import { FastifyPluginAsync } from "fastify";

// const schema = {
//   body: {
//     type: "object",
//     properties: {
//       wallet: { type: "string", minLength: 26, maxLength: 64 },
//     },
//     required: ["wallet"],
//   },
//   response: {
//     "2xx": {
//       type: "object",
//       properties: {
//         nonce: { type: "string" },
//       },
//     },
//   },
// }

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.route({
  //   method: "POST",
  //   path: "/users/login",
  //   {schema},
  //   handler: async function (request, reply) {
  //     // Get the wallet address from the request body
  //     const walletAddress = request.body.wallet;
  //     // If the wallet address is not provided, return a 400 Bad Request error
  //     if (!walletAddress) {
  //       return reply.code(400).send("Bad Request");
  //     }
  //     // Check if the wallet address is already in the users object
  //     if (!!users[walletAddress]) {
  //       // If the wallet address is found, return the nonce associated with it
  //       return reply.send({ nonce: users[walletAddress].nonce });
  //     }
  //     // Generate a new nonce
  //     const nonce = generateNounce();
  //     // Add the wallet address and nonce to the users object
  //     users[walletAddress] = { walletAddress, nonce };
  //     // Return the nonce
  //     return reply.send({ nonce });
  //   },
  // });
};
export default login;
