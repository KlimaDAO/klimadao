import { utils } from "ethers";
import { NetworkParam } from "../../../models/NetworkParam.model";
import { gql_sdk } from "../../../utils/gqlSdk";

/** Purchase ids are a txn hash */
export const isValidPurchaseId = (id?: string | null) => {
  if (!id) return false;
  return id.length === 66 && utils.isHexString(id);
};

export const getPurchaseById = async (params: {
  id: string;
  network?: NetworkParam;
}) => {
  const purchase = await gql_sdk(params.network).marketplace.getPurchaseById({
    id: params.id,
  });
  return purchase;
};
