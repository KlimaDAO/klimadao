import { formatUnits, isHexString } from "ethers-v6";
import { GetPurchaseByIdQuery } from "src/.generated/types/marketplace.types";
import { IS_REGISTRY_ID } from "../../../src/app.constants";
import { formatAmountByRegistry } from "../../../src/utils/marketplace.utils";
import { Purchase } from "../../models/Purchase.model";
import { CreditId } from "../../utils/CreditId";

/** Purchase ids are a txn hash */
export const isValidPurchaseId = (id?: string | null) => {
  if (!id) return false;
  return id.length === 66 && isHexString(id);
};

export const composePurchaseModel = (
  purchase: NonNullable<GetPurchaseByIdQuery["purchase"]>
): Purchase => {
  const project = purchase.listing.project;
  // The digits after the registry identifier. e.g 1234 in VCS-1234
  const [registry, registryProjectId] = CreditId.splitProjectId(project.key);

  if (!IS_REGISTRY_ID(registry)) {
    throw new Error(`Invalid registry id in composePurchaseModel: ${registry}`);
  }

  return {
    id: purchase.id,
    amount: formatAmountByRegistry(registry, purchase.amount),
    price: formatUnits(purchase.price, 6),
    listing: {
      id: purchase.listing.id,
      tokenAddress: purchase.listing.tokenAddress,
      seller: {
        id: purchase.listing.seller.id,
      },
      project: {
        key: purchase.listing.project.key,
        vintage: purchase.listing.project.vintage,
        methodology: purchase.listing.project.methodology,
        name: project.name,
        projectID: registryProjectId,
        country: project.country.id,
      },
    },
  };
};
