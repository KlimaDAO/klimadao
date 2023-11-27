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
];

export const MOCK_USER_PROFILE: UserProfile = {
  address: MOCK_ADDRESS,
  createdAt: new Date("1970-01-01T00:00:00Z").getTime(),
  description: "Some description",
  handle: "SomeHandle",
  updatedAt: Number(new Date()),
  username: "someusername",
  profileImgUrl: null,
};
