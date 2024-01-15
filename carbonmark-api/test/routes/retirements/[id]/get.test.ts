import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import { fixtures } from "../../../../test/fixtures";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";
import {
  mockDatabaseProfile,
  mockDigitalCarbonRetirements,
} from "./get.test.mocks";

mockDatabaseProfile();
const mockRetirement = fixtures.digitalCarbon.retirement;
const mockProfile = fixtures.firebase.profile;

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
    expect(retirement).toEqual({
      ...pick(mockRetirement, [
        "id",
        "bridgeID",
        "beneficiaryName",
        "retirementMessage",
        "retiringName",
      ]),
      timestamp: 1701095367,
      retiringAddress: mockRetirement.retiringAddress.id,
      beneficiaryAddress: mockRetirement.beneficiaryAddress.id,
      amount: 3,
      hash: mockRetirement.hash,
      "hasProvenanceDetails": false,
      credit: {
        ...pick(retirement.credit, ["id", "bridgeProtocol", "vintage"]),
        projectId: retirement.credit.projectId,
        currentSupply: 320308,
        retired: 0,
        crossChainSupply: 0,
      },
      retireeProfile: mockProfile,
    });
  });
});
