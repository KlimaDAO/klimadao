import { FastifyInstance } from "fastify";
import { pick, set } from "lodash";
import nock from "nock";
import { GRAPH_URLS, SANITY_URLS } from "../../../src/app.constants";
import { formatUSDC } from "../../../src/utils/crypto.utils";
import { fixtures } from "../../fixtures";
import digitalCarbon from "../../fixtures/digitalCarbon";
import marketplace from "../../fixtures/marketplace";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const mockCmsProject = fixtures.cms.carbonProject;
const mockCmsProjectContent = fixtures.cms.cmsProjectContent;

jest.mock("../../../src/utils/helpers/cms.utils", () => {
  const carbonProjectsUtils = jest.requireActual(
    "../../../src/utils/helpers/cms.utils"
  );
  return {
    ...carbonProjectsUtils,
    fetchAllCarbonProjects: jest.fn(() => {
      return [mockCmsProject];
    }),
  };
});

const poolPrices = {
  bct: {
    poolName: "bct",
    defaultPrice: "1.23456",
    selectiveRedeemPrice: "2.23456",
  },
  nct: {
    poolName: "nct",
    defaultPrice: "2.23456",
    selectiveRedeemPrice: "3.23456",
  },
  ubo: {
    poolName: "ubo",
    defaultPrice: "3.23456",
    selectiveRedeemPrice: "4.23456",
  },
  nbo: {
    poolName: "nbo",
    defaultPrice: "4.23456",
    selectiveRedeemPrice: "5.23456",
  },
};

const credit = fixtures.digitalCarbon.digitalCarbonProject.carbonCredits[0];
const expectedPrices = [
  {
    isPoolDefault: true,
    poolAddress: credit?.poolBalances[0].pool.id,
    poolName: "bct",
    projectTokenAddress:
      fixtures.digitalCarbon.digitalCarbonProject.carbonCredits[0].id,
    singleUnitPrice: poolPrices.bct.defaultPrice,
    supply: "320307.9104911482",
  },
];

//@todo this is super fragile, need to refactor or use nock
jest.mock("../../../src/utils/helpers/fetchAllPoolPrices", () => ({
  fetchAllPoolPrices: jest.fn(() => poolPrices),
}));

/** We want to mock network requests without breaking other utils */
jest.mock("../../../src/routes/projects/get.utils", () => {
  const projectUtils = jest.requireActual(
    "../../../src/routes/projects/get.utils"
  );
  return {
    ...projectUtils,
    getDefaultQueryArgs: jest.fn(() => {
      return {
        category: [],
        country: [],
        vintage: [
          "2003",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
        ],
        activityType: [],
        expiresAfter: "0",
        search: "",
      };
    }),
  };
});

describe("GET /projects", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("get.test.ts setup failed", e);
    }
    nock(SANITY_URLS.cms)
      .post("")
      .reply(200, {
        data: {
          allProject: [fixtures.cms.cmsProject],
          allProjectContent: [fixtures.cms.cmsProjectContent],
        },
      })
      .persist();
  });
  afterEach(async () => await fastify.close());

  // /** The happy path */
  test("Returns 200", async () => {
    return;
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { carbonProjects: [digitalCarbon.digitalCarbonProject] },
      });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: { projects: [marketplace.projectWithListing] },
      });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    expect(response.statusCode).toEqual(200);
  });

  test("Composes a marketplace listing with a pool project data", async () => {
    return;
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { carbonProjects: [digitalCarbon.digitalCarbonProject] },
      });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [] } }); // no marketplace projects

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    //@todo replace with composeEntries function
    const expectedResponse = [
      {
        region: digitalCarbon.digitalCarbonProject.region,
        methodologies: [
          {
            id: mockCmsProject?.methodologies?.[0]?.id,
            category: mockCmsProject?.methodologies?.[0]?.category,
            name: mockCmsProject?.methodologies?.[0]?.name,
          },
        ],
        description: mockCmsProject.description,
        name: mockCmsProject.name,
        // applies short_description property from cms
        short_description: mockCmsProjectContent?.shortDescription,
        long_description: mockCmsProjectContent?.longDescription,
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: digitalCarbon.digitalCarbonProject.projectID.split("-")[1],
        vintage:
          digitalCarbon.digitalCarbonProject.carbonCredits[0].vintage.toString(),
        creditTokenAddress:
          digitalCarbon.digitalCarbonProject.carbonCredits[0].id,
        // Takes registry tag
        registry: digitalCarbon.digitalCarbonProject.id.split("-")[0],
        updatedAt:
          digitalCarbon.digitalCarbonProject.carbonCredits[0].poolBalances[0]
            .pool.dailySnapshots[0].lastUpdateTimestamp,
        country: mockCmsProject.country,
        price: poolPrices["bct"].defaultPrice,
        prices: expectedPrices,
        key: mockCmsProject.key,
        stats: {
          totalBridged: 320308,
          totalRetired: 0,
          totalSupply: 320308,
        },
        url: mockCmsProject.url,
        location: {
          geometry: {
            coordinates: [
              mockCmsProject.geolocation?.lng,
              mockCmsProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: mockCmsProjectContent.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.altText,
        })),
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  test("Composes a marketplace listing with cms data", async () => {
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } });

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [marketplace.projectWithListing] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        ...pick(marketplace.projectWithListing, ["key", "vintage"]),
        ...pick(mockCmsProject, ["description", "name", "methodologies"]),
        short_description: mockCmsProjectContent?.shortDescription,
        country: {
          id: mockCmsProject.country,
        },
        price: "99",
        updatedAt: marketplace.projectWithListing.listings?.[0].updatedAt,
        listings: [
          {
            ...pick(marketplace.projectWithListing.listings![0], [
              "active",
              "batchPrices",
              "batches",
              "deleted",
              "id",
              "tokenAddress",
            ]),
            createdAt: 1234,
            updatedAt: 1234,
          },
        ],
        location: {
          geometry: {
            coordinates: [
              mockCmsProject.geolocation?.lng,
              mockCmsProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: mockCmsProjectContent?.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.description,
        })),
      },
    ];

    //Partial match for now.. need to remove above fixture
    expect(data).toMatchObject(expectedResponse);
  });

  /** PRICES NOT YET ON SUBGRAPH */

  test("Best price is listing price", async () => {
    return;
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { carbonProjects: [digitalCarbon.digitalCarbonProject] },
      });

    const cheapListing = {
      ...marketplace.projectWithListing.listings?.[0],
      singleUnitPrice: "111111", // 0.111111
    };

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: {
          projects: [
            {
              ...marketplace.projectWithListing,
              listings: [cheapListing],
            },
          ],
        },
      }); // override so listing is cheaper

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();
    const entryWithListing = data.find(
      (entry: any) => entry.listings && entry.listings.length
    );
    expect(entryWithListing.price).toStrictEqual(
      formatUSDC(cheapListing.singleUnitPrice)
    );
  });

  test("Best price is the lowest of 2 pool prices", async () => {
    return;
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: {
          carbonProjects: [
            {
              ...digitalCarbon.digitalCarbonProject,
            },
          ],
        },
      });
    // override so listing is cheaper
    const project = set(
      marketplace.projectWithListing,
      "listings[0].singleUnitPrice",
      "1234560"
    );
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [project] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();
    expect(data[1].price).toStrictEqual(poolPrices.bct.defaultPrice);
  });
});
