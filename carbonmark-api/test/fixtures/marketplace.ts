import {
  aListing,
  aProject,
} from "../../src/.generated/mocks/marketplace.mocks";
import {
  ActivityType,
  GetActivitiesByProjectIdQuery,
  GetPurchaseByIdQuery,
} from "../../src/.generated/types/marketplace.types";

const listing = aListing({
  singleUnitPrice: "99000000",
  minFillAmount: "100000000000000000000",
  totalAmountToSell: "100000000000000000000",
  leftToSell: "100000000000000000000",
  updatedAt: "1234",
  createdAt: "1234",
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

/** marketplace.getPurchaseById() */
const activities: GetActivitiesByProjectIdQuery["activities"] = [
  {
    id: "0x88bb718a2556970081e9cd6a8f17af2dffaabe1a05f91dc47cf477c3425225b7Sold",
    amount: "1000000000000000000",
    previousAmount: null,
    price: "1250000",
    previousPrice: null,
    timeStamp: "1699653865",
    activityType: ActivityType.Sold,
    project: { key: "VCS-981", vintage: "2017" },
    buyer: null,
    seller: { id: "0x988bb718a2556970081e9cd6a8f17af2dffaa" },
  },
  {
    id: "0xd17ffb681569c5186783b3f31d778aaf58bf268795df8704b1b42cd500746c69ListingUpdated",
    amount: null,
    previousAmount: null,
    price: "1250000",
    previousPrice: "12500000",
    timeStamp: "1699399799",
    activityType: ActivityType.UpdatedPrice,
    project: { key: "VCS-981", vintage: "2017" },
    buyer: null,
    seller: { id: "0x488bb718a2556970081e9cd6a8f17af2dffaa" },
  },
];

/** Fixtures for the marketplace subgraph */
const fixtures = {
  listing,
  projectWithListing,
  purchase,
  activities,
};

export default fixtures;
