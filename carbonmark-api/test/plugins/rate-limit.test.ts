import { FastifyInstance } from "fastify";
import { random, range } from "lodash";
import nock from "nock";
import { aCategory } from "../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../src/constants/graphs.constants";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";

const mockCategories = range(random(1, 10)).map(() => aCategory());

describe("Rate Limiter", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test("should limit requests", async () => {
    for (let i = 0; i < 100 + 1; i++) {
      nock(GRAPH_URLS.offsets)
        .post("")
        .reply(200, { data: { carbonOffsets: [] } });

      nock(GRAPH_URLS.marketplace)
        .post("")
        .reply(200, { data: { categories: mockCategories } });

      const response = await app.inject({
        method: "GET",
        url: `${DEV_URL}/categories`,
      });

      if (i < 101) {
        expect(response.statusCode).toBe(200);
      } else {
        expect(response.statusCode).toBe(429);
      }
    }
  });
});
