import { FastifyInstance } from "fastify";
import { build } from "../../helper";
import { DEV_URL, MOCK_ADDRESS } from "../../test.constants";
import { disableAuth, mockFirebase } from "../../test.utils";

describe("POST /User", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    mockFirebase({
      limit: jest.fn(() => ({
        get: jest.fn(() => ({
          empty: true,
        })),
      })),
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(() => ({
          exists: false,
        })),
      })),
    });
    disableAuth();
    app = await build();
  });

  test("should block ethereum address as handle when creating a user", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: MOCK_ADDRESS.slice(0, 48),
        wallet: MOCK_ADDRESS,
        username: "blah",
        description: "blah",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain(
      "body/handle must NOT have more than 24 characters"
    );
  });

  test("should allow 0x names (not addresses)", async () => {
    const response = await app.inject({
      method: "POST",
      url: `${DEV_URL}/users`,
      body: {
        handle: "0xmycoolhandle",
        wallet: MOCK_ADDRESS,
        username: "blah",
        description: "blah",
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
