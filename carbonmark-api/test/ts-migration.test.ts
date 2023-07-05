import { ethers } from "ethers";
import { FastifyInstance } from "fastify";
import { isArray, isObject, mapValues, sortBy } from "lodash";
import { curry, map } from "lodash/fp";
import fetch, { Response } from "node-fetch";
import t from "tap";
import { build } from "./helper";
const DEV_URL = "http://localhost:3003/api";
const PRODUCTION_URL = "https://api.carbonmark.com/api";

const fetch_apis = async (app: FastifyInstance, url: string) => {
  const res = await Promise.all([
    fetch(`${PRODUCTION_URL}${url}`),
    app.inject({ url: `${DEV_URL}${url}` }),
  ]);

  return await Promise.all(res.map((res) => res.json()));
};

// The private key of the account to sign the message with
const MOCK_PRIVATE_KEY =
  "0x0123456789012345678901234567890123456789012345678901234567890123";

const ENDPOINTS = [
  // "/categories",
  // "/countries",
  // "/vintages",
  // "/purchases",
  // "/projects",
  "/projects/VCS-191-2008",
  // "/users/emc",
  // "/users/0x2091316a25c0829fdd2c05412ef2d3ca6cceaf53?type=wallet",
];

/** This test requires updating environment variables to be --production values */
t.test("equivalence with production", async (t) => {
  const app = await build(t);

  // Fetch for each endpoint
  const requests = map(curry(fetch_apis)(app))(ENDPOINTS);

  // Extract the data
  const data = await Promise.all(requests);

  // Assert equivalence
  data.forEach(([prod, local]) => t.same(deepSort(prod), deepSort(local)));

  // Add teardown function
  t.teardown(() => app.close());
});

t.skip("authentication flow", async (t) => {
  // Assuming you have a connected provider
  const wallet = new ethers.Wallet(MOCK_PRIVATE_KEY);

  const app = await build(t);

  const { nonce } = await app
    .inject({
      method: "POST",
      url: `${DEV_URL}/users/login`,
      body: {
        wallet: wallet.address,
      },
    })
    .then((d: Response) => d.json());

  const message = process.env.AUTHENTICATION_MESSAGE + nonce;

  // Sign the message
  const signed_message = await wallet.signMessage(message);

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

const deepSort = (obj: any): any => {
  switch (true) {
    case isArray(obj):
      return sortBy(obj.map(deepSort));
    case isObject(obj):
      return mapValues(sortBy(obj), deepSort);
  }
  return obj;
};
