import { FastifyInstance } from "fastify";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";
import { disableAuth } from "../../../test.utils";
import {
  expectedTransformedRetirement,
  mockDatabaseProfile,
  mockDigitalCarbonRetirements,
} from "../get.test.mocks";

describe("GET /retirements/:id", () => {
  let fastify: FastifyInstance;
  disableAuth();
  mockDatabaseProfile();
  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("/retirements/[:id] get.test.ts setup failed", e);
    }
  });
  test("Returns a retirement by hash", async () => {
    mockDigitalCarbonRetirements();
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7509`,
    });
    const retirement = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(retirement).toEqual(expectedTransformedRetirement);
  });
  test("Retirement not found", async () => {
    mockDigitalCarbonRetirements([]);
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7519`,
    });
    expect(response.statusCode).toEqual(404);
  });
});
