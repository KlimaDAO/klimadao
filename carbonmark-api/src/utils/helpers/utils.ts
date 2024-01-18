import { FastifyInstance, FastifyReply } from "fastify";
import { compact, concat, isArray, omit } from "lodash";
import { filter, flatten, map, pipe, split, trim, uniq } from "lodash/fp";
import {
  ActivityType,
  Category,
  Country,
  Listing,
} from "../../.generated/types/marketplace.types";
import { CarbonOffset } from "../../.generated/types/offsets.types";

import type { NetworkParam } from "../../../src/models/NetworkParam.model";
import { TOKEN_ADDRESSES } from "../../app.constants";
import { fetchIcrFilters } from "../ICR/icr.utils";
import { extract, notEmptyOrNil } from "../functional.utils";
import { GQL_SDK } from "../gqlSdk";
import { CarbonProject } from "./cms.utils";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- unable to type environment variables
const ENV = (process.env.VERCEL_ENV ?? "development") as
  | "development"
  | "production";

// This function retrieves all vintages from two different sources (marketplace and carbon offsets),
// combines them, removes duplicates, and returns the result as a sorted array of strings.
export async function getAllVintages(
  sdk: GQL_SDK,
  fastify: FastifyInstance,
  network: NetworkParam
): Promise<string[]> {
  const uniqueValues = new Set<string>();
  const cacheKey = `vintages`;
  const cachedResult = await fastify.lcache?.get<string[]>(cacheKey)?.payload;

  if (cachedResult) {
    return cachedResult;
  }

  const [
    { projects },
    { carbonProjects: digitalCarbonProjects },
    { IcrVintages },
  ] = await Promise.all([
    sdk.marketplace.getVintages(),
    sdk.digital_carbon.getDigitalCarbonProjectsVintages(),
    fetchIcrFilters(network),
  ]);

  /** Handle invalid responses */
  if (
    !isArray(projects) ||
    !isArray(digitalCarbonProjects) ||
    !isArray(IcrVintages)
  ) {
    throw new Error("Response from server did not match schema definition");
  }

  projects.forEach((item) => uniqueValues.add(item.vintage));
  digitalCarbonProjects.forEach((project) => {
    project.carbonCredits.forEach((credit) => {
      if (credit.vintage) {
        uniqueValues.add(credit.vintage.toString());
      }
    });
    IcrVintages.forEach((item: string) => uniqueValues.add(item));
  });

  const result = Array.from(uniqueValues).sort().filter(notEmptyOrNil);

  await fastify.lcache?.set(cacheKey, { payload: result });

  return result;
}

// This function retrieves all categories from two different sources (marketplace and carbon offsets),
// combines them, removes duplicates, and returns the result as an array of objects with an "id" property.
export async function getAllCategories(sdk: GQL_SDK, fastify: FastifyInstance) {
  // Define cache key for caching the result
  const cacheKey = `categories`;
  // Try to get the cached result
  try {
    const cachedResult =
      await fastify.lcache?.get<Category[]>(cacheKey)?.payload;

    // If the cached result exists, return it
    if (cachedResult) return cachedResult;
  } catch (error) {
    console.debug(error);
  }

  // Fetch categories from the marketplace & carbon offsets categories
  const [{ categories }, { carbonProjects: digitalCarbonProjects }] =
    await Promise.all([
      sdk.marketplace.getCategories(),
      sdk.digital_carbon.getDigitalCarbonProjectsCategories(),
    ]);

  /** Handle invalid responses */
  if (!isArray(categories) || !isArray(digitalCarbonProjects)) {
    throw new Error("Response from server did not match schema definition");
  }

  // Extract the required values from the fetched data
  const values = [
    categories?.map(extract("id")),
    digitalCarbonProjects?.map(extract("category")),
  ];

  // This function pipeline combines and deduplicates categories from different sources
  // and maps them to objects with an "id" property
  const fn = pipe(
    concat,
    flatten,
    split(","),
    map(trim),
    uniq,
    compact,
    map((id: Category) => ({ id })),
    filter(notEmptyOrNil)
  );

  // Apply the function pipeline to the extracted values
  const result: Category[] = fn(values);

  // Cache the result before returning it
  await fastify.lcache?.set(cacheKey, { payload: result });

  // Return the combined and deduplicated categories
  return result;
}

export async function getAllCountries(
  sdk: GQL_SDK,
  fastify: FastifyInstance,
  network: NetworkParam
) {
  const cacheKey = `countries`;

  const cachedResult = await fastify.lcache?.get<Country[]>(cacheKey)?.payload;

  if (cachedResult) {
    return cachedResult;
  }

  const [
    { countries: marketplaceCountries },
    { carbonProjects: digitalCarbonProjects },
    { countryNames: icrCountries },
  ] = await Promise.all([
    sdk.marketplace.getCountries(),
    sdk.digital_carbon.getDigitalCarbonProjectsCountries(),
    fetchIcrFilters(network),
  ]);

  /** Handle invalid responses */
  if (
    !isArray(marketplaceCountries) ||
    !isArray(digitalCarbonProjects) ||
    !isArray(icrCountries)
  ) {
    throw new Error("Response from server did not match schema definition");
  }

  const fn = pipe(
    concat,
    flatten,
    uniq,
    filter(notEmptyOrNil),
    map((id: Country) => ({ id }))
  );

  const result: Country[] = fn([
    marketplaceCountries?.map(extract("id")),
    digitalCarbonProjects.map(extract("country")),
    icrCountries,
  ]);

  await fastify.lcache?.set(cacheKey, { payload: result });

  return result;
}

export type PriceType = Pick<Listing, "leftToSell" | "tokenAddress"> &
  Partial<Pick<Listing, "singleUnitPrice">> & {
    name: string;
  };

export function calculateProjectPoolPrices(
  poolProject: Partial<CarbonOffset>,
  uniqueValues: (string | undefined)[],
  poolPrices: TokenPrice[],
  prices: PriceType[] = []
): [string[], typeof prices] {
  if (parseFloat(poolProject.balanceNBO) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "nbo")?.price);

    prices.push({
      leftToSell: poolProject.balanceNBO,
      tokenAddress: TOKEN_ADDRESSES[ENV].NBO_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "nbo")?.priceInUsd,
      name: "NBO",
    });
  }
  if (parseFloat(poolProject.balanceUBO) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ubo")?.price);

    prices.push({
      leftToSell: poolProject.balanceUBO,
      tokenAddress: TOKEN_ADDRESSES[ENV].UBO_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ubo")?.priceInUsd,
      name: "UBO",
    });
  }
  if (parseFloat(poolProject.balanceNCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ntc")?.price);

    prices.push({
      leftToSell: poolProject.balanceNCT,
      tokenAddress: TOKEN_ADDRESSES[ENV].NTC_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ntc")?.priceInUsd,
      name: "NCT",
    });
  }
  if (parseFloat(poolProject.balanceBCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "btc")?.price);

    prices.push({
      leftToSell: poolProject.balanceBCT,
      tokenAddress: TOKEN_ADDRESSES[ENV].BTC_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "btc")?.priceInUsd,
      name: "BCT",
    });
  }

  return [compact(uniqueValues), prices];
}

export type TokenPrice = {
  priceInUsd: string;
  price: string;
  name: string;
};

type IsMatchingCmsProjectArgs = {
  registry: string; // (e.g VCS)
  projectId: string; // (e.g 1120)
};
/**
 * Checks if the provided project matches the given registry and project ID
 * @param {IsMatchingCmsProjectArgs} args - An object containing the registry and project ID to match
 * @param {Sanity.Default.Schema.Project} project - The project to check
 * @returns {boolean} - Returns true if the project matches the given registry and project ID, false otherwise
 */
export const isMatchingCmsProject = (
  { registry, projectId }: IsMatchingCmsProjectArgs,
  project: CarbonProject
) => project?.registryProjectId === projectId && project.registry === registry;

export function formatGraphTimestamps<
  T extends { createdAt: string | null; updatedAt: string | null },
>(data: T) {
  const partialData = omit(data, ["createdAt", "updatedAt"]);
  return {
    ...partialData,
    /** Note: Graph timestamps are in seconds **/
    createdAt: Number(data.createdAt),
    updatedAt: Number(data.updatedAt),
  };
}
/**
 * Converts a String into an ActivityType without breaking typescript checks
 */
export const stringToActivityType = (str: string): ActivityType | undefined => {
  for (const [key, value] of Object.entries(ActivityType)) {
    if (key == str) {
      return value;
    }
  }
};
/**
 * Converts an array of Strings into an array of ActivityType without breaking typescript checks
 * This method will silently filter out strings that do not relate to an actually activity type
 * so make sure the handler checks for correct activity type input
 */
export const stringsToActivityTypes = (strs: string[]): ActivityType[] => {
  return strs
    .map(stringToActivityType)
    .filter((str): str is ActivityType => !!str);
};

/**
 * Sends a standard success reply
 * @param reply
 */
export function asResponse<ReplyType>(
  reply: FastifyReply,
  payload?: ReplyType
) {
  return reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(payload);
}
