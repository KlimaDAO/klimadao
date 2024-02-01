import { FastifyInstance } from "fastify";
import { omit } from "lodash";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import {
  expectedTransformedRetirement,
  mockDigitalCarbonRetirements,
} from "./get.test.mocks";

describe("GET /retirements", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("/retirements get.test.ts setup failed", e);
    }
  });
  test("Returns a list of retirements", async () => {
    mockDigitalCarbonRetirements();
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements`,
    });
    const retirement = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(retirement).toEqual([
      omit(expectedTransformedRetirement, "retireeProfile"),
    ]);
  });
});
