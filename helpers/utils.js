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
    if (parseFloat(poolProject.balanceNBO) >= 1) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "nbo")).price);

        prices.push({
            leftToSell: poolProject.balanceNBO,
            tokenAddress: process.env.NBO_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "nbo")).priceInUsd,
            name: 'NBO',
        })
    }
    if (parseFloat(poolProject.balanceUBO) >= 1) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "ubo")).price);

        prices.push({
            leftToSell: poolProject.balanceUBO,
            tokenAddress: process.env.UBO_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "ubo")).priceInUsd,
            name: 'UBO',
        })
    }
    if (parseFloat(poolProject.balanceNCT) >= 1) {
        uniqueValues.push((poolPrices.find(obj => obj.name === "ntc")).price);

        prices.push({
            leftToSell: poolProject.balanceNCT,
            tokenAddress: process.env.NTC_POOL,
            singleUnitPrice: (poolPrices.find(obj => obj.name === "ntc")).priceInUsd,
            name: 'NCT',
        })
    }
    if (parseFloat(poolProject.balanceBCT) >= 1) {
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

const getPoolPrice = async (pool, decimals, fastify) => {
    const CACHE_KEY = pool.address + process.env.VERCEL_ENV;
    let result = await fastify.lcache.get(CACHE_KEY);

    if (!result) {
        result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: pool.address });
        await fastify.lcache.set(CACHE_KEY, result);
    }

    var feeAmount = 0;
    if (pool.feeAdd) {
        feeAmount = Number(result.data.pair.currentprice) * pool.fee;
    } else {
        feeAmount = ((1 / (1 - pool.fee)) - 1) * Number(result.data.pair.currentprice);
    }

    var priceWithFee = Number(result.data.pair.currentprice) + feeAmount;
    var priceTrimmed = parseFloat(priceWithFee.toFixed(6));
    var priceFormatted = priceTrimmed * decimals;

    const priceResult = { priceInUsd: priceWithFee.toFixed(6), price: priceFormatted.toFixed(0), name: pool.name };

    return priceResult;
};

async function calculatePoolPrices(fastify) {

    var decimals;
    if (process.env.VERCEL_ENV == "production") {
        decimals = 1e6;
    } else {
        decimals = 1e18;
    }

    var pools = [
        {
            name: "ubo",
            address: process.env.LP_UBO_POOL,
            feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
            fee: 0.0225
        },
        {
            name: "nbo",
            address: process.env.LP_NBO_POOL,
            feeAdd: true,
            fee: 0.0225
        },
        {
            name: "ntc",
            address: process.env.LP_NTC_POOL,
            feeAdd: false, // Toucan contracts: fee is subtracted from whatever value you input
            fee: 0.1
        }, {
            name: "btc",
            address: process.env.LP_BTC_POOL,
            feeAdd: false,
            fee: 0.25
        }
    ];

    const resultsPromises = pools.map((pool) => { return getPoolPrice(pool, decimals, fastify) });

    const results = await Promise.all(resultsPromises);

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
