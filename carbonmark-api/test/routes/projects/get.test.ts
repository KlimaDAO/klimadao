import { FastifyInstance } from "fastify";
import { cloneDeep, pick, set } from "lodash";
import nock from "nock";
import {
  Project as CmsProject,
  Maybe,
  ProjectContent,
  Slug,
} from "../../../src/.generated/types/cms.types";
import {
  CarbonProject,
  Registry,
} from "../../../src/.generated/types/digitalCarbon.types";
import { Project as MarketplaceProject } from "../../../src/.generated/types/marketplace.types";
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

const anotherCarbonProject: CarbonProject = {
  ...cloneDeep(mockDigitalCarbonProject),
  id: "VCS-111",
  projectID: "VCS-111",
  registry: Registry.VERRA,
};
const anotherMarketplaceProject: MarketplaceProject = {
  ...cloneDeep(mockMarketplaceProject),
  id: "VCS-111-2000",
  key: "VCS-111",
  registry: "VCS",
  vintage: "2000",
};
const anotherCmsProject: CmsProject = {
  ...cloneDeep(mockCmsProject),
  registryProjectId: "111",
  id: "VCS-111" as unknown as Maybe<Slug>,
};

const anotherCmsProjectContent: ProjectContent = cloneDeep(
  mockCmsProjectContent
);
(anotherCmsProjectContent.project as any).registryProjectId = "111";

const credit = fixtures.digitalCarbon.digitalCarbonProject.carbonCredits[0];
const expectedPrices = [
  {
    isPoolDefault: true,
    poolAddress: credit?.poolBalances[0].pool.id,
    poolName: "bct",
    projectTokenAddress:
      fixtures.digitalCarbon.digitalCarbonProject.carbonCredits[0].id,
    singleUnitPrice: "0.267999",
    supply: "320307.9104911482",
  },
];
const expectedImages = mockCmsProjectContent.images?.map((img) => ({
  url: img?.asset?.url,
  caption: img?.asset?.altText,
}));

describe("GET /projects", () => {
  let fastify: FastifyInstance;

  afterEach(async () => {
    await fastify.close();
  });

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  // Setup default mocks
  beforeEach(async () => {
    mockMarketplaceArgs();

    mockDigitalCarbonArgs();
    mockTokens();
    mockCms({
      projects: [mockCmsProject, anotherCmsProject],
      content: [mockCmsProjectContent, anotherCmsProjectContent],
    });
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
        long_description: mockCmsProjectContent?.longDescription,
        // Takes numeric from full id, "VCS-191" -> "191"
        projectID: mockDigitalCarbonProject.projectID.split("-")[1],
        vintage: mockDigitalCarbonProject.carbonCredits[0].vintage.toString(),
        creditTokenAddress: mockDigitalCarbonProject.carbonCredits[0].id,
        // Takes registry tag
        registry: mockDigitalCarbonProject.id.split("-")[0],
        updatedAt:
          mockDigitalCarbonProject.carbonCredits[0].poolBalances[0].pool
            .dailySnapshots[0].lastUpdateTimestamp,
        country: mockCmsProject.country,
        price: "0.267999",
        prices: expectedPrices,
        key: mockDigitalCarbonProject.projectID,
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
        images: expectedImages,
        listings: [],
        hasSupply: true,
      },
    ];

    expect(data).toStrictEqual(expectedResponse);
  });

  test("Composes a marketplace project", async () => {
    mockMarketplaceProjects();

    // //No digital carbon projects
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
        country: mockCmsProject.country,
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
        hasSupply: true,

        /** CMS Project Content */
        short_description: mockCmsProjectContent?.shortDescription,
        images: expectedImages,

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

  describe("Supply filtering", () => {
    let projects: Project[];

    test("No filtering when supply greater than 0 (DigitalCarbon)", async () => {
      mockMarketplaceProjects([]);
      //Return two projects with supply
      mockDigitalCarbonProjects([
        mockDigitalCarbonProject,
        anotherCarbonProject,
      ]);

      projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(2);
    });

    test("No filtering when supply greater than 0 (Marketplace)", async () => {
      //Mock digital carbon with no supply
      mockDigitalCarbonProjects([]);
      mockMarketplaceProjects([
        mockMarketplaceProject,
        anotherMarketplaceProject,
      ]);

      projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(2);
    });

    test("DigitalCarbon projects are filtered", async () => {
      //Mock digital carbon with no supply
      const emptyCarbonProject = set(
        cloneDeep(anotherCarbonProject),
        "carbonCredits[0].poolBalances[0].balance",
        "0"
      );
      mockDigitalCarbonProjects([mockDigitalCarbonProject, emptyCarbonProject]);

      //Remove all marketplace projects
      mockMarketplaceProjects([]);

      projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(1);

      expect(projects.at(0)?.key).toBe("VCS-191");
    });

    test("Marketplace projects are filtered", async () => {
      //Mock no digitalCarbon projects
      mockDigitalCarbonProjects([]);

      const emptyMarketplaceProject = set(
        cloneDeep(anotherMarketplaceProject),
        "listings[0].leftToSell",
        "0"
      );

      //Mock two projects
      mockMarketplaceProjects([
        mockMarketplaceProject,
        emptyMarketplaceProject,
      ]);

      projects = await mock_fetch(fastify, "/projects");

      //Only one should be returned
      expect(projects.length).toBe(1);
      //Confirm the correct supply is present
      expect(
        Number(projects.at(0)?.listings?.at(0)?.leftToSell)
      ).toBeGreaterThan(0);
    });
  });

  describe("Duplicate filtering", () => {
    const duplicateMarketplaceProject = cloneDeep(mockMarketplaceProject);
    const duplicateDigitalCarbonProject = cloneDeep(mockDigitalCarbonProject);

    test("Marketplace projects", async () => {
      mockMarketplaceProjects([
        mockMarketplaceProject,
        duplicateMarketplaceProject,
      ]);
      mockDigitalCarbonProjects([]);

      const projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(1);
    });
    test("DigitalCarbon projects", async () => {
      mockMarketplaceProjects([]);
      //Return two projects with supply
      mockDigitalCarbonProjects([
        mockDigitalCarbonProject,
        duplicateDigitalCarbonProject,
      ]);
      const projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(1);
    });
    test("Marketplace & DigitalCarbon projects", async () => {
      mockMarketplaceProjects([mockMarketplaceProject]);
      /** Make sure this carbon project matches the marketplace project */
      const matchingCarbonProject = set(
        cloneDeep(mockDigitalCarbonProject),
        "carbonCredits[0].vintage",
        "2008"
      );
      //Return two projects with supply
      mockDigitalCarbonProjects([matchingCarbonProject]);
      const projects = await mock_fetch(fastify, "/projects");
      expect(projects.length).toBe(1);
    });
  });

  test("Subgraph fields should be sanitised", async () => {
    mockMarketplaceProjects();
    mockDigitalCarbonProjects();
    const modifiedCmsProject = cloneDeep(fixtures.cms.cmsProject);
    set(modifiedCmsProject, "country", "China");
    /**@todo add other fields */
    mockCms({ projects: [modifiedCmsProject] });

    const projects: Project[] = await mock_fetch(fastify, "/projects");
    expect(projects.length).toBe(2);
    expect(projects.at(0)?.country).toBe("China");
  });

  test.todo("Same asset in multiple pools and listings");

  test.todo(
    "Different assets (of the same credit) in multiple pools and listings"
  );
});
