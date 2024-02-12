import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS, SANITY_URLS } from "../../../../src/app.constants";
import { fixtures } from "../../../fixtures";
import digitalCarbon from "../../../fixtures/digitalCarbon";
import tokens from "../../../fixtures/tokens";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";

const mockCmsProject = fixtures.cms.cmsProject;
const mockCmsProjectContent = fixtures.cms.cmsProjectContent;
const mockActivities = fixtures.marketplace.activities;

describe("GET /projects/:id", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("/projects/:id get.test.ts setup failed", e);
    }
  });

  test("Returns project from CMS without prices or listings", async () => {
    nock(SANITY_URLS.cms)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [mockCmsProject],
          allProjectContent: [mockCmsProjectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens)
      .post("")
      .reply(200, {
        data: { prices: tokens.prices },
      });
    nock(GRAPH_URLS["polygon"].digitalCarbon).post("").twice().reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", /.*getActivitiesByProjectId.*/i)
      .reply(200, {
        data: {
          activities: mockActivities,
        },
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-191-2008`,
    });
    const project = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(project.key).toEqual("VCS-191");
    expect(project.country).toEqual("China");
  });

  test("Supports ?network=polygon", async () => {
    nock(SANITY_URLS.cms)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [mockCmsProject],
          allProjectContent: [mockCmsProjectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens)
      .post("")
      .reply(200, {
        data: { prices: tokens.prices },
      });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          carbonProjects: [digitalCarbon.digitalCarbonProject],
        },
      });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", /.*getActivitiesByProjectId.*/i)
      .reply(200, {
        data: {
          activities: fixtures.marketplace.activities,
        },
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-191-2008?network=polygon`,
    });
    const project = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(project.prices).toHaveLength(1);
    expect(project.prices[0].singleUnitBuyPrice).toBe("0.358940");
    expect(project.prices[0].singleUnitSellPrice).toBe("0.361620");
  });

  test("Empty network param default is polygon", async () => {
    nock(SANITY_URLS.cms)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [mockCmsProject],
          allProjectContent: [mockCmsProjectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          carbonProjects: [digitalCarbon.digitalCarbonProject],
        },
      });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("", /.*getActivitiesByProjectId.*/i)
      .reply(200, {
        data: {
          activities: fixtures.marketplace.activities,
        },
      });

    nock(GRAPH_URLS["mumbai"].marketplace).post("").reply(200, {
      data: {},
    });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-981-2017`,
    });
    const project = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(project.prices).toHaveLength(1);
  });
});
