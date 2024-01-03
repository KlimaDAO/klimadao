import { FastifyInstance } from "fastify";
import { merge } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { Purchase } from "../../../src/models/Purchase.model";
import { composePurchaseModel } from "../../../src/routes/purchases/get.utils";
import marketplace from "../../fixtures/marketplace";
import { build } from "../../helper";
import { DEV_URL, ERROR } from "../../test.constants";

describe("GET /purchases", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  const purchaseModelFixture: Purchase = merge(
    composePurchaseModel(marketplace.purchase),
    {
      amount: "1.0",
      price: "5.0",
    }
  );

  /** The happy path */
  test("Returns and formats BigNumber values", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchases: [marketplace.purchase] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual([purchaseModelFixture]);
  });

  test("Server error", async () => {
    // silence expected console errors
    const mockConsole = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases`,
    });

    expect(response.statusCode).toEqual(500);
    mockConsole.mockRestore();
  });
});
