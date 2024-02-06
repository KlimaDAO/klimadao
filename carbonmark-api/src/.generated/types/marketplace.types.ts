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
  activityType = 'activityType',
  amount = 'amount',
  buyer = 'buyer',
  buyer__id = 'buyer__id',
  id = 'id',
  listing = 'listing',
  listing__active = 'listing__active',
  listing__createdAt = 'listing__createdAt',
  listing__deleted = 'listing__deleted',
  listing__expiration = 'listing__expiration',
  listing__id = 'listing__id',
  listing__leftToSell = 'listing__leftToSell',
  listing__minFillAmount = 'listing__minFillAmount',
  listing__singleUnitPrice = 'listing__singleUnitPrice',
  listing__tokenAddress = 'listing__tokenAddress',
  listing__tokenId = 'listing__tokenId',
  listing__tokenSymbol = 'listing__tokenSymbol',
  listing__totalAmountToSell = 'listing__totalAmountToSell',
  listing__updatedAt = 'listing__updatedAt',
  previousAmount = 'previousAmount',
  previousPrice = 'previousPrice',
  price = 'price',
  project = 'project',
  project__id = 'project__id',
  project__key = 'project__key',
  project__methodology = 'project__methodology',
  project__name = 'project__name',
  project__projectAddress = 'project__projectAddress',
  project__registry = 'project__registry',
  project__updatedAt = 'project__updatedAt',
  project__vintage = 'project__vintage',
  seller = 'seller',
  seller__id = 'seller__id',
  timeStamp = 'timeStamp',
  user = 'user',
  user__id = 'user__id'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
};

export type Category_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Category_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<Category_Filter>>>;
};

export enum Category_OrderBy {
  id = 'id'
}

export type Country = {
  __typename?: 'Country';
  id: Scalars['String'];
};

export type Country_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Country_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<Country_Filter>>>;
};

export enum Country_OrderBy {
  id = 'id'
}

export type Listing = {
  __typename?: 'Listing';
  active: Maybe<Scalars['Boolean']>;
  activities: Maybe<Array<Activity>>;
  batchPrices: Maybe<Array<Scalars['BigInt']>>;
  batches: Maybe<Array<Scalars['BigInt']>>;
  createdAt: Maybe<Scalars['BigInt']>;
  deleted: Maybe<Scalars['Boolean']>;
  expiration: Scalars['BigInt'];
  id: Scalars['ID'];
  leftToSell: Scalars['BigInt'];
  minFillAmount: Scalars['BigInt'];
  project: Project;
  seller: User;
  singleUnitPrice: Scalars['BigInt'];
  tokenAddress: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  tokenSymbol: Scalars['String'];
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
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenSymbol: InputMaybe<Scalars['String']>;
  tokenSymbol_contains: InputMaybe<Scalars['String']>;
  tokenSymbol_contains_nocase: InputMaybe<Scalars['String']>;
  tokenSymbol_ends_with: InputMaybe<Scalars['String']>;
  tokenSymbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenSymbol_gt: InputMaybe<Scalars['String']>;
  tokenSymbol_gte: InputMaybe<Scalars['String']>;
  tokenSymbol_in: InputMaybe<Array<Scalars['String']>>;
  tokenSymbol_lt: InputMaybe<Scalars['String']>;
  tokenSymbol_lte: InputMaybe<Scalars['String']>;
  tokenSymbol_not: InputMaybe<Scalars['String']>;
  tokenSymbol_not_contains: InputMaybe<Scalars['String']>;
  tokenSymbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  tokenSymbol_not_ends_with: InputMaybe<Scalars['String']>;
  tokenSymbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenSymbol_not_in: InputMaybe<Array<Scalars['String']>>;
  tokenSymbol_not_starts_with: InputMaybe<Scalars['String']>;
  tokenSymbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenSymbol_starts_with: InputMaybe<Scalars['String']>;
  tokenSymbol_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  active = 'active',
  activities = 'activities',
  batchPrices = 'batchPrices',
  batches = 'batches',
  createdAt = 'createdAt',
  deleted = 'deleted',
  expiration = 'expiration',
  id = 'id',
  leftToSell = 'leftToSell',
  minFillAmount = 'minFillAmount',
  project = 'project',
  project__id = 'project__id',
  project__key = 'project__key',
  project__methodology = 'project__methodology',
  project__name = 'project__name',
  project__projectAddress = 'project__projectAddress',
  project__registry = 'project__registry',
  project__updatedAt = 'project__updatedAt',
  project__vintage = 'project__vintage',
  seller = 'seller',
  seller__id = 'seller__id',
  singleUnitPrice = 'singleUnitPrice',
  tokenAddress = 'tokenAddress',
  tokenId = 'tokenId',
  tokenSymbol = 'tokenSymbol',
  totalAmountToSell = 'totalAmountToSell',
  updatedAt = 'updatedAt'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  activities: Maybe<Array<Activity>>;
  category: Category;
  country: Country;
  id: Scalars['ID'];
  key: Scalars['String'];
  listings: Maybe<Array<Listing>>;
  methodology: Scalars['String'];
  name: Scalars['String'];
  projectAddress: Scalars['Bytes'];
  registry: Scalars['String'];
  updatedAt: Maybe<Scalars['BigInt']>;
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
  category: InputMaybe<Scalars['String']>;
  category_: InputMaybe<Category_Filter>;
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
  country_: InputMaybe<Country_Filter>;
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
  listings_: InputMaybe<Listing_Filter>;
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
  or: InputMaybe<Array<InputMaybe<Project_Filter>>>;
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

export enum Project_OrderBy {
  activities = 'activities',
  category = 'category',
  category__id = 'category__id',
  country = 'country',
  country__id = 'country__id',
  id = 'id',
  key = 'key',
  listings = 'listings',
  methodology = 'methodology',
  name = 'name',
  projectAddress = 'projectAddress',
  registry = 'registry',
  updatedAt = 'updatedAt',
  vintage = 'vintage'
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
  amount = 'amount',
  id = 'id',
  listing = 'listing',
  listing__active = 'listing__active',
  listing__createdAt = 'listing__createdAt',
  listing__deleted = 'listing__deleted',
  listing__expiration = 'listing__expiration',
  listing__id = 'listing__id',
  listing__leftToSell = 'listing__leftToSell',
  listing__minFillAmount = 'listing__minFillAmount',
  listing__singleUnitPrice = 'listing__singleUnitPrice',
  listing__tokenAddress = 'listing__tokenAddress',
  listing__tokenId = 'listing__tokenId',
  listing__tokenSymbol = 'listing__tokenSymbol',
  listing__totalAmountToSell = 'listing__totalAmountToSell',
  listing__updatedAt = 'listing__updatedAt',
  price = 'price',
  timeStamp = 'timeStamp',
  user = 'user',
  user__id = 'user__id'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  activities: Array<Activity>;
  activity: Maybe<Activity>;
  categories: Array<Category>;
  category: Maybe<Category>;
  countries: Array<Country>;
  country: Maybe<Country>;
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


export type QueryCategoriesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Category_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Category_Filter>;
};


export type QueryCategoryArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCountriesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Country_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Country_Filter>;
};


export type QueryCountryArgs = {
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
  categories: Array<Category>;
  category: Maybe<Category>;
  countries: Array<Country>;
  country: Maybe<Country>;
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


export type SubscriptionCategoriesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Category_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Category_Filter>;
};


export type SubscriptionCategoryArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCountriesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Country_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Country_Filter>;
};


export type SubscriptionCountryArgs = {
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
  activities = 'activities',
  id = 'id',
  listings = 'listings',
  purchases = 'purchases'
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
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny'
}

export type ListingFragmentFragment = { __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, tokenId: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } };

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } };

export type ActivityFragmentFragment = { __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: ActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } };

export type PurchaseFragmentFragment = { __typename?: 'Purchase', amount: string, id: any, price: string, listing: { __typename?: 'Listing', id: string, tokenAddress: any, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } }, seller: { __typename?: 'User', id: any } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string }> };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string }> };

export type GetVintagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVintagesQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', vintage: string }> };

export type GetPurchasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPurchasesQuery = { __typename?: 'Query', purchases: Array<{ __typename?: 'Purchase', amount: string, id: any, price: string, listing: { __typename?: 'Listing', id: string, tokenAddress: any, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } }, seller: { __typename?: 'User', id: any } } }> };

export type GetPurchaseByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPurchaseByIdQuery = { __typename?: 'Query', purchase: { __typename?: 'Purchase', amount: string, id: any, price: string, listing: { __typename?: 'Listing', id: string, tokenAddress: any, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } }, seller: { __typename?: 'User', id: any } } } | null };

export type GetListingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetListingByIdQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, tokenId: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } } | null };

export type GetUserByWalletQueryVariables = Exact<{
  wallet: InputMaybe<Scalars['String']>;
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type GetUserByWalletQuery = { __typename?: 'Query', listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, tokenId: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }>, activities: Array<{ __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: ActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> };

export type GetProjectsQueryVariables = Exact<{
  search: InputMaybe<Scalars['String']>;
  country: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  category: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  vintage: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, tokenId: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }> | null, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } }> };

export type GetProjectByIdQueryVariables = Exact<{
  projectId: Scalars['ID'];
  expiresAfter: InputMaybe<Scalars['BigInt']>;
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, listings: Array<{ __typename?: 'Listing', id: string, totalAmountToSell: string, leftToSell: string, tokenAddress: any, active: boolean | null, deleted: boolean | null, singleUnitPrice: string, createdAt: string | null, updatedAt: string | null, expiration: string, minFillAmount: string, tokenId: string, seller: { __typename?: 'User', id: any }, project: { __typename?: 'Project', id: string, key: string, vintage: string, name: string, methodology: string, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } }> | null, category: { __typename?: 'Category', id: string }, country: { __typename?: 'Country', id: string } } | null };

export type GetActivitiesByProjectIdQueryVariables = Exact<{
  projectId: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
  activityType: InputMaybe<Array<ActivityType> | ActivityType>;
}>;


export type GetActivitiesByProjectIdQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: ActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> };

export type GetAllActivitiesQueryVariables = Exact<{
  activityType: InputMaybe<Array<ActivityType> | ActivityType>;
}>;


export type GetAllActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', id: string, amount: string | null, previousAmount: string | null, price: string | null, previousPrice: string | null, timeStamp: string | null, activityType: ActivityType, project: { __typename?: 'Project', key: string, vintage: string }, buyer: { __typename?: 'User', id: any } | null, seller: { __typename?: 'User', id: any } }> };

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
  tokenId
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
export const PurchaseFragmentFragmentDoc = gql`
    fragment PurchaseFragment on Purchase {
  amount
  id
  listing {
    id
    project {
      ...ProjectFragment
    }
    seller {
      id
    }
    tokenAddress
  }
  price
}
    ${ProjectFragmentFragmentDoc}`;
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
export const GetPurchasesDocument = gql`
    query getPurchases {
  purchases(first: 1000, orderBy: timeStamp, orderDirection: desc) {
    ...PurchaseFragment
  }
}
    ${PurchaseFragmentFragmentDoc}`;
export const GetPurchaseByIdDocument = gql`
    query getPurchaseById($id: ID!) {
  purchase(id: $id) {
    ...PurchaseFragment
  }
}
    ${PurchaseFragmentFragmentDoc}`;
export const GetListingByIdDocument = gql`
    query getListingById($id: ID!) {
  listing(id: $id) {
    ...ListingFragment
  }
}
    ${ListingFragmentFragmentDoc}`;
export const GetUserByWalletDocument = gql`
    query getUserByWallet($wallet: String, $expiresAfter: BigInt) {
  listings(where: {seller: $wallet, expiration_gt: $expiresAfter}) {
    ...ListingFragment
  }
  activities(
    orderBy: timeStamp
    orderDirection: desc
    first: 10
    where: {or: [{seller: $wallet, activityType_not: Purchase}, {buyer: $wallet}]}
  ) {
    ...ActivityFragment
  }
}
    ${ListingFragmentFragmentDoc}
${ActivityFragmentFragmentDoc}`;
export const GetProjectsDocument = gql`
    query getProjects($search: String, $country: [String!], $category: [String!], $vintage: [BigInt!], $expiresAfter: BigInt) {
  projects(
    where: {and: [{or: [{name_contains_nocase: $search}, {key_contains_nocase: $search}]}, {country_in: $country}, {category_in: $category}, {vintage_in: $vintage}]}
  ) {
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
  }
}
    ${ProjectFragmentFragmentDoc}
${ListingFragmentFragmentDoc}`;
export const GetActivitiesByProjectIdDocument = gql`
    query getActivitiesByProjectId($projectId: [ID!], $activityType: [ActivityType!]) {
  activities(
    where: {project_: {id_in: $projectId}, activityType_in: $activityType}
  ) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;
export const GetAllActivitiesDocument = gql`
    query getAllActivities($activityType: [ActivityType!]) {
  activities(where: {activityType_in: $activityType}) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    },
    getCountries(variables?: GetCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCountriesQuery>(GetCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCountries', 'query');
    },
    getVintages(variables?: GetVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVintagesQuery>(GetVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVintages', 'query');
    },
    getPurchases(variables?: GetPurchasesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPurchasesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPurchasesQuery>(GetPurchasesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPurchases', 'query');
    },
    getPurchaseById(variables: GetPurchaseByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPurchaseByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPurchaseByIdQuery>(GetPurchaseByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPurchaseById', 'query');
    },
    getListingById(variables: GetListingByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListingByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListingByIdQuery>(GetListingByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListingById', 'query');
    },
    getUserByWallet(variables?: GetUserByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByWalletQuery>(GetUserByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByWallet', 'query');
    },
    getProjects(variables?: GetProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectsQuery>(GetProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjects', 'query');
    },
    getProjectById(variables: GetProjectByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectByIdQuery>(GetProjectByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectById', 'query');
    },
    getActivitiesByProjectId(variables?: GetActivitiesByProjectIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetActivitiesByProjectIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActivitiesByProjectIdQuery>(GetActivitiesByProjectIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActivitiesByProjectId', 'query');
    },
    getAllActivities(variables?: GetAllActivitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllActivitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllActivitiesQuery>(GetAllActivitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllActivities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;