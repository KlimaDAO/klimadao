import nock from "nock";
import t from "tap";
import { GRAPH_API_ROOT } from "../../../src/constants/graphs.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const MOCK_CATEGORIES = [
  {
    id: "Blue Carbon",
  },
  {
    id: "Forestry",
  },
  {
    id: "A Random Category",
  },
];

t.test("GET /categories", async (t) => {
  nock(GRAPH_API_ROOT)
    .post("/najada/marketplace-new")
    .reply(200, { data: { categories: MOCK_CATEGORIES } });

  nock(GRAPH_API_ROOT)
    .post("/klimadao/polygon-bridged-carbon")
    .reply(200, { data: { carbonOffsets: [] } });

  const app = await build(t);

  const response = await app.inject({
    method: "GET",
    url: `${DEV_URL}/categories`,
  });

  t.equal(response.statusCode, 200, "Should return success status");

  const data = await response.json();

  t.same(data, MOCK_CATEGORIES, "Expected MOCK_CATEGORIES");
});
