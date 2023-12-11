import { FastifyInstance, InjectOptions } from "fastify";
import { DEV_URL } from "./test.constants";

const firestoreMethods = {
  app: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  docs: [],
  set: jest.fn(),
  update: jest.fn(),
  data: jest.fn(),
  exists: false,
  empty: true,
};

const firestore = jest.fn(() => {
  return firestoreMethods;
});

/**
 * Mocks the Firebase Admin SDK for testing purposes.
 *
 * @param {any} overrides - Optional. An object containing methods to override the default mock methods.
 */
export function mockFirestore(overrides?: any) {
  jest.resetModules();

  jest.mock("firebase-admin/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn().mockReturnValue([{}]),
  }));

  jest.mock("firebase-admin", () => {
    return {
      app: () => ({
        firestore,
      }),
    };
  });

  // allows us to keep invoking `mockFirestore()` in our tests to apply new mock implementations
  if (overrides) {
    firestore.mockImplementation(() => ({
      ...firestoreMethods,
      ...overrides,
    }));
  }
}

/** Wrap fastifies inject fn, throws internal server errors in order to fail tests and debug */
export async function mock_fetch(
  fastify: FastifyInstance,
  route: string,
  opts?: InjectOptions
) {
  const response = await fastify.inject({
    method: "GET",
    url: `${DEV_URL}${route}`,
    ...opts,
  });
  const data = response.json();
  if (data.error) {
    throw new Error("Internal server error: " + response.body);
  }
  return data;
}
