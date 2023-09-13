import { GetCreditListingsQuery } from "../.generated/types/marketplaceMumbai.types";

type WithHandle<T> = T & { handle?: string | null | undefined };

//
// gql.marketplaceMumbai.getCreditListings(query)
// -----------------------------------

export type CreditListing = NonNullable<
  GetCreditListingsQuery["projects"][number]["listings"]
>[number];

/** Final project.listings response can include seller handle from firebase */
export type CreditListingWithHandle = Omit<CreditListing, "seller"> & {
  seller: WithHandle<CreditListing["seller"]>;
};

export type CreditActivity = NonNullable<
  GetCreditListingsQuery["projects"][number]["activities"]
>[number];

export type CreditActivityWithHandle = Omit<
  CreditActivity,
  "seller" | "buyer"
> & {
  seller: WithHandle<CreditActivity["seller"]>;
  buyer: WithHandle<CreditActivity["buyer"]>;
};
