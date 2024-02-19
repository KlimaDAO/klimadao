import { FastifyInstance } from "fastify";
import nock from "nock";
import {
  aListing,
  aUser,
} from "../../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../../src/app.constants";
import { mockICRHolderResponse } from "../../../test/fixtures/icr";
import { build } from "../../helper";
import {
  DEV_URL,
  EXPECTED_USER_RESPONSE,
  MOCK_ADDRESS,
  MOCK_USER_PROFILE,
} from "../../test.constants";
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

    nock(GRAPH_URLS["polygon"].icr)
      .post("", (body) => body.query?.includes("getHoldingsByAddress"))
      .reply(200, {
        mockICRHolderResponse,
      });
  });

  test("by wallet", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
    });
    const actual_response = await response.json();

    expect(response.statusCode).toBe(200);
    expect(EXPECTED_USER_RESPONSE).toEqual(actual_response);
  });

  test("by handle", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_USER_PROFILE.handle}`, // use handle instead of wallet address
    });

    const actual_response = await response?.json();
    expect(response?.statusCode).toBe(200);
    expect(actual_response).toEqual(EXPECTED_USER_RESPONSE); // check if the returned handle is correct
  });

  test("with invalid handle", async () => {
    //Remove existing mocks
    jest.unmock("firebase-admin");
    jest.unmock("firebase-admin/app");

    //Return no users
    mockFirebase({ get: jest.fn(() => ({ empty: true })) });

    /** We need to close the existing server */
    app.close();
    /** And create a new one with updated firebase mock */
    app = await build();

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/invalid_address`, // use an invalid wallet address
    });

    expect(response.statusCode).toBe(404); // expect a 404 Not Found status code
  });

  test("with invalid address or handle", async () => {
    //Remove existing mocks
    jest.unmock("firebase-admin");
    jest.unmock("firebase-admin/app");

    //Return no users
    mockFirebase({ get: jest.fn(() => ({ exists: false })) });

    /** We need to close the existing server */
    app.close();
    /** And create a new one with updated firebase mock */
    app = await build();

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`, // use an invalid handle
    });

    expect(response.statusCode).toBe(404); // expect a 404 Not Found status code
  });

  /**@todo complete*/
  test.skip("with mumbai network parameter", async () => {
    nock(GRAPH_URLS["mumbai"].marketplace)
      .post("")
      .reply(200, { data: { users: [aUser()] } });

    nock(GRAPH_URLS["mumbai"].assets)
      .post("")
      .reply(200, {
        data: { accounts: [] },
      });

    app = await build();

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}?network=mumbai`,
    });

    expect(response.statusCode).toBe(200);
  });
  /**@todo complete*/
  test.skip("with expires after parameter", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", (body) => body.query.includes("getUserByWallet"))
      .reply(200, {
        data: {
          users: [{ listings: aListing({ expiration: "75" }) }],
        },
      });

    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
    });

    const actual_response = await response.json();

    expect(response.statusCode).toBe(200);
    expect(actual_response.listings.length).toBe(1);
  });
});
