import { isFirestoreUserDoc } from "../../../src/utils/helpers/users.utils";

describe("isFirestoreUserDoc", () => {
  test("Only checks for existence, does not assert shape", () => {
    expect(isFirestoreUserDoc({ createdAt: 0 })).toBe(true);
  });
});
