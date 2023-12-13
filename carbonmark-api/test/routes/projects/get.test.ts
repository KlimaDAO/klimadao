import { FastifyInstance } from "fastify";
import { pick } from "lodash";
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
const mockMarketplaceProject = fixtures.marketplace.projectWithListing;

// const poolPrices = {
//   bct: {
//     poolName: "bct",
//     defaultPrice: "1.23456",
//     selectiveRedeemPrice: "2.23456",
//   },
//   nct: {
//     poolName: "nct",
//     defaultPrice: "2.23456",
//     selectiveRedeemPrice: "3.23456",
//   },
//   ubo: {
//     poolName: "ubo",
//     defaultPrice: "3.23456",
//     selectiveRedeemPrice: "4.23456",
//   },
//   nbo: {
//     poolName: "nbo",
//     defaultPrice: "4.23456",
//     selectiveRedeemPrice: "5.23456",
//   },
// };

/**
 * These prices were taken from:
 * https://api.thegraph.com/subgraphs/name/klimadao/klimadao-pairs/graphql?query=query+getPoolPrices+%7B%0A++prices%3A+pairs+%7B%0A++++address%3A+id%0A++++price%3A+currentprice%0A++%7D%0A%7D
 */
const poolPrices = [
  {
    address: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
    price: "0.311174065811505447018165551152376",
  },
  {
    address: "0x251ca6a70cbd93ccd7039b6b708d4cb9683c266c",
    price: "0.8529955578518731393522091442647001",
  },
  {
    address: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
    price: "0.6492787471397749867199739284682707",
  },
  {
    address: "0x5786b267d35f9d011c4750e0b0ba584e1fdbead1",
    price: "1.092628601152088880161020307822194",
  },
  {
    address: "0x64a3b8ca5a7e406a78e660ae10c7563d9153a739",
    price: "0.7481205011989642003183059989606811",
  },
  {
    address: "0x9803c7ae526049210a1725f7487af26fe2c24614",
    price: "0.3138886194197642137304571092583792",
  },
  {
    address: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
    price: "1.171491410337993099122290956500872",
  },
];

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

    nock(GRAPH_URLS["polygon"].tokens)
      .post("")
      .reply(200, {
        data: { prices: poolPrices },
      });
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
        price: "0.313889",
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
      .reply(200, { data: { projects: [mockMarketplaceProject] } });

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
        vintage: mockMarketplaceProject.vintage,
        key: mockMarketplaceProject.key,
        updatedAt: marketplace.projectWithListing.listings?.[0].updatedAt,
        listings: [
          {
            ...pick(mockMarketplaceProject.listings![0], [
              "active",
              "batchPrices",
              "batches",
              "deleted",
              "id",
              "tokenAddress",
            ]),
            updatedAt: Number(mockMarketplaceProject.listings![0].updatedAt),
            createdAt: Number(mockMarketplaceProject.listings![0].createdAt),
          },
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
          carbonProjects: [digitalCarbon.digitalCarbonProject],
        },
      });
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [mockMarketplaceProject] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();
    expect(data[1].price).toStrictEqual(
      //Because BigInt is converted to a string etc we need to do this nonsense
      Math.floor(
        Number(
          formatUSDC(
            mockMarketplaceProject.listings?.[0].singleUnitPrice ?? "0"
          )
        )
      ).toString()
    );
  });
});
