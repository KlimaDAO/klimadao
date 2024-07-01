import { getWalletHoldingsViaPolygonDigitalCarbon } from "lib/getWalletHoldings";
import { filter } from "lodash";

// TODO - change to a thunk
export const getWalletHoldings = async (params: { address: string }) => {
  try {
    const { data } = await getWalletHoldingsViaPolygonDigitalCarbon(
      params.address
    );
    console.log("data", data);
    if (!data?.account?.holdings?.length) {
      console.error("nothing found");
    }
    // filter out 0 values
    return filter(data?.account?.holdings, ({ amount }) => Number(amount) > 0);
  } catch (e) {
    console.error(e);
  }
};
