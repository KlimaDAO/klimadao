const { executeGraphQLQuery } = require("../apollo-client");
const { GET_COUNTRIES } = require("../queries/countries");
const { GET_CATEGORIES, GET_POOLED_PROJECT_CAT, GET_POOLED_PROJECT_COUNTRY, GET_POOLED_PROJECT_VINTAGE } = require('../queries/categories');
const { GET_VINTAGES } = require('../queries/vintage.js');
const { ethers } = require("ethers");
const { POOL_PRICE } = require("../queries/pool_price_in_usdc");

async function getAllVintages(fastify) {
    const cacheKey = `vintages`;

    const cachedResult = await fastify.lcache.get(cacheKey);

    if (cachedResult) {
        return cachedResult;
      }


    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_VINTAGES);

    const uniqueValues = new Set();

    data.data.projects.forEach(item => uniqueValues.add(item.vintage));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_VINTAGE);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(item.vintageYear));

    const result = Array.from(uniqueValues);

    await fastify.lcache.set(cacheKey, result);

    return result;
}


async function getAllCategories(fastify) {

    const cacheKey = `categories`;

    const cachedResult = await fastify.lcache.get(cacheKey);

    if (cachedResult) {
        return cachedResult;
      }

    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_CATEGORIES);

    const uniqueValues = new Set();

    data.data.categories.forEach(item => uniqueValues.add(...item.id.split(",")));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_CAT);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(...item.methodologyCategory.split(",")));

    const result = Array.from(uniqueValues);

    await fastify.lcache.set(cacheKey, result);

    return result;
}

async function getAllCountries(fastify) {

    const cacheKey = `countries`;

    const cachedResult = await fastify.lcache.get(cacheKey);

    if (cachedResult) {
        return cachedResult;
      }

    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_COUNTRIES);

    const uniqueValues = new Set();

    data.data.countries.forEach(item => uniqueValues.add(item.id));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_COUNTRY);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(item.country));

    const result = Array.from(uniqueValues);

    await fastify.lcache.set(cacheKey, result);

    return result;
}
function convertArrayToObjects(arr) {
    return arr.map(function (item) {
        return { id: item };
    });
}


function calculateProjectPoolPrices(poolProject, uniqueValues, poolPrices) {

    var prices = [];
    if (parseFloat(poolProject.balanceNBO) > 0) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "nbo")).price);

       prices.push({
            leftToSell: poolProject.balanceNBO,
            tokenAddress: process.env.NBO_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "nbo")).priceInUsd,
            name: 'NBO',
        })
    }
    if (parseFloat(poolProject.balanceUBO) > 0) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "ubo")).price);

       prices.push({
            leftToSell: poolProject.balanceUBO,
            tokenAddress: process.env.UBO_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "ubo")).priceInUsd,
            name: 'UBO',
        })
    }
    if (parseFloat(poolProject.balanceNCT) > 0) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "ntc")).price);

        prices.push({
            leftToSell: poolProject.balanceNCT,
            tokenAddress: process.env.NTC_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "ntc")).priceInUsd,
            name: 'NCT',
        })
    }
    if (parseFloat(poolProject.balanceBCT) > 0) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "btc")).price);

        prices.push({
            leftToSell: poolProject.balanceBCT,
            tokenAddress: process.env.BTC_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "btc")).priceInUsd,
            name: 'BCT',
        })
    }

    return [uniqueValues, prices];
}

async function calculatePoolPrices(fastify) {

    var decimals;
    if (process.env.VERCEL_ENV == "production") {
        decimals = 10e5;
    } else {
        decimals = 10e17;
    }
    const results = [];


    var pools = [
        { "ubo": process.env.LP_UBO_POOL }, { "nbo": process.env.LP_NBO_POOL }, { "ntc": process.env.LP_NTC_POOL }, { "btc": process.env.LP_BTC_POOL }
    ];

    for (let i = 0 ; i < pools.length; i++) {
        const poolKey = Object.keys(pools[i])[0];
        const poolAddress = Object.values(pools[i])[0];

        const cachedResult = await fastify.lcache.get(poolAddress + process.env.VERCEL_ENV);

        var result = undefined;
        if (cachedResult) {
             result = cachedResult;
          }
        else {
            result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: poolAddress });
            await fastify.lcache.set(poolAddress + process.env.VERCEL_ENV, result, 60 * 24);
        }

        results.push({ priceInUsd:result.data.pair.currentprice, price: (Math.trunc(result.data.pair.currentprice * decimals)).toString(), name :  poolKey});
    }

    return results;
}

function findProjectWithRegistryIdAndRegistry(projects, registryId, registry) {
    return projects.find(project => project.registryProjectId === registryId && project.registry === registry);
  }

module.exports = {
    calculatePoolPrices,
    convertArrayToObjects,
    getAllVintages,
    getAllCategories,
    getAllCountries,
    findProjectWithRegistryIdAndRegistry,
    calculateProjectPoolPrices
};
