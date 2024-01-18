import nock, { Interceptor } from "nock";
import {
  Project as CMSProject,
  ProjectContent as CMSProjectContent,
} from "src/.generated/types/cms.types";
import { CarbonProject } from "src/.generated/types/digitalCarbon.types";
import { Project } from "src/.generated/types/marketplace.types";
import { GRAPH_URLS, ICR_API, SANITY_URLS } from "../../../src/app.constants";
import { COUNTRY_CODES, VINTAGES } from "../../../test/fixtures/icr";
import { fixtures } from "../../fixtures";

/**
 * We need to track the interceptor so we can remove nocks later
 * @todo do this for all other nocks or in a more repeatable manner
 */
let cmsInterceptor: Interceptor;

const ICR_API_URL = ICR_API("polygon").ICR_API_URL;

export const mockCms = (overrides?: {
  projects?: CMSProject[];
  content?: CMSProjectContent[];
}) => {
  if (cmsInterceptor) nock.removeInterceptor(cmsInterceptor);
  cmsInterceptor = nock(SANITY_URLS.cms).post("", (body) =>
    body.query.includes("getAllCMSProjects")
  );
  return cmsInterceptor
    .reply(200, {
      data: {
        allProject: overrides?.projects ?? [fixtures.cms.cmsProject],
      },
    })
    .post("", (body) => body.query.includes("getAllCMSProjectContent"))
    .reply(200, {
      data: {
        allProjectContent: overrides?.content ?? [
          fixtures.cms.cmsProjectContent,
        ],
      },
    });
};

export const mockICRFilters = () =>
  nock(ICR_API_URL).persist().get("/public/projects/filters").reply(200, {
    vintages: VINTAGES,
    countryCodes: COUNTRY_CODES,
  });

export const mockTokens = () =>
  nock(GRAPH_URLS["polygon"].tokens)
    .post("", (body) => body.query.includes("getPoolPrices"))
    .reply(200, {
      data: { prices: fixtures.tokens.prices },
    });

export const mockDigitalCarbonProjects = (override?: CarbonProject[]) => {
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("", (body) => body.query.includes("findDigitalCarbonProjects"))
    .reply(200, {
      data: {
        carbonProjects: override ?? [
          fixtures.digitalCarbon.digitalCarbonProject,
        ],
      },
    });
};

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

export const mockMarketplaceProjects = (override?: Project[]) => {
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("", (body) => body.query.includes("getProjects"))
    .reply(200, {
      data: { projects: override ?? [fixtures.marketplace.projectWithListing] },
    });

  nock(GRAPH_URLS["mumbai"].marketplace)
    .post("")
    .reply(200, {
      data: { projects: [fixtures.marketplace.projectWithListing] },
    });
};
//Mocks all categories, countries and vintages
export const mockMarketplaceArgs = () => {
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
};
