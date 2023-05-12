import { FastifyInstance } from "fastify";
import { concat } from "lodash";
import { flatten, map, pipe, split, trim, uniq, uniqBy } from "lodash/fp";
import {
  CarbonOffset,
  GetCarbonOffsetsCategoriesDocument,
  GetCarbonOffsetsCountriesDocument,
  GetCarbonOffsetsVintagesDocument,
} from "../graphql/generated/carbon.types";
import {
  Category,
  Country,
  GetCategoriesDocument,
  GetCountriesDocument,
  GetVintagesDocument,
  Project,
} from "../graphql/generated/marketplace.types";
import { executeGraphQLQuery } from "../utils/apollo-client";
import { extract } from "../utils/functional.utils";

export async function getAllVintages(fastify: FastifyInstance) {
  const cacheKey = `vintages`;

  const cachedResult = await fastify.lcache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const { data } = await executeGraphQLQuery<{ projects: Project[] }>(
    process.env.GRAPH_API_URL,
    GetVintagesDocument
  );

  const uniqueValues = new Set<string>();

  data.projects.forEach((item) => uniqueValues.add(item.vintage));

  const pooldata = await executeGraphQLQuery<{
    carbonOffsets: CarbonOffset[];
  }>(
    process.env.CARBON_OFFSETS_GRAPH_API_URL,
    GetCarbonOffsetsVintagesDocument
  );

  pooldata.data.carbonOffsets.forEach((item) =>
    uniqueValues.add(item.vintageYear)
  );

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
  const cachedResult = await fastify.lcache.get(cacheKey);

  // If the cached result exists, return it
  if (cachedResult) return cachedResult;

  // Fetch categories from the marketplace
  const {
    data: { categories },
  } = await executeGraphQLQuery<{ categories: Category[] }>(
    process.env.GRAPH_API_URL,
    GetCategoriesDocument
  );
  // Fetch carbon offsets categories
  const {
    data: { carbonOffsets },
  } = await executeGraphQLQuery<{ carbonOffsets: CarbonOffset[] }>(
    process.env.CARBON_OFFSETS_GRAPH_API_URL,
    GetCarbonOffsetsCategoriesDocument
  );

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
    map((val: Country) => ({ id: val }))
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

  const cachedResult = await fastify.lcache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const marketplaceCountries = await executeGraphQLQuery<{
    countries: Country[];
  }>(process.env.GRAPH_API_URL, GetCountriesDocument);

  const offsetsCountries = await executeGraphQLQuery<{
    carbonOffsets: CarbonOffset[];
  }>(
    process.env.CARBON_OFFSETS_GRAPH_API_URL,
    GetCarbonOffsetsCountriesDocument
  ).then(({ data }) =>
    data.carbonOffsets.map(({ country }) => ({ id: country }))
  );

  const fn = pipe(concat, flatten, uniqBy("id"));

  const result: Country[] = fn([
    marketplaceCountries.data.countries,
    offsetsCountries,
  ]);

  await fastify.lcache.set(cacheKey, { payload: result });

  return result;
}

// export function convertArrayToObjects(arr) {
//   return arr.map(export function (item) {
//     return { id: item };
//   });
// }

// export function calculateProjectPoolPrices(
//   poolProject,
//   uniqueValues,
//   poolPrices,
//   prices = []
// ) {
//   var prices = prices;
//   if (parseFloat(poolProject.balanceNBO) >= 1) {
//     uniqueValues.push(poolPrices.find((obj) => obj.name === "nbo").price);

//     prices.push({
//       leftToSell: poolProject.balanceNBO,
//       tokenAddress: process.env.NBO_POOL,
//       singleUnitPrice: poolPrices.find((obj) => obj.name === "nbo").priceInUsd,
//       name: "NBO",
//     });
//   }
//   if (parseFloat(poolProject.balanceUBO) >= 1) {
//     uniqueValues.push(poolPrices.find((obj) => obj.name === "ubo").price);

//     prices.push({
//       leftToSell: poolProject.balanceUBO,
//       tokenAddress: process.env.UBO_POOL,
//       singleUnitPrice: poolPrices.find((obj) => obj.name === "ubo").priceInUsd,
//       name: "UBO",
//     });
//   }
//   if (parseFloat(poolProject.balanceNCT) >= 1) {
//     uniqueValues.push(poolPrices.find((obj) => obj.name === "ntc").price);

//     prices.push({
//       leftToSell: poolProject.balanceNCT,
//       tokenAddress: process.env.NTC_POOL,
//       singleUnitPrice: poolPrices.find((obj) => obj.name === "ntc").priceInUsd,
//       name: "NCT",
//     });
//   }
//   if (parseFloat(poolProject.balanceBCT) >= 1) {
//     uniqueValues.push(poolPrices.find((obj) => obj.name === "btc").price);

//     prices.push({
//       leftToSell: poolProject.balanceBCT,
//       tokenAddress: process.env.BTC_POOL,
//       singleUnitPrice: poolPrices.find((obj) => obj.name === "btc").priceInUsd,
//       name: "BCT",
//     });
//   }

//   return [uniqueValues, prices];
// }

// const getPoolPrice = async (pool, decimals, fastify) => {
//   const CACHE_KEY = pool.address + process.env.VERCEL_ENV;
//   let result = await fastify.lcache.get(CACHE_KEY);

//   if (!result) {
//     result = await executeGraphQLQuery(
//       process.env.POOL_PRICES_GRAPH_API_URL,
//       POOL_PRICE,
//       { id: pool.address }
//     );
//     await fastify.lcache.set(CACHE_KEY, result);
//   }

//   var feeAmount = 0;
//   if (pool.feeAdd) {
//     feeAmount = Number(result.data.pair.currentprice) * pool.fee;
//   } else {
//     feeAmount =
//       (1 / (1 - pool.fee) - 1) * Number(result.data.pair.currentprice);
//   }

//   var priceWithFee = Number(result.data.pair.currentprice) + feeAmount;
//   var priceTrimmed = parseFloat(priceWithFee.toFixed(6));
//   var priceFormatted = priceTrimmed * decimals;

//   const priceResult = {
//     priceInUsd: priceWithFee.toFixed(6),
//     price: priceFormatted.toFixed(0),
//     name: pool.name,
//   };

//   return priceResult;
// };

//  export async function calculatePoolPrices(fastify) {
//   var decimals;
//   if (process.env.VERCEL_ENV == "production") {
//     decimals = 1e6;
//   } else {
//     decimals = 1e18;
//   }

//   var pools = [
//     {
//       name: "ubo",
//       address: process.env.LP_UBO_POOL,
//       feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
//       fee: 0.0225,
//     },
//     {
//       name: "nbo",
//       address: process.env.LP_NBO_POOL,
//       feeAdd: true,
//       fee: 0.0225,
//     },
//     {
//       name: "ntc",
//       address: process.env.LP_NTC_POOL,
//       feeAdd: false, // Toucan contracts: fee is subtracted from whatever value you input
//       fee: 0.1,
//     },
//     {
//       name: "btc",
//       address: process.env.LP_BTC_POOL,
//       feeAdd: false,
//       fee: 0.25,
//     },
//   ];

//   const resultsPromises = pools.map((pool) => {
//     return getPoolPrice(pool, decimals, fastify);
//   });

//   const results = await Promise.all(resultsPromises);

//   return results;
// }

// export function findProjectWithRegistryIdAndRegistry(projects, registryId, registry) {
//   return projects.find(
//     (project) =>
//       project.registryProjectId === registryId && project.registry === registry
//   );
// }
