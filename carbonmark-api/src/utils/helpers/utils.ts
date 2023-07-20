import { FastifyInstance } from "fastify";
import { compact, concat } from "lodash";
import { filter, flatten, map, pipe, split, trim, uniq } from "lodash/fp";
import {
  Category,
  Country,
  Listing,
} from "../../.generated/types/marketplace.types";
import { CarbonOffset } from "../../.generated/types/offsets.types";

import { extract, notNil } from "../functional.utils";
import { gqlSdk } from "../gqlSdk";

// This function retrieves all vintages from two different sources (marketplace and carbon offsets),
// combines them, removes duplicates, and returns the result as a sorted array of strings.
export async function getAllVintages(fastify: FastifyInstance) {
  const uniqueValues = new Set<string>();
  const cacheKey = `vintages`;
  const cachedResult = await fastify.lcache.get<string[]>(cacheKey)?.payload;

  if (cachedResult) {
    return cachedResult;
  }

  const [{ projects }, { carbonOffsets }] = await Promise.all([
    gqlSdk.marketplace.getVintages(),
    gqlSdk.offsets.getCarbonOffsetsVintages(),
  ]);

  projects.forEach((item) => uniqueValues.add(item.vintage));
  carbonOffsets.forEach((item) => uniqueValues.add(item.vintageYear));

  const result = Array.from(uniqueValues).sort();

  await fastify.lcache.set(cacheKey, { payload: result });

  return result;
}

// This function retrieves all categories from two different sources (marketplace and carbon offsets),
// combines them, removes duplicates, and returns the result as an array of objects with an "id" property.
export async function getAllCategories(fastify: FastifyInstance) {
  // Define cache key for caching the result
  const cacheKey = `categories`;
  // Try to get the cached result
  try {
    const cachedResult = await fastify.lcache.get<Category[]>(cacheKey)
      ?.payload;

    // If the cached result exists, return it
    if (cachedResult) return cachedResult;
  } catch (error) {
    console.debug(error);
  }

  // Fetch categories from the marketplace & carbon offsets categories
  const [{ categories }, { carbonOffsets }] = await Promise.all([
    gqlSdk.marketplace.getCategories(),
    gqlSdk.offsets.getCarbonOffsetsCategories(),
  ]);

  // Extract the required values from the fetched data
  const values = [
    categories.map(extract("id")),
    carbonOffsets.map(extract("methodologyCategory")),
  ];

  // This function pipeline combines and deduplicates categories from different sources
  // and maps them to objects with an "id" property
  const fn = pipe(
    concat,
    flatten,
    split(","),
    map(trim),
    uniq,
    map((id: Country) => ({ id }))
  );

  // Apply the function pipeline to the extracted values
  const result: Category[] = fn(values);

  // Cache the result before returning it
  await fastify.lcache.set(cacheKey, { payload: result });

  // Return the combined and deduplicated categories
  return result;
}

export async function getAllCountries(fastify: FastifyInstance) {
  const cacheKey = `countries`;

  const cachedResult = await fastify.lcache.get<Country[]>(cacheKey)?.payload;

  if (cachedResult) {
    return cachedResult;
  }

  const [{ countries }, { carbonOffsets }] = await Promise.all([
    gqlSdk.marketplace.getCountries(),
    gqlSdk.offsets.getCarbonOffsetsCountries(),
  ]);

  const fn = pipe(
    concat,
    flatten,
    uniq,
    filter(notNil),
    map((id) => ({ id }))
  );

  //@ts-ignore -- @todo provide typing to lodash functions
  const result: Country[] = fn([
    countries?.map(extract("id")),
    carbonOffsets.map(extract("country")),
  ]);

  await fastify.lcache.set(cacheKey, { payload: result });

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
      tokenAddress: process.env.NBO_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "nbo")?.priceInUsd,
      name: "NBO",
    });
  }
  if (parseFloat(poolProject.balanceUBO) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ubo")?.price);

    prices.push({
      leftToSell: poolProject.balanceUBO,
      tokenAddress: process.env.UBO_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ubo")?.priceInUsd,
      name: "UBO",
    });
  }
  if (parseFloat(poolProject.balanceNCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ntc")?.price);

    prices.push({
      leftToSell: poolProject.balanceNCT,
      tokenAddress: process.env.NTC_POOL,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ntc")?.priceInUsd,
      name: "NCT",
    });
  }
  if (parseFloat(poolProject.balanceBCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "btc")?.price);

    prices.push({
      leftToSell: poolProject.balanceBCT,
      tokenAddress: process.env.BTC_POOL,
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

export function findProjectWithRegistryIdAndRegistry(
  projects: unknown[],
  registryId: unknown,
  registry: unknown
) {
  return projects.find(
    (project) =>
      //@ts-ignore -- We need typing on sanity queries
      project.registryProjectId === registryId && project.registry === registry
  );
}
