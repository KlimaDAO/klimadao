import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { formatUSDC } from "../../../src/utils/crypto.utils";
import carbonProjects from "../../fixtures/carbonProjects";
import digitalCarbon from "../../fixtures/digitalCarbon";
import marketplace from "../../fixtures/marketplace";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

jest.mock("../../../src/utils/helpers/carbonProjects.utils", () => {
  const carbonProjectsUtils = jest.requireActual(
    "../../../src/utils/helpers/carbonProjects.utils"
  );
  return {
    ...carbonProjectsUtils,
    fetchAllCarbonProjects: jest.fn(() => {
      return [carbonProjects.carbonProject];
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

  test("Composes a pool project with cms data", async () => {
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
        ...pick(digitalCarbon.digitalCarbonProject, ["region"]),
        methodologies: [
          {
            id: carbonProjects.carbonProject.methodologies[0].id,
            category: carbonProjects.carbonProject.methodologies[0].category,
            name: carbonProjects.carbonProject.methodologies[0].name,
          },
        ],
        description: carbonProjects.carbonProject.description,
        name: carbonProjects.carbonProject.name,
        // applies short_description property from cms
        short_description:
          carbonProjects.carbonProject.content?.shortDescription,
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: digitalCarbon.digitalCarbonProject.projectID.split("-")[1],
        vintage:
          digitalCarbon.digitalCarbonProject.carbonCredits[0].vintage.toString(),
        projectAddress: digitalCarbon.digitalCarbonProject.carbonCredits[0].id,
        // Takes registry tag
        registry: digitalCarbon.digitalCarbonProject.id.split("-")[0],
        updatedAt:
          digitalCarbon.digitalCarbonProject.carbonCredits[0].poolBalances[0]
            .pool.dailySnapshots[0].lastUpdateTimestamp,
        country: {
          id: carbonProjects.carbonProject.country,
        },
        // no price on subgraph  yet
        price: "",
        listings: null,
        key: digitalCarbon.digitalCarbonProject.projectID,
        location: {
          geometry: {
            coordinates: [
              carbonProjects.carbonProject.geolocation?.lng,
              carbonProjects.carbonProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: carbonProjects.carbonProject.content?.images?.map((img) => ({
          url: img?.asset?.url,
          caption: img?.asset?.description,
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
        ...pick(carbonProjects.carbonProject, [
          "description",
          "name",
          "methodologies",
        ]),
        short_description:
          carbonProjects.carbonProject.content?.shortDescription,
        country: {
          id: carbonProjects.carbonProject.country,
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
              carbonProjects.carbonProject.geolocation?.lng,
              carbonProjects.carbonProject.geolocation?.lat,
            ],
            type: "Point",
          },
          type: "Feature",
        },
        images: carbonProjects.carbonProject.content?.images?.map((img) => ({
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

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: {
          projects: [
            {
              ...marketplace.projectWithListing,
              listings: [
                {
                  ...marketplace.projectWithListing.listings?.[0],
                  singleUnitPrice: "1234560",
                },
              ],
            },
          ],
        },
      }); // override so listing is cheaper

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();
    expect(data[1].price).toStrictEqual(poolPrices.bct.defaultPrice);
  });
});
