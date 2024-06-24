import { getWalletHoldingsViaPolygonDigitalCarbon } from "lib/getWalletHoldings";

// TODO - change to a thunk
export const getWalletHoldings = async (params: { address: string }) => {
  try {
    const holdings = await getWalletHoldingsViaPolygonDigitalCarbon(
      params.address
    );
    if (!holdings?.data?.accounts?.length) {
      console.error("nothing found");
    }
    return holdings?.data?.accounts?.at(0);
  } catch (e) {
    console.error(e);
  }
};
