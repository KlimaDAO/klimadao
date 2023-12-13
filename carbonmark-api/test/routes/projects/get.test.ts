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

const mockCmsProject = fixtures.cms.cmsProject;
const mockCmsProjectContent = fixtures.cms.cmsProjectContent;
const mockMarketplaceListing = fixtures.marketplace.projectWithListing;

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
        vintage: [],
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

  test("Composes a pool project", async () => {
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
            id: mockCmsProject.methodologies?.[0]?.id,
            category: mockCmsProject?.methodologies?.[0]?.category,
            name: mockCmsProject?.methodologies?.[0]?.name,
          },
        ],
        description: mockCmsProject.description,
        name: mockCmsProject.name,
        // applies short_description property from cms
        short_description: mockCmsProjectContent?.shortDescription,
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
        country: {
          id: mockCmsProject.country,
        },
        price: poolPrices["bct"].defaultPrice,
        listings: null,
        key: digitalCarbon.digitalCarbonProject.projectID,
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
          caption: img?.asset?.description,
        })),
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  test("Composes a marketplace project", async () => {
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } });

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [mockMarketplaceListing] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        /** CMS DATA */
        description: mockCmsProject.description,
        name: mockCmsProject.name,
        methodologies: [
          pick(mockCmsProject.methodologies, ["category", "id", "name"]),
        ],
        country: {
          id: mockCmsProject.country,
        },
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

        /** CMS Project Content */
        short_description: mockCmsProjectContent?.shortDescription,
        images: mockCmsProjectContent?.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.description,
        })),

        /** Marketplace Data */
        vintage: mockMarketplaceListing.vintage,
        key: mockMarketplaceListing.key,
        updatedAt: marketplace.projectWithListing.listings?.[0].updatedAt,
        listings: [
          pick(mockMarketplaceListing.listings![0], [
            "active",
            "batchPrices",
            "batches",
            "createdAt",
            "deleted",
            "updatedAt",
            "id",
            "tokenAddress",
          ]),
        ],
        price: "99",
      },
    ];

    expect(data).toMatchObject(expectedResponse);
  });

  /** PRICES NOT YET ON SUBGRAPH */

  test("Best price is listing price", async () => {
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
