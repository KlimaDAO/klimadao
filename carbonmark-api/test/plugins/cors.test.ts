import Fastify from "fastify";
import cors from "../../src/plugins/cors";

describe("CORS", () => {
  const fastify = Fastify();
  fastify.register(cors);

  const domains = [
    "carbonmark.com",
    "www.carbonmark.com",
    "klimadao.carbonmark.com",
    "www.klimadao.carbonmark.com",
  ];

  for (const domain of domains) {
    for (const protocol of ["http", "https"]) {
      test(`should allow all origins for ${protocol}://${domain}`, async () => {
        const response = await fastify.inject({
          method: "GET",
          url: "/",
          headers: {
            Origin: `${protocol}://${domain}`,
          },
        });

        expect(response.headers["access-control-allow-origin"]).toBe(
          `${protocol}://${domain}`
        );
      });
    }
  }
});
