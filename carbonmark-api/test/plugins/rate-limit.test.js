const tap = require("tap");
const rateLimiter = require("../../plugins/rate-limit");
const { build } = require("../helper");

tap.test("Rate Limiter", async (t) => {
  const fastify = await build(t);

  // Test 2: Check if the rate limiter is working as expected
  t.test("should limit requests", async (t) => {
    for (let i = 0; i < 100 + 1; i++) {
      const response = await fastify.inject({
        method: "GET",
        url: "/api",
      });

      if (i < 101) {
        t.equal(response.statusCode, 200, "status code is 200");
      } else {
        t.equal(response.statusCode, 429, "status code is 429");
      }
    }
  });
});
