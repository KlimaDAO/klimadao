import { omit } from "lodash";
import { UserProfile } from "../src/utils/helpers/users.utils";

export const DEV_URL = "http://localhost:3003";
export const MOCK_ADDRESS = "0x0123456789012345678901234567890123456789";

export const ERROR = {
  message: "Graph error occurred",
  locations: [{ line: 6, column: 7 }],
  path: ["graph", 1],
};

export const CATEGORIES = [
  {
    id: "Blue Carbon",
  },
  {
    id: "Forestry",
  },
  {
    id: "A Random Category",
  },
];

export const COUNTRIES = [
  {
    id: "Canada",
  },
  {
    id: "Mozambique",
  },
  {
    id: "A Random Country",
  },
  {
    id: "China",
  },
  {
    id: "Spain",
  },
  {
    id: "United Kingdom",
  },
  {
    id: "Iceland",
  },
  {
    id: "Ukraine",
  },
  {
    id: "Vietnam",
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  address: MOCK_ADDRESS,
  createdAt: new Date("1970-01-01T00:00:00Z").getTime(),
  description: "Some description",
  handle: "SomeHandle",
  updatedAt: new Date("2023-11-11T15:05:08Z").getTime(),
  username: "someusername",
  profileImgUrl: null,
};

export const EXPECTED_USER_RESPONSE = {
  ...omit(MOCK_USER_PROFILE, ["address", "updatedAt", "createdAt"]),
  updatedAt: 1699715108,
  createdAt: 0,
  wallet: MOCK_USER_PROFILE.address,
  listings: [],
  activities: [],
  assets: [],
};
