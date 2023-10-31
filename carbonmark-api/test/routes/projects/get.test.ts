import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import {
  aProject,
  aProjectContent,
} from "../../../src/.generated/mocks/carbonProjects.mocks";
import { GRAPH_URLS, SANITY_URLS } from "../../../src/app.constants";
import { formatUSDC } from "../../../src/utils/crypto.utils";
import marketplace from "../../fixtures/marketplace";
import bridgedCarbon from "../../fixtures/offsets";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const carbonProject = aProject({});
const carbonProjectContent = aProjectContent({ project: carbonProject });

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
  });
  afterEach(async () => await fastify.close());

  /** The happy path */
  test("Returns 200", async () => {
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [bridgedCarbon.offset] } });
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

  test.only("Composes a pool project with cms data", async () => {
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [bridgedCarbon.offset] } });

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [] } }); // no marketplace projects

    nock(SANITY_URLS["carbonProjects"])
      .post("", /getAllProjects/)
      .reply(200, { data: { allProject: [carbonProject] } });

    nock(SANITY_URLS["carbonProjects"])
      .post("", /getAllProjectContent/)
      .reply(200, { data: { allProjectContent: [carbonProjectContent] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        ...pick(carbonProject, [
          "description",
          "name",
          "methodologies",
          "region",
        ]),
        // applies short_description property from cms
        short_description: carbonProjectContent?.shortDescription,
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: bridgedCarbon.offset.projectID.split("-")[1],
        vintage: bridgedCarbon.offset.vintageYear,
        projectAddress: bridgedCarbon.offset.tokenAddress,
        // Takes registry tag
        registry: bridgedCarbon.offset.projectID.split("-")[0],
        updatedAt: bridgedCarbon.offset.lastUpdate,
        country: {
          id: carbonProject.country,
        },
        price: poolPrices.bct.defaultPrice,
        listings: null,
        key: bridgedCarbon.offset.projectID,
        location: {
          geometry: {
            coordinates: [
              carbonProject.geolocation?.lng,
              carbonProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: carbonProjectContent?.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.description,
        })),
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  test("Composes a marketplace listing with cms data", async () => {
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } });
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
        ...pick(carbonProject, ["description", "name", "methodologies"]),
        short_description: carbonProjectContent?.shortDescription,
        country: {
          id: carbonProject.country,
        },
        price: "99",
        updatedAt: marketplace.projectWithListing.listings?.[0].updatedAt,
        listings: [
          pick(marketplace.projectWithListing.listings![0], [
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
        location: {
          geometry: {
            coordinates: [
              carbonProject.geolocation?.lng,
              carbonProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: carbonProjectContent?.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.description,
        })),
      },
    ];

    //Partial match for now.. need to remove above fixture
    expect(data).toMatchObject(expectedResponse);
  });

  test("Best price is listing price", async () => {
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [bridgedCarbon.offset] } });

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
    expect(data[0].price).toStrictEqual(
      formatUSDC(cheapListing.singleUnitPrice)
    );
  });

  test("Best price is the lowest of 2 pool prices", async () => {
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, {
        data: {
          carbonOffsets: [
            {
              ...bridgedCarbon.offset,
              balanceBCT: "123",
              balanceNCT: "123",
            },
          ],
        },
      });

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: {
          projects: [marketplace.projectWithListing],
        },
      }); // override so listing is cheaper

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();
    expect(data[0].price).toStrictEqual(poolPrices.bct.defaultPrice);
  });
});
