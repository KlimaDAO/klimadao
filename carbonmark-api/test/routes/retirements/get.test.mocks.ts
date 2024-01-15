import { pick } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { fixtures } from "../../fixtures";

const mockProfile = fixtures.firebase.profile;
const mockRetirement = fixtures.digitalCarbon.retirement;

export const expectedTransformedRetirement = {
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
  hasProvenanceDetails: false,
  credit: {
    ...pick(mockRetirement.credit, ["id", "bridgeProtocol", "vintage"]),
    projectId: mockRetirement.credit.project.id,
    currentSupply: 320308,
    retired: 0,
    crossChainSupply: 0,
  },
  retireeProfile: mockProfile,
};

export const mockDatabaseProfile = () =>
  jest.mock("../../../src//utils/helpers/users.utils", () => {
    const carbonProjectsUtils = jest.requireActual(
      "../../../src/utils/helpers/users.utils"
    );
    return {
      ...carbonProjectsUtils,
      getProfileByAddress: jest.fn(() => {
        return mockProfile;
      }),
    };
  });

export const mockDigitalCarbonRetirements = () =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("")
    .reply(200, {
      data: {
        retires: [fixtures.digitalCarbon.retirement],
      },
    });
