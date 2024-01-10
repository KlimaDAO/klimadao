import { LP_ADDRESSES, POOL_INFO } from "../../routes/projects/get.constants";
import { GQL_SDK } from "../gqlSdk";

/**
 * Type for PoolPrice
 */
export type PoolPrice = {
  poolName: string; // 0x address of the liquidity pool
  defaultPrice: string; // formatted number string e.g. "1.23456" for USDC price of 1 token
  selectiveRedeemPrice: string; // formatted number string e.g. "1.23456" for USDC price of 1 token inc. redeeming fee calculation
  selectiveRetirePrice: string; // formatted number string e.g. "1.23456" for USDC price of 1 token inc. retirement fee calculation
};

const calculateSelectivePrice = (
  defaultPrice: number,
  poolName: string,
  withAggregatorFee: boolean
) => {
  const { poolFeeRatio, assetSwapFeeRatio, retirementServiceFeeRatio } =
    POOL_INFO[poolName];
  const priceNum = defaultPrice;
  const feePercentage =
    poolFeeRatio +
    assetSwapFeeRatio +
    (withAggregatorFee ? retirementServiceFeeRatio : 0);
  const feeAmount = priceNum * feePercentage;
  const priceWithFee = priceNum + feeAmount;
  return priceWithFee.toFixed(6);
};

/**
 * Query the subgraph for a list of all prices for tracked pairs (bct, nct, nbo, ubo)
 * @returns {Promise<Record<string, PoolPrice>>} - Map of prices and addresses
 */
export const fetchAllPoolPrices = async (sdk: GQL_SDK) => {
  const data = await sdk.tokens.getPoolPrices();
  const allPrices = data?.prices ? data.prices : [];
  const klimaPrice = allPrices.find((p) => p.address === LP_ADDRESSES.klima)
    ?.price;

  return Object.keys(POOL_INFO).reduce<Record<string, PoolPrice>>(
    (prev, poolName) => {
      let defaultPrice = allPrices.find(
        (p) => p.address === POOL_INFO[poolName].lpAddress
      )?.price;
      if (POOL_INFO[poolName].isKlimaLp) {
        defaultPrice *= klimaPrice;
      }
      prev[poolName] = {
        poolName,
        defaultPrice: Number(defaultPrice).toFixed(6),
        selectiveRedeemPrice: calculateSelectivePrice(
          Number(defaultPrice),
          poolName,
          false
        ),
        selectiveRetirePrice: calculateSelectivePrice(
          Number(defaultPrice),
          poolName,
          true
        ),
      };
      return prev;
    },
    {}
  );
};
