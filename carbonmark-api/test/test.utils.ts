export function mockFirebase(overrides?: any) {
  jest.mock("firebase-admin/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn().mockReturnValue([{}]),
  }));

  jest.resetModules();
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
