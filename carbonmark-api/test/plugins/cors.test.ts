import Fastify from "fastify";
import cors from "plugins/cors";
import tap from "tap";

tap.test("CORS", async (t) => {
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
      t.test(
        `should allow all origins for ${protocol}://${domain}`,
        async (t) => {
          const response = await fastify.inject({
            method: "GET",
            url: "/",
            headers: {
              Origin: `${protocol}://${domain}`,
            },
          });

          t.equal(
            response.headers["access-control-allow-origin"],
            `${protocol}://${domain}`,
            "origin is allowed"
          );
        }
      );
    }
  }
});
