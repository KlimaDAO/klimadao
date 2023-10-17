import {
  aListing,
  aProject,
} from "../../src/.generated/mocks/marketplace.mocks";
import { GetPurchaseByIdQuery } from "../../src/.generated/types/marketplace.types";

const listing = aListing({
  singleUnitPrice: "99000000",
  minFillAmount: "100000000000000000000",
  totalAmountToSell: "100000000000000000000",
  leftToSell: "100000000000000000000",
  updatedAt: "1234",
});

const projectWithListing = aProject({
  id: "VCS-191-2008",
  registry: "VCS",
  listings: [listing],
  vintage: "2008",
  key: "VCS-191",
});

/** marketplace.getPurchaseById() */
const purchase: GetPurchaseByIdQuery["purchase"] = {
  amount: "1000000000000000000", // 1 tonne
  id: "0xfe2949e3644b88d2e00e5f84f6266c191dbb0379a18e00a18192116de7c5c779",
  price: "5000000", // 5 USDC
  listing: {
    id: "0x01",
    tokenAddress: "0x5555553cd6ff9a46c36661750fabcbb9ae2ab555",
    seller: {
      id: "0x6667083cd6ff9a46c36661750fabcbb9ae2a6666",
    },
    project: {
      id: "VCS-191-2008",
      key: "VCS-191",
      vintage: "2008",
      category: { id: "Renewable Energy" },
      country: { id: "United States" },
      methodology: "VM0006",
      name: "Hydroelectric Fixture",
    },
  },
};

/** Fixtures for the marketplace subgraph */
const fixtures = {
  projectWithListing,
  purchase,
};

export default fixtures;
