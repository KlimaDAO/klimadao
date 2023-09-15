import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../src/graphql/codegen.constants";
import { build } from "../helper";
import { CATEGORIES } from "../routes/routes.mock";
import { DEV_URL } from "../test.constants";

describe("Rate Limiter", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test("should limit requests", async () => {
    for (let i = 0; i < 100 + 1; i++) {
      nock(GRAPH_URLS.digitalCarbon)
        .post("")
        .reply(200, { data: { carbonProjects: [] } });

      nock(GRAPH_URLS.marketplace)
        .post("")
        .reply(200, { data: { categories: CATEGORIES } });

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
