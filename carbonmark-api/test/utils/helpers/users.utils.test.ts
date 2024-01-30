import { isUserProfile } from "../../../src/utils/helpers/users.utils";

describe("isFirestoreUserDoc", () => {
  test("Only checks for existence of createdAt property, does not assert shape", () => {
    expect(isUserProfile({ createdAt: 0 })).toBe(true);
  });
  test("Must have createdAt field present", () => {
    expect(isUserProfile({ handle: "" })).toBe(false);
  });
});
