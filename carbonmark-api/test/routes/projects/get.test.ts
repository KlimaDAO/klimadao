import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/graphql/codegen.constants";
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
    nock(GRAPH_URLS.digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [digitalCarbon.carbonProject] } });
    nock(GRAPH_URLS.marketplace)
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
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { projects: [] } }); // no marketplace projects
    nock(GRAPH_URLS.digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [digitalCarbon.carbonProject] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });

    const data = response.json();

    const expectedResponse = [
      {
        ...pick(digitalCarbon.carbonProject, ["id"]),
        ...pick(carbonProjects.carbonProject, [
          "description",
          "name",
          "methodologies",
        ]),
        // applies short_description property from cms
        short_description:
          carbonProjects.carbonProject.content?.shortDescription,
        // always true for pool projects
        isPoolProject: true,
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: digitalCarbon.carbonProject.projectID.split("-")[1],
        vintage:
          digitalCarbon.carbonProject.carbonCredits[0].vintage.toString(),
        projectAddress: digitalCarbon.carbonProject.carbonCredits[0].id,
        // Takes registry tag
        registry: digitalCarbon.carbonProject.id.split("-")[0],
        updatedAt:
          digitalCarbon.carbonProject.carbonCredits[0].poolBalances[0].pool
            .dailySnapshots[0].lastUpdateTimestamp,

        category: {
          id: digitalCarbon.carbonProject.category,
        },
        country: {
          id: carbonProjects.carbonProject.country,
        },
        // no price on subgraph  yet
        price: "",
        listings: null,
        key: digitalCarbon.carbonProject.projectID,
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
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  test("Composes a marketplace listing with cms data", async () => {
    nock(GRAPH_URLS.digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } });
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { projects: [marketplace.projectWithListing] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        ...pick(marketplace.projectWithListing, [
          "projectAddress",
          "category",
          "vintage",
          "projectID",
          "registry",
        ]),
        ...pick(carbonProjects.carbonProject, [
          "description",
          "name",
          "methodologies",
        ]),
        id: marketplace?.projectWithListing.projectAddress,
        short_description:
          carbonProjects.carbonProject.content?.shortDescription,
        country: {
          id: carbonProjects.carbonProject.country,
        },
        price: "99",
        updatedAt: marketplace.projectWithListing.listings?.[0].updatedAt,
        listings: [
          pick(marketplace.projectWithListing.listings![0], [
            "id",
            "leftToSell",
            "tokenAddress",
            "singleUnitPrice",
          ]),
        ],
        key: `${marketplace.projectWithListing.registry}-${marketplace.projectWithListing.projectID}`,
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
        isPoolProject: false,
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  // test("Best price is listing price", async () => {
  //   nock(GRAPH_URLS.offsets)
  //     .post("")
  //     .reply(200, { data: { carbonProjects: [digitalCarbon.carbonProject] } });

  //   const cheapListing = {
  //     ...marketplace.projectWithListing.listings?.[0],
  //     singleUnitPrice: "111111", // 0.111111
  //   };

  //   nock(GRAPH_URLS.marketplace)
  //     .post("")
  //     .reply(200, {
  //       data: {
  //         projects: [
  //           {
  //             ...marketplace.projectWithListing,
  //             listings: [cheapListing],
  //           },
  //         ],
  //       },
  //     }); // override so listing is cheaper

  //   const response = await fastify.inject({
  //     method: "GET",
  //     url: `${DEV_URL}/projects`,
  //   });
  //   const data = response.json();
  //   expect(data[0].price).toStrictEqual(
  //     formatUSDC(cheapListing.singleUnitPrice)
  //   );
  // });

  // test("Best price is the lowest of 2 pool prices", async () => {
  //   nock(GRAPH_URLS.offsets)
  //     .post("")
  //     .reply(200, {
  //       data: {
  //         carbonOffsets: [
  //           {
  //             ...bridgedCarbon.offset,
  //             balanceBCT: "123",
  //             balanceNCT: "123",
  //           },
  //         ],
  //       },
  //     });

  //   nock(GRAPH_URLS.marketplace)
  //     .post("")
  //     .reply(200, {
  //       data: {
  //         projects: [marketplace.projectWithListing],
  //       },
  //     }); // override so listing is cheaper

  //   const response = await fastify.inject({
  //     method: "GET",
  //     url: `${DEV_URL}/projects`,
  //   });
  //   const data = response.json();
  //   expect(data[0].price).toStrictEqual(poolPrices.bct.defaultPrice);
  // });
});
