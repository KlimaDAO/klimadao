import { FastifyInstance } from "fastify";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const MOCK_ADDRESS = "0x0123456789012345678901234567890123456789";

// to find a better way to do this
jest.mock("firebase-admin/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn().mockReturnValue([{}]),
}));
jest.mock("firebase-admin", () => ({
  app: jest.fn(() => ({
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: jest.fn(() => ({
          limit: jest.fn(() => ({
            get: jest.fn(() => ({
              empty: true,
            })),
          })),
        })),
        doc: jest.fn(() => ({
          set: jest.fn(),
          get: jest.fn(() => ({
            exists: false,
          })),
        })),
      })),
    })),
  })),
}));

describe("POST /User", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => {
    delete process.env.IGNORE_AUTH;
    await app.close();
  });
  beforeEach(async () => {
    process.env.IGNORE_AUTH = "true";
    app = await build();
  });

  test("should block ethereum address as handle when creating a user", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: MOCK_ADDRESS.slice(0, 24),
        wallet: MOCK_ADDRESS,
        username: "blah",
        description: "blah",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain("body/handle must match pattern");
  });
});
