import {
  aListing,
  aProject,
} from "../../src/.generated/mocks/marketplace.mocks";
import { GetPurchaseByIdQuery } from "../../src/.generated/types/marketplace.types";

const listing = aListing({
  singleUnitPrice: "99000000",
  leftToSell: "100000000000000000000",
  updatedAt: "1234",
});

const projectWithListing = aProject({
  projectID: "191",
  registry: "VCS",
  listings: [listing],
  vintage: "2008",
  key: "VCS-191",
});

/** marketplace.getPurchaseById() */
const purchase: GetPurchaseByIdQuery["purchase"] = {
  amount: "1000000000000000000", // 1t
  id: "0xfe2949e3644b88d2e00e5f84f6266c191dbb0379a18e00a18192116de7c5c779",
  price: "1000000", // $1
  listing: {
    id: "0x01",
    project: {
      key: "VCS-191",
      vintage: "2008",
    },
  },
};

/** Fixtures for the marketplace subgraph */
const fixtures = {
  projectWithListing,
  purchase,
};

export default fixtures;
