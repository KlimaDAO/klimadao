/**
 * Mocks the Firebase Admin SDK for testing purposes.
 *
 * @param {any} overrides - Optional. An object containing methods to override the default mock methods.
 */
export function mockFirebase(overrides?: any) {
  jest.resetModules();

  jest.mock("firebase-admin/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn().mockReturnValue([{}]),
  }));

  jest.mock("firebase-admin", () => ({
    app: jest.fn(() => ({
      firestore: jest.fn(() => ({
        collection: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        set: jest.fn(),
        update: jest.fn(),
        exists: false,
        ...overrides,
      })),
    })),
  }));
}

//Disables the `bearer.ts` plugin
export function disableAuth() {
  process.env.IGNORE_AUTH = "true";
}

//Renable the `bearer.ts` plugin
export function enableAuth() {
  delete process.env.IGNORE_AUTH;
}
