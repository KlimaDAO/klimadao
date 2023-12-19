import { Wallet } from "ethers";
import { FastifyInstance } from "fastify";
import { SIGN_PROFILE_MESSAGE } from "../../../src/app.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mockFirestore } from "../../test.utils";

let app: FastifyInstance;

const wallet = Wallet.createRandom();
const nonce = 1;

beforeAll(async () => {
  mockFirestore({
    exists: true,
    data: () => ({
      createdAt: 123,
      address: wallet.address.toLowerCase(),
      nonce: 1,
      username: "testusername",
      description: "testdescription",
      handle: "testhandle",
      profileImgUrl: null,
    }),
  });
  app = await build();
});

afterAll(async () => {
  await app.close();
});

describe("PUT /User", () => {
  test("allow signed updates, increment nonce", async () => {
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "newusername",
        description: "newdescription",
        profileImgUrl: "https://example.com/image.png",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(2);
  });

  test("Ignores handle and wallet changes, applies profile updates", async () => {
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const mockUpdate = jest.fn();
    mockFirestore({
      exists: true,
      update: mockUpdate,
      data: () => ({
        createdAt: 123,
        address: wallet.address.toLowerCase(),
        nonce: 1,
      }),
    });
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "newusername",
        description: "newdescription",
        profileImgUrl: "https://example.com/image.png",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(2);
    expect(mockUpdate).toHaveBeenCalledWith({
      username: "newusername",
      description: "newdescription",
      updatedAt: expect.any(Number),
      profileImgUrl: "https://example.com/image.png",
      nonce: 2,
    });
  });

  test("Reject username <2 chars", async () => {
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const mockUpdate = jest.fn();
    mockFirestore({
      exists: true,
      update: mockUpdate,
      data: () => ({
        createdAt: 123,
        address: wallet.address.toLowerCase(),
        nonce: 1,
      }),
    });
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "z",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(400);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("accepts empty string for description, profileImgUrl", async () => {
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet.signMessage(message);
    const mockUpdate = jest.fn();
    mockFirestore({
      exists: true,
      update: mockUpdate,
      data: () => ({
        createdAt: 123,
        address: wallet.address.toLowerCase(),
        nonce: 1,
      }),
    });
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x12345`,
      body: {
        username: "me",
        description: "",
        profileImgUrl: "",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).nonce).toBe(2);
    expect(mockUpdate).toHaveBeenCalledWith({
      username: "me",
      description: "",
      updatedAt: expect.any(Number),
      profileImgUrl: "",
      nonce: 2,
    });
  });

  test("should disallow unsigned updates", async () => {
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "blah",
        description: "blah",
      },
      headers: {
        // Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(403);
  });

  test("should disallow nonce mismatch", async () => {
    const message = SIGN_PROFILE_MESSAGE + `${2}`; // BAD NONCE
    const signature = await wallet.signMessage(message);
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "blah",
        description: "blah",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(403);
  });

  test("should disallow other signers", async () => {
    const wallet2 = Wallet.createRandom();
    const message = SIGN_PROFILE_MESSAGE + `${nonce}`;
    const signature = await wallet2.signMessage(message); // BAD SIGNER
    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/0x1234`,
      body: {
        username: "blah",
        description: "blah",
      },
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    });
    expect(response.statusCode).toBe(403);
  });
});
