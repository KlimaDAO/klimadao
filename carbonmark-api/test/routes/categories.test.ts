import nock from "nock";
import t from "tap";
import { GRAPH_URLS } from "../../src/constants/graphs.constants";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";
import { CATEGORIES } from "./categories.mock";

t.test("GET /categories", async (main) => {
  const app = await build(main);
  main.test("Success", async (sub) => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { categories: CATEGORIES } });

    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } });
    const response = await app.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    sub.equal(response.statusCode, 200, "Should return success status");

    const data = await response.json();

    sub.same(data, CATEGORIES, "Expected CATEGORIES");
  });

  // main.test("Graph Error", async (sub) => {
  //   nock(GRAPH_URLS.marketplace)
  //     .post("")
  //     .reply(200, {
  //       errors: [ERROR],
  //     });

  //   nock(GRAPH_URLS.offsets)
  //     .post("")
  //     .reply(200, { data: { carbonOffsets: [] } });

  //   const response = await app.inject({
  //     method: "GET",
  //     url: `${DEV_URL}/categories`,
  //   });

  //   sub.equal(
  //     response.statusCode,
  //     502,
  //     "Should return BAD GATEWAY (502) error code"
  //   );
  //   sub.match(response.body, "User not found", "Should return error message");
  // });

  // t.test("Empty data", async (t) => {
  //   t.plan(2);
  //   nock(GRAPH_URLS.marketplace)
  //     .post("")
  //     .reply(200, { data: { categories: [] } });

  //   const response = await app.inject({
  //     method: "GET",
  //     url: `${DEV_URL}/categories`,
  //   });

  //   t.equal(response.statusCode, 200, "Should return success status");
  //   const data = await response.json();
  //   t.same(data, [], "Expected empty data");
  // });

  // t.test("Invalid data", async (t) => {
  //   t.plan(2);
  //   nock(GRAPH_URLS.marketplace)
  //     .post("")
  //     .reply(200, { data: { categories: "invalid data" } });

  //   const response = await app.inject({
  //     method: "GET",
  //     url: `${DEV_URL}/categories`,
  //   });

  //   t.equal(response.statusCode, 200, "Should return success status");
  //   const data = await response.json();
  //   t.notSame(
  //     data,
  //     MOCK_CATEGORIES,
  //     "Expected data not to match MOCK_CATEGORIES"
  //   );
  // });
});
