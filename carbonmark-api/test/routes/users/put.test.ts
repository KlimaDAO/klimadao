import { build } from "../../helper";
import { DEV_URL, MOCK_ADDRESS } from "../../test.constants";
import { disableAuth, mockFirebase } from "../../test.utils";

describe("PUT /User", () => {
  beforeAll(() => {
    disableAuth();
  });
  test("should allow updates", async () => {
    // Mock Firebase with no users
    mockFirebase({ get: jest.fn().mockReturnValue({ empty: true }) });

    const app = await build();

    const response = await app.inject({
      method: "PUT",
      url: `${DEV_URL}/users/${MOCK_ADDRESS}`,
      body: {
        handle: MOCK_ADDRESS.slice(0, 24),
        wallet: MOCK_ADDRESS,
        username: "blah",
        description: "blah",
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
