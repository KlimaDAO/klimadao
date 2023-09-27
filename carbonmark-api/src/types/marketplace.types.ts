import {
  FindProjectsQuery,
  GetPurchasesByIdQuery,
  GetUserByWalletQuery,
} from "../.generated/types/marketplace.types";

//
// gql.marketplace.findProjects(query)
// -----------------------------------

/** The specific Project type from the find findProjects query*/
export type FindQueryProject = FindProjectsQuery["projects"][number];

//
// gql.marketplace.getUserByWallet(query)
// -------------------------------------

/** User entry from getUserByWallet().users[0] */
export type ByWalletUser = GetUserByWalletQuery["users"][number];

/** Listing entry from getUserByWallet().users[0].listings[0] */
export type ByWalletUserListing = NonNullable<ByWalletUser["listings"]>[number];

/** Listing entry from getUserByWallet().users[0].listings[0] */
export type ByWalletUserActivity = NonNullable<
  ByWalletUser["activities"]
>[number];

//
// gql.marketplace.getPurchasesById(query)
// -------------------------------------

export type Purchase = NonNullable<GetPurchasesByIdQuery["purchases"]>[number];
