import { utils } from "ethers";
import { GetPurchaseByIdQuery } from "src/.generated/types/marketplace.types";
import { Purchase } from "../../models/Purchase.model";
import { CreditId } from "../../utils/CreditId";

/** Purchase ids are a txn hash */
export const isValidPurchaseId = (id?: string | null) => {
  if (!id) return false;
  return id.length === 66 && utils.isHexString(id);
};

export const composePurchaseModel = (
  purchase: NonNullable<GetPurchaseByIdQuery["purchase"]>
): Purchase => {
  const project = purchase.listing.project;
  // The digits after the registry identifier. e.g 1234 in VCS-1234
  const [, registryProjectId] = CreditId.splitProjectId(project.key);
  return {
    id: purchase.id,
    amount: purchase.listing.project.key.startsWith("ICR")
      ? purchase.amount
      : utils.formatUnits(purchase.amount, 18),
    price: utils.formatUnits(purchase.price, 6),
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
