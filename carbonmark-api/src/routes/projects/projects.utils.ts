import { FastifyInstance } from "fastify";
import { compact, maxBy, minBy, sortBy } from "lodash";
import { map } from "lodash/fp";
import { FindProjectsQueryVariables } from "src/.generated/types/marketplace.types";
import { Geopoint } from "../../.generated/types/carbonProjects.types";
import { formatUSDC } from "../../utils/crypto.utils";
import { extract } from "../../utils/functional.utils";
import { CarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
import { ProjectEntry } from "./get.schema";
import { POOL_INFO } from "./projects.constants";
import { FindQueryOffset, FindQueryProject } from "./projects.types";

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
  fastify: FastifyInstance
): Promise<FindProjectsQueryVariables> => {
  //Fetch all possible parameter values
  const [category, country, vintage] = await Promise.all([
    getAllCategories(fastify).then(map(extract("id"))),
    getAllCountries(fastify).then(map(extract("id"))),
    getAllVintages(fastify),
  ]);

  return {
    category,
    country,
    vintage,
    search: "",
  };
};

/**
 * For a given project from polygon-bridged-carbon, returns array of pool price strings
 * Chooses between default and selective price.
 * Sorted cheapest first.
 */
export const getOffsetTokenPrices = (
  offset: FindQueryOffset,
  poolPrices: Record<string, PoolPrice>
) => {
  const prices: string[] = [];
  if (parseFloat(offset.balanceUBO) >= 1) {
    const isDefault =
      POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.ubo[priceKey]);
  }
  if (parseFloat(offset.balanceNBO) >= 1) {
    const isDefault =
      POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nbo[priceKey]);
  }
  if (parseFloat(offset.balanceNCT) >= 1) {
    const isDefault =
      POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nct[priceKey]);
  }
  if (parseFloat(offset.balanceBCT) >= 1) {
    const isDefault =
      POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.bct[priceKey]);
  }
  return sortBy(prices, (p) => Number(p));
};

export const toGeoJSON = (
  point?: Partial<Geopoint> | null
): ProjectEntry["location"] => {
  if (!point?.lat || !point?.lng) return null;
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
export const isValidPoolProject = (project: FindQueryOffset) => {
  const validProjects = [
    project.balanceBCT,
    project.balanceNCT,
    project.balanceUBO,
    project.balanceNBO,
  ].filter((bal) => Number(bal) >= 1);
  return !!validProjects.length;
};

/**
 * For marketplace subgraph projects
 * Returns true if project has >=1 tonne in any active, unexpired listing
 * */
export const isValidMarketplaceProject = (project: FindQueryProject) => {
  if (!project.listings) return false;
  const validProjects = project.listings.filter((listing) => {
    return (
      !!listing.active && !listing.deleted && BigInt(listing.leftToSell) >= 1
    );
  });
  return !!validProjects.length;
};

/** @example "VCS-191-2008" */
type ProjectKey = string;
/** A key may have a marketplace entry, a pool entry, or both. */
type ProjectData = {
  key: ProjectKey;
  poolProjectData?: FindQueryOffset;
  marketplaceProjectData?: FindQueryProject;
};
/** Map project keys to gql and cms data */
export type ProjectDataMap = Map<ProjectKey, ProjectData>;

/** @example "VCS-191" */
type ProjectId = string;
/** note: new projects may not have a CMS entry yet */
export type CMSDataMap = Map<ProjectId, CarbonProject>;

/** Given a marketplace entry, pool entry, or both - determine most recent updatedAt value */
const pickUpdatedAt = (data: ProjectData): string => {
  const listings = compact(data.marketplaceProjectData?.listings || []);
  const youngestListing = maxBy(listings, (l) => Number(l.updatedAt));
  // if project has listings, use that value first, because the pool `lastUpdate` value is less relevant for users
  return youngestListing?.updatedAt ?? data.poolProjectData?.lastUpdate ?? "";
};

/** Given a marketplace entry, pool entry, or both - determine the lowest price */
const pickBestPrice = (
  data: ProjectData,
  poolPrices: Record<string, PoolPrice>
): string => {
  const listings = compact(data.marketplaceProjectData?.listings || []);
  // Careful, singleUnitPrice is a bigint string
  const cheapestListing = minBy(listings, (l) => BigInt(l.singleUnitPrice));
  const cheapestListingUSDC =
    cheapestListing?.singleUnitPrice &&
    formatUSDC(cheapestListing.singleUnitPrice);

  const allPoolPrices = data.poolProjectData
    ? getOffsetTokenPrices(data.poolProjectData, poolPrices)
    : [];
  const cheapestPoolPrice = minBy(allPoolPrices, (p) => Number(p));

  const bestPrice =
    minBy([
      Number(cheapestListingUSDC),
      Number(cheapestPoolPrice),
    ])?.toString() || "";
  return bestPrice;
};

/**
 * Combines pool, marketplace, and CMS project data with intelligent fallbacks.
 * Deduplicated, unsorted
 */
export const composeProjectEntries = (
  projectDataMap: ProjectDataMap,
  cmsDataMap: CMSDataMap,
  poolPrices: Record<string, PoolPrice>
) => {
  const entries: ProjectEntry[] = [];
  projectDataMap.forEach((data) => {
    // rename vars for brevity
    const { marketplaceProjectData: market, poolProjectData: pool } = data;

    // construct projectId and check if cmsData exists
    const [reg, regId] = data.key.split("-");
    const projectId = `${reg}-${regId}`;
    const carbonProject = cmsDataMap.get(projectId);

    const methodologies =
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- methodology properties should never be null
      (carbonProject?.methodologies as ProjectEntry["methodologies"]) || [];

    // construct ProjectEntry and make typescript happy
    const entry: ProjectEntry = {
      methodologies,
      description: carbonProject?.description || null,
      short_description: carbonProject?.content?.shortDescription || null,
      name: carbonProject?.name || pool?.name || market?.name || "",
      location: toGeoJSON(carbonProject?.geolocation),
      country: {
        id: carbonProject?.country || pool?.country || market?.region || "",
      },
      key: data.key,
      registry: pool?.projectID.split("-")[0] ?? market?.registry ?? "",
      projectID: pool?.projectID.split("-")[1] ?? market?.registry ?? "",
      vintage: pool?.vintageYear ?? market?.vintage ?? "",
      projectAddress: pool?.tokenAddress ?? market?.projectAddress,
      updatedAt: pickUpdatedAt(data),
      price: pickBestPrice(data, poolPrices),
      listings: market?.listings || null, // null for pool projects
      /** DEPRECATED */
      isPoolProject: !!pool,
      /** DEPRECATED in favor of projectAddress */
      id: pool?.id ?? market?.projectAddress,
      /** DEPRECATED in favor of methodologies array */
      category: {
        id: market?.methodology ?? pool?.methodologyCategory ?? "",
      },
    };

    entries.push(entry);
  });
  return entries;
};
