import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS, SANITY_URLS } from "../../../../src/app.constants";
import {
  carbonProject,
  projectContent,
} from "../../../fixtures/carbonProjects";
import digitalCarbon from "../../../fixtures/digitalCarbon";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";

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
    nock(SANITY_URLS.carbonProjects)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [carbonProject],
          allProjectContent: [projectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].digitalCarbon).post("").twice().reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].offsets).post("").reply(200, { data: {} });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
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
    nock(SANITY_URLS.carbonProjects)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [carbonProject],
          allProjectContent: [projectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          carbonProjects: [digitalCarbon.carbonProject],
        },
      });
    nock(GRAPH_URLS["polygon"].offsets).post("").reply(200, { data: {} });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
      data: {},
    });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-191-2008?network=polygon`,
    });
    const project = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(project.prices).toHaveLength(2);
  });

  test("Empty network param default is polygon", async () => {
    nock(SANITY_URLS.carbonProjects)
      .post("")
      .twice() // once for each query
      .reply(200, {
        data: {
          allProject: [carbonProject],
          allProjectContent: [projectContent],
        },
      });
    nock(GRAPH_URLS["polygon"].tokens).post("").reply(200, {
      data: {},
    });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          carbonProjects: [digitalCarbon.carbonProject],
        },
      });
    nock(GRAPH_URLS["polygon"].offsets).post("").reply(200, { data: {} });
    nock(GRAPH_URLS["polygon"].marketplace).post("").reply(200, {
      data: {},
    });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-981-2017`,
    });
    const project = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(project.prices).toHaveLength(2);
  });
});
