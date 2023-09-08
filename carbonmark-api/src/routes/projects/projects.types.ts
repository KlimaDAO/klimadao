import {
  ByIdProjectActivity,
  ByIdProjectListing,
} from "../../graphql/marketplace.types";

type WithHandle<T> = T & { handle?: string | null | undefined };

/** Final project.listings response can include seller handle from firebase */
export type ListingWithUserHandles = Omit<ByIdProjectListing, "seller"> & {
  seller: WithHandle<ByIdProjectListing["seller"]>;
};

/** Final project.activities response can include user handles from firebase */
export type ActivityWithUserHandles = Omit<
  ByIdProjectActivity,
  "seller" | "buyer"
> & {
  seller: WithHandle<ByIdProjectActivity["seller"]>;
  buyer: WithHandle<ByIdProjectActivity["buyer"]> | null;
};
