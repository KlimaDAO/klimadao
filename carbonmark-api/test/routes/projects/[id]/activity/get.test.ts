import { FastifyInstance } from "fastify";
import nock from "nock";
import { expectMatchesActivitiesFixture } from "test/routes/activities/get.utils";
import { GRAPH_URLS } from "../../../../../src/app.constants";
import marketplace from "../../../../fixtures/marketplace";
import { build } from "../../../../helper";
import { DEV_URL } from "../../../../test.constants";

describe("GET /projects/[id]/activity", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("get.test.ts setup failed", e);
    }
  });
  afterEach(async () => await fastify.close());

  /** The happy path */
  test("Returns 200", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: { activities: marketplace.activities },
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-981-2017/activity`,
    });
    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expectMatchesActivitiesFixture(data);
  });
});
