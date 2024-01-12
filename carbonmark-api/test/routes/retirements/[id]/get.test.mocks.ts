import nock from "nock";
import { GRAPH_URLS } from "../../../../src/app.constants";
import { fixtures } from "../../../fixtures";

const mockProfile = fixtures.firebase.profile;

// Mock retiree profile

export const mockDatabaseProfile = () =>
  jest.mock("../../../../src//utils/helpers/users.utils", () => {
    const carbonProjectsUtils = jest.requireActual(
      "../../../../src/utils/helpers/users.utils"
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
