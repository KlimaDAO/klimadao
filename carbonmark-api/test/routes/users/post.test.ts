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

  test("Schema prevents handles < 3 chars", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "12",
        wallet: wallet.address,
        username: "testusername",
        description: "testdescription",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain(
      "body/handle must NOT have fewer than 3 characters"
    );
  });

  test("Schema prevents usernames < 2 chars", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "12345",
        wallet: wallet.address,
        username: "1",
        description: "testdescription",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain(
      "body/username must NOT have fewer than 2 characters"
    );
  });

  test("Allow 0x names (not addresses)", async () => {
    const message = SIGN_PROFILE_MESSAGE; // no nonce
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

  test("disallow wallet mismatch", async () => {
    const mockSet = jest.fn();
    mockFirestore({
      empty: true,
      set: mockSet,
    });
    const wallet2 = Wallet.createRandom();
    const message = SIGN_PROFILE_MESSAGE; // no nonce
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

  test("should set nonce to 1 and write to firestore", async () => {
    const mockSet = jest.fn();
    mockFirestore({
      empty: true,
      set: mockSet,
    });
    const message = SIGN_PROFILE_MESSAGE;
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "blah",
        description: "blah",
        profileImgUrl: "",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(1);
    expect(mockSet).toHaveBeenCalledWith({
      handle: "0xmycoolhandle",
      address: wallet.address.toLowerCase(),
      description: "blah",
      username: "blah",
      updatedAt: expect.any(Number),
      createdAt: expect.any(Number),
      profileImgUrl: "",
      nonce: 1,
    });
  });

  test("Description and profileImgUrl are optional", async () => {
    const mockSet = jest.fn();
    mockFirestore({
      empty: true,
      set: mockSet,
    });
    const message = SIGN_PROFILE_MESSAGE;
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: wallet.address,
        username: "blah",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(1);
    expect(mockSet).toHaveBeenCalledWith({
      handle: "0xmycoolhandle",
      address: wallet.address.toLowerCase(),
      username: "blah",
      updatedAt: expect.any(Number),
      createdAt: expect.any(Number),
      nonce: 1,
    });
  });
});
