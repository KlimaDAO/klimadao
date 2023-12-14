import { ethers } from "ethers";
import { FastifyInstance } from "fastify";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";

// The private key of the account to sign the message with
const MOCK_PRIVATE_KEY =
  "0x0123456789012345678901234567890123456789012345678901234567890123";

// Assuming you have a connected provider
const wallet = new ethers.Wallet(MOCK_PRIVATE_KEY);

describe("Authentication flow", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test("should authenticate user", async () => {
    /** 1. Login */
    const { nonce } = await app
      .inject({
        method: "POST",
        url: `${DEV_URL}/login`,
        body: {
          wallet: wallet.address,
        },
      })
      .then((d) => d.json());

    /** 2. Build and sign the authentication message */
    const message = process.env.AUTHENTICATION_MESSAGE + nonce;
    const signed_message = await wallet.signMessage(message);

    /** 3. Request  JRPC Token */
    const response = await app
      .inject({
        method: "POST",
        url: `${DEV_URL}/login/verify`,
        body: {
          wallet: wallet.address,
          signature: signed_message,
        },
      })
      .then((d) => d.body);

    const token = JSON.parse(response).token;

    expect(typeof token).toBe("string");
  });

  test("should fail authentication for invalid user", async () => {
    /** 1. Login */
    const { nonce } = await app
      .inject({
        method: "POST",
        url: `${DEV_URL}/login`,
        body: {
          wallet: wallet.address,
        },
      })
      .then((d) => d.json());

    /** 2. Build and sign the authentication message */
    const message = process.env.AUTHENTICATION_MESSAGE + nonce;
    const signed_message = await wallet.signMessage(message);

    /** 3. Request  JRPC Token with invalid wallet */
    const response = await app
      .inject({
        method: "POST",
        url: `${DEV_URL}/login/verify`,
        body: {
          wallet: "0xInvalidWalletAddress",
          signed_message,
        },
      })
      .then((d) => d.json());

    expect(response.error).toBeTruthy();
  });

  test("should fail login for invalid address", async () => {
    /** 1. Login */
    const response = await app
      .inject({
        method: "POST",
        url: `${DEV_URL}/login`,
        body: {
          wallet: "0xInvalidWalletAddress",
        },
      })
      .then((d) => d.json());

    expect(response.error).toBeTruthy();
  });
});
