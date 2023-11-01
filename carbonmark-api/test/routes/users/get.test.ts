import { FastifyInstance } from "fastify";
import { omit } from "lodash";
import nock from "nock";
import { aUser } from "../../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../../src/app.constants";
import { build } from "../../helper";
import { DEV_URL, MOCK_ADDRESS, MOCK_USER_PROFILE } from "../../test.constants";
import { disableAuth, mockFirebase } from "../../test.utils";

describe("GET /users/[walletOrHandle]", () => {
  let app: FastifyInstance;
  // const holding = aHolding({ token: aToken({ decimals: 8 }) });

  beforeEach(async () => {
    disableAuth();
    // Mock Firebase with a user
    mockFirebase({
      get: jest.fn(() => ({
        exists: true,
        data: () => MOCK_USER_PROFILE,
        docs: [{ data: () => MOCK_USER_PROFILE }],
      })),
    });
    app = await build();

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", (body) => body.query.includes("getUserByWallet"))
      .reply(200, { data: { users: [aUser()] } });

    nock(GRAPH_URLS["polygon"].assets)
      .post("")
      .reply(200, {
        data: {
          accounts: [
            // anAccount({
            //   holdings: [holding],
            // }),
          ],
        },
      });
  });

  test("by wallet", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
    });
    const actual_response = await response.json();

    const expected_response = {
      ...omit(MOCK_USER_PROFILE, "address"),
      wallet: MOCK_USER_PROFILE.address,
      listings: [],
      activities: [],
      assets: [],
    };
    expect(response.statusCode).toBe(200);
    expect(expected_response).toEqual(actual_response);
  });

  test("by handle", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_USER_PROFILE.handle}`, // use handle instead of wallet address
    });
    const expected_response = {
      ...omit(MOCK_USER_PROFILE, "address"),
      wallet: MOCK_USER_PROFILE.address,
      listings: [],
      activities: [],
      assets: [],
    };
    const actual_response = await response?.json();
    expect(response?.statusCode).toBe(200);
    expect(actual_response).toEqual(expected_response); // check if the returned handle is correct
  });

  test("invalid handle", async () => {
    //Remove existing mocks
    jest.unmock("firebase-admin");
    jest.unmock("firebase-admin/app");

    //Return no users
    mockFirebase({ get: jest.fn(() => ({ empty: true })) });
    app = await build();

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/invalid_address`, // use an invalid wallet address
    });

    expect(response.statusCode).toBe(404); // expect a 404 Not Found status code
  });

  test.only("invalid address", async () => {
    //Remove existing mocks
    jest.unmock("firebase-admin");
    jest.unmock("firebase-admin/app");

    //Return no users
    mockFirebase({ get: jest.fn(() => ({ exists: false })) });
    app = await build();

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", (body) => body.query.includes("getUserByWallet"))
      .reply(200, { data: { users: [aUser()] } });

    nock(GRAPH_URLS["polygon"].assets)
      .post("")
      .reply(200, {
        data: {
          accounts: [
            // anAccount({
            //   holdings: [holding],
            // }),
          ],
        },
      });

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`, // use an invalid handle
    });

    expect(response.statusCode).toBe(404); // expect a 404 Not Found status code
  });

  test("User Not Found", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/non_existent_user`,
    });

    expect(response.statusCode).toBe(404);
  });

  test("Check User Profile Data", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
    });

    const user = response.json();
    expect(response.statusCode).toBe(200);
    expect(user.handle).toBe(MOCK_ADDRESS.slice(0, 24));
    expect(user.username).toBe("blah");
    expect(user.description).toBe("blah");
  });

  test("Network Parameter", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}?network=mumbai`,
    });

    expect(response.statusCode).toBe(200);
  });

  test("Expires After Parameter", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}?expiresAfter=60`,
    });

    expect(response.statusCode).toBe(200);
  });
});
