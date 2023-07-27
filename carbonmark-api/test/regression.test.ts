import { FastifyInstance } from "fastify";
import { isArray, isObject, mapValues, sortBy } from "lodash";
import { curry, map } from "lodash/fp";
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
  "/projects/VCS-191-2008",
  "/projects",
  "/projects?search=Dayingjiang&vintage=2008&country=bulgaria",
];

/** This test requires updating environment variables to be --production values */
test("Equivalence with production", async () => {
  const app = await build({ allowNetworkRequest: true });
  // Add teardown function
  // Fetch for each endpoint
  const requests = map(curry(fetch_apis)(app))(ENDPOINTS);

  // Extract the data
  const data = await Promise.all(requests);

  // Assert equivalence
  data.forEach(([prod, local]) =>
    expect(deepSort(prod)).toEqual(deepSort(local))
  );

  await app.close();
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
