import nock from "nock";
import { GRAPH_URLS, SANITY_URLS } from "../../../src/app.constants";
import { fixtures } from "../../fixtures";

export const mockCms = () =>
  nock(SANITY_URLS.cms)
    .post("")
    .reply(200, {
      data: {
        allProject: [fixtures.cms.cmsProject],
        allProjectContent: [fixtures.cms.cmsProjectContent],
      },
    })
    .persist();

export const mockTokens = () =>
  nock(GRAPH_URLS["polygon"].tokens)
    .post("")
    .reply(200, {
      data: { prices: fixtures.tokens.prices },
    });

export const mockDigitalCarbon = () =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("")
    .reply(200, {
      data: { carbonProjects: [fixtures.digitalCarbon.digitalCarbonProject] },
    });

export const mockMarketplace = () =>
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("")
    .reply(200, {
      data: { projects: [fixtures.marketplace.projectWithListing] },
    });
