import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../src/app.constants";
import { LIMIT } from "../../src/plugins/rate-limit";
import { build } from "../helper";
import { mockMarketplaceArgs } from "../routes/projects/get.test.mocks";
import { mock_fetch } from "../test.utils";

describe("Rate Limiter", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test("should limit requests", async () => {
    for (let i = 0; i < LIMIT + 1; i++) {
      nock(GRAPH_URLS["polygon"].digitalCarbon)
        .post("")
        .reply(200, { data: { carbonProjects: [] } })
        .persist(true);

      mockMarketplaceArgs();

      //Because we are throwing errors in mock fetch we need to catch
      try {
        const categories = await mock_fetch(app, "/categories");
        expect(categories.length).toBeGreaterThan(0);
      } catch (e) {
        expect(e.message).toMatch("Too Many Requests");
        expect(e.message).toMatch("Rate limit exceeded, retry in 1 minute");
      }
    }
  });
});
