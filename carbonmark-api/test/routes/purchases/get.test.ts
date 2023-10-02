import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { Purchase } from "../../../src/models/Purchase.model";
import carbonProjects from "../../fixtures/carbonProjects";
import marketplace from "../../fixtures/marketplace";
import { build } from "../../helper";
import { DEV_URL, ERROR } from "../../test.constants";

const purchaseModelFixture: Purchase = {
  ...marketplace.purchase,
  amount: "1.0",
  price: "5.0",
  listing: {
    id: marketplace.purchase.listing.id,
    project: {
      key: marketplace.purchase.listing.project.key,
      vintage: marketplace.purchase.listing.project.vintage,
      country: carbonProjects.carbonProject.country!,
      name: carbonProjects.carbonProject.name!,
      methodology: carbonProjects.carbonProject.methodologies?.[0]?.id!,
      projectID: carbonProjects.carbonProject.registryProjectId!,
    },
  },
};

jest.mock("../../../src/utils/helpers/carbonProjects.utils", () => {
  const carbonProjectsUtils = jest.requireActual(
    "../../../src/utils/helpers/carbonProjects.utils"
  );
  return {
    ...carbonProjectsUtils,
    fetchCarbonProject: jest.fn(() => {
      return carbonProjects.carbonProject;
    }),
  };
});

describe("GET /purchases/:id", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  /** The happy path */
  test("Returns and formats BigNumber values", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchase: marketplace.purchase } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(purchaseModelFixture);
  });

  test("Accept polygon network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchase: marketplace.purchase } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}?network=polygon`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(purchaseModelFixture);
  });

  test("Accept mumbai network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["mumbai"].marketplace)
      .post("")
      .reply(200, { data: { purchase: marketplace.purchase } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}?network=mumbai`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(purchaseModelFixture);
  });

  test("Reject bad purchase id", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchase: marketplace.purchase } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/0x1234`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(400);
    expect(data.error).toEqual("Bad Request");
  });

  test("Reject unknown network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchase: marketplace.purchase } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}?network=ethereum`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(400);
    expect(data.error).toEqual("Bad Request");
  });

  test("Mainnet purchase not found", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { purchases: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}`,
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toContain("Purchase not found");
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
      url: `${DEV_URL}/purchases/${marketplace.purchase.id}`,
    });

    expect(response.statusCode).toEqual(500);
    mockConsole.mockRestore();
  });
});
