import { FastifyInstance } from "fastify";
import { isArray, isObject, mapValues, sortBy } from "lodash";
import { curry, map } from "lodash/fp";
import fetch from "node-fetch";
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

const ENDPOINTS = [
  // "/categories",
  "/countries",
  // "/vintages",
  // "/purchases",
  // "/projects",
  "/projects/VCS-191-2008",
  "/users/emc",
  "/users/0x702E9b5AF503Cf37f3E2d1993744d02114C5ef34?type=wallet",
];

/** This test requires updating environment variables to be --production values */
t.test("Equivalence with production", async (t) => {
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

const deepSort = (obj: any): any => {
  switch (true) {
    case isArray(obj):
      return sortBy(obj.map(deepSort));
    case isObject(obj):
      return mapValues(sortBy(obj), deepSort);
  }
  return obj;
};
