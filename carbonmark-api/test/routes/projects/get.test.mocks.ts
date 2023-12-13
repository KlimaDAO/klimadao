import nock from "nock";
import { GRAPH_URLS, SANITY_URLS } from "../../../src/app.constants";
import { fixtures } from "../../fixtures";

export const mockCms = () =>
  nock(SANITY_URLS.cms)
    .post("", (body) => body.query.includes("getAllCMSProjects"))
    .reply(200, {
      data: {
        allProject: [fixtures.cms.cmsProject],
      },
    })
    .post("", (body) => body.query.includes("getAllCMSProjectContent"))
    .reply(200, {
      data: {
        allProjectContent: [fixtures.cms.cmsProjectContent],
      },
    })
    .persist();

export const mockTokens = () =>
  nock(GRAPH_URLS["polygon"].tokens)
    .post("", (body) => body.query.includes("getPoolPrices"))
    .reply(200, {
      data: { prices: fixtures.tokens.prices },
    });

export const mockDigitalCarbon = () =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("", (body) => body.query.includes("findDigitalCarbonProjects"))
    .reply(200, {
      data: { carbonProjects: [fixtures.digitalCarbon.digitalCarbonProject] },
    });

export const mockMarketplace = () =>
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("", (body) => body.query.includes("getProjects"))
    .reply(200, {
      data: { projects: [fixtures.marketplace.projectWithListing] },
    });
