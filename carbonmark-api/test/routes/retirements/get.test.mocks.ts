import { pick } from "lodash";
import nock from "nock";
import { Retire } from "../../../src/.generated/types/digitalCarbon.types";
import { GRAPH_URLS } from "../../../src/app.constants";
import { fixtures } from "../../fixtures";
import { mockFirebase } from "../../test.utils";
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
  retireeProfile: {
    ...mockProfile,
    updatedAt: 1702468323,
    createdAt: 1683523732,
  },
};
export const mockDatabaseProfile = () =>
  mockFirebase({
    get: jest.fn(() => ({
      exists: true,
      data: () => mockProfile,
      docs: [{ data: () => mockProfile }],
    })),
  });

export const mockDigitalCarbonRetirements = (override?: Retire[]) =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("")
    .reply(200, {
      data: {
        retires: override ?? [fixtures.digitalCarbon.retirement],
      },
    });
