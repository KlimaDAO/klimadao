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

export type Activity = {
  __typename?: 'Activity';
  activityType: ActivityType;
  amount: Maybe<Scalars['BigInt']>;
  buyer: Maybe<User>;
  id: Scalars['String'];
  listing: Maybe<Listing>;
  previousAmount: Maybe<Scalars['BigInt']>;
  previousPrice: Maybe<Scalars['BigInt']>;
  price: Maybe<Scalars['BigInt']>;
  project: Project;
  seller: User;
  timeStamp: Maybe<Scalars['BigInt']>;
  user: Maybe<User>;
};

export enum ActivityType {
  CreatedListing = 'CreatedListing',
  DeletedListing = 'DeletedListing',
  Purchase = 'Purchase',
  Sold = 'Sold',
  UpdatedPrice = 'UpdatedPrice',
  UpdatedQuantity = 'UpdatedQuantity'
}

export type Activity_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  activityType: InputMaybe<ActivityType>;
  activityType_in: InputMaybe<Array<ActivityType>>;
  activityType_not: InputMaybe<ActivityType>;
  activityType_not_in: InputMaybe<Array<ActivityType>>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Activity_Filter>>>;
  buyer: InputMaybe<Scalars['String']>;
  buyer_: InputMaybe<User_Filter>;
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
  listing_: InputMaybe<Listing_Filter>;
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
  or: InputMaybe<Array<InputMaybe<Activity_Filter>>>;
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
  project_: InputMaybe<Project_Filter>;
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
  seller_: InputMaybe<User_Filter>;
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
  user_: InputMaybe<User_Filter>;
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

export enum Activity_OrderBy {
  ActivityType = 'activityType',
  Amount = 'amount',
  Buyer = 'buyer',
  BuyerId = 'buyer__id',
  Id = 'id',
  Listing = 'listing',
  ListingActive = 'listing__active',
  ListingCreatedAt = 'listing__createdAt',
  ListingDeleted = 'listing__deleted',
  ListingId = 'listing__id',
  ListingLeftToSell = 'listing__leftToSell',
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
  ProjectVintage = 'project__vintage',
  Seller = 'seller',
  SellerId = 'seller__id',
  TimeStamp = 'timeStamp',
  User = 'user',
  UserId = 'user__id'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type Listing = {
  __typename?: 'Listing';
  active: Maybe<Scalars['Boolean']>;
  activities: Maybe<Array<Activity>>;
  batchPrices: Maybe<Array<Scalars['BigInt']>>;
  batches: Maybe<Array<Scalars['BigInt']>>;
  createdAt: Maybe<Scalars['BigInt']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  leftToSell: Scalars['BigInt'];
  project: Project;
  seller: User;
  singleUnitPrice: Scalars['BigInt'];
  tokenAddress: Scalars['Bytes'];
  totalAmountToSell: Scalars['BigInt'];
  updatedAt: Maybe<Scalars['BigInt']>;
};


export type ListingActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Activity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Activity_Filter>;
};

export type Listing_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  active: InputMaybe<Scalars['Boolean']>;
  active_in: InputMaybe<Array<Scalars['Boolean']>>;
  active_not: InputMaybe<Scalars['Boolean']>;
  active_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  activities_: InputMaybe<Activity_Filter>;
  and: InputMaybe<Array<InputMaybe<Listing_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<Listing_Filter>>>;
  project: InputMaybe<Scalars['String']>;
  project_: InputMaybe<Project_Filter>;
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
  seller_: InputMaybe<User_Filter>;
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

export enum Listing_OrderBy {
  Active = 'active',
  Activities = 'activities',
  BatchPrices = 'batchPrices',
  Batches = 'batches',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Id = 'id',
  LeftToSell = 'leftToSell',
  Project = 'project',
  ProjectId = 'project__id',
  ProjectKey = 'project__key',
  ProjectVintage = 'project__vintage',
  Seller = 'seller',
  SellerId = 'seller__id',
  SingleUnitPrice = 'singleUnitPrice',
  TokenAddress = 'tokenAddress',
  TotalAmountToSell = 'totalAmountToSell',
  UpdatedAt = 'updatedAt'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  activities: Maybe<Array<Activity>>;
  id: Scalars['ID'];
  key: Scalars['String'];
  listings: Maybe<Array<Listing>>;
  vintage: Scalars['BigInt'];
};


export type ProjectActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Activity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Activity_Filter>;
};


export type ProjectListingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Listing_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Listing_Filter>;
};

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  activities_: InputMaybe<Activity_Filter>;
  and: InputMaybe<Array<InputMaybe<Project_Filter>>>;
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
  listings_: InputMaybe<Listing_Filter>;
  or: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  vintage: InputMaybe<Scalars['BigInt']>;
  vintage_gt: InputMaybe<Scalars['BigInt']>;
  vintage_gte: InputMaybe<Scalars['BigInt']>;
  vintage_in: InputMaybe<Array<Scalars['BigInt']>>;
  vintage_lt: InputMaybe<Scalars['BigInt']>;
  vintage_lte: InputMaybe<Scalars['BigInt']>;
  vintage_not: InputMaybe<Scalars['BigInt']>;
  vintage_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Project_OrderBy {
  Activities = 'activities',
  Id = 'id',
  Key = 'key',
  Listings = 'listings',
  Vintage = 'vintage'
}

export type Purchase = {
  __typename?: 'Purchase';
  amount: Scalars['BigInt'];
  id: Scalars['Bytes'];
  listing: Listing;
  price: Scalars['BigInt'];
  timeStamp: Scalars['BigInt'];
  user: User;
};

export type Purchase_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
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
  listing_: InputMaybe<Listing_Filter>;
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
  or: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
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
  user_: InputMaybe<User_Filter>;
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

export enum Purchase_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Listing = 'listing',
  ListingActive = 'listing__active',
  ListingCreatedAt = 'listing__createdAt',
  ListingDeleted = 'listing__deleted',
  ListingId = 'listing__id',
  ListingLeftToSell = 'listing__leftToSell',
  ListingSingleUnitPrice = 'listing__singleUnitPrice',
  ListingTokenAddress = 'listing__tokenAddress',
  ListingTotalAmountToSell = 'listing__totalAmountToSell',
  ListingUpdatedAt = 'listing__updatedAt',
  Price = 'price',
  TimeStamp = 'timeStamp',
  User = 'user',
  UserId = 'user__id'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  activities: Array<Activity>;
  activity: Maybe<Activity>;
  listing: Maybe<Listing>;
  listings: Array<Listing>;
  project: Maybe<Project>;
  projects: Array<Project>;
  purchase: Maybe<Purchase>;
  purchases: Array<Purchase>;
  user: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryActivitiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Activity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Activity_Filter>;
};


export type QueryActivityArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryListingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryListingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Listing_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Listing_Filter>;
};


export type QueryProjectArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Project_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Project_Filter>;
};


export type QueryPurchaseArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPurchasesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Purchase_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Purchase_Filter>;
};


export type QueryUserArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<User_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  activities: Array<Activity>;
  activity: Maybe<Activity>;
  listing: Maybe<Listing>;
  listings: Array<Listing>;
  project: Maybe<Project>;
  projects: Array<Project>;
  purchase: Maybe<Purchase>;
  purchases: Array<Purchase>;
  user: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionActivitiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Activity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Activity_Filter>;
};


export type SubscriptionActivityArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionListingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionListingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Listing_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Listing_Filter>;
};


export type SubscriptionProjectArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Project_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Project_Filter>;
};


export type SubscriptionPurchaseArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPurchasesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Purchase_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Purchase_Filter>;
};


export type SubscriptionUserArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<User_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  activities: Maybe<Array<Activity>>;
  id: Scalars['Bytes'];
  listings: Maybe<Array<Listing>>;
  purchases: Maybe<Array<Purchase>>;
};


export type UserActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Activity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Activity_Filter>;
};


export type UserListingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Listing_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Listing_Filter>;
};


export type UserPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Purchase_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Purchase_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  activities_: InputMaybe<Activity_Filter>;
  and: InputMaybe<Array<InputMaybe<User_Filter>>>;
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
  listings_: InputMaybe<Listing_Filter>;
  or: InputMaybe<Array<InputMaybe<User_Filter>>>;
  purchases_: InputMaybe<Purchase_Filter>;
};

export enum User_OrderBy {
  Activities = 'activities',
  Id = 'id',
  Listings = 'listings',
  Purchases = 'purchases'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetCreditListingsQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['String']>;
  vintageStr: InputMaybe<Scalars['BigInt']>;
}>;


export type GetCreditListingsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, listings: Array<{ __typename?: 'Listing', createdAt: string | null, updatedAt: string | null, id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, seller: { __typename?: 'User', id: any } }> | null, activities: Array<{ __typename?: 'Activity', id: string, timeStamp: string | null, activityType: ActivityType, price: string | null, previousPrice: string | null, amount: string | null, previousAmount: string | null, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> | null }> };

export type GetPurchasesByIdQueryVariables = Exact<{
  id: InputMaybe<Scalars['Bytes']>;
}>;


export type GetPurchasesByIdQuery = { __typename?: 'Query', purchases: Array<{ __typename?: 'Purchase', id: any, amount: string, price: string, user: { __typename?: 'User', id: any }, listing: { __typename?: 'Listing', id: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', key: string, vintage: string } } }> };

export type GetUserByWalletQueryVariables = Exact<{
  wallet: InputMaybe<Scalars['Bytes']>;
}>;


export type GetUserByWalletQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, batches: Array<string> | null, batchPrices: Array<string> | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, seller: { __typename?: 'User', id: any } }> | null, activities: Array<{ __typename?: 'Activity', amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: ActivityType, project: { __typename?: 'Project', key: string, vintage: string } }> | null }> };


export const GetCreditListingsDocument = gql`
    query getCreditListings($projectId: String, $vintageStr: BigInt) {
  projects(where: {key: $projectId, vintage: $vintageStr}) {
    id
    listings {
      createdAt
      updatedAt
      id
      totalAmountToSell
      leftToSell
      tokenAddress
      active
      deleted
      singleUnitPrice
      seller {
        id
      }
    }
    activities {
      id
      timeStamp
      activityType
      price
      previousPrice
      amount
      previousAmount
      buyer {
        id
      }
      seller {
        id
      }
    }
  }
}
    `;
export const GetPurchasesByIdDocument = gql`
    query getPurchasesById($id: Bytes) {
  purchases(first: 1, where: {id: $id}) {
    id
    amount
    user {
      id
    }
    listing {
      id
      seller {
        id
      }
      project {
        key
        vintage
      }
    }
    price
  }
}
    `;
export const GetUserByWalletDocument = gql`
    query getUserByWallet($wallet: Bytes) {
  users(where: {id: $wallet}) {
    listings {
      id
      totalAmountToSell
      leftToSell
      tokenAddress
      active
      deleted
      batches
      batchPrices
      singleUnitPrice
      createdAt
      updatedAt
      seller {
        id
      }
    }
    activities(orderBy: timeStamp, orderDirection: desc, first: 10) {
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
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCreditListings(variables?: GetCreditListingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCreditListingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreditListingsQuery>(GetCreditListingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCreditListings', 'query');
    },
    getPurchasesById(variables?: GetPurchasesByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPurchasesByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPurchasesByIdQuery>(GetPurchasesByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPurchasesById', 'query');
    },
    getUserByWallet(variables?: GetUserByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByWalletQuery>(GetUserByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByWallet', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;