import { utils } from "ethers";
import { Purchase as MumbaiPurchase } from "../../../graphql/marketplaceMumbai.types";
import { NetworkParam } from "../../../models/NetworkParam.model";
import { Purchase } from "../../../models/Purchase.model";
import { gqlSdk } from "../../../utils/gqlSdk";

/** Purchase ids are a txn hash */
export const isValidPurchaseId = (id?: string | null) => {
  if (!id) return false;
  return id.length === 66 && utils.isHexString(id);
};

export const getPurchaseById = async (params: {
  id: string | null;
  network?: NetworkParam;
}): Promise<Purchase | MumbaiPurchase | null> => {
  const graph =
    params.network === "mumbai" ? gqlSdk.marketplaceMumbai : gqlSdk.marketplace;
  const response = await graph.getPurchasesById({
    id: params.id,
  });
  return response.purchases?.at(0) || null;
};
