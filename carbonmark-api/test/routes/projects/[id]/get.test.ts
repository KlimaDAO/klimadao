import { FastifyInstance } from "fastify";
import nock from "nock";
import { NetworkParam } from "src/models/NetworkParam.model";
import { GRAPH_URLS, SANITY_URLS } from "../../../../src/app.constants";
import { ICR_API } from "../../../../src/utils/ICR/ICR_API_endpoints";
import { fixtures } from "../../../fixtures";
import digitalCarbon from "../../../fixtures/digitalCarbon";
import tokens from "../../../fixtures/tokens";
import { build } from "../../../helper";
import { DEV_URL, mockICRProject } from "../../../test.constants";

jest.mock("../../../../src/utils/ICR/ICR_API_endpoints", () => ({
  ICR_API: (network: NetworkParam) => {
    let baseUrl = "https://api.carbonregistry.com/v0";
    if (network === "mumbai") {
      baseUrl = "https://gaia-api-dev.mojoflower.io/v0";
    }
    return { ICR_API_URL: baseUrl };
  },
}));

const mockCmsProject = fixtures.cms.cmsProject;
const mockCmsProjectContent = fixtures.cms.cmsProjectContent;
const mockActivities = fixtures.marketplace.activities;

describe("GET /projects/:id", () => {
  let fastify: FastifyInstance;
  let ICR_API_URL: string;
  let ICR_API_URL_MUMBAI: string;

  // Setup the server
  beforeEach(async () => {
    ICR_API_URL = ICR_API("polygon").ICR_API_URL;
    ICR_API_URL_MUMBAI = ICR_API("mumbai").ICR_API_URL;
    try {
      fastify = await build();
    } catch (e) {
      console.error("/projects/:id get.test.ts setup failed", e);
    }
  });

  afterEach(async () => {
    nock.cleanAll();
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
    nock(ICR_API_URL)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

    // mumbai nocks backup
    nock(ICR_API_URL_MUMBAI)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

    nock(GRAPH_URLS["mumbai"].marketplace).post("").reply(200, {
      data: {},
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
    nock(ICR_API_URL)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

    // mumbai nocks backup
    nock(ICR_API_URL_MUMBAI)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

    nock(GRAPH_URLS["mumbai"].marketplace).post("").reply(200, {
      data: {},
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
    nock(ICR_API_URL)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

    // // mumbai nocks backup
    nock(ICR_API_URL_MUMBAI)
      .get("/public/projects")
      .reply(200, { projects: [mockICRProject] });

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
