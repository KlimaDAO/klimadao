import { FastifyInstance } from "fastify";
import { compact, isNil, max, maxBy } from "lodash";
import {
  concat,
  map,
  mapValues,
  min,
  pipe,
  toLower,
  trim,
  uniq,
} from "lodash/fp";
import { Geopoint } from "../../.generated/types/cms.types";
import {
  FindDigitalCarbonProjectsQuery,
  GetProjectCreditsQuery,
} from "../../.generated/types/digitalCarbon.types";
import {
  GetProjectByIdQuery,
  GetProjectsQuery,
} from "../../.generated/types/marketplace.types";
import { Project } from "../../models/Project.model";
import { GeoJSONPoint } from "../../models/Utility.model";
import {
  CreditId,
  CreditIdentifier,
  ProjectIdentifier,
} from "../../utils/CreditId";
import { extract } from "../../utils/functional.utils";
import { GQL_SDK } from "../../utils/gqlSdk";
import { CarbonProject } from "../../utils/helpers/cms.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
import { getProjectPoolPricesAndStats } from "../../utils/helpers/getProjectPoolPricesAndStats";
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
/** Map credit keys to gql and marketplace data */
export type ProjectDataMap = Map<CreditIdentifier, ProjectData>;

/** note: new projects may not have a CMS entry yet */
export type CMSDataMap = Map<ProjectIdentifier, CarbonProject>;

/**
 * Builds a project entry given data fetched from various sources
 * project data:
 *  - vintage
 *  - listings from marketplace
 *  - credits from polygon-digital-carbon
 *  - projectDetails from cms
 * global data:
 *  - pool prices
 *  - network
 */
export const buildProjectEntry = (props: {
  vintage: string;
  marketplaceProject?: GetProjectByIdQuery["project"];
  /*
  listings?:
    | Pick<Listing, "singleUnitPrice" | "updatedAt" | "deleted" | "active">[]
    | null;*/
  poolProject?: GetProjectCreditsQuery["carbonProjects"][0];
  cmsProject?: CarbonProject;
  allPoolPrices: Record<string, PoolPrice>;
  network: "polygon" | "mumbai" | undefined;
}): Project => {
  const credits = props.poolProject?.carbonCredits;
  const listings = compact(props.marketplaceProject?.listings) || [];

  const [poolPrices, stats] =
    props.network === "polygon" && credits
      ? getProjectPoolPricesAndStats(credits, props.allPoolPrices)
      : [[], { totalBridged: 0, totalSupply: 0, totalRetired: 0 }];
  // Compute best price
  // For the purpose of computing the best price we only take into account active listings
  const activeListings = listings?.filter((l) => !l.deleted && !!l.active);

  const poolPriceValues = poolPrices.map((p) => Number(p.singleUnitPrice));
  const listingPriceValues = compact(activeListings).map((l) =>
    Number(l.singleUnitPrice)
  );

  const bestPrice = pipe(
    concat,
    uniq,
    min
  )(poolPriceValues, listingPriceValues);

  // Compute updateAt
  const youngestListing = maxBy(listings, (l) => Number(l.updatedAt));
  // if project has listings, use that value first, because the pool `lastUpdate` value is less relevant for users
  const timestamps: string[] = [];
  credits?.forEach((credit) => {
    credit.poolBalances.forEach((poolBalance) => {
      poolBalance.pool.dailySnapshots.forEach((snapshot) => {
        timestamps.push(snapshot.lastUpdateTimestamp);
      });
    });
  });
  const mostRecentTimestamp = max(timestamps);
  const updatedAt = youngestListing?.updatedAt ?? mostRecentTimestamp ?? "";

  // Build project
  const projectResponse: Project = {
    country: props.cmsProject?.country || "",
    description: props.cmsProject?.description,
    key: props.cmsProject?.key || "",
    registry: props.cmsProject?.registry || "",
    url: props.cmsProject?.url || "",
    name: props.cmsProject?.name || "",
    /** Sanitize category values */
    methodologies: props.cmsProject?.methodologies?.map(mapValues(trim)) ?? [],
    short_description: props.cmsProject?.shortDescription,
    long_description: props.cmsProject?.longDescription,
    projectID: props.cmsProject?.registryProjectId || "",
    location: toGeoJSON(props.cmsProject?.geolocation),
    price: String(bestPrice ?? 0), // remove trailing zeros
    prices: poolPrices,
    images:
      props.cmsProject?.images?.map((image) => ({
        caption: image?.asset?.altText || "",
        url: image?.asset?.url || "",
      })) ?? [],
    vintage: props.vintage,
    stats,
    region: props.cmsProject?.region || "",
    creditTokenAddress: credits?.at(0)?.id,
    updatedAt,
  };
  return projectResponse;
};

/**
 * Combines pool, marketplace, and CMS project data with intelligent fallbacks.
 * Deduplicated, unsorted
 */
export const composeProjectEntries = (
  projectDataMap: ProjectDataMap,
  cmsDataMap: CMSDataMap,
  allPoolPrices: Record<string, PoolPrice>,
  network: "polygon" | "mumbai" | undefined
): Project[] => {
  const entries: Project[] = [];
  projectDataMap.forEach((data) => {
    const { projectId, vintage } = new CreditId(data.key);
    const carbonProject = cmsDataMap.get(projectId);

    const project = buildProjectEntry({
      vintage,
      marketplaceProject: data.marketplaceProjectData,
      poolProject: data.poolProjectData,
      cmsProject: carbonProject,
      allPoolPrices,
      network,
    });

    entries.push(project);
  });
  return entries;
};
