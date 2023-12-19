import { FastifyInstance } from "fastify";
import { compact, isNil, max, maxBy, minBy, sortBy } from "lodash";
import { concat, map, mapValues, min, pipe, toLower, trim, uniq } from "lodash/fp";
import { Geopoint } from "../../.generated/types/cms.types";
import { FindDigitalCarbonProjectsQuery, GetProjectCreditsQuery } from "../../.generated/types/digitalCarbon.types";
import { GetProjectsQuery } from "../../.generated/types/marketplace.types";
import { Listing } from "../..//models/Listing.model";
import { DetailedProject } from "../../models/DetailedProject.model";
import { Project } from "../../models/Project.model";
import { GeoJSONPoint } from "../../models/Utility.model";
import {
  CreditId,
  CreditIdentifier,
  ProjectIdentifier,
} from "../../utils/CreditId";
import { formatUSDC } from "../../utils/crypto.utils";
import { extract } from "../../utils/functional.utils";
import { GQL_SDK } from "../../utils/gqlSdk";
import { CarbonProject, SingleCarbonProject } from "../../utils/helpers/cms.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
import { getProjectPoolPricesAndStats } from "../../utils/helpers/getProjectPoolPricesAndStats";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
import { formatListing } from "../../utils/marketplace.utils";
import { POOL_INFO } from "./get.constants";

/**
 * Build a default FindProjectsQueryVariables object for searching
 * via findProjects
 * @param fastify
 * @returns
 *
 * # @todo these "first:1000" will possibly miss results if there are more than 1000
 * # this will cause a silent error. GQL Resolver needs to be updated to allow null search params
 * # to return all possible values
 */
export const getDefaultQueryArgs = async (
  sdk: GQL_SDK,
  fastify: FastifyInstance
) => {
  //Fetch all possible parameter values
  const [category, country, vintage] = await Promise.all([
    getAllCategories(sdk, fastify).then(map(extract("id"))),
    getAllCountries(sdk, fastify).then(map(extract("id"))),
    getAllVintages(sdk, fastify),
  ]);

  return {
    category,
    country,
    vintage,
    search: "",
    expiresAfter: Math.floor(Date.now() / 1000).toString(),
  };
};

/**
 * For a given project from polygon-bridged-carbon, returns array of pool price strings
 * Chooses between default and selective price.
 * Sorted cheapest first.
 */
type ProjectBalances = Record<
  string,
  { balance: string; creditTokenAddress: string }
>;

export const getDigitalCarbonTokenPrices = (
  digitalCarbonProject: CarbonProjectType,
  poolPrices: Record<string, PoolPrice>
) => {
  const poolAddressToKey: Record<string, string> = {};

  for (const [key, poolInfo] of Object.entries(POOL_INFO)) {
    poolAddressToKey[poolInfo.poolAddress.toLowerCase()] = key;
  }

  const tokenBalances: ProjectBalances = {};

  /**
   * @todo mc02 poolPrices are NaN because there is no default project
   */
  const credits = digitalCarbonProject.carbonCredits;

  for (const credit of credits) {
    if (credit.poolBalances.length === 0) continue;

    for (const poolBalance of credit.poolBalances) {
      const poolId = poolBalance.pool.id;
      const key = poolAddressToKey[poolId];

      tokenBalances[key] = {
        balance: poolBalance.balance,
        creditTokenAddress: credit.id,
      };
    }
  }

  const prices: string[] = [];
  ["ubo", "nbo", "nct", "bct"].forEach((token) => {
    if (tokenBalances[token]) {
      const isDefault =
        POOL_INFO[token].defaultProjectTokenAddress.toLowerCase() ===
        tokenBalances[token].creditTokenAddress.toLowerCase();
      const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
      prices.push(poolPrices.ubo[priceKey]);
    }
  });

  if (tokenBalances["mco2"]) {
    prices.push(poolPrices["mco2"]["selectiveRedeemPrice"]);
  }
  return sortBy(prices, (p) => Number(p));
};

export const toGeoJSON = (
  point?: Partial<Geopoint> | null
): GeoJSONPoint | null => {
  if (!point || isNil(point?.lat) || isNil(point?.lng)) return null;
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [point.lng, point.lat],
    },
  };
};

/**
 * For polygon-bridged-carbon subgraph projects
 * Returns true if project has >=1 tonne in any pool
 * */

export const isValidPoolProject = (project: CarbonProjectType) => {
  const balances = project.carbonCredits.flatMap(extract("poolBalances"));
  const addresses = Object.values(POOL_INFO)
    .map(extract("poolAddress"))
    .map(toLower);
  return balances.some(
    (balance) =>
      addresses.includes(balance.pool.id.toLowerCase()) &&
      Number(balance.balance) > 0
  );
};

/**
 * For marketplace subgraph projects
 * Returns true if project has an active, unexpired listing
 * */
export const isValidMarketplaceProject = (
  project: GetProjectsQuery["projects"][number]
) => {
  if (!project?.listings) return false;
  return !!project.listings.length;
};

/** The specific CarbonOffset type from the find findDigitalCarbon query*/
export type CarbonProjectType =
  FindDigitalCarbonProjectsQuery["carbonProjects"][number];

/** A key may have a marketplace entry, a pool entry, or both. */
type ProjectData = {
  key: CreditIdentifier;
  poolProjectData?: CarbonProjectType;
  marketplaceProjectData?: GetProjectsQuery["projects"][number];
};
/** Map project keys to gql and cms data */
export type ProjectDataMap = Map<CreditIdentifier, ProjectData>;

/** note: new projects may not have a CMS entry yet */
export type CMSDataMap = Map<ProjectIdentifier, CarbonProject>;

/** Given a marketplace entry, pool entry, or both - determine most recent updatedAt value */
const pickUpdatedAt = (data: ProjectData): string => {
  const listings = compact(data.marketplaceProjectData?.listings || []);
  const youngestListing = maxBy(listings, (l) => Number(l.updatedAt));
  // if project has listings, use that value first, because the pool `lastUpdate` value is less relevant for users
  const timestamps: string[] = [];
  data.poolProjectData?.carbonCredits.forEach((credit) => {
    credit.poolBalances.forEach((poolBalance) => {
      poolBalance.pool.dailySnapshots.forEach((snapshot) => {
        timestamps.push(snapshot.lastUpdateTimestamp);
      });
    });
  });

  const mostRecentTimestamp = max(timestamps);
  return youngestListing?.updatedAt ?? mostRecentTimestamp ?? "";
};

/** Given a marketplace entry, pool entry, or both - determine the lowest price */
const pickBestPrice = (
  data: ProjectData,
  poolPrices: Record<string, PoolPrice>
): string | undefined => {
  const listings = compact(data.marketplaceProjectData?.listings);
  // Careful, singleUnitPrice is a bigint string
  const cheapestListing = minBy(listings, (l) => BigInt(l.singleUnitPrice));
  const cheapestListingUSDC =
    cheapestListing?.singleUnitPrice &&
    formatUSDC(cheapestListing.singleUnitPrice);
  const allPoolPrices = data.poolProjectData
    ? getDigitalCarbonTokenPrices(data.poolProjectData, poolPrices)
    : [];

  const cheapestPoolPrice = minBy(allPoolPrices, (p) => Number(p));

  const bestPrice = minBy([
    Number(cheapestListingUSDC),
    Number(cheapestPoolPrice),
  ])?.toString();

  return bestPrice;
};



/**
 * Builds a project entry given data fetched from various sources
 * 
 */
export const buildProjectEntry = (props: {
  vintage: string,
  listings: Listing[],
  credits?: GetProjectCreditsQuery["carbonProjects"][0]["carbonCredits"],
  projectDetails: SingleCarbonProject
  allPoolPrices: Record<string, PoolPrice>,
  network: "polygon" | "mumbai" | undefined,
}): DetailedProject => {
  const [poolPrices, stats] = props.network === "polygon" && props.credits
  ? getProjectPoolPricesAndStats(
    props.credits, 
    props.allPoolPrices
  ) : [[], { totalBridged: 0, totalSupply: 0, totalRetired: 0 }]
  

  const poolPriceValues = poolPrices.map((p) => Number(p.singleUnitPrice));
  const listingPriceValues = compact(props.listings).map((l) =>
    Number(l.singleUnitPrice)
  );

  const bestPrice = pipe(
    concat,
    uniq,
    min
  )(poolPriceValues, listingPriceValues);

  const projectResponse: DetailedProject = {
    country: props.projectDetails.country,
    description: props.projectDetails.description,
    key: props.projectDetails.key,
    registry: props.projectDetails.registry,
    url: props.projectDetails.url,
    name: props.projectDetails.name,
    /** Sanitize category values */
    methodologies: props.projectDetails.methodologies?.map(mapValues(trim)) ?? [],
    short_description: props.projectDetails.shortDescription,
    long_description: props.projectDetails.longDescription,
    projectID: props.projectDetails.registryProjectId,
    location: toGeoJSON(props.projectDetails.geolocation),
    price: String(bestPrice ?? 0), // remove trailing zeros
    prices: poolPrices,
    images:
    props.projectDetails?.images?.map((image) => ({
        caption: image?.asset?.altText,
        url: image?.asset?.url,
      })) ?? [],
    listings: props.listings,
    vintage: props.vintage,
    stats,
  };
  return projectResponse;
}

/**
 * Combines pool, marketplace, and CMS project data with intelligent fallbacks.
 * Deduplicated, unsorted
 */
export const composeProjectEntries = (
  projectDataMap: ProjectDataMap,
  cmsDataMap: CMSDataMap,
  poolPrices: Record<string, PoolPrice>
): Project[] => {
  const entries: Project[] = [];
  projectDataMap.forEach((data) => {
    // rename vars for brevity
    const { marketplaceProjectData: market, poolProjectData: poolBalances } =
      data;
    const {
      projectId,
      standard: registry,
      registryProjectId,
    } = new CreditId(data.key);
    const carbonProject = cmsDataMap.get(projectId);
    /** If there are no prices hide this project */
    const price = pickBestPrice(data, poolPrices);
    if (!price) return;

    // construct CarbonmarkProjectT and make typescript happy
    const entry: Project = {
      //Remove string padding on methodologies
      methodologies: carbonProject?.methodologies?.map(mapValues(trim)) ?? [],
      description: carbonProject?.description || null,
      short_description: carbonProject?.content?.shortDescription || null,
      name: carbonProject?.name || poolBalances?.name || "",
      location: toGeoJSON(carbonProject?.geolocation),
      country: {
        id: carbonProject?.country || poolBalances?.country || "",
      },
      images: carbonProject?.content?.images?.map((img) => ({
        url: img?.asset?.url ?? "",
        caption: img?.asset?.description ?? "",
      })),
      key: projectId,
      registry,
      region: carbonProject?.region || "",
      projectID: registryProjectId,
      vintage:
        poolBalances?.carbonCredits[0].vintage.toString() ??
        market?.vintage ??
        "",
      creditTokenAddress: poolBalances?.carbonCredits?.[0].id ?? "",
      updatedAt: pickUpdatedAt(data),
      listings: market?.listings?.map(formatListing) || null,
      price,
    };

    entries.push(entry);
  });
  return entries;
};
