import { FastifyInstance } from "fastify";
import fs from "fs";
import { isArray, isObject, mapValues, sortBy } from "lodash";
import { curry, map } from "lodash/fp";
import fetch from "node-fetch";
import { build } from "./helper";
const DEV_URL = "http://localhost:3003/api";
// const STAGING_URL = "https://staging-api.carbonmark.com/api";
const PRODUCTION_URL = "https://api.carbonmark.com/api";

// A longer than usual timeout because the APIs are slooow
const TIMEOUT = 1000 * 100;

const fetch_apis = async (app: FastifyInstance, url: string) => {
  const res = await Promise.all([
    fetch(`${PRODUCTION_URL}${url}`),
    app.inject({ url: `${DEV_URL}${url}` }),
  ]);

  return await Promise.all(res.map((res) => res.json()));
};

const ENDPOINTS = [
  // "/projects/VCS-191-2008",
  // "/projects/VCS-1427-2017",
  // "/projects/VCS-566-2014",
  // "/projects/VCS-1356-2017",
  // "/projects/VCS-51-2014",
  // "/projects/VCS-982-2010",
  // "/projects/VCS-905-2014",
  // "/projects/VCS-1883-2018",
  "/projects",
  // "/projects?country=China&category=Renewable Energy",
  // "/projects?country=China&category=Other",
  // "/projects?country=Ecuador&category=Other",
  // "/projects?country=India&category=Renewable Energy",
  // "/projects?country=India&category=Other",
  // "/projects?search=Song+Ong+Hydropower+Project&vintage=2018",
  // "/projects?country=China&category=Forestry",
  // "/projects?country=Indonesia&category=Forestry",
  // "/projects?search=Pacajai+REDD+Project&vintage=2014",
  // "/projects?country=Bulgaria&category=Renewable Energy",
  // "/projects?search=Dayingjiang&vintage=2008",
];

/** This test requires updating environment variables to be --production values */
// **NOTE:** This test is skipped by default because it has a dependency on external APIs which may break.
// Remove this skip if you would like to test for regressions
test(
  "Equivalence with production",
  async () => {
    try {
      const app = await build({ allowNetworkRequest: true });
      // Add teardown function
      // Fetch for each endpoint
      const requests = map(curry(fetch_apis)(app))(ENDPOINTS);

      // Extract the data
      const data = await Promise.all(requests);

      // Write the results to file if DEBUG mode is on
      if (process.env.DEBUG) {
        // Write the data to a file
        if (data[0][0])
          fs.writeFileSync("prod.json", JSON.stringify(data[0][0], null, 2));
        if (data[0][1])
          fs.writeFileSync("local.json", JSON.stringify(data[0][1], null, 2));
      }

      // Assert equivalence
      data.forEach(([prod, local]) =>
        expect(deepSort(prod)).toEqual(deepSort(local))
      );

      await app.close();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  TIMEOUT
);

const deepSort = (obj: any): any => {
  switch (true) {
    case isArray(obj):
      return sortBy(obj.map(deepSort));
    case isObject(obj):
      return mapValues(sortBy(obj), deepSort);
  }
  return obj;
};
