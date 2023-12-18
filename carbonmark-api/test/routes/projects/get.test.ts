import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { CarbonProject } from "src/.generated/types/digitalCarbon.types";
import { GRAPH_URLS } from "../../../src/app.constants";
import { Project } from "../../../src/models/Project.model";
import { formatUSDC } from "../../../src/utils/crypto.utils";
import { fixtures } from "../../fixtures";
import marketplace from "../../fixtures/marketplace";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mock_fetch } from "../../test.utils";
import {
  mockCms,
  mockDigitalCarbonArgs,
  mockDigitalCarbonProjects,
  mockMarketplaceArgs,
  mockMarketplaceProjects,
  mockTokens,
} from "./get.test.mocks";

const mockCmsProject = fixtures.cms.cmsProject;
const mockCmsProjectContent = fixtures.cms.cmsProjectContent;
const mockMarketplaceProject = fixtures.marketplace.projectWithListing;
const mockDigitalCarbonProject = fixtures.digitalCarbon.digitalCarbonProject;

describe("GET /projects", () => {
  let fastify: FastifyInstance;

  afterEach(async () => await fastify.close());

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  // Setup default mocks
  beforeEach(async () => {
    mockMarketplaceArgs().persist(true);
    mockDigitalCarbonArgs().persist(true);
    mockTokens().persist(true);
    mockCms().persist(true);
  });

  // /** The happy path */
  test("Returns 200", async () => {
    mockMarketplaceProjects();
    mockDigitalCarbonProjects();

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    expect(response.statusCode).toEqual(200);
  });

  test("Composes a pool project", async () => {
    mockDigitalCarbonProjects();

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        region: mockDigitalCarbonProject.region,
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
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: mockDigitalCarbonProject.projectID.split("-")[1],
        vintage: mockDigitalCarbonProject.carbonCredits[0].vintage.toString(),
        creditTokenAddress: mockDigitalCarbonProject.carbonCredits[0].id,
        // Takes registry tag
        registry: mockDigitalCarbonProject.id.split("-")[0],
        updatedAt:
          mockDigitalCarbonProject.carbonCredits[0].poolBalances[0].pool
            .dailySnapshots[0].lastUpdateTimestamp,
        country: {
          id: mockCmsProject.country,
        },
        //This price is a result of the mock in `fixtures.tokens`
        price: "0.267999",
        listings: null,
        key: mockDigitalCarbonProject.projectID,
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
    mockMarketplaceProjects();

    //No digital carbon projects
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = response.json();

    const expectedResponse = [
      {
        /** CMS DATA */
        ...pick(marketplace.projectWithListing, ["key", "vintage"]),
        ...pick(mockCmsProject, ["description", "name"]),
        methodologies: [
          pick(mockCmsProject.methodologies?.[0], ["category", "id", "name"]),
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
    mockDigitalCarbonProjects();

    const cheapListing = {
      ...marketplace.projectWithListing.listings?.[0],
      singleUnitPrice: "111111", // 0.111111
    };

    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: {
          projects: [{ ...mockMarketplaceProject, listings: [cheapListing] }],
        },
      });

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
    mockDigitalCarbonProjects();
    mockMarketplaceProjects();

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

  test("Projects with 'dust' (supply less than 1 tonne) should be filtered", async () => {
    mockMarketplaceProjects().persist(true);

    const zeroSupplyProject: CarbonProject = {
      ...mockDigitalCarbonProject,
      id: "VCS-000",
    };

    //Mock to return two projects with supply
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("", (body) => body.query.includes("findDigitalCarbonProjects"))
      .reply(200, {
        data: {
          carbonProjects: [mockDigitalCarbonProject, zeroSupplyProject],
        },
      });

    let projects: Project[] = await mock_fetch(fastify, "/projects");
    expect(projects.length).toBe(2);

    //Set the balance to less than 1
    zeroSupplyProject.carbonCredits[0].poolBalances[0].balance = "0";

    //Mock digital carbon with no supply
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("", (body) => body.query.includes("findDigitalCarbonProjects"))
      .reply(200, {
        data: {
          carbonProjects: [mockDigitalCarbonProject, zeroSupplyProject],
        },
      });

    projects = await mock_fetch(fastify, "/projects");
    expect(projects.length).toBe(1);
  });
});

test.skip("Projects with 0 price across all assets should be filtered", () => {});

test.skip("There should be no duplicates in the results", () => {});

test.skip("Project fields should be sanitised", () => {});

test.skip("Filters work as expected", () => {});

test.skip("Same asset in multiple pools and listings", () => {});

test.skip("Different assets (of the same credit) in multiple pools and listings", () => {});
