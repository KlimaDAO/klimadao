import { FastifyInstance } from "fastify";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";
import {
  expectedTransformedRetirement,
  mockDatabaseProfile,
  mockDigitalCarbonRetirements,
} from "../get.test.mocks";

mockDatabaseProfile();

describe("GET /retirements/:id", () => {
  let fastify: FastifyInstance;

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
});
