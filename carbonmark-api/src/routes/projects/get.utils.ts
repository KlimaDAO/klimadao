import { FastifyInstance } from "fastify";
import { compact, isNil, max, maxBy, minBy, sortBy } from "lodash";
import { map, mapValues, toLower, trim } from "lodash/fp";
import { FindDigitalCarbonProjectsQuery } from "src/.generated/types/digitalCarbon.types";
import { Geopoint } from "../../.generated/types/carbonProjects.types";
import { GetProjectsQuery } from "../../.generated/types/marketplace.types";
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
import { CarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
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

  const tokenBalances: ProjectBalances = {
    nbo: { balance: "0", creditTokenAddress: "" },
    ubo: { balance: "0", creditTokenAddress: "" },
    bct: { balance: "0", creditTokenAddress: "" },
    nct: { balance: "0", creditTokenAddress: "" },
    mco2: { balance: "0", creditTokenAddress: "" },
  };

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
  if (parseFloat(tokenBalances["ubo"].balance) >= 1) {
    const isDefault =
      POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances["ubo"].creditTokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.ubo[priceKey]);
  }
  if (parseFloat(tokenBalances["nbo"].balance) >= 1) {
    const isDefault =
      POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances["nbo"].creditTokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nbo[priceKey]);
  }
  if (parseFloat(tokenBalances["nct"].balance) >= 1) {
    const isDefault =
      POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances["nct"].creditTokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nct[priceKey]);
  }
  if (parseFloat(tokenBalances["bct"].balance) >= 1) {
    const isDefault =
      POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
      tokenBalances["bct"].creditTokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.bct[priceKey]);
  }
  if (parseFloat(tokenBalances["mco2"].balance) >= 1) {
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

export const isActiveListing = (l: {
  active?: boolean | null;
  deleted?: boolean | null;
  leftToSell?: string | null;
}) => !!l.active && !l.deleted && BigInt(l.leftToSell || "") >= 1;

/**
 * For marketplace subgraph projects
 * Returns true if project has >=1 tonne in any active, unexpired listing
 * */
export const isValidMarketplaceProject = (
  project: GetProjectsQuery["projects"][number]
) => {
  if (!project?.listings) return false;
  const validProjects = project.listings.filter(isActiveListing);
  return !!validProjects.length;
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
      methodologies: map(mapValues(trim))(carbonProject?.methodologies) ?? [],
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
