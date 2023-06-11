import { FastifyInstance } from "fastify";
import { concat } from "lodash";
import { filter, flatten, map, pipe, split, trim, uniq } from "lodash/fp";
import {
  Category,
  Country,
  Listing,
} from "../../.generated/types/marketplace.types";
import { CarbonOffset } from "../../.generated/types/offsets.types";

import { GetPairQuery } from "../../.generated/types/tokens.types";
import { extract, notNil } from "../utils/functional.utils";
import { gqlSdk } from "../utils/gqlSdk";
import { TokenPool, TOKEN_POOLS } from "./utils.constants";

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

  //@ts-ignore
  const result: Country[] = fn([
    countries?.map(extract("id")),
    carbonOffsets.map(extract("country")),
  ]);

  await fastify.lcache.set(cacheKey, { payload: result });

  return result;
}

export type PriceType = Pick<
  Listing,
  "leftToSell" | "tokenAddress" | "singleUnitPrice"
> & {
  name: string;
};

export function calculateProjectPoolPrices(
  poolProject: Partial<CarbonOffset>,
  uniqueValues: string[],
  poolPrices: TokenPrice[],
  prices: PriceType[] = []
): [string[], typeof prices] {
  if (parseFloat(poolProject.balanceNBO) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "nbo")!.price);

    prices.push({
      leftToSell: poolProject.balanceNBO,
      tokenAddress: process.env.NBO_POOL!,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "nbo")!.priceInUsd,
      name: "NBO",
    });
  }
  if (parseFloat(poolProject.balanceUBO) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ubo")!.price);

    prices.push({
      leftToSell: poolProject.balanceUBO,
      tokenAddress: process.env.UBO_POOL!,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ubo")!.priceInUsd,
      name: "UBO",
    });
  }
  if (parseFloat(poolProject.balanceNCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "ntc")!.price);

    prices.push({
      leftToSell: poolProject.balanceNCT,
      tokenAddress: process.env.NTC_POOL!,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "ntc")!.priceInUsd,
      name: "NCT",
    });
  }
  if (parseFloat(poolProject.balanceBCT) >= 1) {
    uniqueValues.push(poolPrices.find((obj) => obj.name === "btc")!.price);

    prices.push({
      leftToSell: poolProject.balanceBCT,
      tokenAddress: process.env.BTC_POOL!,
      singleUnitPrice: poolPrices.find((obj) => obj.name === "btc")!.priceInUsd,
      name: "BCT",
    });
  }

  return [uniqueValues, prices];
}

export type TokenPrice = {
  priceInUsd: string;
  price: string;
  name: string;
};

/** @todo refactor this */
const getPoolPrice = async (
  pool: TokenPool,
  decimals: number,
  fastify: FastifyInstance
) => {
  const CACHE_KEY = `${pool.address} ${process.env.VERCEL_ENV}`;
  const cachedResult = await fastify.lcache.get<GetPairQuery>(CACHE_KEY);
  let result = cachedResult?.payload.pair;

  if (!result && notNil(pool.address)) {
    const { pair } = await gqlSdk.tokens.getPair({ id: pool.address });
    result = pair;
    await fastify.lcache.set(CACHE_KEY, { payload: result });
  }

  var feeAmount = 0;
  if (pool.feeAdd) {
    feeAmount = Number(result?.currentprice) * pool.fee;
  } else {
    feeAmount = (1 / (1 - pool.fee) - 1) * Number(result?.currentprice);
  }

  var priceWithFee = Number(result?.currentprice) + feeAmount;
  var priceTrimmed = parseFloat(priceWithFee.toFixed(6));
  var priceFormatted = priceTrimmed * decimals;

  const priceResult: TokenPrice = {
    priceInUsd: priceWithFee.toFixed(6),
    price: priceFormatted.toFixed(0),
    name: pool.name,
  };

  return priceResult;
};

/** @todo refactor this */
export async function calculatePoolPrices(fastify: FastifyInstance) {
  var decimals: number;
  if (process.env.VERCEL_ENV == "production") {
    decimals = 1e6;
  } else {
    decimals = 1e18;
  }

  const resultsPromises = TOKEN_POOLS.map((pool) => {
    return getPoolPrice(pool, decimals, fastify);
  });

  const results = await Promise.all(resultsPromises);

  return results;
}

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
