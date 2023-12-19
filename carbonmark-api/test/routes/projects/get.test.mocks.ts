import nock from "nock";
import { CarbonProject } from "src/.generated/types/digitalCarbon.types";
import { Project } from "src/.generated/types/marketplace.types";
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

export const mockDigitalCarbonProjects = (override?: CarbonProject[]) =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("", (body) => body.query.includes("findDigitalCarbonProjects"))
    .reply(200, {
      data: {
        carbonProjects: override ?? [
          fixtures.digitalCarbon.digitalCarbonProject,
        ],
      },
    });

export const mockDigitalCarbonArgs = () =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("", (body) => body.query.includes("getDigitalCarbonProjectsVintages"))
    .reply(200, {
      data: {
        carbonProjects: [
          {
            carbonCredits: [
              {
                vintage: 2011,
              },
              {
                vintage: 2012,
              },
              {
                vintage: 2013,
              },
              {
                vintage: 2014,
              },
              {
                vintage: 2015,
              },
              {
                vintage: 2016,
              },
              {
                vintage: 2017,
              },
              {
                vintage: 2018,
              },
              {
                vintage: 2019,
              },
              {
                vintage: 2020,
              },
              {
                vintage: 2021,
              },
            ],
          },
        ],
      },
    })
    .post("", (body) =>
      body.query.includes("getDigitalCarbonProjectsCategories")
    )
    .reply(200, {
      data: {
        carbonProjects: [
          {
            category: "Energy Efficiency",
          },
          {
            category: "Renewable Energy",
          },
          {
            category: "Other",
          },
        ],
      },
    })
    .post("", (body) =>
      body.query.includes("getDigitalCarbonProjectsCountries")
    )
    .reply(200, {
      data: {
        carbonProjects: [
          {
            country: "Brazil",
          },
          {
            country: "India",
          },
        ],
      },
    });

export const mockMarketplaceProjects = (override?: Project[]) =>
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("", (body) => body.query.includes("getProjects"))
    .reply(200, {
      data: { projects: override ?? [fixtures.marketplace.projectWithListing] },
    });

//Mocks all categories, countries and vintages
export const mockMarketplaceArgs = () =>
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("", (body) => body.query.includes("getCategories"))
    .reply(200, {
      data: {
        categories: [
          {
            id: "Blue Carbon",
          },
          {
            id: "Forestry",
          },
          {
            id: "Other",
          },
          {
            id: "Renewable Energy",
          },
        ],
      },
    })
    .post("", (body) => body.query.includes("getCountries"))
    .reply(200, {
      data: {
        countries: [
          {
            id: "Brazil",
          },
          {
            id: "Chile",
          },
          {
            id: "China",
          },
          {
            id: "Congo",
          },
          {
            id: "Ecuador",
          },
          {
            id: "India",
          },
          {
            id: "Myanmar",
          },
        ],
      },
    })
    .post("", (body) => body.query.includes("getVintages"))
    .reply(200, {
      data: {
        projects: [
          {
            vintage: "2012",
          },
          {
            vintage: "2015",
          },
          {
            vintage: "2015",
          },
          {
            vintage: "2017",
          },
          {
            vintage: "2016",
          },
          {
            vintage: "2020",
          },
          {
            vintage: "2013",
          },
          {
            vintage: "2020",
          },
          {
            vintage: "2018",
          },
          {
            vintage: "2008",
          },
          {
            vintage: "2010",
          },
          {
            vintage: "2008",
          },
          {
            vintage: "2011",
          },
          {
            vintage: "2017",
          },
          {
            vintage: "2010",
          },
        ],
      },
    });
