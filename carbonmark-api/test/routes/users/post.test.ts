import { Wallet } from "ethers";
import { FastifyInstance } from "fastify";
import { SIGN_PROFILE_MESSAGE } from "../../../src/app.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mockFirestore } from "../../test.utils";

const wallet = Wallet.createRandom();

let app: FastifyInstance;
beforeAll(async () => {
  mockFirestore({
    empty: true,
  });
  app = await build();
});

afterAll(async () => {
  await app.close();
});

describe("POST /User", () => {
  test("Schema prevents handles > 24 chars", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "1234567890123456789012345",
        wallet: wallet.address,
        username: "testusername",
        description: "testdescription",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain(
      "body/handle must NOT have more than 24 characters"
    );
  });

  test("Allow 0x names (not addresses)", async () => {
    const nonce = undefined; // new profile
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "testusername",
        description: "testdescription",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
  });

  test("disallow unsigned POST", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "blah",
        description: "blah",
      },
    });
    expect(response.statusCode).toBe(403);
  });

  test("disallow bad signature", async () => {
    const wallet2 = Wallet.createRandom();
    const nonce = undefined; // new profile
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet2.signMessage(message); // BAD SIGNATURE
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "blah",
        description: "blah",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(403);
  });

  test("should set nonce to 1", async () => {
    const nonce = undefined; // new profile
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "blah",
        description: "blah",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(1);
  });
});
