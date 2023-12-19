import { get } from "lodash";
import { GetProjectCreditsQuery } from "src/.generated/types/digitalCarbon.types";
import { TokenPriceT } from "../../models/TokenPrice.model";
import { PoolPrice } from "./fetchAllPoolPrices";
import { getProjectPoolInfo, Stats } from "./getProjectPoolInfo";

/**
 * Get the project poolPrices given the project credits and the current pool prices
 * @param 
 * @returns {Promise<[ProjectPoolPrice[], Stats]>} - 1 entry for each asset. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const getProjectPoolPricesAndStats = (
  credits : GetProjectCreditsQuery["carbonProjects"][0]["carbonCredits"],
  allPoolPrices: Record<string, PoolPrice>
): [TokenPriceT[], Stats] => {
  const [poolInfoMap, stats] = getProjectPoolInfo(credits);

  /** @type {ProjectPoolPrice[]} */
  const initialPrices: TokenPriceT[] = [];
  // convert the map to an array of prices, filter out any pools that don't have a supply
  const poolPrices = Object.keys(poolInfoMap).reduce((arr, poolName) => {
    const poolInfo = get(poolInfoMap, poolName);
    if (!Number(poolInfo.supply)) return arr;
    arr.push({
      ...poolInfo,
      singleUnitPrice: poolInfo.isPoolDefault
        ? allPoolPrices[poolName].defaultPrice
        : allPoolPrices[poolName].selectiveRedeemPrice,
      singleUnitBuyPrice: allPoolPrices[poolName].selectiveRedeemPrice,
      singleUnitSellPrice: allPoolPrices[poolName].selectiveRetirePrice,
    });
    return arr;
  }, initialPrices);
  return [poolPrices, stats];
};
