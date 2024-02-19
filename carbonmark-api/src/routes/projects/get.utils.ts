import { FastifyInstance } from "fastify";
import { compact, isNil, max, maxBy } from "lodash";
import { concat, map, mapValues, min, pipe, trim, uniq } from "lodash/fp";
import { NetworkParam } from "src/models/NetworkParam.model";
import { TokenPriceT } from "src/models/TokenPrice.model";
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
import { getActiveListings } from "../../utils/helpers/listings.utils";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
import { formatListings } from "../../utils/marketplace.utils";

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

// TODO: Put all pool utils in a pools.utils.ts file?

const getActivePoolPrices = (prices: TokenPriceT[], minSupply?: number) => {
  return prices.filter((price) => Number(price.supply) > (minSupply || 0));
};

// Filter out video links as CM currently does not support

type CarbonProjectImage = {
  caption: string;
  url: string;
};

type CarbonProjectExternalMedia = {
  caption: string;
  url: string;
};

type MediaItem = CarbonProjectImage | CarbonProjectExternalMedia;

const filterVideo = (media: MediaItem) => {
  return (
    !media.url.includes("youtube") &&
    !media.url.includes("youtu.be") &&
    !media.url.includes("vimeo")
  );
};

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
  creditId: CreditId;
  marketplaceProject?: GetProjectByIdQuery["project"];
  poolProject?: GetProjectCreditsQuery["carbonProjects"][0];
  cmsProject?: CarbonProject;
  allPoolPrices: Record<string, PoolPrice>;
  network: NetworkParam | undefined;
  minSupply: number;
}): Project => {
  const credits = props.poolProject?.carbonCredits;
  const listings = props.marketplaceProject?.listings
    ? formatListings(props.marketplaceProject?.listings)
    : undefined;

  const [poolPrices, stats] =
    props.network === "polygon" && credits
      ? getProjectPoolPricesAndStats(credits, props.allPoolPrices)
      : [[], { totalBridged: 0, totalSupply: 0, totalRetired: 0 }];

  // Compute best price
  // For the purpose of computing the best price we only take into account active listings and pool prices with the sufficent supply
  const activeListings = getActiveListings(listings, props.minSupply);
  const activePoolPrices = getActivePoolPrices(poolPrices, props.minSupply);

  const activePoolPriceValues = activePoolPrices.map((p) =>
    Number(p.singleUnitPrice)
  );
  const listingPriceValues = compact(activeListings).map((l) =>
    Number(l.singleUnitPrice)
  );

  const bestPrice = pipe(
    concat,
    uniq,
    min
  )(activePoolPriceValues, listingPriceValues);

  const hasSupply =
    !!activePoolPriceValues.length || !!listingPriceValues.length;

  // Compute updateAt.
  // For this we use both active and inactive listings and pool info
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
  const updatedAt = String(
    youngestListing?.updatedAt ?? mostRecentTimestamp ?? ""
  );

  const [c, p, m] = [
    props.cmsProject,
    props.poolProject,
    props.marketplaceProject,
  ];

  // Build project
  const projectResponse: Project = {
    // Project identification
    key: props.creditId.projectId,
    projectID: props.creditId.registryProjectId,
    registry: props.creditId.standard,
    vintage: props.creditId.vintage,
    // Data with fallback
    country: (c?.country || p?.country || m?.country.id || "").trim(),
    name: (c?.name || p?.name || m?.name || "").trim(),
    methodologies:
      c?.methodologies?.map(mapValues(trim)) ||
      p?.methodologies.split(",")?.map(mapValues(trim)) ||
      m?.methodology.split(",")?.map(mapValues(trim)) ||
      [],
    region: c?.region || p?.region || "",
    // CMS specific data
    description: c?.description,
    short_description: c?.shortDescription,
    long_description: c?.longDescription,
    url: c?.url,
    images:
      c?.images
        ?.map((image) => ({
          caption: image?.asset?.altText || "",
          url: image?.asset?.url || "",
        }))
        .filter(filterVideo) ||
      c?.externalMedia
        ?.map((image) => ({
          caption: image?.description || "",
          url: image?.uri || "",
        }))
        .filter(filterVideo) ||
      [],
    location: toGeoJSON(c?.geolocation),
    // Pool specific data
    prices: activePoolPrices,
    stats,
    creditTokenAddress: credits?.at(0)?.id ?? "",
    // Marketplace specific data
    listings: activeListings,
    // Aggregated data
    price: String(bestPrice ?? 0), // remove trailing zeros
    updatedAt,
    hasSupply,
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
  network: NetworkParam | undefined,
  minSupply: number
): Project[] => {
  const entries: Project[] = [];

  projectDataMap.forEach((data) => {
    const creditId = new CreditId(data.key);
    const carbonProject = cmsDataMap.get(creditId.projectId);

    if (!carbonProject) return;

    const project = buildProjectEntry({
      creditId,
      marketplaceProject: data.marketplaceProjectData,
      poolProject: data.poolProjectData,
      cmsProject: carbonProject,
      allPoolPrices,
      network,
      minSupply,
    });
    // Only return projects with supply
    // TODO: Maybe this should be controlled via a query parameter
    if (project.hasSupply) entries.push(project);
  });

  return entries;
};
