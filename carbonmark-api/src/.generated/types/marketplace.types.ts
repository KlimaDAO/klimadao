import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: string;
  Bytes: any;
  Int8: any;
};

export type MarketplaceActivity = {
  __typename?: 'Activity';
  activityType: MarketplaceActivityType;
  amount: Maybe<Scalars['BigInt']>;
  buyer: Maybe<MarketplaceUser>;
  id: Scalars['String'];
  listing: Maybe<MarketplaceListing>;
  previousAmount: Maybe<Scalars['BigInt']>;
  previousPrice: Maybe<Scalars['BigInt']>;
  price: Maybe<Scalars['BigInt']>;
  project: MarketplaceProject;
  seller: MarketplaceUser;
  timeStamp: Maybe<Scalars['BigInt']>;
  user: Maybe<MarketplaceUser>;
};

export enum MarketplaceActivityType {
  CreatedListing = 'CreatedListing',
  DeletedListing = 'DeletedListing',
  Purchase = 'Purchase',
  Sold = 'Sold',
  UpdatedPrice = 'UpdatedPrice',
  UpdatedQuantity = 'UpdatedQuantity'
}

export type MarketplaceActivity_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  activityType: InputMaybe<MarketplaceActivityType>;
  activityType_in: InputMaybe<Array<MarketplaceActivityType>>;
  activityType_not: InputMaybe<MarketplaceActivityType>;
  activityType_not_in: InputMaybe<Array<MarketplaceActivityType>>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<MarketplaceActivity_Filter>>>;
  buyer: InputMaybe<Scalars['String']>;
  buyer_: InputMaybe<MarketplaceUser_Filter>;
  buyer_contains: InputMaybe<Scalars['String']>;
  buyer_contains_nocase: InputMaybe<Scalars['String']>;
  buyer_ends_with: InputMaybe<Scalars['String']>;
  buyer_ends_with_nocase: InputMaybe<Scalars['String']>;
  buyer_gt: InputMaybe<Scalars['String']>;
  buyer_gte: InputMaybe<Scalars['String']>;
  buyer_in: InputMaybe<Array<Scalars['String']>>;
  buyer_lt: InputMaybe<Scalars['String']>;
  buyer_lte: InputMaybe<Scalars['String']>;
  buyer_not: InputMaybe<Scalars['String']>;
  buyer_not_contains: InputMaybe<Scalars['String']>;
  buyer_not_contains_nocase: InputMaybe<Scalars['String']>;
  buyer_not_ends_with: InputMaybe<Scalars['String']>;
  buyer_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  buyer_not_in: InputMaybe<Array<Scalars['String']>>;
  buyer_not_starts_with: InputMaybe<Scalars['String']>;
  buyer_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  buyer_starts_with: InputMaybe<Scalars['String']>;
  buyer_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  id_contains: InputMaybe<Scalars['String']>;
  id_contains_nocase: InputMaybe<Scalars['String']>;
  id_ends_with: InputMaybe<Scalars['String']>;
  id_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_gt: InputMaybe<Scalars['String']>;
  id_gte: InputMaybe<Scalars['String']>;
  id_in: InputMaybe<Array<Scalars['String']>>;
  id_lt: InputMaybe<Scalars['String']>;
  id_lte: InputMaybe<Scalars['String']>;
  id_not: InputMaybe<Scalars['String']>;
  id_not_contains: InputMaybe<Scalars['String']>;
  id_not_contains_nocase: InputMaybe<Scalars['String']>;
  id_not_ends_with: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_not_in: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  id_starts_with: InputMaybe<Scalars['String']>;
  id_starts_with_nocase: InputMaybe<Scalars['String']>;
  listing: InputMaybe<Scalars['String']>;
  listing_: InputMaybe<MarketplaceListing_Filter>;
  listing_contains: InputMaybe<Scalars['String']>;
  listing_contains_nocase: InputMaybe<Scalars['String']>;
  listing_ends_with: InputMaybe<Scalars['String']>;
  listing_ends_with_nocase: InputMaybe<Scalars['String']>;
  listing_gt: InputMaybe<Scalars['String']>;
  listing_gte: InputMaybe<Scalars['String']>;
  listing_in: InputMaybe<Array<Scalars['String']>>;
  listing_lt: InputMaybe<Scalars['String']>;
  listing_lte: InputMaybe<Scalars['String']>;
  listing_not: InputMaybe<Scalars['String']>;
  listing_not_contains: InputMaybe<Scalars['String']>;
  listing_not_contains_nocase: InputMaybe<Scalars['String']>;
  listing_not_ends_with: InputMaybe<Scalars['String']>;
  listing_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  listing_not_in: InputMaybe<Array<Scalars['String']>>;
  listing_not_starts_with: InputMaybe<Scalars['String']>;
  listing_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  listing_starts_with: InputMaybe<Scalars['String']>;
  listing_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<MarketplaceActivity_Filter>>>;
  previousAmount: InputMaybe<Scalars['BigInt']>;
  previousAmount_gt: InputMaybe<Scalars['BigInt']>;
  previousAmount_gte: InputMaybe<Scalars['BigInt']>;
  previousAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  previousAmount_lt: InputMaybe<Scalars['BigInt']>;
  previousAmount_lte: InputMaybe<Scalars['BigInt']>;
  previousAmount_not: InputMaybe<Scalars['BigInt']>;
  previousAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  previousPrice: InputMaybe<Scalars['BigInt']>;
  previousPrice_gt: InputMaybe<Scalars['BigInt']>;
  previousPrice_gte: InputMaybe<Scalars['BigInt']>;
  previousPrice_in: InputMaybe<Array<Scalars['BigInt']>>;
  previousPrice_lt: InputMaybe<Scalars['BigInt']>;
  previousPrice_lte: InputMaybe<Scalars['BigInt']>;
  previousPrice_not: InputMaybe<Scalars['BigInt']>;
  previousPrice_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  price: InputMaybe<Scalars['BigInt']>;
  price_gt: InputMaybe<Scalars['BigInt']>;
  price_gte: InputMaybe<Scalars['BigInt']>;
  price_in: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt: InputMaybe<Scalars['BigInt']>;
  price_lte: InputMaybe<Scalars['BigInt']>;
  price_not: InputMaybe<Scalars['BigInt']>;
  price_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  project: InputMaybe<Scalars['String']>;
  project_: InputMaybe<MarketplaceProject_Filter>;
  project_contains: InputMaybe<Scalars['String']>;
  project_contains_nocase: InputMaybe<Scalars['String']>;
  project_ends_with: InputMaybe<Scalars['String']>;
  project_ends_with_nocase: InputMaybe<Scalars['String']>;
  project_gt: InputMaybe<Scalars['String']>;
  project_gte: InputMaybe<Scalars['String']>;
  project_in: InputMaybe<Array<Scalars['String']>>;
  project_lt: InputMaybe<Scalars['String']>;
  project_lte: InputMaybe<Scalars['String']>;
  project_not: InputMaybe<Scalars['String']>;
  project_not_contains: InputMaybe<Scalars['String']>;
  project_not_contains_nocase: InputMaybe<Scalars['String']>;
  project_not_ends_with: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  project_not_in: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  project_starts_with: InputMaybe<Scalars['String']>;
  project_starts_with_nocase: InputMaybe<Scalars['String']>;
  seller: InputMaybe<Scalars['String']>;
  seller_: InputMaybe<MarketplaceUser_Filter>;
  seller_contains: InputMaybe<Scalars['String']>;
  seller_contains_nocase: InputMaybe<Scalars['String']>;
  seller_ends_with: InputMaybe<Scalars['String']>;
  seller_ends_with_nocase: InputMaybe<Scalars['String']>;
  seller_gt: InputMaybe<Scalars['String']>;
  seller_gte: InputMaybe<Scalars['String']>;
  seller_in: InputMaybe<Array<Scalars['String']>>;
  seller_lt: InputMaybe<Scalars['String']>;
  seller_lte: InputMaybe<Scalars['String']>;
  seller_not: InputMaybe<Scalars['String']>;
  seller_not_contains: InputMaybe<Scalars['String']>;
  seller_not_contains_nocase: InputMaybe<Scalars['String']>;
  seller_not_ends_with: InputMaybe<Scalars['String']>;
  seller_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  seller_not_in: InputMaybe<Array<Scalars['String']>>;
  seller_not_starts_with: InputMaybe<Scalars['String']>;
  seller_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  seller_starts_with: InputMaybe<Scalars['String']>;
  seller_starts_with_nocase: InputMaybe<Scalars['String']>;
  timeStamp: InputMaybe<Scalars['BigInt']>;
  timeStamp_gt: InputMaybe<Scalars['BigInt']>;
  timeStamp_gte: InputMaybe<Scalars['BigInt']>;
  timeStamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timeStamp_lt: InputMaybe<Scalars['BigInt']>;
  timeStamp_lte: InputMaybe<Scalars['BigInt']>;
  timeStamp_not: InputMaybe<Scalars['BigInt']>;
  timeStamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  user: InputMaybe<Scalars['String']>;
  user_: InputMaybe<MarketplaceUser_Filter>;
  user_contains: InputMaybe<Scalars['String']>;
  user_contains_nocase: InputMaybe<Scalars['String']>;
  user_ends_with: InputMaybe<Scalars['String']>;
  user_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_gt: InputMaybe<Scalars['String']>;
  user_gte: InputMaybe<Scalars['String']>;
  user_in: InputMaybe<Array<Scalars['String']>>;
  user_lt: InputMaybe<Scalars['String']>;
  user_lte: InputMaybe<Scalars['String']>;
  user_not: InputMaybe<Scalars['String']>;
  user_not_contains: InputMaybe<Scalars['String']>;
  user_not_contains_nocase: InputMaybe<Scalars['String']>;
  user_not_ends_with: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_not_in: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  user_starts_with: InputMaybe<Scalars['String']>;
  user_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum MarketplaceActivity_OrderBy {
  ActivityType = 'activityType',
  Amount = 'amount',
  Buyer = 'buyer',
  BuyerId = 'buyer__id',
  Id = 'id',
  Listing = 'listing',
  ListingActive = 'listing__active',
  ListingCreatedAt = 'listing__createdAt',
  ListingDeleted = 'listing__deleted',
  ListingExpiration = 'listing__expiration',
  ListingId = 'listing__id',
  ListingLeftToSell = 'listing__leftToSell',
  ListingMinFillAmount = 'listing__minFillAmount',
  ListingSingleUnitPrice = 'listing__singleUnitPrice',
  ListingTokenAddress = 'listing__tokenAddress',
  ListingTotalAmountToSell = 'listing__totalAmountToSell',
  ListingUpdatedAt = 'listing__updatedAt',
  PreviousAmount = 'previousAmount',
  PreviousPrice = 'previousPrice',
  Price = 'price',
  Project = 'project',
  ProjectId = 'project__id',
  ProjectKey = 'project__key',
  ProjectMethodology = 'project__methodology',
  ProjectName = 'project__name',
  ProjectProjectAddress = 'project__projectAddress',
  ProjectRegistry = 'project__registry',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectVintage = 'project__vintage',
  Seller = 'seller',
  SellerId = 'seller__id',
  TimeStamp = 'timeStamp',
  User = 'user',
  UserId = 'user__id'
}

export type MarketplaceBlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type MarketplaceBlock_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type MarketplaceCategory = {
  __typename?: 'Category';
  id: Scalars['String'];
};

export type MarketplaceCategory_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<MarketplaceCategory_Filter>>>;
  id: InputMaybe<Scalars['String']>;
  id_contains: InputMaybe<Scalars['String']>;
  id_contains_nocase: InputMaybe<Scalars['String']>;
  id_ends_with: InputMaybe<Scalars['String']>;
  id_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_gt: InputMaybe<Scalars['String']>;
  id_gte: InputMaybe<Scalars['String']>;
  id_in: InputMaybe<Array<Scalars['String']>>;
  id_lt: InputMaybe<Scalars['String']>;
  id_lte: InputMaybe<Scalars['String']>;
  id_not: InputMaybe<Scalars['String']>;
  id_not_contains: InputMaybe<Scalars['String']>;
  id_not_contains_nocase: InputMaybe<Scalars['String']>;
  id_not_ends_with: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_not_in: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  id_starts_with: InputMaybe<Scalars['String']>;
  id_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<MarketplaceCategory_Filter>>>;
};

export enum MarketplaceCategory_OrderBy {
  Id = 'id'
}

export type MarketplaceCountry = {
  __typename?: 'Country';
  id: Scalars['String'];
};

export type MarketplaceCountry_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<MarketplaceCountry_Filter>>>;
  id: InputMaybe<Scalars['String']>;
  id_contains: InputMaybe<Scalars['String']>;
  id_contains_nocase: InputMaybe<Scalars['String']>;
  id_ends_with: InputMaybe<Scalars['String']>;
  id_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_gt: InputMaybe<Scalars['String']>;
  id_gte: InputMaybe<Scalars['String']>;
  id_in: InputMaybe<Array<Scalars['String']>>;
  id_lt: InputMaybe<Scalars['String']>;
  id_lte: InputMaybe<Scalars['String']>;
  id_not: InputMaybe<Scalars['String']>;
  id_not_contains: InputMaybe<Scalars['String']>;
  id_not_contains_nocase: InputMaybe<Scalars['String']>;
  id_not_ends_with: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  id_not_in: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  id_starts_with: InputMaybe<Scalars['String']>;
  id_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<MarketplaceCountry_Filter>>>;
};

export enum MarketplaceCountry_OrderBy {
  Id = 'id'
}

export type MarketplaceListing = {
  __typename?: 'Listing';
  active: Maybe<Scalars['Boolean']>;
  activities: Maybe<Array<MarketplaceActivity>>;
  batchPrices: Maybe<Array<Scalars['BigInt']>>;
  batches: Maybe<Array<Scalars['BigInt']>>;
  createdAt: Maybe<Scalars['BigInt']>;
  deleted: Maybe<Scalars['Boolean']>;
  expiration: Scalars['BigInt'];
  id: Scalars['ID'];
  leftToSell: Scalars['BigInt'];
  minFillAmount: Scalars['BigInt'];
  project: MarketplaceProject;
  seller: MarketplaceUser;
  singleUnitPrice: Scalars['BigInt'];
  tokenAddress: Scalars['Bytes'];
  totalAmountToSell: Scalars['BigInt'];
  updatedAt: Maybe<Scalars['BigInt']>;
};


export type MarketplaceListingActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceActivity_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplaceActivity_Filter>;
};

export type MarketplaceListing_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  active: InputMaybe<Scalars['Boolean']>;
  active_in: InputMaybe<Array<Scalars['Boolean']>>;
  active_not: InputMaybe<Scalars['Boolean']>;
  active_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  activities_: InputMaybe<MarketplaceActivity_Filter>;
  and: InputMaybe<Array<InputMaybe<MarketplaceListing_Filter>>>;
  batchPrices: InputMaybe<Array<Scalars['BigInt']>>;
  batchPrices_contains: InputMaybe<Array<Scalars['BigInt']>>;
  batchPrices_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  batchPrices_not: InputMaybe<Array<Scalars['BigInt']>>;
  batchPrices_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  batchPrices_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  batches: InputMaybe<Array<Scalars['BigInt']>>;
  batches_contains: InputMaybe<Array<Scalars['BigInt']>>;
  batches_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  batches_not: InputMaybe<Array<Scalars['BigInt']>>;
  batches_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  batches_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deleted: InputMaybe<Scalars['Boolean']>;
  deleted_in: InputMaybe<Array<Scalars['Boolean']>>;
  deleted_not: InputMaybe<Scalars['Boolean']>;
  deleted_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  expiration: InputMaybe<Scalars['BigInt']>;
  expiration_gt: InputMaybe<Scalars['BigInt']>;
  expiration_gte: InputMaybe<Scalars['BigInt']>;
  expiration_in: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_lt: InputMaybe<Scalars['BigInt']>;
  expiration_lte: InputMaybe<Scalars['BigInt']>;
  expiration_not: InputMaybe<Scalars['BigInt']>;
  expiration_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  leftToSell: InputMaybe<Scalars['BigInt']>;
  leftToSell_gt: InputMaybe<Scalars['BigInt']>;
  leftToSell_gte: InputMaybe<Scalars['BigInt']>;
  leftToSell_in: InputMaybe<Array<Scalars['BigInt']>>;
  leftToSell_lt: InputMaybe<Scalars['BigInt']>;
  leftToSell_lte: InputMaybe<Scalars['BigInt']>;
  leftToSell_not: InputMaybe<Scalars['BigInt']>;
  leftToSell_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  minFillAmount: InputMaybe<Scalars['BigInt']>;
  minFillAmount_gt: InputMaybe<Scalars['BigInt']>;
  minFillAmount_gte: InputMaybe<Scalars['BigInt']>;
  minFillAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  minFillAmount_lt: InputMaybe<Scalars['BigInt']>;
  minFillAmount_lte: InputMaybe<Scalars['BigInt']>;
  minFillAmount_not: InputMaybe<Scalars['BigInt']>;
  minFillAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<MarketplaceListing_Filter>>>;
  project: InputMaybe<Scalars['String']>;
  project_: InputMaybe<MarketplaceProject_Filter>;
  project_contains: InputMaybe<Scalars['String']>;
  project_contains_nocase: InputMaybe<Scalars['String']>;
  project_ends_with: InputMaybe<Scalars['String']>;
  project_ends_with_nocase: InputMaybe<Scalars['String']>;
  project_gt: InputMaybe<Scalars['String']>;
  project_gte: InputMaybe<Scalars['String']>;
  project_in: InputMaybe<Array<Scalars['String']>>;
  project_lt: InputMaybe<Scalars['String']>;
  project_lte: InputMaybe<Scalars['String']>;
  project_not: InputMaybe<Scalars['String']>;
  project_not_contains: InputMaybe<Scalars['String']>;
  project_not_contains_nocase: InputMaybe<Scalars['String']>;
  project_not_ends_with: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  project_not_in: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  project_starts_with: InputMaybe<Scalars['String']>;
  project_starts_with_nocase: InputMaybe<Scalars['String']>;
  seller: InputMaybe<Scalars['String']>;
  seller_: InputMaybe<MarketplaceUser_Filter>;
  seller_contains: InputMaybe<Scalars['String']>;
  seller_contains_nocase: InputMaybe<Scalars['String']>;
  seller_ends_with: InputMaybe<Scalars['String']>;
  seller_ends_with_nocase: InputMaybe<Scalars['String']>;
  seller_gt: InputMaybe<Scalars['String']>;
  seller_gte: InputMaybe<Scalars['String']>;
  seller_in: InputMaybe<Array<Scalars['String']>>;
  seller_lt: InputMaybe<Scalars['String']>;
  seller_lte: InputMaybe<Scalars['String']>;
  seller_not: InputMaybe<Scalars['String']>;
  seller_not_contains: InputMaybe<Scalars['String']>;
  seller_not_contains_nocase: InputMaybe<Scalars['String']>;
  seller_not_ends_with: InputMaybe<Scalars['String']>;
  seller_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  seller_not_in: InputMaybe<Array<Scalars['String']>>;
  seller_not_starts_with: InputMaybe<Scalars['String']>;
  seller_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  seller_starts_with: InputMaybe<Scalars['String']>;
  seller_starts_with_nocase: InputMaybe<Scalars['String']>;
  singleUnitPrice: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_gt: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_gte: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_in: InputMaybe<Array<Scalars['BigInt']>>;
  singleUnitPrice_lt: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_lte: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_not: InputMaybe<Scalars['BigInt']>;
  singleUnitPrice_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAddress: InputMaybe<Scalars['Bytes']>;
  tokenAddress_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gt: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gte: InputMaybe<Scalars['Bytes']>;
  tokenAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_lt: InputMaybe<Scalars['Bytes']>;
  tokenAddress_lte: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  totalAmountToSell: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_gt: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_gte: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmountToSell_lt: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_lte: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_not: InputMaybe<Scalars['BigInt']>;
  totalAmountToSell_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum MarketplaceListing_OrderBy {
  Active = 'active',
  Activities = 'activities',
  BatchPrices = 'batchPrices',
  Batches = 'batches',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Expiration = 'expiration',
  Id = 'id',
  LeftToSell = 'leftToSell',
  MinFillAmount = 'minFillAmount',
  Project = 'project',
  ProjectId = 'project__id',
  ProjectKey = 'project__key',
  ProjectMethodology = 'project__methodology',
  ProjectName = 'project__name',
  ProjectProjectAddress = 'project__projectAddress',
  ProjectRegistry = 'project__registry',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectVintage = 'project__vintage',
  Seller = 'seller',
  SellerId = 'seller__id',
  SingleUnitPrice = 'singleUnitPrice',
  TokenAddress = 'tokenAddress',
  TotalAmountToSell = 'totalAmountToSell',
  UpdatedAt = 'updatedAt'
}

/** Defines the order direction, either ascending or descending */
export enum MarketplaceOrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type MarketplaceProject = {
  __typename?: 'Project';
  activities: Maybe<Array<MarketplaceActivity>>;
  category: MarketplaceCategory;
  country: MarketplaceCountry;
  id: Scalars['ID'];
  key: Scalars['String'];
  listings: Maybe<Array<MarketplaceListing>>;
  methodology: Scalars['String'];
  name: Scalars['String'];
  projectAddress: Scalars['Bytes'];
  registry: Scalars['String'];
  updatedAt: Maybe<Scalars['BigInt']>;
  vintage: Scalars['BigInt'];
};


export type MarketplaceProjectActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceActivity_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplaceActivity_Filter>;
};


export type MarketplaceProjectListingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplaceListing_Filter>;
};

export type MarketplaceProject_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  activities_: InputMaybe<MarketplaceActivity_Filter>;
  and: InputMaybe<Array<InputMaybe<MarketplaceProject_Filter>>>;
  category: InputMaybe<Scalars['String']>;
  category_: InputMaybe<MarketplaceCategory_Filter>;
  category_contains: InputMaybe<Scalars['String']>;
  category_contains_nocase: InputMaybe<Scalars['String']>;
  category_ends_with: InputMaybe<Scalars['String']>;
  category_ends_with_nocase: InputMaybe<Scalars['String']>;
  category_gt: InputMaybe<Scalars['String']>;
  category_gte: InputMaybe<Scalars['String']>;
  category_in: InputMaybe<Array<Scalars['String']>>;
  category_lt: InputMaybe<Scalars['String']>;
  category_lte: InputMaybe<Scalars['String']>;
  category_not: InputMaybe<Scalars['String']>;
  category_not_contains: InputMaybe<Scalars['String']>;
  category_not_contains_nocase: InputMaybe<Scalars['String']>;
  category_not_ends_with: InputMaybe<Scalars['String']>;
  category_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  category_not_in: InputMaybe<Array<Scalars['String']>>;
  category_not_starts_with: InputMaybe<Scalars['String']>;
  category_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  category_starts_with: InputMaybe<Scalars['String']>;
  category_starts_with_nocase: InputMaybe<Scalars['String']>;
  country: InputMaybe<Scalars['String']>;
  country_: InputMaybe<MarketplaceCountry_Filter>;
  country_contains: InputMaybe<Scalars['String']>;
  country_contains_nocase: InputMaybe<Scalars['String']>;
  country_ends_with: InputMaybe<Scalars['String']>;
  country_ends_with_nocase: InputMaybe<Scalars['String']>;
  country_gt: InputMaybe<Scalars['String']>;
  country_gte: InputMaybe<Scalars['String']>;
  country_in: InputMaybe<Array<Scalars['String']>>;
  country_lt: InputMaybe<Scalars['String']>;
  country_lte: InputMaybe<Scalars['String']>;
  country_not: InputMaybe<Scalars['String']>;
  country_not_contains: InputMaybe<Scalars['String']>;
  country_not_contains_nocase: InputMaybe<Scalars['String']>;
  country_not_ends_with: InputMaybe<Scalars['String']>;
  country_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  country_not_in: InputMaybe<Array<Scalars['String']>>;
  country_not_starts_with: InputMaybe<Scalars['String']>;
  country_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  country_starts_with: InputMaybe<Scalars['String']>;
  country_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  key: InputMaybe<Scalars['String']>;
  key_contains: InputMaybe<Scalars['String']>;
  key_contains_nocase: InputMaybe<Scalars['String']>;
  key_ends_with: InputMaybe<Scalars['String']>;
  key_ends_with_nocase: InputMaybe<Scalars['String']>;
  key_gt: InputMaybe<Scalars['String']>;
  key_gte: InputMaybe<Scalars['String']>;
  key_in: InputMaybe<Array<Scalars['String']>>;
  key_lt: InputMaybe<Scalars['String']>;
  key_lte: InputMaybe<Scalars['String']>;
  key_not: InputMaybe<Scalars['String']>;
  key_not_contains: InputMaybe<Scalars['String']>;
  key_not_contains_nocase: InputMaybe<Scalars['String']>;
  key_not_ends_with: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  key_not_in: InputMaybe<Array<Scalars['String']>>;
  key_not_starts_with: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  key_starts_with: InputMaybe<Scalars['String']>;
  key_starts_with_nocase: InputMaybe<Scalars['String']>;
  listings_: InputMaybe<MarketplaceListing_Filter>;
  methodology: InputMaybe<Scalars['String']>;
  methodology_contains: InputMaybe<Scalars['String']>;
  methodology_contains_nocase: InputMaybe<Scalars['String']>;
  methodology_ends_with: InputMaybe<Scalars['String']>;
  methodology_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodology_gt: InputMaybe<Scalars['String']>;
  methodology_gte: InputMaybe<Scalars['String']>;
  methodology_in: InputMaybe<Array<Scalars['String']>>;
  methodology_lt: InputMaybe<Scalars['String']>;
  methodology_lte: InputMaybe<Scalars['String']>;
  methodology_not: InputMaybe<Scalars['String']>;
  methodology_not_contains: InputMaybe<Scalars['String']>;
  methodology_not_contains_nocase: InputMaybe<Scalars['String']>;
  methodology_not_ends_with: InputMaybe<Scalars['String']>;
  methodology_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodology_not_in: InputMaybe<Array<Scalars['String']>>;
  methodology_not_starts_with: InputMaybe<Scalars['String']>;
  methodology_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  methodology_starts_with: InputMaybe<Scalars['String']>;
  methodology_starts_with_nocase: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  name_contains: InputMaybe<Scalars['String']>;
  name_contains_nocase: InputMaybe<Scalars['String']>;
  name_ends_with: InputMaybe<Scalars['String']>;
  name_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_gt: InputMaybe<Scalars['String']>;
  name_gte: InputMaybe<Scalars['String']>;
  name_in: InputMaybe<Array<Scalars['String']>>;
  name_lt: InputMaybe<Scalars['String']>;
  name_lte: InputMaybe<Scalars['String']>;
  name_not: InputMaybe<Scalars['String']>;
  name_not_contains: InputMaybe<Scalars['String']>;
  name_not_contains_nocase: InputMaybe<Scalars['String']>;
  name_not_ends_with: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_not_in: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  name_starts_with: InputMaybe<Scalars['String']>;
  name_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<MarketplaceProject_Filter>>>;
  projectAddress: InputMaybe<Scalars['Bytes']>;
  projectAddress_contains: InputMaybe<Scalars['Bytes']>;
  projectAddress_gt: InputMaybe<Scalars['Bytes']>;
  projectAddress_gte: InputMaybe<Scalars['Bytes']>;
  projectAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  projectAddress_lt: InputMaybe<Scalars['Bytes']>;
  projectAddress_lte: InputMaybe<Scalars['Bytes']>;
  projectAddress_not: InputMaybe<Scalars['Bytes']>;
  projectAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  projectAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  registry: InputMaybe<Scalars['String']>;
  registry_contains: InputMaybe<Scalars['String']>;
  registry_contains_nocase: InputMaybe<Scalars['String']>;
  registry_ends_with: InputMaybe<Scalars['String']>;
  registry_ends_with_nocase: InputMaybe<Scalars['String']>;
  registry_gt: InputMaybe<Scalars['String']>;
  registry_gte: InputMaybe<Scalars['String']>;
  registry_in: InputMaybe<Array<Scalars['String']>>;
  registry_lt: InputMaybe<Scalars['String']>;
  registry_lte: InputMaybe<Scalars['String']>;
  registry_not: InputMaybe<Scalars['String']>;
  registry_not_contains: InputMaybe<Scalars['String']>;
  registry_not_contains_nocase: InputMaybe<Scalars['String']>;
  registry_not_ends_with: InputMaybe<Scalars['String']>;
  registry_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  registry_not_in: InputMaybe<Array<Scalars['String']>>;
  registry_not_starts_with: InputMaybe<Scalars['String']>;
  registry_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  registry_starts_with: InputMaybe<Scalars['String']>;
  registry_starts_with_nocase: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  vintage: InputMaybe<Scalars['BigInt']>;
  vintage_gt: InputMaybe<Scalars['BigInt']>;
  vintage_gte: InputMaybe<Scalars['BigInt']>;
  vintage_in: InputMaybe<Array<Scalars['BigInt']>>;
  vintage_lt: InputMaybe<Scalars['BigInt']>;
  vintage_lte: InputMaybe<Scalars['BigInt']>;
  vintage_not: InputMaybe<Scalars['BigInt']>;
  vintage_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum MarketplaceProject_OrderBy {
  Activities = 'activities',
  Category = 'category',
  CategoryId = 'category__id',
  Country = 'country',
  CountryId = 'country__id',
  Id = 'id',
  Key = 'key',
  Listings = 'listings',
  Methodology = 'methodology',
  Name = 'name',
  ProjectAddress = 'projectAddress',
  Registry = 'registry',
  UpdatedAt = 'updatedAt',
  Vintage = 'vintage'
}

export type MarketplacePurchase = {
  __typename?: 'Purchase';
  amount: Scalars['BigInt'];
  id: Scalars['Bytes'];
  listing: MarketplaceListing;
  price: Scalars['BigInt'];
  timeStamp: Scalars['BigInt'];
  user: MarketplaceUser;
};

export type MarketplacePurchase_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<MarketplacePurchase_Filter>>>;
  id: InputMaybe<Scalars['Bytes']>;
  id_contains: InputMaybe<Scalars['Bytes']>;
  id_gt: InputMaybe<Scalars['Bytes']>;
  id_gte: InputMaybe<Scalars['Bytes']>;
  id_in: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt: InputMaybe<Scalars['Bytes']>;
  id_lte: InputMaybe<Scalars['Bytes']>;
  id_not: InputMaybe<Scalars['Bytes']>;
  id_not_contains: InputMaybe<Scalars['Bytes']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  listing: InputMaybe<Scalars['String']>;
  listing_: InputMaybe<MarketplaceListing_Filter>;
  listing_contains: InputMaybe<Scalars['String']>;
  listing_contains_nocase: InputMaybe<Scalars['String']>;
  listing_ends_with: InputMaybe<Scalars['String']>;
  listing_ends_with_nocase: InputMaybe<Scalars['String']>;
  listing_gt: InputMaybe<Scalars['String']>;
  listing_gte: InputMaybe<Scalars['String']>;
  listing_in: InputMaybe<Array<Scalars['String']>>;
  listing_lt: InputMaybe<Scalars['String']>;
  listing_lte: InputMaybe<Scalars['String']>;
  listing_not: InputMaybe<Scalars['String']>;
  listing_not_contains: InputMaybe<Scalars['String']>;
  listing_not_contains_nocase: InputMaybe<Scalars['String']>;
  listing_not_ends_with: InputMaybe<Scalars['String']>;
  listing_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  listing_not_in: InputMaybe<Array<Scalars['String']>>;
  listing_not_starts_with: InputMaybe<Scalars['String']>;
  listing_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  listing_starts_with: InputMaybe<Scalars['String']>;
  listing_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<MarketplacePurchase_Filter>>>;
  price: InputMaybe<Scalars['BigInt']>;
  price_gt: InputMaybe<Scalars['BigInt']>;
  price_gte: InputMaybe<Scalars['BigInt']>;
  price_in: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt: InputMaybe<Scalars['BigInt']>;
  price_lte: InputMaybe<Scalars['BigInt']>;
  price_not: InputMaybe<Scalars['BigInt']>;
  price_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  timeStamp: InputMaybe<Scalars['BigInt']>;
  timeStamp_gt: InputMaybe<Scalars['BigInt']>;
  timeStamp_gte: InputMaybe<Scalars['BigInt']>;
  timeStamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timeStamp_lt: InputMaybe<Scalars['BigInt']>;
  timeStamp_lte: InputMaybe<Scalars['BigInt']>;
  timeStamp_not: InputMaybe<Scalars['BigInt']>;
  timeStamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  user: InputMaybe<Scalars['String']>;
  user_: InputMaybe<MarketplaceUser_Filter>;
  user_contains: InputMaybe<Scalars['String']>;
  user_contains_nocase: InputMaybe<Scalars['String']>;
  user_ends_with: InputMaybe<Scalars['String']>;
  user_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_gt: InputMaybe<Scalars['String']>;
  user_gte: InputMaybe<Scalars['String']>;
  user_in: InputMaybe<Array<Scalars['String']>>;
  user_lt: InputMaybe<Scalars['String']>;
  user_lte: InputMaybe<Scalars['String']>;
  user_not: InputMaybe<Scalars['String']>;
  user_not_contains: InputMaybe<Scalars['String']>;
  user_not_contains_nocase: InputMaybe<Scalars['String']>;
  user_not_ends_with: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_not_in: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  user_starts_with: InputMaybe<Scalars['String']>;
  user_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum MarketplacePurchase_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Listing = 'listing',
  ListingActive = 'listing__active',
  ListingCreatedAt = 'listing__createdAt',
  ListingDeleted = 'listing__deleted',
  ListingExpiration = 'listing__expiration',
  ListingId = 'listing__id',
  ListingLeftToSell = 'listing__leftToSell',
  ListingMinFillAmount = 'listing__minFillAmount',
  ListingSingleUnitPrice = 'listing__singleUnitPrice',
  ListingTokenAddress = 'listing__tokenAddress',
  ListingTotalAmountToSell = 'listing__totalAmountToSell',
  ListingUpdatedAt = 'listing__updatedAt',
  Price = 'price',
  TimeStamp = 'timeStamp',
  User = 'user',
  UserId = 'user__id'
}

export type MarketplaceQuery = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<Marketplace_Meta_>;
  activities: Array<MarketplaceActivity>;
  activity: Maybe<MarketplaceActivity>;
  categories: Array<MarketplaceCategory>;
  category: Maybe<MarketplaceCategory>;
  countries: Array<MarketplaceCountry>;
  country: Maybe<MarketplaceCountry>;
  listing: Maybe<MarketplaceListing>;
  listings: Array<MarketplaceListing>;
  project: Maybe<MarketplaceProject>;
  projects: Array<MarketplaceProject>;
  purchase: Maybe<MarketplacePurchase>;
  purchases: Array<MarketplacePurchase>;
  user: Maybe<MarketplaceUser>;
  users: Array<MarketplaceUser>;
};


export type MarketplaceQuery_MetaArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
};


export type MarketplaceQueryActivitiesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceActivity_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceActivity_Filter>;
};


export type MarketplaceQueryActivityArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryCategoriesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceCategory_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceCategory_Filter>;
};


export type MarketplaceQueryCategoryArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryCountriesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceCountry_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceCountry_Filter>;
};


export type MarketplaceQueryCountryArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryListingArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryListingsArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceListing_Filter>;
};


export type MarketplaceQueryProjectArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryProjectsArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceProject_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceProject_Filter>;
};


export type MarketplaceQueryPurchaseArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryPurchasesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplacePurchase_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplacePurchase_Filter>;
};


export type MarketplaceQueryUserArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceQueryUsersArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceUser_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceUser_Filter>;
};

export type MarketplaceSubscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<Marketplace_Meta_>;
  activities: Array<MarketplaceActivity>;
  activity: Maybe<MarketplaceActivity>;
  categories: Array<MarketplaceCategory>;
  category: Maybe<MarketplaceCategory>;
  countries: Array<MarketplaceCountry>;
  country: Maybe<MarketplaceCountry>;
  listing: Maybe<MarketplaceListing>;
  listings: Array<MarketplaceListing>;
  project: Maybe<MarketplaceProject>;
  projects: Array<MarketplaceProject>;
  purchase: Maybe<MarketplacePurchase>;
  purchases: Array<MarketplacePurchase>;
  user: Maybe<MarketplaceUser>;
  users: Array<MarketplaceUser>;
};


export type MarketplaceSubscription_MetaArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
};


export type MarketplaceSubscriptionActivitiesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceActivity_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceActivity_Filter>;
};


export type MarketplaceSubscriptionActivityArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionCategoriesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceCategory_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceCategory_Filter>;
};


export type MarketplaceSubscriptionCategoryArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionCountriesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceCountry_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceCountry_Filter>;
};


export type MarketplaceSubscriptionCountryArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionListingArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionListingsArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceListing_Filter>;
};


export type MarketplaceSubscriptionProjectArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionProjectsArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceProject_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceProject_Filter>;
};


export type MarketplaceSubscriptionPurchaseArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionPurchasesArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplacePurchase_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplacePurchase_Filter>;
};


export type MarketplaceSubscriptionUserArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
};


export type MarketplaceSubscriptionUsersArgs = {
  block: InputMaybe<MarketplaceBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceUser_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Marketplace_SubgraphErrorPolicy_;
  where: InputMaybe<MarketplaceUser_Filter>;
};

export type MarketplaceUser = {
  __typename?: 'User';
  activities: Maybe<Array<MarketplaceActivity>>;
  id: Scalars['Bytes'];
  listings: Maybe<Array<MarketplaceListing>>;
  purchases: Maybe<Array<MarketplacePurchase>>;
};


export type MarketplaceUserActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceActivity_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplaceActivity_Filter>;
};


export type MarketplaceUserListingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplaceListing_Filter>;
};


export type MarketplaceUserPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<MarketplacePurchase_OrderBy>;
  orderDirection: InputMaybe<MarketplaceOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<MarketplacePurchase_Filter>;
};

export type MarketplaceUser_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<MarketplaceBlockChangedFilter>;
  activities_: InputMaybe<MarketplaceActivity_Filter>;
  and: InputMaybe<Array<InputMaybe<MarketplaceUser_Filter>>>;
  id: InputMaybe<Scalars['Bytes']>;
  id_contains: InputMaybe<Scalars['Bytes']>;
  id_gt: InputMaybe<Scalars['Bytes']>;
  id_gte: InputMaybe<Scalars['Bytes']>;
  id_in: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt: InputMaybe<Scalars['Bytes']>;
  id_lte: InputMaybe<Scalars['Bytes']>;
  id_not: InputMaybe<Scalars['Bytes']>;
  id_not_contains: InputMaybe<Scalars['Bytes']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  listings_: InputMaybe<MarketplaceListing_Filter>;
  or: InputMaybe<Array<InputMaybe<MarketplaceUser_Filter>>>;
  purchases_: InputMaybe<MarketplacePurchase_Filter>;
};

export enum MarketplaceUser_OrderBy {
  Activities = 'activities',
  Id = 'id',
  Listings = 'listings',
  Purchases = 'purchases'
}

export type Marketplace_Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type Marketplace_Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Marketplace_Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum Marketplace_SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type MarketplaceListingFragmentFragment = { __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } };

export type MarketplaceProjectFragmentFragment = { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } };

export type MarketplaceActivityFragmentFragment = { __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: MarketplaceActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } };

export type MarketplaceGetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketplaceGetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string }> };

export type MarketplaceGetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketplaceGetCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string }> };

export type MarketplaceGetVintagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketplaceGetVintagesQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', vintage: string }> };

export type MarketplaceGetPurchaseByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarketplaceGetPurchaseByIdQuery = { __typename?: 'Query', purchase: { __typename?: 'Purchase', id: any, amount: string, price: string, listing: { __typename?: 'Listing', id: string, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } } } | null };

export type MarketplaceGetUserByWalletQueryVariables = Exact<{
  wallet: InputMaybe<Scalars['Bytes']>;
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type MarketplaceGetUserByWalletQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }> | null, activities: Array<{ __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: MarketplaceActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> | null }> };

export type MarketplaceGetProjectsQueryVariables = Exact<{
  search: InputMaybe<Scalars['String']>;
  vintage: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type MarketplaceGetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }> | null, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } }> };

export type MarketplaceGetProjectByIdQueryVariables = Exact<{
  projectId: Scalars['ID'];
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type MarketplaceGetProjectByIdQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }> | null, activities: Array<{ __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: MarketplaceActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> | null, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } | null };

export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  key
  vintage
  name
  category {
    id
  }
  country {
    id
  }
  methodology
}
    `;
export const ListingFragmentFragmentDoc = gql`
    fragment ListingFragment on Listing {
  id
  totalAmountToSell
  leftToSell
  tokenAddress
  active
  deleted
  singleUnitPrice
  createdAt
  updatedAt
  seller {
    id
  }
  project {
    ...ProjectFragment
  }
  expiration
  minFillAmount
}
    ${ProjectFragmentFragmentDoc}`;
export const ActivityFragmentFragmentDoc = gql`
    fragment ActivityFragment on Activity {
  id
  amount
  previousAmount
  price
  previousPrice
  timeStamp
  activityType
  project {
    key
    vintage
  }
  buyer {
    id
  }
  seller {
    id
  }
}
    `;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories(first: 1000) {
    id
  }
}
    `;
export const GetCountriesDocument = gql`
    query getCountries {
  countries(first: 1000) {
    id
  }
}
    `;
export const GetVintagesDocument = gql`
    query getVintages {
  projects(first: 1000) {
    vintage
  }
}
    `;
export const GetPurchaseByIdDocument = gql`
    query getPurchaseById($id: ID!) {
  purchase(id: $id) {
    id
    amount
    listing {
      id
      project {
        ...ProjectFragment
      }
    }
    price
  }
}
    ${ProjectFragmentFragmentDoc}`;
export const GetUserByWalletDocument = gql`
    query getUserByWallet($wallet: Bytes, $expiresAfter: BigInt) {
  users(where: {id: $wallet}) {
    listings(where: {expiration_gt: $expiresAfter}) {
      ...ListingFragment
    }
    activities(orderBy: timeStamp, orderDirection: desc, first: 10) {
      ...ActivityFragment
    }
  }
}
    ${ListingFragmentFragmentDoc}
${ActivityFragmentFragmentDoc}`;
export const GetProjectsDocument = gql`
    query getProjects($search: String, $vintage: [BigInt!], $expiresAfter: BigInt) {
  projects(where: {name_contains_nocase: $search, vintage_in: $vintage}) {
    ...ProjectFragment
    listings(where: {expiration_gt: $expiresAfter}) {
      ...ListingFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ListingFragmentFragmentDoc}`;
export const GetProjectByIdDocument = gql`
    query getProjectById($projectId: ID!, $expiresAfter: BigInt) {
  project(id: $projectId) {
    ...ProjectFragment
    listings(where: {expiration_gt: $expiresAfter}) {
      ...ListingFragment
    }
    activities {
      ...ActivityFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ListingFragmentFragmentDoc}
${ActivityFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCategories(variables?: MarketplaceGetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    },
    getCountries(variables?: MarketplaceGetCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetCountriesQuery>(GetCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCountries', 'query');
    },
    getVintages(variables?: MarketplaceGetVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetVintagesQuery>(GetVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVintages', 'query');
    },
    getPurchaseById(variables: MarketplaceGetPurchaseByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetPurchaseByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetPurchaseByIdQuery>(GetPurchaseByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPurchaseById', 'query');
    },
    getUserByWallet(variables?: MarketplaceGetUserByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetUserByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetUserByWalletQuery>(GetUserByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByWallet', 'query');
    },
    getProjects(variables?: MarketplaceGetProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetProjectsQuery>(GetProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjects', 'query');
    },
    getProjectById(variables: MarketplaceGetProjectByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketplaceGetProjectByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketplaceGetProjectByIdQuery>(GetProjectByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectById', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;