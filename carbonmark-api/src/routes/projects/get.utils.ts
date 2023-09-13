import { FastifyInstance } from "fastify";
import { compact, isNil, maxBy, minBy, sortBy } from "lodash";
import { map } from "lodash/fp";
import { FindQueryDigitalCarbon } from "src/graphql/digitalCarbon.types";
import { Geopoint } from "../../.generated/types/carbonProjects.types";
import { FindProjectsQueryVariables } from "../../.generated/types/marketplace.types";
import { FindQueryProject } from "../../graphql/marketplace.types";
import { Project } from "../../models/Project.model";
import { GeoJSONPoint } from "../../models/Utility.model";

import {
  CreditId,
  CreditIdentifier,
  ProjectIdentifier,
} from "../../utils/CreditId";
import { formatUSDC } from "../../utils/crypto.utils";
import { extract } from "../../utils/functional.utils";
import { CarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
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
// is balance === price?

type ProjectBalances = Record<string, string>;

export const getDigitalCarbonTokenPrices = (
  digitalCarbonProject: FindQueryDigitalCarbon,
  poolPrices: Record<string, PoolPrice>
) => {
  const pools = digitalCarbonProject.carbonCredits[0].poolBalances;

  const tokenBalances: ProjectBalances = {};

  for (const pool of pools) {
    const poolInfoEntries = Object.entries(POOL_INFO);
    for (const [key, poolInfo] of poolInfoEntries) {
      if (poolInfo.poolAddress === pool.id) {
        tokenBalances[key] = pool.balance;
      }
    }
  }

  const prices: string[] = [];

  if (parseFloat(tokenBalances.ubo) >= 1) {
    const isDefault =
      POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.ubo[priceKey]);
  }
  if (parseFloat(tokenBalances.nbo) >= 1) {
    const isDefault =
      POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nbo[priceKey]);
  }
  if (parseFloat(tokenBalances.nct) >= 1) {
    const isDefault =
      POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nct[priceKey]);
  }
  if (parseFloat(tokenBalances.bct) >= 1) {
    const isDefault =
      POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.bct[priceKey]);
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
 * For polygon-digital-carbon subgraph projects
 * Returns true if project has >=1 tonne in any pool
 * */
export const isValidPoolProject = (project: FindQueryDigitalCarbon) => {
  const validProjects = [];

  for (const carbonCredit of project.carbonCredits) {
    const poolBalances = carbonCredit.poolBalances;

    for (const poolBalance of poolBalances) {
      const poolAddresses = Object.values(POOL_INFO).map(
        (pool) => pool.poolAddress
      );
      if (
        poolAddresses.includes(poolBalance.pool.id) &&
        Number(poolBalance.balance) > 0
      ) {
        validProjects.push(poolBalance);
      }
    }
  }

  return !!validProjects.length;
};

export const isActiveListing = (l: {
  active?: boolean | null;
  deleted?: boolean | null;
  leftToSell?: string | null;
}) => !!l.active && !l.deleted && BigInt(l.leftToSell || "") >= 1;

/**
 * For marketplace subgraph projects
 * Returns true if project has >=1 tonne in any active, unexpired listing
 * */
export const isValidMarketplaceProject = (project: FindQueryProject) => {
  if (!project.listings) return false;
  const validProjects = project.listings.filter(isActiveListing);
  return !!validProjects.length;
};

/** A key may have a marketplace entry, a pool entry, or both. */
type ProjectData = {
  key: CreditIdentifier;
  poolProjectData?: FindQueryDigitalCarbon;
  marketplaceProjectData?: FindQueryProject;
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

  const mostRecentTimestamp = maxBy(timestamps);
  return youngestListing?.updatedAt ?? mostRecentTimestamp ?? "";
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
    ? getDigitalCarbonTokenPrices(data.poolProjectData, poolPrices)
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

    // construct CarbonmarkProjectT and make typescript happy
    const entry: Project = {
      methodologies: carbonProject?.methodologies ?? [],
      description: carbonProject?.description || null,
      short_description: carbonProject?.content?.shortDescription || null,
      name: carbonProject?.name || poolBalances?.name || market?.name || "",
      location: toGeoJSON(carbonProject?.geolocation),
      country: {
        id:
          carbonProject?.country ||
          poolBalances?.country ||
          market?.region ||
          "",
      },
      key: projectId,
      registry,
      projectID: registryProjectId,
      vintage:
        poolBalances?.carbonCredits[0].vintage.toString() ??
        market?.vintage ??
        "",
      projectAddress: poolBalances?.id ?? market?.projectAddress,
      updatedAt: pickUpdatedAt(data),
      // price: pickBestPrice(data, poolPrices),
      price: pickBestPrice(data, poolPrices),
      listings: market?.listings || null, // null for pool projects
      /** DEPRECATED */
      isPoolProject: !!poolBalances,
      /** DEPRECATED in favor of projectAddress */
      id: poolBalances?.id ?? market?.projectAddress,
      /** DEPRECATED in favor of methodologies array */
      category: {
        id: market?.category?.id ?? poolBalances?.category ?? "",
      },
    };

    entries.push(entry);
  });
  return entries;
};
