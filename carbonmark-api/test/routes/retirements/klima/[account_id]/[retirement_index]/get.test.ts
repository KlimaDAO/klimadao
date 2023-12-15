import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../../../../src/app.constants";
import { fixtures } from "../../../../../fixtures";
import { build } from "../../../../../helper";
import { DEV_URL } from "../../../../../test.constants";

const mockKlimaRetirement = fixtures.digitalCarbon.klimaRetirement;
const mockProfile = fixtures.firebase.profile;

// Mock retiree profile
jest.mock("../../../../../../src//utils/helpers/users.utils", () => {
  const carbonProjectsUtils = jest.requireActual(
    "../../../../../../src//utils/helpers/users.utils"
  );
  return {
    ...carbonProjectsUtils,
    getProfileByAddress: jest.fn(() => {
      return mockProfile;
    }),
  };
});

describe("GET /retirements/klima/:account_id/:retirement_index", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error(
        "/retirements/klima/[:account_id]/[:retirement_index] get.test.ts setup failed",
        e
      );
    }
  });
  test("Returns a retirement from account id and retirement index", async () => {
    // Mock retirement
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          klimaRetire: mockKlimaRetirement,
        },
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/klima/0x0a1g3hcbteay53hd9ee1q8e06b56e8cd6767z52a/1`,
    });
    const retirement = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(retirement).toEqual({
      ...pick(mockKlimaRetirement.retire, [
        "id",
        "bridgeID",
        "beneficiaryName",
        "retirementMessage",
        "retiringName",
      ]),
      timestamp: 1701095377,
      retiringAddress: mockKlimaRetirement.retire.retiringAddress.id,
      beneficiaryAddress: mockKlimaRetirement.retire.retiringAddress.id,

      amount: 3,
      credit: {
        ...pick(mockKlimaRetirement.retire.credit, [
          "id",
          "bridgeProtocol",
          "vintage",
        ]),
        projectId: mockKlimaRetirement.retire.credit.project.id,
        currentSupply: 320308,
        retired: 0,
        crossChainSupply: 0,
      },
      retireeProfile: mockProfile,
    });
  });
});
