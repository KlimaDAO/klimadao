import { PricesItem } from "lib/charts/types";
import { getCoinIcon, getCoinTitle } from "lib/coins";
import { COINS } from "lib/constants";
import { CoinTiles, CoinTilesData } from "../helpers/CoinTiles";
interface Props {
  pricesNow: PricesItem;
  pricesBefore: PricesItem;
}
export default function Chart(props: Props) {
  
  const coinTilesData: CoinTilesData = COINS.map(coin => {
    return {
    title: getCoinTitle(coin),
    globalFact: "globalfact",
    icon:     getCoinIcon(coin),
    facts: [{
      label: "l1",
      value:"v1"
    },
    {
      label: "l2",
      value:"v2"
    },
    {
      label: "l3",
      value:"v3"
    }]      
  }});

  return (
    <CoinTiles data={coinTilesData}></CoinTiles>
  );
}
