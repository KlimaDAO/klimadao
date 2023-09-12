import { FastifyInstance } from "fastify";
import { build } from "../../helper";

describe("PUT /User", () => {
  let app: FastifyInstance;

  // Setup the server
  afterEach(async () => await app.close());
  beforeEach(async () => {
    app = await build();
  });

  test.skip("should block updating to existing handle", async () => {
    // const { nonce } = await app
    //   .inject({
    //     method: "PUT",
    //     url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
    //     body: {},
    //   })
    //   .then((d) => d.json());
  });
});
