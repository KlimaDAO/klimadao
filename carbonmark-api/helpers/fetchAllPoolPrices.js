// @ts-check
const poolInfo = require("../constants/constants").poolInfo;
const ALL_POOL_PRICES = require("../queries/all_pool_prices").ALL_POOL_PRICES;
const executeGraphQLQuery = require("../apollo-client").executeGraphQLQuery;

/**
 * @typedef {Object} PoolPrice
 * @property {string} poolName
 *  0x address of the liquidity pool
 * @property {string} defaultPrice
 *  formatted number string e.g. "1.23456" for USDC price of 1 token
 * @property {string} selectiveRedeemPrice
 * formatted number string e.g. "1.23456" for USDC price of 1 token inc. fee calculation
 */

/**
 * @typedef {Object} Price
 * @property {string} address
 * Address of the LP
 * @property {string} price
 * Formatted price string "0.677888"
 */

/**
 * @typedef {{ [x: string]: PoolPrice }} PoolPriceMap
 */

const calculateSelectivePrice = (defaultPrice, poolName) => {
  const { feeAdd, fee } = poolInfo[poolName];
  const priceNum = Number(defaultPrice);
  const feeAmount = feeAdd ? priceNum * fee : (1 / (1 - fee) - 1) * priceNum;
  const priceWithFee = priceNum + feeAmount;
  return priceWithFee.toFixed(6);
};

/**
 * Query the subgraph for a list of all prices for tracked pairs (bct, nct, nbo, ubo)
 * @returns {Promise<PoolPriceMap>} - Array of prices and addresses
 */
const fetchAllPoolPrices = async () => {
  const { data } = await executeGraphQLQuery(
    process.env.POOL_PRICES_GRAPH_API_URL, // polygon-bridged-carbon subgraph
    ALL_POOL_PRICES
  );
  /** @type {Price[]} */
  const allPrices = data?.prices ? data.prices : [];

  return Object.keys(poolInfo).reduce((prev, poolName) => {
    const defaultPrice = allPrices.find(
      (p) => p.address === poolInfo[poolName].lpAddress
    )?.price;
    prev[poolName] = {
      poolName,
      defaultPrice: Number(defaultPrice).toFixed(6),
      selectiveRedeemPrice: calculateSelectivePrice(defaultPrice, poolName),
    };
    return prev;
  }, {});
};

module.exports = {
  fetchAllPoolPrices,
};
