import { ethers } from "ethers";
import t from "tap";
import { build } from "../../helper";
const DEV_URL = "http://localhost:3003/api";

// The private key of the account to sign the message with
const MOCK_PRIVATE_KEY =
  "0x0123456789012345678901234567890123456789012345678901234567890123";

// Assuming you have a connected provider
const wallet = new ethers.Wallet(MOCK_PRIVATE_KEY);

/**
 * @description This test case tests the authentication flow of the application.
 * It includes the following steps:
 * 1. Login: The user logs in with their wallet address.
 * 2. Build and sign the authentication message: The authentication message is built and signed using the user's wallet.
 * 3. Request JWT Token: The signed message is sent to the server to request a JW token.
 * @returns {void}
 *
 * See: https://github.com/KlimaDAO/klimadao/wiki/Carbonmark#authentication
 */
t.test("authentication flow", async (t) => {
  const app = await build(t);

  /** 1. Login */
  const { nonce } = await app
    .inject({
      method: "POST",
      url: `${DEV_URL}/users/login`,
      body: {
        wallet: wallet.address,
      },
    })
    .then((d: Response) => d.json());

  /** 2. Build and sign the authentication message */
  const message = process.env.AUTHENTICATION_MESSAGE + nonce;
  const signed_message = await wallet.signMessage(message);

  /** 3. Request  JRPC Token */
  const response = await app
    .inject({
      method: "POST",
      url: `${DEV_URL}/users/login/verify`,
      body: {
        wallet: wallet.address,
        signature: signed_message,
      },
    })
    .then((d: Response) => d.body);

  console.log("response", response);
});
