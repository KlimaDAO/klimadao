import { GetDigitalCarbonProjectsVintagesQuery, GetProjectCreditsQuery } from "../../.generated/types/digitalCarbon.types";
import { TokenPriceT } from "../../models/TokenPrice.model";
import { PoolPrice } from "./fetchAllPoolPrices";
import { getProjectPoolPricesAndStats } from "./getProjectPoolPricesAndStats";

type AnyCarbonProject  = GetProjectCreditsQuery["carbonProjects"][0] |
GetDigitalCarbonProjectsVintagesQuery["carbonProjects"][0]

export const getProjectPoolPrices = ( props: {
  poolProject?: AnyCarbonProject,
  network: "polygon" | "mumbai" | undefined,
  allPoolPrices: Record<string, PoolPrice>
  minSupply?: number;
}
) => {
  const credits = props.poolProject?.carbonCredits;
  const poolPrices = props.network === "polygon" && credits ? 
  getProjectPoolPricesAndStats(credits, props.allPoolPrices)[0] : [];
  console.log(poolPrices)
  return getActivePoolPrices(poolPrices, props.minSupply);
}

export const getProjectStats = (
  props: {
    poolProject?: AnyCarbonProject,
    network: "polygon" | "mumbai" | undefined,
    allPoolPrices: Record<string, PoolPrice>;
  }
) => {
  const credits = props.poolProject?.carbonCredits;
  return props.network === "polygon" && credits ? 
  getProjectPoolPricesAndStats(credits, props.allPoolPrices)[1] :  { totalBridged: 0, totalSupply: 0, totalRetired: 0 };
}

export const getActivePoolPrices = (prices: TokenPriceT[], minSupply?: number) => {
  return prices.filter((price) => Number(price.supply) > (minSupply || 0));
};

export const projectHasPoolPrices = ( props: {
  poolProject?: AnyCarbonProject,
  network: "polygon" | "mumbai" | undefined,
  allPoolPrices: Record<string, PoolPrice>
  minSupply?: number;
}
) => {
  return getProjectPoolPrices(props).length > 0
};