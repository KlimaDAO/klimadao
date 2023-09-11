import { FastifyInstance } from "fastify";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const MOCK_ADDRESS =
  "0x0123456789012345678901234567890123456789012345678901234567890123";

describe("PUT /User", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test("should block updating to existing handle", async () => {
    const { nonce } = await app
      .inject({
        method: "PUT",
        url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
        body: {},
      })
      .then((d) => d.json());

    const token = JSON.parse(response).token;

    expect(typeof token).toBe("string");
  });
});
