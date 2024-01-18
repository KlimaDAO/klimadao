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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type Cancellation = {
  __typename?: 'Cancellation';
  amount: Scalars['BigInt'];
  cancelledBy: Holder;
  createdAt: Scalars['BigInt'];
  exPost: ExPost;
  id: Scalars['Bytes'];
  project: Project;
  serialization: Scalars['String'];
  transactionHash: Scalars['Bytes'];
};

export type Cancellation_Filter = {
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
  and: InputMaybe<Array<InputMaybe<Cancellation_Filter>>>;
  cancelledBy: InputMaybe<Scalars['String']>;
  cancelledBy_: InputMaybe<Holder_Filter>;
  cancelledBy_contains: InputMaybe<Scalars['String']>;
  cancelledBy_contains_nocase: InputMaybe<Scalars['String']>;
  cancelledBy_ends_with: InputMaybe<Scalars['String']>;
  cancelledBy_ends_with_nocase: InputMaybe<Scalars['String']>;
  cancelledBy_gt: InputMaybe<Scalars['String']>;
  cancelledBy_gte: InputMaybe<Scalars['String']>;
  cancelledBy_in: InputMaybe<Array<Scalars['String']>>;
  cancelledBy_lt: InputMaybe<Scalars['String']>;
  cancelledBy_lte: InputMaybe<Scalars['String']>;
  cancelledBy_not: InputMaybe<Scalars['String']>;
  cancelledBy_not_contains: InputMaybe<Scalars['String']>;
  cancelledBy_not_contains_nocase: InputMaybe<Scalars['String']>;
  cancelledBy_not_ends_with: InputMaybe<Scalars['String']>;
  cancelledBy_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  cancelledBy_not_in: InputMaybe<Array<Scalars['String']>>;
  cancelledBy_not_starts_with: InputMaybe<Scalars['String']>;
  cancelledBy_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  cancelledBy_starts_with: InputMaybe<Scalars['String']>;
  cancelledBy_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exPost: InputMaybe<Scalars['String']>;
  exPost_: InputMaybe<ExPost_Filter>;
  exPost_contains: InputMaybe<Scalars['String']>;
  exPost_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_ends_with: InputMaybe<Scalars['String']>;
  exPost_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_gt: InputMaybe<Scalars['String']>;
  exPost_gte: InputMaybe<Scalars['String']>;
  exPost_in: InputMaybe<Array<Scalars['String']>>;
  exPost_lt: InputMaybe<Scalars['String']>;
  exPost_lte: InputMaybe<Scalars['String']>;
  exPost_not: InputMaybe<Scalars['String']>;
  exPost_not_contains: InputMaybe<Scalars['String']>;
  exPost_not_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_not_ends_with: InputMaybe<Scalars['String']>;
  exPost_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_not_in: InputMaybe<Array<Scalars['String']>>;
  exPost_not_starts_with: InputMaybe<Scalars['String']>;
  exPost_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  exPost_starts_with: InputMaybe<Scalars['String']>;
  exPost_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<Cancellation_Filter>>>;
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
  serialization: InputMaybe<Scalars['String']>;
  serialization_contains: InputMaybe<Scalars['String']>;
  serialization_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_ends_with: InputMaybe<Scalars['String']>;
  serialization_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_gt: InputMaybe<Scalars['String']>;
  serialization_gte: InputMaybe<Scalars['String']>;
  serialization_in: InputMaybe<Array<Scalars['String']>>;
  serialization_lt: InputMaybe<Scalars['String']>;
  serialization_lte: InputMaybe<Scalars['String']>;
  serialization_not: InputMaybe<Scalars['String']>;
  serialization_not_contains: InputMaybe<Scalars['String']>;
  serialization_not_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_not_ends_with: InputMaybe<Scalars['String']>;
  serialization_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_not_in: InputMaybe<Array<Scalars['String']>>;
  serialization_not_starts_with: InputMaybe<Scalars['String']>;
  serialization_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  serialization_starts_with: InputMaybe<Scalars['String']>;
  serialization_starts_with_nocase: InputMaybe<Scalars['String']>;
  transactionHash: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Cancellation_OrderBy {
  amount = 'amount',
  cancelledBy = 'cancelledBy',
  cancelledBy__address = 'cancelledBy__address',
  cancelledBy__cancelledAmount = 'cancelledBy__cancelledAmount',
  cancelledBy__id = 'cancelledBy__id',
  cancelledBy__retiredAmount = 'cancelledBy__retiredAmount',
  createdAt = 'createdAt',
  exPost = 'exPost',
  exPost__cancelledAmount = 'exPost__cancelledAmount',
  exPost__estimatedAmount = 'exPost__estimatedAmount',
  exPost__id = 'exPost__id',
  exPost__lastVerificationTimestamp = 'exPost__lastVerificationTimestamp',
  exPost__retiredAmount = 'exPost__retiredAmount',
  exPost__serialization = 'exPost__serialization',
  exPost__supply = 'exPost__supply',
  exPost__tokenId = 'exPost__tokenId',
  exPost__verificationPeriodEnd = 'exPost__verificationPeriodEnd',
  exPost__verificationPeriodStart = 'exPost__verificationPeriodStart',
  exPost__vintage = 'exPost__vintage',
  id = 'id',
  project = 'project',
  project__blockNumber = 'project__blockNumber',
  project__blockTimestamp = 'project__blockTimestamp',
  project__id = 'project__id',
  project__projectAddress = 'project__projectAddress',
  project__projectId = 'project__projectId',
  project__projectName = 'project__projectName',
  project__transactionHash = 'project__transactionHash',
  serialization = 'serialization',
  transactionHash = 'transactionHash'
}

export type ExAnte = {
  __typename?: 'ExAnte';
  exPost: ExPost;
  holders: Array<ExAnteHolder>;
  id: Scalars['Bytes'];
  project: Project;
  serialization: Scalars['String'];
  supply: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
};


export type ExAnteHoldersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnteHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExAnteHolder_Filter>;
};

export type ExAnteHolder = {
  __typename?: 'ExAnteHolder';
  amount: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  exAnte: ExAnte;
  holder: Holder;
  id: Scalars['Bytes'];
  updatedAt: Scalars['BigInt'];
};

export type ExAnteHolder_Filter = {
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
  and: InputMaybe<Array<InputMaybe<ExAnteHolder_Filter>>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exAnte: InputMaybe<Scalars['String']>;
  exAnte_: InputMaybe<ExAnte_Filter>;
  exAnte_contains: InputMaybe<Scalars['String']>;
  exAnte_contains_nocase: InputMaybe<Scalars['String']>;
  exAnte_ends_with: InputMaybe<Scalars['String']>;
  exAnte_ends_with_nocase: InputMaybe<Scalars['String']>;
  exAnte_gt: InputMaybe<Scalars['String']>;
  exAnte_gte: InputMaybe<Scalars['String']>;
  exAnte_in: InputMaybe<Array<Scalars['String']>>;
  exAnte_lt: InputMaybe<Scalars['String']>;
  exAnte_lte: InputMaybe<Scalars['String']>;
  exAnte_not: InputMaybe<Scalars['String']>;
  exAnte_not_contains: InputMaybe<Scalars['String']>;
  exAnte_not_contains_nocase: InputMaybe<Scalars['String']>;
  exAnte_not_ends_with: InputMaybe<Scalars['String']>;
  exAnte_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  exAnte_not_in: InputMaybe<Array<Scalars['String']>>;
  exAnte_not_starts_with: InputMaybe<Scalars['String']>;
  exAnte_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  exAnte_starts_with: InputMaybe<Scalars['String']>;
  exAnte_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder: InputMaybe<Scalars['String']>;
  holder_: InputMaybe<Holder_Filter>;
  holder_contains: InputMaybe<Scalars['String']>;
  holder_contains_nocase: InputMaybe<Scalars['String']>;
  holder_ends_with: InputMaybe<Scalars['String']>;
  holder_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_gt: InputMaybe<Scalars['String']>;
  holder_gte: InputMaybe<Scalars['String']>;
  holder_in: InputMaybe<Array<Scalars['String']>>;
  holder_lt: InputMaybe<Scalars['String']>;
  holder_lte: InputMaybe<Scalars['String']>;
  holder_not: InputMaybe<Scalars['String']>;
  holder_not_contains: InputMaybe<Scalars['String']>;
  holder_not_contains_nocase: InputMaybe<Scalars['String']>;
  holder_not_ends_with: InputMaybe<Scalars['String']>;
  holder_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_not_in: InputMaybe<Array<Scalars['String']>>;
  holder_not_starts_with: InputMaybe<Scalars['String']>;
  holder_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder_starts_with: InputMaybe<Scalars['String']>;
  holder_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<ExAnteHolder_Filter>>>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ExAnteHolder_OrderBy {
  amount = 'amount',
  createdAt = 'createdAt',
  exAnte = 'exAnte',
  exAnte__id = 'exAnte__id',
  exAnte__serialization = 'exAnte__serialization',
  exAnte__supply = 'exAnte__supply',
  exAnte__tokenId = 'exAnte__tokenId',
  holder = 'holder',
  holder__address = 'holder__address',
  holder__cancelledAmount = 'holder__cancelledAmount',
  holder__id = 'holder__id',
  holder__retiredAmount = 'holder__retiredAmount',
  id = 'id',
  updatedAt = 'updatedAt'
}

export type ExAnte_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ExAnte_Filter>>>;
  exPost: InputMaybe<Scalars['String']>;
  exPost_: InputMaybe<ExPost_Filter>;
  exPost_contains: InputMaybe<Scalars['String']>;
  exPost_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_ends_with: InputMaybe<Scalars['String']>;
  exPost_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_gt: InputMaybe<Scalars['String']>;
  exPost_gte: InputMaybe<Scalars['String']>;
  exPost_in: InputMaybe<Array<Scalars['String']>>;
  exPost_lt: InputMaybe<Scalars['String']>;
  exPost_lte: InputMaybe<Scalars['String']>;
  exPost_not: InputMaybe<Scalars['String']>;
  exPost_not_contains: InputMaybe<Scalars['String']>;
  exPost_not_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_not_ends_with: InputMaybe<Scalars['String']>;
  exPost_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_not_in: InputMaybe<Array<Scalars['String']>>;
  exPost_not_starts_with: InputMaybe<Scalars['String']>;
  exPost_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  exPost_starts_with: InputMaybe<Scalars['String']>;
  exPost_starts_with_nocase: InputMaybe<Scalars['String']>;
  holders_: InputMaybe<ExAnteHolder_Filter>;
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
  or: InputMaybe<Array<InputMaybe<ExAnte_Filter>>>;
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
  serialization: InputMaybe<Scalars['String']>;
  serialization_contains: InputMaybe<Scalars['String']>;
  serialization_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_ends_with: InputMaybe<Scalars['String']>;
  serialization_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_gt: InputMaybe<Scalars['String']>;
  serialization_gte: InputMaybe<Scalars['String']>;
  serialization_in: InputMaybe<Array<Scalars['String']>>;
  serialization_lt: InputMaybe<Scalars['String']>;
  serialization_lte: InputMaybe<Scalars['String']>;
  serialization_not: InputMaybe<Scalars['String']>;
  serialization_not_contains: InputMaybe<Scalars['String']>;
  serialization_not_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_not_ends_with: InputMaybe<Scalars['String']>;
  serialization_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_not_in: InputMaybe<Array<Scalars['String']>>;
  serialization_not_starts_with: InputMaybe<Scalars['String']>;
  serialization_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  serialization_starts_with: InputMaybe<Scalars['String']>;
  serialization_starts_with_nocase: InputMaybe<Scalars['String']>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ExAnte_OrderBy {
  exPost = 'exPost',
  exPost__cancelledAmount = 'exPost__cancelledAmount',
  exPost__estimatedAmount = 'exPost__estimatedAmount',
  exPost__id = 'exPost__id',
  exPost__lastVerificationTimestamp = 'exPost__lastVerificationTimestamp',
  exPost__retiredAmount = 'exPost__retiredAmount',
  exPost__serialization = 'exPost__serialization',
  exPost__supply = 'exPost__supply',
  exPost__tokenId = 'exPost__tokenId',
  exPost__verificationPeriodEnd = 'exPost__verificationPeriodEnd',
  exPost__verificationPeriodStart = 'exPost__verificationPeriodStart',
  exPost__vintage = 'exPost__vintage',
  holders = 'holders',
  id = 'id',
  project = 'project',
  project__blockNumber = 'project__blockNumber',
  project__blockTimestamp = 'project__blockTimestamp',
  project__id = 'project__id',
  project__projectAddress = 'project__projectAddress',
  project__projectId = 'project__projectId',
  project__projectName = 'project__projectName',
  project__transactionHash = 'project__transactionHash',
  serialization = 'serialization',
  supply = 'supply',
  tokenId = 'tokenId'
}

export type ExPost = {
  __typename?: 'ExPost';
  cancellations: Array<Cancellation>;
  cancelledAmount: Scalars['BigInt'];
  estimatedAmount: Scalars['BigInt'];
  exAnte: Maybe<ExAnte>;
  holders: Array<ExPostHolder>;
  id: Scalars['Bytes'];
  lastVerificationTimestamp: Scalars['BigInt'];
  project: Project;
  retiredAmount: Scalars['BigInt'];
  retirementCertificates: Array<RetirementCertificate>;
  serialization: Scalars['String'];
  supply: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  verificationPeriodEnd: Scalars['BigInt'];
  verificationPeriodStart: Scalars['BigInt'];
  vintage: Scalars['String'];
};


export type ExPostCancellationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Cancellation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Cancellation_Filter>;
};


export type ExPostHoldersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPostHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExPostHolder_Filter>;
};


export type ExPostRetirementCertificatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<RetirementCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<RetirementCertificate_Filter>;
};

export type ExPostHolder = {
  __typename?: 'ExPostHolder';
  amount: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  exPost: ExPost;
  holder: Holder;
  id: Scalars['Bytes'];
  retiredAmount: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
};

export type ExPostHolder_Filter = {
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
  and: InputMaybe<Array<InputMaybe<ExPostHolder_Filter>>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exPost: InputMaybe<Scalars['String']>;
  exPost_: InputMaybe<ExPost_Filter>;
  exPost_contains: InputMaybe<Scalars['String']>;
  exPost_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_ends_with: InputMaybe<Scalars['String']>;
  exPost_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_gt: InputMaybe<Scalars['String']>;
  exPost_gte: InputMaybe<Scalars['String']>;
  exPost_in: InputMaybe<Array<Scalars['String']>>;
  exPost_lt: InputMaybe<Scalars['String']>;
  exPost_lte: InputMaybe<Scalars['String']>;
  exPost_not: InputMaybe<Scalars['String']>;
  exPost_not_contains: InputMaybe<Scalars['String']>;
  exPost_not_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_not_ends_with: InputMaybe<Scalars['String']>;
  exPost_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_not_in: InputMaybe<Array<Scalars['String']>>;
  exPost_not_starts_with: InputMaybe<Scalars['String']>;
  exPost_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  exPost_starts_with: InputMaybe<Scalars['String']>;
  exPost_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder: InputMaybe<Scalars['String']>;
  holder_: InputMaybe<Holder_Filter>;
  holder_contains: InputMaybe<Scalars['String']>;
  holder_contains_nocase: InputMaybe<Scalars['String']>;
  holder_ends_with: InputMaybe<Scalars['String']>;
  holder_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_gt: InputMaybe<Scalars['String']>;
  holder_gte: InputMaybe<Scalars['String']>;
  holder_in: InputMaybe<Array<Scalars['String']>>;
  holder_lt: InputMaybe<Scalars['String']>;
  holder_lte: InputMaybe<Scalars['String']>;
  holder_not: InputMaybe<Scalars['String']>;
  holder_not_contains: InputMaybe<Scalars['String']>;
  holder_not_contains_nocase: InputMaybe<Scalars['String']>;
  holder_not_ends_with: InputMaybe<Scalars['String']>;
  holder_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_not_in: InputMaybe<Array<Scalars['String']>>;
  holder_not_starts_with: InputMaybe<Scalars['String']>;
  holder_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder_starts_with: InputMaybe<Scalars['String']>;
  holder_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<ExPostHolder_Filter>>>;
  retiredAmount: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  retiredAmount_lt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_lte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ExPostHolder_OrderBy {
  amount = 'amount',
  createdAt = 'createdAt',
  exPost = 'exPost',
  exPost__cancelledAmount = 'exPost__cancelledAmount',
  exPost__estimatedAmount = 'exPost__estimatedAmount',
  exPost__id = 'exPost__id',
  exPost__lastVerificationTimestamp = 'exPost__lastVerificationTimestamp',
  exPost__retiredAmount = 'exPost__retiredAmount',
  exPost__serialization = 'exPost__serialization',
  exPost__supply = 'exPost__supply',
  exPost__tokenId = 'exPost__tokenId',
  exPost__verificationPeriodEnd = 'exPost__verificationPeriodEnd',
  exPost__verificationPeriodStart = 'exPost__verificationPeriodStart',
  exPost__vintage = 'exPost__vintage',
  holder = 'holder',
  holder__address = 'holder__address',
  holder__cancelledAmount = 'holder__cancelledAmount',
  holder__id = 'holder__id',
  holder__retiredAmount = 'holder__retiredAmount',
  id = 'id',
  retiredAmount = 'retiredAmount',
  updatedAt = 'updatedAt'
}

export type ExPost_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ExPost_Filter>>>;
  cancellations_: InputMaybe<Cancellation_Filter>;
  cancelledAmount: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_gt: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_gte: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledAmount_lt: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_lte: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_not: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedAmount: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_gt: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_gte: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedAmount_lt: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_lte: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_not: InputMaybe<Scalars['BigInt']>;
  estimatedAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exAnte_: InputMaybe<ExAnte_Filter>;
  holders_: InputMaybe<ExPostHolder_Filter>;
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
  lastVerificationTimestamp: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastVerificationTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_not: InputMaybe<Scalars['BigInt']>;
  lastVerificationTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<ExPost_Filter>>>;
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
  retiredAmount: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  retiredAmount_lt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_lte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  retirementCertificates_: InputMaybe<RetirementCertificate_Filter>;
  serialization: InputMaybe<Scalars['String']>;
  serialization_contains: InputMaybe<Scalars['String']>;
  serialization_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_ends_with: InputMaybe<Scalars['String']>;
  serialization_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_gt: InputMaybe<Scalars['String']>;
  serialization_gte: InputMaybe<Scalars['String']>;
  serialization_in: InputMaybe<Array<Scalars['String']>>;
  serialization_lt: InputMaybe<Scalars['String']>;
  serialization_lte: InputMaybe<Scalars['String']>;
  serialization_not: InputMaybe<Scalars['String']>;
  serialization_not_contains: InputMaybe<Scalars['String']>;
  serialization_not_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_not_ends_with: InputMaybe<Scalars['String']>;
  serialization_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_not_in: InputMaybe<Array<Scalars['String']>>;
  serialization_not_starts_with: InputMaybe<Scalars['String']>;
  serialization_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  serialization_starts_with: InputMaybe<Scalars['String']>;
  serialization_starts_with_nocase: InputMaybe<Scalars['String']>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  verificationPeriodEnd: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_gt: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_gte: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_in: InputMaybe<Array<Scalars['BigInt']>>;
  verificationPeriodEnd_lt: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_lte: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_not: InputMaybe<Scalars['BigInt']>;
  verificationPeriodEnd_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  verificationPeriodStart: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_gt: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_gte: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_in: InputMaybe<Array<Scalars['BigInt']>>;
  verificationPeriodStart_lt: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_lte: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_not: InputMaybe<Scalars['BigInt']>;
  verificationPeriodStart_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  vintage: InputMaybe<Scalars['String']>;
  vintage_contains: InputMaybe<Scalars['String']>;
  vintage_contains_nocase: InputMaybe<Scalars['String']>;
  vintage_ends_with: InputMaybe<Scalars['String']>;
  vintage_ends_with_nocase: InputMaybe<Scalars['String']>;
  vintage_gt: InputMaybe<Scalars['String']>;
  vintage_gte: InputMaybe<Scalars['String']>;
  vintage_in: InputMaybe<Array<Scalars['String']>>;
  vintage_lt: InputMaybe<Scalars['String']>;
  vintage_lte: InputMaybe<Scalars['String']>;
  vintage_not: InputMaybe<Scalars['String']>;
  vintage_not_contains: InputMaybe<Scalars['String']>;
  vintage_not_contains_nocase: InputMaybe<Scalars['String']>;
  vintage_not_ends_with: InputMaybe<Scalars['String']>;
  vintage_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  vintage_not_in: InputMaybe<Array<Scalars['String']>>;
  vintage_not_starts_with: InputMaybe<Scalars['String']>;
  vintage_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  vintage_starts_with: InputMaybe<Scalars['String']>;
  vintage_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum ExPost_OrderBy {
  cancellations = 'cancellations',
  cancelledAmount = 'cancelledAmount',
  estimatedAmount = 'estimatedAmount',
  exAnte = 'exAnte',
  exAnte__id = 'exAnte__id',
  exAnte__serialization = 'exAnte__serialization',
  exAnte__supply = 'exAnte__supply',
  exAnte__tokenId = 'exAnte__tokenId',
  holders = 'holders',
  id = 'id',
  lastVerificationTimestamp = 'lastVerificationTimestamp',
  project = 'project',
  project__blockNumber = 'project__blockNumber',
  project__blockTimestamp = 'project__blockTimestamp',
  project__id = 'project__id',
  project__projectAddress = 'project__projectAddress',
  project__projectId = 'project__projectId',
  project__projectName = 'project__projectName',
  project__transactionHash = 'project__transactionHash',
  retiredAmount = 'retiredAmount',
  retirementCertificates = 'retirementCertificates',
  serialization = 'serialization',
  supply = 'supply',
  tokenId = 'tokenId',
  verificationPeriodEnd = 'verificationPeriodEnd',
  verificationPeriodStart = 'verificationPeriodStart',
  vintage = 'vintage'
}

export type Holder = {
  __typename?: 'Holder';
  address: Scalars['Bytes'];
  cancellations: Array<Cancellation>;
  cancelledAmount: Scalars['BigInt'];
  exAnteAmounts: Array<ExAnteHolder>;
  exPostAmounts: Array<ExPostHolder>;
  id: Scalars['Bytes'];
  retiredAmount: Scalars['BigInt'];
  retirementCertificates: Array<RetirementCertificate>;
};


export type HolderCancellationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Cancellation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Cancellation_Filter>;
};


export type HolderExAnteAmountsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnteHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExAnteHolder_Filter>;
};


export type HolderExPostAmountsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPostHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExPostHolder_Filter>;
};


export type HolderRetirementCertificatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<RetirementCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<RetirementCertificate_Filter>;
};

export type Holder_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  address: InputMaybe<Scalars['Bytes']>;
  address_contains: InputMaybe<Scalars['Bytes']>;
  address_gt: InputMaybe<Scalars['Bytes']>;
  address_gte: InputMaybe<Scalars['Bytes']>;
  address_in: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt: InputMaybe<Scalars['Bytes']>;
  address_lte: InputMaybe<Scalars['Bytes']>;
  address_not: InputMaybe<Scalars['Bytes']>;
  address_not_contains: InputMaybe<Scalars['Bytes']>;
  address_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  and: InputMaybe<Array<InputMaybe<Holder_Filter>>>;
  cancellations_: InputMaybe<Cancellation_Filter>;
  cancelledAmount: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_gt: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_gte: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledAmount_lt: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_lte: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_not: InputMaybe<Scalars['BigInt']>;
  cancelledAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exAnteAmounts_: InputMaybe<ExAnteHolder_Filter>;
  exPostAmounts_: InputMaybe<ExPostHolder_Filter>;
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
  or: InputMaybe<Array<InputMaybe<Holder_Filter>>>;
  retiredAmount: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_gte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  retiredAmount_lt: InputMaybe<Scalars['BigInt']>;
  retiredAmount_lte: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not: InputMaybe<Scalars['BigInt']>;
  retiredAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  retirementCertificates_: InputMaybe<RetirementCertificate_Filter>;
};

export enum Holder_OrderBy {
  address = 'address',
  cancellations = 'cancellations',
  cancelledAmount = 'cancelledAmount',
  exAnteAmounts = 'exAnteAmounts',
  exPostAmounts = 'exPostAmounts',
  id = 'id',
  retiredAmount = 'retiredAmount',
  retirementCertificates = 'retirementCertificates'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  cancellations: Array<Cancellation>;
  exAntes: Array<ExAnte>;
  exPosts: Array<ExPost>;
  id: Scalars['Bytes'];
  projectAddress: Scalars['Bytes'];
  projectId: Scalars['BigInt'];
  projectName: Scalars['String'];
  retirementCertificates: Array<RetirementCertificate>;
  transactionHash: Scalars['Bytes'];
};


export type ProjectCancellationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Cancellation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Cancellation_Filter>;
};


export type ProjectExAntesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnte_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExAnte_Filter>;
};


export type ProjectExPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPost_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ExPost_Filter>;
};


export type ProjectRetirementCertificatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<RetirementCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<RetirementCertificate_Filter>;
};

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  cancellations_: InputMaybe<Cancellation_Filter>;
  exAntes_: InputMaybe<ExAnte_Filter>;
  exPosts_: InputMaybe<ExPost_Filter>;
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
  projectId: InputMaybe<Scalars['BigInt']>;
  projectId_gt: InputMaybe<Scalars['BigInt']>;
  projectId_gte: InputMaybe<Scalars['BigInt']>;
  projectId_in: InputMaybe<Array<Scalars['BigInt']>>;
  projectId_lt: InputMaybe<Scalars['BigInt']>;
  projectId_lte: InputMaybe<Scalars['BigInt']>;
  projectId_not: InputMaybe<Scalars['BigInt']>;
  projectId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  projectName: InputMaybe<Scalars['String']>;
  projectName_contains: InputMaybe<Scalars['String']>;
  projectName_contains_nocase: InputMaybe<Scalars['String']>;
  projectName_ends_with: InputMaybe<Scalars['String']>;
  projectName_ends_with_nocase: InputMaybe<Scalars['String']>;
  projectName_gt: InputMaybe<Scalars['String']>;
  projectName_gte: InputMaybe<Scalars['String']>;
  projectName_in: InputMaybe<Array<Scalars['String']>>;
  projectName_lt: InputMaybe<Scalars['String']>;
  projectName_lte: InputMaybe<Scalars['String']>;
  projectName_not: InputMaybe<Scalars['String']>;
  projectName_not_contains: InputMaybe<Scalars['String']>;
  projectName_not_contains_nocase: InputMaybe<Scalars['String']>;
  projectName_not_ends_with: InputMaybe<Scalars['String']>;
  projectName_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  projectName_not_in: InputMaybe<Array<Scalars['String']>>;
  projectName_not_starts_with: InputMaybe<Scalars['String']>;
  projectName_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  projectName_starts_with: InputMaybe<Scalars['String']>;
  projectName_starts_with_nocase: InputMaybe<Scalars['String']>;
  retirementCertificates_: InputMaybe<RetirementCertificate_Filter>;
  transactionHash: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Project_OrderBy {
  blockNumber = 'blockNumber',
  blockTimestamp = 'blockTimestamp',
  cancellations = 'cancellations',
  exAntes = 'exAntes',
  exPosts = 'exPosts',
  id = 'id',
  projectAddress = 'projectAddress',
  projectId = 'projectId',
  projectName = 'projectName',
  retirementCertificates = 'retirementCertificates',
  transactionHash = 'transactionHash'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  cancellation: Maybe<Cancellation>;
  cancellations: Array<Cancellation>;
  exAnte: Maybe<ExAnte>;
  exAnteHolder: Maybe<ExAnteHolder>;
  exAnteHolders: Array<ExAnteHolder>;
  exAntes: Array<ExAnte>;
  exPost: Maybe<ExPost>;
  exPostHolder: Maybe<ExPostHolder>;
  exPostHolders: Array<ExPostHolder>;
  exPosts: Array<ExPost>;
  holder: Maybe<Holder>;
  holders: Array<Holder>;
  project: Maybe<Project>;
  projects: Array<Project>;
  retirementCertificate: Maybe<RetirementCertificate>;
  retirementCertificates: Array<RetirementCertificate>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryCancellationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCancellationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Cancellation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Cancellation_Filter>;
};


export type QueryExAnteArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExAnteHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExAnteHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnteHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExAnteHolder_Filter>;
};


export type QueryExAntesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnte_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExAnte_Filter>;
};


export type QueryExPostArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExPostHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExPostHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPostHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExPostHolder_Filter>;
};


export type QueryExPostsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPost_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExPost_Filter>;
};


export type QueryHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Holder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Holder_Filter>;
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


export type QueryRetirementCertificateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRetirementCertificatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<RetirementCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RetirementCertificate_Filter>;
};

export type RetirementCertificate = {
  __typename?: 'RetirementCertificate';
  amount: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  exPost: ExPost;
  holder: Holder;
  id: Scalars['Bytes'];
  project: Project;
  retiree: Holder;
  serialization: Scalars['String'];
  tokenId: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type RetirementCertificate_Filter = {
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
  and: InputMaybe<Array<InputMaybe<RetirementCertificate_Filter>>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exPost: InputMaybe<Scalars['String']>;
  exPost_: InputMaybe<ExPost_Filter>;
  exPost_contains: InputMaybe<Scalars['String']>;
  exPost_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_ends_with: InputMaybe<Scalars['String']>;
  exPost_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_gt: InputMaybe<Scalars['String']>;
  exPost_gte: InputMaybe<Scalars['String']>;
  exPost_in: InputMaybe<Array<Scalars['String']>>;
  exPost_lt: InputMaybe<Scalars['String']>;
  exPost_lte: InputMaybe<Scalars['String']>;
  exPost_not: InputMaybe<Scalars['String']>;
  exPost_not_contains: InputMaybe<Scalars['String']>;
  exPost_not_contains_nocase: InputMaybe<Scalars['String']>;
  exPost_not_ends_with: InputMaybe<Scalars['String']>;
  exPost_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  exPost_not_in: InputMaybe<Array<Scalars['String']>>;
  exPost_not_starts_with: InputMaybe<Scalars['String']>;
  exPost_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  exPost_starts_with: InputMaybe<Scalars['String']>;
  exPost_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder: InputMaybe<Scalars['String']>;
  holder_: InputMaybe<Holder_Filter>;
  holder_contains: InputMaybe<Scalars['String']>;
  holder_contains_nocase: InputMaybe<Scalars['String']>;
  holder_ends_with: InputMaybe<Scalars['String']>;
  holder_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_gt: InputMaybe<Scalars['String']>;
  holder_gte: InputMaybe<Scalars['String']>;
  holder_in: InputMaybe<Array<Scalars['String']>>;
  holder_lt: InputMaybe<Scalars['String']>;
  holder_lte: InputMaybe<Scalars['String']>;
  holder_not: InputMaybe<Scalars['String']>;
  holder_not_contains: InputMaybe<Scalars['String']>;
  holder_not_contains_nocase: InputMaybe<Scalars['String']>;
  holder_not_ends_with: InputMaybe<Scalars['String']>;
  holder_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  holder_not_in: InputMaybe<Array<Scalars['String']>>;
  holder_not_starts_with: InputMaybe<Scalars['String']>;
  holder_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  holder_starts_with: InputMaybe<Scalars['String']>;
  holder_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<RetirementCertificate_Filter>>>;
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
  retiree: InputMaybe<Scalars['String']>;
  retiree_: InputMaybe<Holder_Filter>;
  retiree_contains: InputMaybe<Scalars['String']>;
  retiree_contains_nocase: InputMaybe<Scalars['String']>;
  retiree_ends_with: InputMaybe<Scalars['String']>;
  retiree_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiree_gt: InputMaybe<Scalars['String']>;
  retiree_gte: InputMaybe<Scalars['String']>;
  retiree_in: InputMaybe<Array<Scalars['String']>>;
  retiree_lt: InputMaybe<Scalars['String']>;
  retiree_lte: InputMaybe<Scalars['String']>;
  retiree_not: InputMaybe<Scalars['String']>;
  retiree_not_contains: InputMaybe<Scalars['String']>;
  retiree_not_contains_nocase: InputMaybe<Scalars['String']>;
  retiree_not_ends_with: InputMaybe<Scalars['String']>;
  retiree_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiree_not_in: InputMaybe<Array<Scalars['String']>>;
  retiree_not_starts_with: InputMaybe<Scalars['String']>;
  retiree_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  retiree_starts_with: InputMaybe<Scalars['String']>;
  retiree_starts_with_nocase: InputMaybe<Scalars['String']>;
  serialization: InputMaybe<Scalars['String']>;
  serialization_contains: InputMaybe<Scalars['String']>;
  serialization_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_ends_with: InputMaybe<Scalars['String']>;
  serialization_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_gt: InputMaybe<Scalars['String']>;
  serialization_gte: InputMaybe<Scalars['String']>;
  serialization_in: InputMaybe<Array<Scalars['String']>>;
  serialization_lt: InputMaybe<Scalars['String']>;
  serialization_lte: InputMaybe<Scalars['String']>;
  serialization_not: InputMaybe<Scalars['String']>;
  serialization_not_contains: InputMaybe<Scalars['String']>;
  serialization_not_contains_nocase: InputMaybe<Scalars['String']>;
  serialization_not_ends_with: InputMaybe<Scalars['String']>;
  serialization_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  serialization_not_in: InputMaybe<Array<Scalars['String']>>;
  serialization_not_starts_with: InputMaybe<Scalars['String']>;
  serialization_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  serialization_starts_with: InputMaybe<Scalars['String']>;
  serialization_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte: InputMaybe<Scalars['Bytes']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte: InputMaybe<Scalars['Bytes']>;
  transactionHash_not: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum RetirementCertificate_OrderBy {
  amount = 'amount',
  createdAt = 'createdAt',
  exPost = 'exPost',
  exPost__cancelledAmount = 'exPost__cancelledAmount',
  exPost__estimatedAmount = 'exPost__estimatedAmount',
  exPost__id = 'exPost__id',
  exPost__lastVerificationTimestamp = 'exPost__lastVerificationTimestamp',
  exPost__retiredAmount = 'exPost__retiredAmount',
  exPost__serialization = 'exPost__serialization',
  exPost__supply = 'exPost__supply',
  exPost__tokenId = 'exPost__tokenId',
  exPost__verificationPeriodEnd = 'exPost__verificationPeriodEnd',
  exPost__verificationPeriodStart = 'exPost__verificationPeriodStart',
  exPost__vintage = 'exPost__vintage',
  holder = 'holder',
  holder__address = 'holder__address',
  holder__cancelledAmount = 'holder__cancelledAmount',
  holder__id = 'holder__id',
  holder__retiredAmount = 'holder__retiredAmount',
  id = 'id',
  project = 'project',
  project__blockNumber = 'project__blockNumber',
  project__blockTimestamp = 'project__blockTimestamp',
  project__id = 'project__id',
  project__projectAddress = 'project__projectAddress',
  project__projectId = 'project__projectId',
  project__projectName = 'project__projectName',
  project__transactionHash = 'project__transactionHash',
  retiree = 'retiree',
  retiree__address = 'retiree__address',
  retiree__cancelledAmount = 'retiree__cancelledAmount',
  retiree__id = 'retiree__id',
  retiree__retiredAmount = 'retiree__retiredAmount',
  serialization = 'serialization',
  tokenId = 'tokenId',
  transactionHash = 'transactionHash'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  cancellation: Maybe<Cancellation>;
  cancellations: Array<Cancellation>;
  exAnte: Maybe<ExAnte>;
  exAnteHolder: Maybe<ExAnteHolder>;
  exAnteHolders: Array<ExAnteHolder>;
  exAntes: Array<ExAnte>;
  exPost: Maybe<ExPost>;
  exPostHolder: Maybe<ExPostHolder>;
  exPostHolders: Array<ExPostHolder>;
  exPosts: Array<ExPost>;
  holder: Maybe<Holder>;
  holders: Array<Holder>;
  project: Maybe<Project>;
  projects: Array<Project>;
  retirementCertificate: Maybe<RetirementCertificate>;
  retirementCertificates: Array<RetirementCertificate>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionCancellationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCancellationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Cancellation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Cancellation_Filter>;
};


export type SubscriptionExAnteArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExAnteHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExAnteHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnteHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExAnteHolder_Filter>;
};


export type SubscriptionExAntesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExAnte_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExAnte_Filter>;
};


export type SubscriptionExPostArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExPostHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExPostHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPostHolder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExPostHolder_Filter>;
};


export type SubscriptionExPostsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ExPost_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ExPost_Filter>;
};


export type SubscriptionHolderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Holder_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Holder_Filter>;
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


export type SubscriptionRetirementCertificateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRetirementCertificatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<RetirementCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RetirementCertificate_Filter>;
};

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

export type IcrProjectFragmentFragment = { __typename?: 'Project', id: any, projectAddress: any, projectName: string, transactionHash: any };

export type ExPostAmountsFragmentFragment = { __typename?: 'ExPostHolder', id: any, amount: string, updatedAt: string, retiredAmount: string, exPost: { __typename?: 'ExPost', tokenId: string, vintage: string, serialization: string, project: { __typename?: 'Project', id: any, projectName: string } } };

export type ExPostFragmentFragment = { __typename?: 'ExPost', tokenId: string, vintage: string, serialization: string, project: { __typename?: 'Project', id: any, projectName: string } };

export type GetExPostInfoViaSerializationQueryVariables = Exact<{
  serialization: Scalars['String'];
}>;


export type GetExPostInfoViaSerializationQuery = { __typename?: 'Query', exPosts: Array<{ __typename?: 'ExPost', serialization: string, supply: string, retiredAmount: string, estimatedAmount: string, cancelledAmount: string, id: any, lastVerificationTimestamp: string, tokenId: string, verificationPeriodEnd: string, verificationPeriodStart: string, vintage: string, project: { __typename?: 'Project', id: any, projectAddress: any, projectName: string, transactionHash: any } }> };

export type GetHoldingsByAddressQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetHoldingsByAddressQuery = { __typename?: 'Query', holder: { __typename?: 'Holder', id: any, exPostAmounts: Array<{ __typename?: 'ExPostHolder', id: any, amount: string, updatedAt: string, retiredAmount: string, exPost: { __typename?: 'ExPost', tokenId: string, vintage: string, serialization: string, project: { __typename?: 'Project', id: any, projectName: string } } }> } | null };

export const IcrProjectFragmentFragmentDoc = gql`
    fragment ICRProjectFragment on Project {
  id
  projectAddress
  projectName
  transactionHash
}
    `;
export const ExPostFragmentFragmentDoc = gql`
    fragment exPostFragment on ExPost {
  tokenId
  vintage
  serialization
  project {
    id
    projectName
  }
}
    `;
export const ExPostAmountsFragmentFragmentDoc = gql`
    fragment exPostAmountsFragment on ExPostHolder {
  id
  amount
  updatedAt
  retiredAmount
  exPost {
    ...exPostFragment
  }
}
    ${ExPostFragmentFragmentDoc}`;
export const GetExPostInfoViaSerializationDocument = gql`
    query getExPostInfoViaSerialization($serialization: String!) {
  exPosts(where: {serialization: $serialization}) {
    serialization
    supply
    retiredAmount
    estimatedAmount
    cancelledAmount
    id
    lastVerificationTimestamp
    project {
      ...ICRProjectFragment
    }
    tokenId
    verificationPeriodEnd
    verificationPeriodStart
    vintage
  }
}
    ${IcrProjectFragmentFragmentDoc}`;
export const GetHoldingsByAddressDocument = gql`
    query getHoldingsByAddress($id: ID!) {
  holder(id: $id) {
    id
    exPostAmounts {
      ...exPostAmountsFragment
    }
  }
}
    ${ExPostAmountsFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getExPostInfoViaSerialization(variables: GetExPostInfoViaSerializationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExPostInfoViaSerializationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExPostInfoViaSerializationQuery>(GetExPostInfoViaSerializationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExPostInfoViaSerialization', 'query');
    },
    getHoldingsByAddress(variables: GetHoldingsByAddressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHoldingsByAddressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHoldingsByAddressQuery>(GetHoldingsByAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHoldingsByAddress', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;