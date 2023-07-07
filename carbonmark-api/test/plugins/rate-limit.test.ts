import tap from "tap";
import { build } from "../helper";

tap.only("Rate Limiter should limit requests", async (t: any) => {
  const app = await build(t);
  for (let i = 0; i < 100 + 1; i++) {
    const response = await app.inject({
      method: "GET",
      url: "/api/categories",
    });

    if (i < 101) {
      t.equal(response.statusCode, 200, "status code is 200");
    } else {
      t.equal(response.statusCode, 429, "status code is 429");
    }
  }
});
