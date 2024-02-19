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

export type Account = {
  __typename?: 'Account';
  bridges: Array<Bridge>;
  holdingSnapshots: Array<HoldingDailySnapshot>;
  holdings: Array<Holding>;
  /** Ethereum address of the account */
  id: Scalars['Bytes'];
  poolDeposits: Array<PoolDeposit>;
  poolRedeems: Array<PoolRedeem>;
  retiresBeneficiary: Array<Retire>;
  retiresInitiator: Array<Retire>;
  totalRetirements: Scalars['Int'];
};


export type AccountBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Bridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Bridge_Filter>;
};


export type AccountHoldingSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type AccountHoldingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Holding_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Holding_Filter>;
};


export type AccountPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type AccountPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolRedeem_Filter>;
};


export type AccountRetiresBeneficiaryArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Retire_Filter>;
};


export type AccountRetiresInitiatorArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Retire_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  bridges_: InputMaybe<Bridge_Filter>;
  holdingSnapshots_: InputMaybe<HoldingDailySnapshot_Filter>;
  holdings_: InputMaybe<Holding_Filter>;
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
  or: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  poolDeposits_: InputMaybe<PoolDeposit_Filter>;
  poolRedeems_: InputMaybe<PoolRedeem_Filter>;
  retiresBeneficiary_: InputMaybe<Retire_Filter>;
  retiresInitiator_: InputMaybe<Retire_Filter>;
  totalRetirements: InputMaybe<Scalars['Int']>;
  totalRetirements_gt: InputMaybe<Scalars['Int']>;
  totalRetirements_gte: InputMaybe<Scalars['Int']>;
  totalRetirements_in: InputMaybe<Array<Scalars['Int']>>;
  totalRetirements_lt: InputMaybe<Scalars['Int']>;
  totalRetirements_lte: InputMaybe<Scalars['Int']>;
  totalRetirements_not: InputMaybe<Scalars['Int']>;
  totalRetirements_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum Account_OrderBy {
  bridges = 'bridges',
  holdingSnapshots = 'holdingSnapshots',
  holdings = 'holdings',
  id = 'id',
  poolDeposits = 'poolDeposits',
  poolRedeems = 'poolRedeems',
  retiresBeneficiary = 'retiresBeneficiary',
  retiresInitiator = 'retiresInitiator',
  totalRetirements = 'totalRetirements'
}

export enum Aggregation_Interval {
  day = 'day',
  hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type Bridge = {
  __typename?: 'Bridge';
  /** Account receiving the bridged carbon */
  account: Account;
  /** Amount of tokens bridged in native units */
  amount: Scalars['BigInt'];
  /** Credit bridged */
  credit: CarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Block timestamp of the bridge */
  timestamp: Scalars['BigInt'];
};

export enum BridgeProtocol {
  C3 = 'C3',
  ICR = 'ICR',
  MOSS = 'MOSS',
  TOUCAN = 'TOUCAN'
}

export type Bridge_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']>;
  account_contains_nocase: InputMaybe<Scalars['String']>;
  account_ends_with: InputMaybe<Scalars['String']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_gt: InputMaybe<Scalars['String']>;
  account_gte: InputMaybe<Scalars['String']>;
  account_in: InputMaybe<Array<Scalars['String']>>;
  account_lt: InputMaybe<Scalars['String']>;
  account_lte: InputMaybe<Scalars['String']>;
  account_not: InputMaybe<Scalars['String']>;
  account_not_contains: InputMaybe<Scalars['String']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']>;
  account_not_ends_with: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_not_in: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  account_starts_with: InputMaybe<Scalars['String']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Bridge_OrderBy {
  account = 'account',
  account__id = 'account__id',
  account__totalRetirements = 'account__totalRetirements',
  amount = 'amount',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  id = 'id',
  timestamp = 'timestamp'
}

export type CarbonCredit = {
  __typename?: 'CarbonCredit';
  /** Protocol used to bridge the tons */
  bridgeProtocol: BridgeProtocol;
  /** Total tokens issued via bridging */
  bridged: Scalars['BigInt'];
  /** All bridge events for this credit */
  bridges: Array<Bridge>;
  /** Total tokens bridged to other chains */
  crossChainSupply: Scalars['BigInt'];
  /** Current token supply */
  currentSupply: Scalars['BigInt'];
  /** ExPost Token ID for the credit vintage (if applicable) */
  exPostTokenId: Maybe<Scalars['BigInt']>;
  /** {tokenAddress}-{tokenId} concatenated. If no tokenId, then just the tokenAddress. */
  id: Scalars['Bytes'];
  /** Flag for if this credit is exAnte */
  isExAnte: Maybe<Scalars['Boolean']>;
  /** Last batch ID that was fractionalized if applicable */
  lastBatchId: Scalars['BigInt'];
  /** Current pool balances for this credit */
  poolBalances: Array<CarbonPoolCreditBalance>;
  /** Carbon Project this token belongs to */
  project: CarbonProject;
  /** Total provenance records for this credit */
  provenanceCount: Scalars['Int'];
  /** Total tokens retired */
  retired: Scalars['BigInt'];
  /** All retirement events for this credit */
  retires: Array<Retire>;
  /** Ethereum address where the token is deployed */
  tokenAddress: Scalars['Bytes'];
  /** Token ID for the credit vintage (if applicable) */
  tokenId: Maybe<Scalars['BigInt']>;
  /** Vintage of issuance */
  vintage: Scalars['Int'];
};


export type CarbonCreditBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Bridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Bridge_Filter>;
};


export type CarbonCreditPoolBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type CarbonCreditRetiresArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Retire_Filter>;
};

export type CarbonCreditSnapshot = {
  __typename?: 'CarbonCreditSnapshot';
  /** Total tokens issued via bridging */
  bridged: Scalars['BigInt'];
  /** Timestamp created */
  createdAt: Scalars['BigInt'];
  /** Credit for this snapshot */
  credit: CarbonCredit;
  /** Total tokens bridged to other chains */
  crossChainSupply: Scalars['BigInt'];
  /** Current token supply */
  currentSupply: Scalars['BigInt'];
  /** Klima rebase epoch */
  epoch: Scalars['BigInt'];
  /** {Token Address}-{Epoch ID} */
  id: Scalars['Bytes'];
  /** Total tokens retired */
  retired: Scalars['BigInt'];
};

export type CarbonCreditSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonCreditSnapshot_Filter>>>;
  bridged: InputMaybe<Scalars['BigInt']>;
  bridged_gt: InputMaybe<Scalars['BigInt']>;
  bridged_gte: InputMaybe<Scalars['BigInt']>;
  bridged_in: InputMaybe<Array<Scalars['BigInt']>>;
  bridged_lt: InputMaybe<Scalars['BigInt']>;
  bridged_lte: InputMaybe<Scalars['BigInt']>;
  bridged_not: InputMaybe<Scalars['BigInt']>;
  bridged_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply: InputMaybe<Scalars['BigInt']>;
  currentSupply_gt: InputMaybe<Scalars['BigInt']>;
  currentSupply_gte: InputMaybe<Scalars['BigInt']>;
  currentSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply_lt: InputMaybe<Scalars['BigInt']>;
  currentSupply_lte: InputMaybe<Scalars['BigInt']>;
  currentSupply_not: InputMaybe<Scalars['BigInt']>;
  currentSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  epoch: InputMaybe<Scalars['BigInt']>;
  epoch_gt: InputMaybe<Scalars['BigInt']>;
  epoch_gte: InputMaybe<Scalars['BigInt']>;
  epoch_in: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt: InputMaybe<Scalars['BigInt']>;
  epoch_lte: InputMaybe<Scalars['BigInt']>;
  epoch_not: InputMaybe<Scalars['BigInt']>;
  epoch_not_in: InputMaybe<Array<Scalars['BigInt']>>;
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
  or: InputMaybe<Array<InputMaybe<CarbonCreditSnapshot_Filter>>>;
  retired: InputMaybe<Scalars['BigInt']>;
  retired_gt: InputMaybe<Scalars['BigInt']>;
  retired_gte: InputMaybe<Scalars['BigInt']>;
  retired_in: InputMaybe<Array<Scalars['BigInt']>>;
  retired_lt: InputMaybe<Scalars['BigInt']>;
  retired_lte: InputMaybe<Scalars['BigInt']>;
  retired_not: InputMaybe<Scalars['BigInt']>;
  retired_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonCreditSnapshot_OrderBy {
  bridged = 'bridged',
  createdAt = 'createdAt',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  crossChainSupply = 'crossChainSupply',
  currentSupply = 'currentSupply',
  epoch = 'epoch',
  id = 'id',
  retired = 'retired'
}

export type CarbonCredit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonCredit_Filter>>>;
  bridgeProtocol: InputMaybe<BridgeProtocol>;
  bridgeProtocol_in: InputMaybe<Array<BridgeProtocol>>;
  bridgeProtocol_not: InputMaybe<BridgeProtocol>;
  bridgeProtocol_not_in: InputMaybe<Array<BridgeProtocol>>;
  bridged: InputMaybe<Scalars['BigInt']>;
  bridged_gt: InputMaybe<Scalars['BigInt']>;
  bridged_gte: InputMaybe<Scalars['BigInt']>;
  bridged_in: InputMaybe<Array<Scalars['BigInt']>>;
  bridged_lt: InputMaybe<Scalars['BigInt']>;
  bridged_lte: InputMaybe<Scalars['BigInt']>;
  bridged_not: InputMaybe<Scalars['BigInt']>;
  bridged_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  bridges_: InputMaybe<Bridge_Filter>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply: InputMaybe<Scalars['BigInt']>;
  currentSupply_gt: InputMaybe<Scalars['BigInt']>;
  currentSupply_gte: InputMaybe<Scalars['BigInt']>;
  currentSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply_lt: InputMaybe<Scalars['BigInt']>;
  currentSupply_lte: InputMaybe<Scalars['BigInt']>;
  currentSupply_not: InputMaybe<Scalars['BigInt']>;
  currentSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  exPostTokenId: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_gt: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_gte: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  exPostTokenId_lt: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_lte: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_not: InputMaybe<Scalars['BigInt']>;
  exPostTokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
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
  isExAnte: InputMaybe<Scalars['Boolean']>;
  isExAnte_in: InputMaybe<Array<Scalars['Boolean']>>;
  isExAnte_not: InputMaybe<Scalars['Boolean']>;
  isExAnte_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  lastBatchId: InputMaybe<Scalars['BigInt']>;
  lastBatchId_gt: InputMaybe<Scalars['BigInt']>;
  lastBatchId_gte: InputMaybe<Scalars['BigInt']>;
  lastBatchId_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastBatchId_lt: InputMaybe<Scalars['BigInt']>;
  lastBatchId_lte: InputMaybe<Scalars['BigInt']>;
  lastBatchId_not: InputMaybe<Scalars['BigInt']>;
  lastBatchId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<CarbonCredit_Filter>>>;
  poolBalances_: InputMaybe<CarbonPoolCreditBalance_Filter>;
  project: InputMaybe<Scalars['String']>;
  project_: InputMaybe<CarbonProject_Filter>;
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
  provenanceCount: InputMaybe<Scalars['Int']>;
  provenanceCount_gt: InputMaybe<Scalars['Int']>;
  provenanceCount_gte: InputMaybe<Scalars['Int']>;
  provenanceCount_in: InputMaybe<Array<Scalars['Int']>>;
  provenanceCount_lt: InputMaybe<Scalars['Int']>;
  provenanceCount_lte: InputMaybe<Scalars['Int']>;
  provenanceCount_not: InputMaybe<Scalars['Int']>;
  provenanceCount_not_in: InputMaybe<Array<Scalars['Int']>>;
  retired: InputMaybe<Scalars['BigInt']>;
  retired_gt: InputMaybe<Scalars['BigInt']>;
  retired_gte: InputMaybe<Scalars['BigInt']>;
  retired_in: InputMaybe<Array<Scalars['BigInt']>>;
  retired_lt: InputMaybe<Scalars['BigInt']>;
  retired_lte: InputMaybe<Scalars['BigInt']>;
  retired_not: InputMaybe<Scalars['BigInt']>;
  retired_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  retires_: InputMaybe<Retire_Filter>;
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
  vintage: InputMaybe<Scalars['Int']>;
  vintage_gt: InputMaybe<Scalars['Int']>;
  vintage_gte: InputMaybe<Scalars['Int']>;
  vintage_in: InputMaybe<Array<Scalars['Int']>>;
  vintage_lt: InputMaybe<Scalars['Int']>;
  vintage_lte: InputMaybe<Scalars['Int']>;
  vintage_not: InputMaybe<Scalars['Int']>;
  vintage_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum CarbonCredit_OrderBy {
  bridgeProtocol = 'bridgeProtocol',
  bridged = 'bridged',
  bridges = 'bridges',
  crossChainSupply = 'crossChainSupply',
  currentSupply = 'currentSupply',
  exPostTokenId = 'exPostTokenId',
  id = 'id',
  isExAnte = 'isExAnte',
  lastBatchId = 'lastBatchId',
  poolBalances = 'poolBalances',
  project = 'project',
  project__category = 'project__category',
  project__country = 'project__country',
  project__id = 'project__id',
  project__methodologies = 'project__methodologies',
  project__name = 'project__name',
  project__projectID = 'project__projectID',
  project__region = 'project__region',
  project__registry = 'project__registry',
  provenanceCount = 'provenanceCount',
  retired = 'retired',
  retires = 'retires',
  tokenAddress = 'tokenAddress',
  tokenId = 'tokenId',
  vintage = 'vintage'
}

export type CarbonPool = {
  __typename?: 'CarbonPool';
  /** Current balances of underlying project tokens */
  creditBalances: Array<CarbonPoolCreditBalance>;
  /** Total tokens bridged to other chains */
  crossChainSupply: Scalars['BigInt'];
  dailySnapshots: Array<CarbonPoolDailySnapshot>;
  /** Decimals of the token */
  decimals: Scalars['Int'];
  deposits: Array<PoolDeposit>;
  /** Ethereum address of the pool contract */
  id: Scalars['Bytes'];
  lastSnapshotDayID: Scalars['Int'];
  /** Common name for the pool */
  name: Scalars['String'];
  nextSnapshotDayID: Scalars['Int'];
  redeems: Array<PoolRedeem>;
  /** Current supply */
  supply: Scalars['BigInt'];
};


export type CarbonPoolCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type CarbonPoolDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type CarbonPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolCreditBalance = {
  __typename?: 'CarbonPoolCreditBalance';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: CarbonCredit;
  /** Current balance bridge to another chain */
  crossChainSupply: Scalars['BigInt'];
  dailySnapshots: Array<CarbonPoolCreditBalanceDailySnapshot>;
  /** LTD deposited amount */
  deposited: Scalars['BigInt'];
  /** {Pool Address}-{Credit Address} */
  id: Scalars['Bytes'];
  lastSnapshotDayID: Scalars['Int'];
  nextSnapshotDayID: Scalars['Int'];
  /** Target carbon pool */
  pool: CarbonPool;
  /** LTD redeemed amount */
  redeemed: Scalars['BigInt'];
};


export type CarbonPoolCreditBalanceDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};

export type CarbonPoolCreditBalanceDailySnapshot = {
  __typename?: 'CarbonPoolCreditBalanceDailySnapshot';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: CarbonCredit;
  /** ID of the creditBalance entity */
  creditBalance: CarbonPoolCreditBalance;
  /** Current balance bridge to another chain */
  crossChainSupply: Scalars['BigInt'];
  /** Day ID of this snapshot */
  dayID: Maybe<Scalars['Int']>;
  /** Delta balance */
  deltaBalance: Scalars['BigInt'];
  /** Delta balance bridge to another chain */
  deltaCrossChainSupply: Scalars['BigInt'];
  /** Delta Deposited */
  deltaDeposited: Scalars['BigInt'];
  /** Delta Redeemed */
  deltaRedeemed: Scalars['BigInt'];
  /** Deposited amount */
  deposited: Scalars['BigInt'];
  deposits: Array<PoolDeposit>;
  /** {Pool Address}-{Credit Address}-{Day ID} */
  id: Scalars['Bytes'];
  lastUpdateBlockNumber: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  /** Target carbon pool */
  pool: CarbonPool;
  /** The daily pool snapshot that this belongs to */
  poolSnapshot: CarbonPoolDailySnapshot;
  /** Redeemed amount */
  redeemed: Scalars['BigInt'];
  redeems: Array<PoolRedeem>;
};


export type CarbonPoolCreditBalanceDailySnapshotDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolCreditBalanceDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolCreditBalanceDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>>>;
  balance: InputMaybe<Scalars['BigInt']>;
  balance_gt: InputMaybe<Scalars['BigInt']>;
  balance_gte: InputMaybe<Scalars['BigInt']>;
  balance_in: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt: InputMaybe<Scalars['BigInt']>;
  balance_lte: InputMaybe<Scalars['BigInt']>;
  balance_not: InputMaybe<Scalars['BigInt']>;
  balance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  credit: InputMaybe<Scalars['String']>;
  creditBalance: InputMaybe<Scalars['String']>;
  creditBalance_: InputMaybe<CarbonPoolCreditBalance_Filter>;
  creditBalance_contains: InputMaybe<Scalars['String']>;
  creditBalance_contains_nocase: InputMaybe<Scalars['String']>;
  creditBalance_ends_with: InputMaybe<Scalars['String']>;
  creditBalance_ends_with_nocase: InputMaybe<Scalars['String']>;
  creditBalance_gt: InputMaybe<Scalars['String']>;
  creditBalance_gte: InputMaybe<Scalars['String']>;
  creditBalance_in: InputMaybe<Array<Scalars['String']>>;
  creditBalance_lt: InputMaybe<Scalars['String']>;
  creditBalance_lte: InputMaybe<Scalars['String']>;
  creditBalance_not: InputMaybe<Scalars['String']>;
  creditBalance_not_contains: InputMaybe<Scalars['String']>;
  creditBalance_not_contains_nocase: InputMaybe<Scalars['String']>;
  creditBalance_not_ends_with: InputMaybe<Scalars['String']>;
  creditBalance_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  creditBalance_not_in: InputMaybe<Array<Scalars['String']>>;
  creditBalance_not_starts_with: InputMaybe<Scalars['String']>;
  creditBalance_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  creditBalance_starts_with: InputMaybe<Scalars['String']>;
  creditBalance_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  dayID: InputMaybe<Scalars['Int']>;
  dayID_gt: InputMaybe<Scalars['Int']>;
  dayID_gte: InputMaybe<Scalars['Int']>;
  dayID_in: InputMaybe<Array<Scalars['Int']>>;
  dayID_lt: InputMaybe<Scalars['Int']>;
  dayID_lte: InputMaybe<Scalars['Int']>;
  dayID_not: InputMaybe<Scalars['Int']>;
  dayID_not_in: InputMaybe<Array<Scalars['Int']>>;
  deltaBalance: InputMaybe<Scalars['BigInt']>;
  deltaBalance_gt: InputMaybe<Scalars['BigInt']>;
  deltaBalance_gte: InputMaybe<Scalars['BigInt']>;
  deltaBalance_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaBalance_lt: InputMaybe<Scalars['BigInt']>;
  deltaBalance_lte: InputMaybe<Scalars['BigInt']>;
  deltaBalance_not: InputMaybe<Scalars['BigInt']>;
  deltaBalance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaCrossChainSupply: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaCrossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  deltaCrossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaDeposited: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_gt: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_gte: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaDeposited_lt: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_lte: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_not: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaRedeemed: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_gt: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_gte: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaRedeemed_lt: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_lte: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_not: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deposited: InputMaybe<Scalars['BigInt']>;
  deposited_gt: InputMaybe<Scalars['BigInt']>;
  deposited_gte: InputMaybe<Scalars['BigInt']>;
  deposited_in: InputMaybe<Array<Scalars['BigInt']>>;
  deposited_lt: InputMaybe<Scalars['BigInt']>;
  deposited_lte: InputMaybe<Scalars['BigInt']>;
  deposited_not: InputMaybe<Scalars['BigInt']>;
  deposited_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_: InputMaybe<PoolDeposit_Filter>;
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
  lastUpdateBlockNumber: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateBlockNumber_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolSnapshot: InputMaybe<Scalars['String']>;
  poolSnapshot_: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshot_contains: InputMaybe<Scalars['String']>;
  poolSnapshot_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshot_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshot_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshot_gt: InputMaybe<Scalars['String']>;
  poolSnapshot_gte: InputMaybe<Scalars['String']>;
  poolSnapshot_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshot_lt: InputMaybe<Scalars['String']>;
  poolSnapshot_lte: InputMaybe<Scalars['String']>;
  poolSnapshot_not: InputMaybe<Scalars['String']>;
  poolSnapshot_not_contains: InputMaybe<Scalars['String']>;
  poolSnapshot_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshot_not_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshot_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshot_not_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshot_not_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshot_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshot_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshot_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  redeemed: InputMaybe<Scalars['BigInt']>;
  redeemed_gt: InputMaybe<Scalars['BigInt']>;
  redeemed_gte: InputMaybe<Scalars['BigInt']>;
  redeemed_in: InputMaybe<Array<Scalars['BigInt']>>;
  redeemed_lt: InputMaybe<Scalars['BigInt']>;
  redeemed_lte: InputMaybe<Scalars['BigInt']>;
  redeemed_not: InputMaybe<Scalars['BigInt']>;
  redeemed_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  redeems_: InputMaybe<PoolRedeem_Filter>;
};

export enum CarbonPoolCreditBalanceDailySnapshot_OrderBy {
  balance = 'balance',
  credit = 'credit',
  creditBalance = 'creditBalance',
  creditBalance__balance = 'creditBalance__balance',
  creditBalance__crossChainSupply = 'creditBalance__crossChainSupply',
  creditBalance__deposited = 'creditBalance__deposited',
  creditBalance__id = 'creditBalance__id',
  creditBalance__lastSnapshotDayID = 'creditBalance__lastSnapshotDayID',
  creditBalance__nextSnapshotDayID = 'creditBalance__nextSnapshotDayID',
  creditBalance__redeemed = 'creditBalance__redeemed',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  crossChainSupply = 'crossChainSupply',
  dayID = 'dayID',
  deltaBalance = 'deltaBalance',
  deltaCrossChainSupply = 'deltaCrossChainSupply',
  deltaDeposited = 'deltaDeposited',
  deltaRedeemed = 'deltaRedeemed',
  deposited = 'deposited',
  deposits = 'deposits',
  id = 'id',
  lastUpdateBlockNumber = 'lastUpdateBlockNumber',
  lastUpdateTimestamp = 'lastUpdateTimestamp',
  pool = 'pool',
  poolSnapshot = 'poolSnapshot',
  poolSnapshot__dayID = 'poolSnapshot__dayID',
  poolSnapshot__deltaSupply = 'poolSnapshot__deltaSupply',
  poolSnapshot__id = 'poolSnapshot__id',
  poolSnapshot__lastUpdateBlockNumber = 'poolSnapshot__lastUpdateBlockNumber',
  poolSnapshot__lastUpdateTimestamp = 'poolSnapshot__lastUpdateTimestamp',
  poolSnapshot__supply = 'poolSnapshot__supply',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  redeemed = 'redeemed',
  redeems = 'redeems'
}

export type CarbonPoolCreditBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalance_Filter>>>;
  balance: InputMaybe<Scalars['BigInt']>;
  balance_gt: InputMaybe<Scalars['BigInt']>;
  balance_gte: InputMaybe<Scalars['BigInt']>;
  balance_in: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt: InputMaybe<Scalars['BigInt']>;
  balance_lte: InputMaybe<Scalars['BigInt']>;
  balance_not: InputMaybe<Scalars['BigInt']>;
  balance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  dailySnapshots_: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  deposited: InputMaybe<Scalars['BigInt']>;
  deposited_gt: InputMaybe<Scalars['BigInt']>;
  deposited_gte: InputMaybe<Scalars['BigInt']>;
  deposited_in: InputMaybe<Array<Scalars['BigInt']>>;
  deposited_lt: InputMaybe<Scalars['BigInt']>;
  deposited_lte: InputMaybe<Scalars['BigInt']>;
  deposited_not: InputMaybe<Scalars['BigInt']>;
  deposited_not_in: InputMaybe<Array<Scalars['BigInt']>>;
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
  lastSnapshotDayID: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gt: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gte: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_in: InputMaybe<Array<Scalars['Int']>>;
  lastSnapshotDayID_lt: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_lte: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not_in: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gt: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gte: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_in: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID_lt: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_lte: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not_in: InputMaybe<Array<Scalars['Int']>>;
  or: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalance_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  redeemed: InputMaybe<Scalars['BigInt']>;
  redeemed_gt: InputMaybe<Scalars['BigInt']>;
  redeemed_gte: InputMaybe<Scalars['BigInt']>;
  redeemed_in: InputMaybe<Array<Scalars['BigInt']>>;
  redeemed_lt: InputMaybe<Scalars['BigInt']>;
  redeemed_lte: InputMaybe<Scalars['BigInt']>;
  redeemed_not: InputMaybe<Scalars['BigInt']>;
  redeemed_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPoolCreditBalance_OrderBy {
  balance = 'balance',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  crossChainSupply = 'crossChainSupply',
  dailySnapshots = 'dailySnapshots',
  deposited = 'deposited',
  id = 'id',
  lastSnapshotDayID = 'lastSnapshotDayID',
  nextSnapshotDayID = 'nextSnapshotDayID',
  pool = 'pool',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  redeemed = 'redeemed'
}

export type CarbonPoolDailySnapshot = {
  __typename?: 'CarbonPoolDailySnapshot';
  /** Current balances of underlying project tokens */
  creditBalances: Array<CarbonPoolCreditBalanceDailySnapshot>;
  /** Day ID of this snapshot */
  dayID: Maybe<Scalars['Int']>;
  /** Change in supply during this period */
  deltaSupply: Scalars['BigInt'];
  deposits: Array<PoolDeposit>;
  /** Ethereum address of the pool contract */
  id: Scalars['Bytes'];
  lastUpdateBlockNumber: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  /** Pool this snapshot belongs to */
  pool: CarbonPool;
  redeems: Array<PoolRedeem>;
  /** Current supply */
  supply: Scalars['BigInt'];
};


export type CarbonPoolDailySnapshotCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type CarbonPoolDailySnapshotDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonPoolDailySnapshot_Filter>>>;
  creditBalances_: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  dayID: InputMaybe<Scalars['Int']>;
  dayID_gt: InputMaybe<Scalars['Int']>;
  dayID_gte: InputMaybe<Scalars['Int']>;
  dayID_in: InputMaybe<Array<Scalars['Int']>>;
  dayID_lt: InputMaybe<Scalars['Int']>;
  dayID_lte: InputMaybe<Scalars['Int']>;
  dayID_not: InputMaybe<Scalars['Int']>;
  dayID_not_in: InputMaybe<Array<Scalars['Int']>>;
  deltaSupply: InputMaybe<Scalars['BigInt']>;
  deltaSupply_gt: InputMaybe<Scalars['BigInt']>;
  deltaSupply_gte: InputMaybe<Scalars['BigInt']>;
  deltaSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaSupply_lt: InputMaybe<Scalars['BigInt']>;
  deltaSupply_lte: InputMaybe<Scalars['BigInt']>;
  deltaSupply_not: InputMaybe<Scalars['BigInt']>;
  deltaSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_: InputMaybe<PoolDeposit_Filter>;
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
  lastUpdateBlockNumber: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateBlockNumber_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<CarbonPoolDailySnapshot_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  redeems_: InputMaybe<PoolRedeem_Filter>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPoolDailySnapshot_OrderBy {
  creditBalances = 'creditBalances',
  dayID = 'dayID',
  deltaSupply = 'deltaSupply',
  deposits = 'deposits',
  id = 'id',
  lastUpdateBlockNumber = 'lastUpdateBlockNumber',
  lastUpdateTimestamp = 'lastUpdateTimestamp',
  pool = 'pool',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  redeems = 'redeems',
  supply = 'supply'
}

export type CarbonPool_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonPool_Filter>>>;
  creditBalances_: InputMaybe<CarbonPoolCreditBalance_Filter>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  dailySnapshots_: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  decimals: InputMaybe<Scalars['Int']>;
  decimals_gt: InputMaybe<Scalars['Int']>;
  decimals_gte: InputMaybe<Scalars['Int']>;
  decimals_in: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt: InputMaybe<Scalars['Int']>;
  decimals_lte: InputMaybe<Scalars['Int']>;
  decimals_not: InputMaybe<Scalars['Int']>;
  decimals_not_in: InputMaybe<Array<Scalars['Int']>>;
  deposits_: InputMaybe<PoolDeposit_Filter>;
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
  lastSnapshotDayID: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gt: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gte: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_in: InputMaybe<Array<Scalars['Int']>>;
  lastSnapshotDayID_lt: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_lte: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not_in: InputMaybe<Array<Scalars['Int']>>;
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
  nextSnapshotDayID: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gt: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gte: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_in: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID_lt: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_lte: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not_in: InputMaybe<Array<Scalars['Int']>>;
  or: InputMaybe<Array<InputMaybe<CarbonPool_Filter>>>;
  redeems_: InputMaybe<PoolRedeem_Filter>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPool_OrderBy {
  creditBalances = 'creditBalances',
  crossChainSupply = 'crossChainSupply',
  dailySnapshots = 'dailySnapshots',
  decimals = 'decimals',
  deposits = 'deposits',
  id = 'id',
  lastSnapshotDayID = 'lastSnapshotDayID',
  name = 'name',
  nextSnapshotDayID = 'nextSnapshotDayID',
  redeems = 'redeems',
  supply = 'supply'
}

export type CarbonProject = {
  __typename?: 'CarbonProject';
  /** Carbon credit tokens related to this project */
  carbonCredits: Array<CarbonCredit>;
  /** Category associated with this project */
  category: Scalars['String'];
  /** Country where the project takes place */
  country: Scalars['String'];
  /** {Registry Enum String}-{Registry Project ID} */
  id: Scalars['ID'];
  /** Methodologies associated with this project. For projects having more than one, the first one is the primary methodology. */
  methodologies: Scalars['String'];
  /** Name of the project */
  name: Scalars['String'];
  /** Registry Project ID */
  projectID: Scalars['String'];
  /** Region within the country where the project takes place */
  region: Scalars['String'];
  /** Issuing registry */
  registry: Registry;
};


export type CarbonProjectCarbonCreditsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CarbonCredit_Filter>;
};

export type CarbonProject_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonProject_Filter>>>;
  carbonCredits_: InputMaybe<CarbonCredit_Filter>;
  category: InputMaybe<Scalars['String']>;
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
  methodologies: InputMaybe<Scalars['String']>;
  methodologies_contains: InputMaybe<Scalars['String']>;
  methodologies_contains_nocase: InputMaybe<Scalars['String']>;
  methodologies_ends_with: InputMaybe<Scalars['String']>;
  methodologies_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodologies_gt: InputMaybe<Scalars['String']>;
  methodologies_gte: InputMaybe<Scalars['String']>;
  methodologies_in: InputMaybe<Array<Scalars['String']>>;
  methodologies_lt: InputMaybe<Scalars['String']>;
  methodologies_lte: InputMaybe<Scalars['String']>;
  methodologies_not: InputMaybe<Scalars['String']>;
  methodologies_not_contains: InputMaybe<Scalars['String']>;
  methodologies_not_contains_nocase: InputMaybe<Scalars['String']>;
  methodologies_not_ends_with: InputMaybe<Scalars['String']>;
  methodologies_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodologies_not_in: InputMaybe<Array<Scalars['String']>>;
  methodologies_not_starts_with: InputMaybe<Scalars['String']>;
  methodologies_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  methodologies_starts_with: InputMaybe<Scalars['String']>;
  methodologies_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<CarbonProject_Filter>>>;
  projectID: InputMaybe<Scalars['String']>;
  projectID_contains: InputMaybe<Scalars['String']>;
  projectID_contains_nocase: InputMaybe<Scalars['String']>;
  projectID_ends_with: InputMaybe<Scalars['String']>;
  projectID_ends_with_nocase: InputMaybe<Scalars['String']>;
  projectID_gt: InputMaybe<Scalars['String']>;
  projectID_gte: InputMaybe<Scalars['String']>;
  projectID_in: InputMaybe<Array<Scalars['String']>>;
  projectID_lt: InputMaybe<Scalars['String']>;
  projectID_lte: InputMaybe<Scalars['String']>;
  projectID_not: InputMaybe<Scalars['String']>;
  projectID_not_contains: InputMaybe<Scalars['String']>;
  projectID_not_contains_nocase: InputMaybe<Scalars['String']>;
  projectID_not_ends_with: InputMaybe<Scalars['String']>;
  projectID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  projectID_not_in: InputMaybe<Array<Scalars['String']>>;
  projectID_not_starts_with: InputMaybe<Scalars['String']>;
  projectID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  projectID_starts_with: InputMaybe<Scalars['String']>;
  projectID_starts_with_nocase: InputMaybe<Scalars['String']>;
  region: InputMaybe<Scalars['String']>;
  region_contains: InputMaybe<Scalars['String']>;
  region_contains_nocase: InputMaybe<Scalars['String']>;
  region_ends_with: InputMaybe<Scalars['String']>;
  region_ends_with_nocase: InputMaybe<Scalars['String']>;
  region_gt: InputMaybe<Scalars['String']>;
  region_gte: InputMaybe<Scalars['String']>;
  region_in: InputMaybe<Array<Scalars['String']>>;
  region_lt: InputMaybe<Scalars['String']>;
  region_lte: InputMaybe<Scalars['String']>;
  region_not: InputMaybe<Scalars['String']>;
  region_not_contains: InputMaybe<Scalars['String']>;
  region_not_contains_nocase: InputMaybe<Scalars['String']>;
  region_not_ends_with: InputMaybe<Scalars['String']>;
  region_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  region_not_in: InputMaybe<Array<Scalars['String']>>;
  region_not_starts_with: InputMaybe<Scalars['String']>;
  region_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  region_starts_with: InputMaybe<Scalars['String']>;
  region_starts_with_nocase: InputMaybe<Scalars['String']>;
  registry: InputMaybe<Registry>;
  registry_in: InputMaybe<Array<Registry>>;
  registry_not: InputMaybe<Registry>;
  registry_not_in: InputMaybe<Array<Registry>>;
};

export enum CarbonProject_OrderBy {
  carbonCredits = 'carbonCredits',
  category = 'category',
  country = 'country',
  id = 'id',
  methodologies = 'methodologies',
  name = 'name',
  projectID = 'projectID',
  region = 'region',
  registry = 'registry'
}

export type CrossChainBridge = {
  __typename?: 'CrossChainBridge';
  /** Amount of tokens bridged */
  amount: Scalars['BigInt'];
  /** Bridging address */
  bridger: Scalars['Bytes'];
  /** ID of the credit being bridged, if any */
  credit: Maybe<CarbonCredit>;
  /** Bridge direction */
  direction: CrossChainBridgeDirection;
  /** Transaction hash of the event */
  hash: Scalars['Bytes'];
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** ID of the pool being bridged, if any */
  pool: Maybe<CarbonPool>;
  /** Block timestamp of the bridge */
  timestamp: Scalars['BigInt'];
};

export enum CrossChainBridgeDirection {
  RECEIVED = 'RECEIVED',
  SENT = 'SENT'
}

export type CrossChainBridge_Filter = {
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
  and: InputMaybe<Array<InputMaybe<CrossChainBridge_Filter>>>;
  bridger: InputMaybe<Scalars['Bytes']>;
  bridger_contains: InputMaybe<Scalars['Bytes']>;
  bridger_gt: InputMaybe<Scalars['Bytes']>;
  bridger_gte: InputMaybe<Scalars['Bytes']>;
  bridger_in: InputMaybe<Array<Scalars['Bytes']>>;
  bridger_lt: InputMaybe<Scalars['Bytes']>;
  bridger_lte: InputMaybe<Scalars['Bytes']>;
  bridger_not: InputMaybe<Scalars['Bytes']>;
  bridger_not_contains: InputMaybe<Scalars['Bytes']>;
  bridger_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
  direction: InputMaybe<CrossChainBridgeDirection>;
  direction_in: InputMaybe<Array<CrossChainBridgeDirection>>;
  direction_not: InputMaybe<CrossChainBridgeDirection>;
  direction_not_in: InputMaybe<Array<CrossChainBridgeDirection>>;
  hash: InputMaybe<Scalars['Bytes']>;
  hash_contains: InputMaybe<Scalars['Bytes']>;
  hash_gt: InputMaybe<Scalars['Bytes']>;
  hash_gte: InputMaybe<Scalars['Bytes']>;
  hash_in: InputMaybe<Array<Scalars['Bytes']>>;
  hash_lt: InputMaybe<Scalars['Bytes']>;
  hash_lte: InputMaybe<Scalars['Bytes']>;
  hash_not: InputMaybe<Scalars['Bytes']>;
  hash_not_contains: InputMaybe<Scalars['Bytes']>;
  hash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
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
  or: InputMaybe<Array<InputMaybe<CrossChainBridge_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CrossChainBridge_OrderBy {
  amount = 'amount',
  bridger = 'bridger',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  direction = 'direction',
  hash = 'hash',
  id = 'id',
  pool = 'pool',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  timestamp = 'timestamp'
}

export type Ecosystem = {
  __typename?: 'Ecosystem';
  /** Active credits with supply > 0 */
  activeCredits: Array<Scalars['Bytes']>;
  id: Scalars['ID'];
};

export type Ecosystem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  activeCredits: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  and: InputMaybe<Array<InputMaybe<Ecosystem_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Ecosystem_Filter>>>;
};

export enum Ecosystem_OrderBy {
  activeCredits = 'activeCredits',
  id = 'id'
}

export type Epoch = {
  __typename?: 'Epoch';
  /** 600 epoch credit supply SMA */
  creditSMA: Scalars['BigInt'];
  /** Total active carbon credit supply */
  creditSupply: Scalars['BigInt'];
  /** Change in active supply since last epoch */
  deltaCreditSupply: Scalars['BigInt'];
  /** Numeric field for sorting */
  epoch: Scalars['BigInt'];
  /** sKLIMA epoch number */
  id: Scalars['ID'];
};

export type Epoch_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Epoch_Filter>>>;
  creditSMA: InputMaybe<Scalars['BigInt']>;
  creditSMA_gt: InputMaybe<Scalars['BigInt']>;
  creditSMA_gte: InputMaybe<Scalars['BigInt']>;
  creditSMA_in: InputMaybe<Array<Scalars['BigInt']>>;
  creditSMA_lt: InputMaybe<Scalars['BigInt']>;
  creditSMA_lte: InputMaybe<Scalars['BigInt']>;
  creditSMA_not: InputMaybe<Scalars['BigInt']>;
  creditSMA_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  creditSupply: InputMaybe<Scalars['BigInt']>;
  creditSupply_gt: InputMaybe<Scalars['BigInt']>;
  creditSupply_gte: InputMaybe<Scalars['BigInt']>;
  creditSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  creditSupply_lt: InputMaybe<Scalars['BigInt']>;
  creditSupply_lte: InputMaybe<Scalars['BigInt']>;
  creditSupply_not: InputMaybe<Scalars['BigInt']>;
  creditSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaCreditSupply: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_gt: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_gte: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  deltaCreditSupply_lt: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_lte: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_not: InputMaybe<Scalars['BigInt']>;
  deltaCreditSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  epoch: InputMaybe<Scalars['BigInt']>;
  epoch_gt: InputMaybe<Scalars['BigInt']>;
  epoch_gte: InputMaybe<Scalars['BigInt']>;
  epoch_in: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt: InputMaybe<Scalars['BigInt']>;
  epoch_lte: InputMaybe<Scalars['BigInt']>;
  epoch_not: InputMaybe<Scalars['BigInt']>;
  epoch_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Epoch_Filter>>>;
};

export enum Epoch_OrderBy {
  creditSMA = 'creditSMA',
  creditSupply = 'creditSupply',
  deltaCreditSupply = 'deltaCreditSupply',
  epoch = 'epoch',
  id = 'id'
}

export type Holding = {
  __typename?: 'Holding';
  /** Account this belongs to */
  account: Account;
  activeProvenanceRecords: Array<ProvenanceRecord>;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  historicalProvenanceRecords: Array<ProvenanceRecord>;
  /** {Account}-{Token} */
  id: Scalars['Bytes'];
  /** Timestamp last updated */
  lastUpdated: Scalars['BigInt'];
  /** Token being held */
  token: Token;
  /** Token ID being held */
  tokenId: Maybe<Scalars['BigInt']>;
};


export type HoldingActiveProvenanceRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ProvenanceRecord_Filter>;
};


export type HoldingHistoricalProvenanceRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ProvenanceRecord_Filter>;
};

export type HoldingDailySnapshot = {
  __typename?: 'HoldingDailySnapshot';
  /** Account this belongs to */
  account: Account;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  /** {Account}-{Token}-{Days since Unix epoch} */
  id: Scalars['Bytes'];
  /** Day in Unix timestamp */
  timestamp: Scalars['BigInt'];
  /** Token being held */
  token: Token;
};

export type HoldingDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']>;
  account_contains_nocase: InputMaybe<Scalars['String']>;
  account_ends_with: InputMaybe<Scalars['String']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_gt: InputMaybe<Scalars['String']>;
  account_gte: InputMaybe<Scalars['String']>;
  account_in: InputMaybe<Array<Scalars['String']>>;
  account_lt: InputMaybe<Scalars['String']>;
  account_lte: InputMaybe<Scalars['String']>;
  account_not: InputMaybe<Scalars['String']>;
  account_not_contains: InputMaybe<Scalars['String']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']>;
  account_not_ends_with: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_not_in: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  account_starts_with: InputMaybe<Scalars['String']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<HoldingDailySnapshot_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<HoldingDailySnapshot_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<Token_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum HoldingDailySnapshot_OrderBy {
  account = 'account',
  account__id = 'account__id',
  account__totalRetirements = 'account__totalRetirements',
  amount = 'amount',
  id = 'id',
  timestamp = 'timestamp',
  token = 'token',
  token__decimals = 'token__decimals',
  token__id = 'token__id',
  token__latestPricePerKLIMA = 'token__latestPricePerKLIMA',
  token__latestPricePerKLIMAUpdated = 'token__latestPricePerKLIMAUpdated',
  token__latestPriceUSD = 'token__latestPriceUSD',
  token__latestPriceUSDUpdated = 'token__latestPriceUSDUpdated',
  token__name = 'token__name',
  token__symbol = 'token__symbol'
}

export type Holding_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']>;
  account_contains_nocase: InputMaybe<Scalars['String']>;
  account_ends_with: InputMaybe<Scalars['String']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_gt: InputMaybe<Scalars['String']>;
  account_gte: InputMaybe<Scalars['String']>;
  account_in: InputMaybe<Array<Scalars['String']>>;
  account_lt: InputMaybe<Scalars['String']>;
  account_lte: InputMaybe<Scalars['String']>;
  account_not: InputMaybe<Scalars['String']>;
  account_not_contains: InputMaybe<Scalars['String']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']>;
  account_not_ends_with: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_not_in: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  account_starts_with: InputMaybe<Scalars['String']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']>;
  activeProvenanceRecords: InputMaybe<Array<Scalars['String']>>;
  activeProvenanceRecords_: InputMaybe<ProvenanceRecord_Filter>;
  activeProvenanceRecords_contains: InputMaybe<Array<Scalars['String']>>;
  activeProvenanceRecords_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  activeProvenanceRecords_not: InputMaybe<Array<Scalars['String']>>;
  activeProvenanceRecords_not_contains: InputMaybe<Array<Scalars['String']>>;
  activeProvenanceRecords_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  historicalProvenanceRecords: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_: InputMaybe<ProvenanceRecord_Filter>;
  historicalProvenanceRecords_contains: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_not: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_not_contains: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
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
  lastUpdated: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdated_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdated_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  token: InputMaybe<Scalars['String']>;
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token_: InputMaybe<Token_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum Holding_OrderBy {
  account = 'account',
  account__id = 'account__id',
  account__totalRetirements = 'account__totalRetirements',
  activeProvenanceRecords = 'activeProvenanceRecords',
  amount = 'amount',
  historicalProvenanceRecords = 'historicalProvenanceRecords',
  id = 'id',
  lastUpdated = 'lastUpdated',
  token = 'token',
  tokenId = 'tokenId',
  token__decimals = 'token__decimals',
  token__id = 'token__id',
  token__latestPricePerKLIMA = 'token__latestPricePerKLIMA',
  token__latestPricePerKLIMAUpdated = 'token__latestPricePerKLIMAUpdated',
  token__latestPriceUSD = 'token__latestPriceUSD',
  token__latestPriceUSDUpdated = 'token__latestPriceUSDUpdated',
  token__name = 'token__name',
  token__symbol = 'token__symbol'
}

export type KlimaRetire = {
  __typename?: 'KlimaRetire';
  /** Fee charged for retirement in native units */
  feeAmount: Scalars['BigInt'];
  /** {Account}-{Klima Retirement Index} */
  id: Scalars['Bytes'];
  /** Klima retirement index */
  index: Scalars['BigInt'];
  /** Retirement made by the aggregator */
  retire: Retire;
  /** Selective retirement */
  specific: Scalars['Boolean'];
};

export type KlimaRetire_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  feeAmount: InputMaybe<Scalars['BigInt']>;
  feeAmount_gt: InputMaybe<Scalars['BigInt']>;
  feeAmount_gte: InputMaybe<Scalars['BigInt']>;
  feeAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  feeAmount_lt: InputMaybe<Scalars['BigInt']>;
  feeAmount_lte: InputMaybe<Scalars['BigInt']>;
  feeAmount_not: InputMaybe<Scalars['BigInt']>;
  feeAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
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
  index: InputMaybe<Scalars['BigInt']>;
  index_gt: InputMaybe<Scalars['BigInt']>;
  index_gte: InputMaybe<Scalars['BigInt']>;
  index_in: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt: InputMaybe<Scalars['BigInt']>;
  index_lte: InputMaybe<Scalars['BigInt']>;
  index_not: InputMaybe<Scalars['BigInt']>;
  index_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  retire: InputMaybe<Scalars['String']>;
  retire_: InputMaybe<Retire_Filter>;
  retire_contains: InputMaybe<Scalars['String']>;
  retire_contains_nocase: InputMaybe<Scalars['String']>;
  retire_ends_with: InputMaybe<Scalars['String']>;
  retire_ends_with_nocase: InputMaybe<Scalars['String']>;
  retire_gt: InputMaybe<Scalars['String']>;
  retire_gte: InputMaybe<Scalars['String']>;
  retire_in: InputMaybe<Array<Scalars['String']>>;
  retire_lt: InputMaybe<Scalars['String']>;
  retire_lte: InputMaybe<Scalars['String']>;
  retire_not: InputMaybe<Scalars['String']>;
  retire_not_contains: InputMaybe<Scalars['String']>;
  retire_not_contains_nocase: InputMaybe<Scalars['String']>;
  retire_not_ends_with: InputMaybe<Scalars['String']>;
  retire_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  retire_not_in: InputMaybe<Array<Scalars['String']>>;
  retire_not_starts_with: InputMaybe<Scalars['String']>;
  retire_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  retire_starts_with: InputMaybe<Scalars['String']>;
  retire_starts_with_nocase: InputMaybe<Scalars['String']>;
  specific: InputMaybe<Scalars['Boolean']>;
  specific_in: InputMaybe<Array<Scalars['Boolean']>>;
  specific_not: InputMaybe<Scalars['Boolean']>;
  specific_not_in: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum KlimaRetire_OrderBy {
  feeAmount = 'feeAmount',
  id = 'id',
  index = 'index',
  retire = 'retire',
  retire__amount = 'retire__amount',
  retire__beneficiaryName = 'retire__beneficiaryName',
  retire__bridgeID = 'retire__bridgeID',
  retire__hash = 'retire__hash',
  retire__id = 'retire__id',
  retire__retirementMessage = 'retire__retirementMessage',
  retire__retiringName = 'retire__retiringName',
  retire__source = 'retire__source',
  retire__timestamp = 'retire__timestamp',
  specific = 'specific'
}

export type Methodology = {
  __typename?: 'Methodology';
  approvalDate: Scalars['String'];
  currentVersion: Scalars['String'];
  id: Scalars['ID'];
  scope: Maybe<Scalars['String']>;
};

export type Methodology_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Methodology_Filter>>>;
  approvalDate: InputMaybe<Scalars['String']>;
  approvalDate_contains: InputMaybe<Scalars['String']>;
  approvalDate_contains_nocase: InputMaybe<Scalars['String']>;
  approvalDate_ends_with: InputMaybe<Scalars['String']>;
  approvalDate_ends_with_nocase: InputMaybe<Scalars['String']>;
  approvalDate_gt: InputMaybe<Scalars['String']>;
  approvalDate_gte: InputMaybe<Scalars['String']>;
  approvalDate_in: InputMaybe<Array<Scalars['String']>>;
  approvalDate_lt: InputMaybe<Scalars['String']>;
  approvalDate_lte: InputMaybe<Scalars['String']>;
  approvalDate_not: InputMaybe<Scalars['String']>;
  approvalDate_not_contains: InputMaybe<Scalars['String']>;
  approvalDate_not_contains_nocase: InputMaybe<Scalars['String']>;
  approvalDate_not_ends_with: InputMaybe<Scalars['String']>;
  approvalDate_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  approvalDate_not_in: InputMaybe<Array<Scalars['String']>>;
  approvalDate_not_starts_with: InputMaybe<Scalars['String']>;
  approvalDate_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  approvalDate_starts_with: InputMaybe<Scalars['String']>;
  approvalDate_starts_with_nocase: InputMaybe<Scalars['String']>;
  currentVersion: InputMaybe<Scalars['String']>;
  currentVersion_contains: InputMaybe<Scalars['String']>;
  currentVersion_contains_nocase: InputMaybe<Scalars['String']>;
  currentVersion_ends_with: InputMaybe<Scalars['String']>;
  currentVersion_ends_with_nocase: InputMaybe<Scalars['String']>;
  currentVersion_gt: InputMaybe<Scalars['String']>;
  currentVersion_gte: InputMaybe<Scalars['String']>;
  currentVersion_in: InputMaybe<Array<Scalars['String']>>;
  currentVersion_lt: InputMaybe<Scalars['String']>;
  currentVersion_lte: InputMaybe<Scalars['String']>;
  currentVersion_not: InputMaybe<Scalars['String']>;
  currentVersion_not_contains: InputMaybe<Scalars['String']>;
  currentVersion_not_contains_nocase: InputMaybe<Scalars['String']>;
  currentVersion_not_ends_with: InputMaybe<Scalars['String']>;
  currentVersion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  currentVersion_not_in: InputMaybe<Array<Scalars['String']>>;
  currentVersion_not_starts_with: InputMaybe<Scalars['String']>;
  currentVersion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  currentVersion_starts_with: InputMaybe<Scalars['String']>;
  currentVersion_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Methodology_Filter>>>;
  scope: InputMaybe<Scalars['String']>;
  scope_contains: InputMaybe<Scalars['String']>;
  scope_contains_nocase: InputMaybe<Scalars['String']>;
  scope_ends_with: InputMaybe<Scalars['String']>;
  scope_ends_with_nocase: InputMaybe<Scalars['String']>;
  scope_gt: InputMaybe<Scalars['String']>;
  scope_gte: InputMaybe<Scalars['String']>;
  scope_in: InputMaybe<Array<Scalars['String']>>;
  scope_lt: InputMaybe<Scalars['String']>;
  scope_lte: InputMaybe<Scalars['String']>;
  scope_not: InputMaybe<Scalars['String']>;
  scope_not_contains: InputMaybe<Scalars['String']>;
  scope_not_contains_nocase: InputMaybe<Scalars['String']>;
  scope_not_ends_with: InputMaybe<Scalars['String']>;
  scope_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  scope_not_in: InputMaybe<Array<Scalars['String']>>;
  scope_not_starts_with: InputMaybe<Scalars['String']>;
  scope_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  scope_starts_with: InputMaybe<Scalars['String']>;
  scope_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum Methodology_OrderBy {
  approvalDate = 'approvalDate',
  currentVersion = 'currentVersion',
  id = 'id',
  scope = 'scope'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export type PoolDeposit = {
  __typename?: 'PoolDeposit';
  /** Account making the deposit */
  account: Account;
  /** Amount deposited in native units */
  amount: Scalars['BigInt'];
  /** Credit deposited in the pool */
  credit: CarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Pool that the credit was deposited in */
  pool: CarbonPool;
  /** {Pool}-{Credit}-{Day ID} for snapshot referencing */
  poolCreditSnapshotID: CarbonPoolCreditBalanceDailySnapshot;
  /** {Pool}-{Day ID} for snapshot referencing */
  poolSnapshotID: CarbonPoolDailySnapshot;
  /** Block timestamp of the deposit */
  timestamp: Scalars['BigInt'];
};

export type PoolDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']>;
  account_contains_nocase: InputMaybe<Scalars['String']>;
  account_ends_with: InputMaybe<Scalars['String']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_gt: InputMaybe<Scalars['String']>;
  account_gte: InputMaybe<Scalars['String']>;
  account_in: InputMaybe<Array<Scalars['String']>>;
  account_lt: InputMaybe<Scalars['String']>;
  account_lte: InputMaybe<Scalars['String']>;
  account_not: InputMaybe<Scalars['String']>;
  account_not_contains: InputMaybe<Scalars['String']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']>;
  account_not_ends_with: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_not_in: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  account_starts_with: InputMaybe<Scalars['String']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<PoolDeposit_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<PoolDeposit_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  poolCreditSnapshotID_contains: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_contains_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gt: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gte: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_in: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_lt: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_lte: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_in: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_not_starts_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID: InputMaybe<Scalars['String']>;
  poolSnapshotID_: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshotID_contains: InputMaybe<Scalars['String']>;
  poolSnapshotID_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_gt: InputMaybe<Scalars['String']>;
  poolSnapshotID_gte: InputMaybe<Scalars['String']>;
  poolSnapshotID_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_lt: InputMaybe<Scalars['String']>;
  poolSnapshotID_lte: InputMaybe<Scalars['String']>;
  poolSnapshotID_not: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_not_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum PoolDeposit_OrderBy {
  account = 'account',
  account__id = 'account__id',
  account__totalRetirements = 'account__totalRetirements',
  amount = 'amount',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  id = 'id',
  pool = 'pool',
  poolCreditSnapshotID = 'poolCreditSnapshotID',
  poolCreditSnapshotID__balance = 'poolCreditSnapshotID__balance',
  poolCreditSnapshotID__crossChainSupply = 'poolCreditSnapshotID__crossChainSupply',
  poolCreditSnapshotID__dayID = 'poolCreditSnapshotID__dayID',
  poolCreditSnapshotID__deltaBalance = 'poolCreditSnapshotID__deltaBalance',
  poolCreditSnapshotID__deltaCrossChainSupply = 'poolCreditSnapshotID__deltaCrossChainSupply',
  poolCreditSnapshotID__deltaDeposited = 'poolCreditSnapshotID__deltaDeposited',
  poolCreditSnapshotID__deltaRedeemed = 'poolCreditSnapshotID__deltaRedeemed',
  poolCreditSnapshotID__deposited = 'poolCreditSnapshotID__deposited',
  poolCreditSnapshotID__id = 'poolCreditSnapshotID__id',
  poolCreditSnapshotID__lastUpdateBlockNumber = 'poolCreditSnapshotID__lastUpdateBlockNumber',
  poolCreditSnapshotID__lastUpdateTimestamp = 'poolCreditSnapshotID__lastUpdateTimestamp',
  poolCreditSnapshotID__redeemed = 'poolCreditSnapshotID__redeemed',
  poolSnapshotID = 'poolSnapshotID',
  poolSnapshotID__dayID = 'poolSnapshotID__dayID',
  poolSnapshotID__deltaSupply = 'poolSnapshotID__deltaSupply',
  poolSnapshotID__id = 'poolSnapshotID__id',
  poolSnapshotID__lastUpdateBlockNumber = 'poolSnapshotID__lastUpdateBlockNumber',
  poolSnapshotID__lastUpdateTimestamp = 'poolSnapshotID__lastUpdateTimestamp',
  poolSnapshotID__supply = 'poolSnapshotID__supply',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  timestamp = 'timestamp'
}

export type PoolRedeem = {
  __typename?: 'PoolRedeem';
  /** Account making the redemption */
  account: Account;
  /** Amount redeemed in native units */
  amount: Scalars['BigInt'];
  /** Credit redeemed from the pool */
  credit: CarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Pool that the credit was redeemed from */
  pool: CarbonPool;
  /** {Pool}-{Credit}-{Day ID} for snapshot referencing */
  poolCreditSnapshotID: CarbonPoolCreditBalanceDailySnapshot;
  /** {Pool}-{Day ID} for snapshot referencing */
  poolSnapshotID: CarbonPoolDailySnapshot;
  /** Block timestamp of the deposit */
  timestamp: Scalars['BigInt'];
};

export type PoolRedeem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']>;
  account_contains_nocase: InputMaybe<Scalars['String']>;
  account_ends_with: InputMaybe<Scalars['String']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_gt: InputMaybe<Scalars['String']>;
  account_gte: InputMaybe<Scalars['String']>;
  account_in: InputMaybe<Array<Scalars['String']>>;
  account_lt: InputMaybe<Scalars['String']>;
  account_lte: InputMaybe<Scalars['String']>;
  account_not: InputMaybe<Scalars['String']>;
  account_not_contains: InputMaybe<Scalars['String']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']>;
  account_not_ends_with: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  account_not_in: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  account_starts_with: InputMaybe<Scalars['String']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<PoolRedeem_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<PoolRedeem_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  poolCreditSnapshotID_contains: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_contains_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gt: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gte: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_in: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_lt: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_lte: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_in: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_not_starts_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID: InputMaybe<Scalars['String']>;
  poolSnapshotID_: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshotID_contains: InputMaybe<Scalars['String']>;
  poolSnapshotID_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_gt: InputMaybe<Scalars['String']>;
  poolSnapshotID_gte: InputMaybe<Scalars['String']>;
  poolSnapshotID_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_lt: InputMaybe<Scalars['String']>;
  poolSnapshotID_lte: InputMaybe<Scalars['String']>;
  poolSnapshotID_not: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_in: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_not_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum PoolRedeem_OrderBy {
  account = 'account',
  account__id = 'account__id',
  account__totalRetirements = 'account__totalRetirements',
  amount = 'amount',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  id = 'id',
  pool = 'pool',
  poolCreditSnapshotID = 'poolCreditSnapshotID',
  poolCreditSnapshotID__balance = 'poolCreditSnapshotID__balance',
  poolCreditSnapshotID__crossChainSupply = 'poolCreditSnapshotID__crossChainSupply',
  poolCreditSnapshotID__dayID = 'poolCreditSnapshotID__dayID',
  poolCreditSnapshotID__deltaBalance = 'poolCreditSnapshotID__deltaBalance',
  poolCreditSnapshotID__deltaCrossChainSupply = 'poolCreditSnapshotID__deltaCrossChainSupply',
  poolCreditSnapshotID__deltaDeposited = 'poolCreditSnapshotID__deltaDeposited',
  poolCreditSnapshotID__deltaRedeemed = 'poolCreditSnapshotID__deltaRedeemed',
  poolCreditSnapshotID__deposited = 'poolCreditSnapshotID__deposited',
  poolCreditSnapshotID__id = 'poolCreditSnapshotID__id',
  poolCreditSnapshotID__lastUpdateBlockNumber = 'poolCreditSnapshotID__lastUpdateBlockNumber',
  poolCreditSnapshotID__lastUpdateTimestamp = 'poolCreditSnapshotID__lastUpdateTimestamp',
  poolCreditSnapshotID__redeemed = 'poolCreditSnapshotID__redeemed',
  poolSnapshotID = 'poolSnapshotID',
  poolSnapshotID__dayID = 'poolSnapshotID__dayID',
  poolSnapshotID__deltaSupply = 'poolSnapshotID__deltaSupply',
  poolSnapshotID__id = 'poolSnapshotID__id',
  poolSnapshotID__lastUpdateBlockNumber = 'poolSnapshotID__lastUpdateBlockNumber',
  poolSnapshotID__lastUpdateTimestamp = 'poolSnapshotID__lastUpdateTimestamp',
  poolSnapshotID__supply = 'poolSnapshotID__supply',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  timestamp = 'timestamp'
}

export type ProvenanceRecord = {
  __typename?: 'ProvenanceRecord';
  /** Unix timestamp created */
  createdAt: Scalars['BigInt'];
  /** Token address - Holding address - increment */
  id: Scalars['Bytes'];
  /** Original amount received */
  originalAmount: Scalars['BigInt'];
  /** Prior records associated with this transaction */
  priorRecords: Array<ProvenanceRecord>;
  /** Receiver of the credit */
  receiver: Scalars['Bytes'];
  /** Any applicable registry serial numbers for origination */
  registrySerialNumbers: Array<Scalars['String']>;
  /** Remaining amount held */
  remainingAmount: Scalars['BigInt'];
  /** Sender of the credit */
  sender: Scalars['Bytes'];
  /** Credit token address */
  token: Scalars['Bytes'];
  /** Credit token ID */
  tokenId: Maybe<Scalars['BigInt']>;
  /** Transaction hash creating this record */
  transactionHash: Scalars['Bytes'];
  /** Action being made with the credit */
  transactionType: ProvenanceType;
  /** Unix timestamp updated */
  updatedAt: Scalars['BigInt'];
};


export type ProvenanceRecordPriorRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ProvenanceRecord_Filter>;
};

export type ProvenanceRecord_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProvenanceRecord_Filter>>>;
  createdAt: InputMaybe<Scalars['BigInt']>;
  createdAt_gt: InputMaybe<Scalars['BigInt']>;
  createdAt_gte: InputMaybe<Scalars['BigInt']>;
  createdAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt: InputMaybe<Scalars['BigInt']>;
  createdAt_lte: InputMaybe<Scalars['BigInt']>;
  createdAt_not: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
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
  or: InputMaybe<Array<InputMaybe<ProvenanceRecord_Filter>>>;
  originalAmount: InputMaybe<Scalars['BigInt']>;
  originalAmount_gt: InputMaybe<Scalars['BigInt']>;
  originalAmount_gte: InputMaybe<Scalars['BigInt']>;
  originalAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  originalAmount_lt: InputMaybe<Scalars['BigInt']>;
  originalAmount_lte: InputMaybe<Scalars['BigInt']>;
  originalAmount_not: InputMaybe<Scalars['BigInt']>;
  originalAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  priorRecords: InputMaybe<Array<Scalars['String']>>;
  priorRecords_: InputMaybe<ProvenanceRecord_Filter>;
  priorRecords_contains: InputMaybe<Array<Scalars['String']>>;
  priorRecords_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  priorRecords_not: InputMaybe<Array<Scalars['String']>>;
  priorRecords_not_contains: InputMaybe<Array<Scalars['String']>>;
  priorRecords_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  receiver: InputMaybe<Scalars['Bytes']>;
  receiver_contains: InputMaybe<Scalars['Bytes']>;
  receiver_gt: InputMaybe<Scalars['Bytes']>;
  receiver_gte: InputMaybe<Scalars['Bytes']>;
  receiver_in: InputMaybe<Array<Scalars['Bytes']>>;
  receiver_lt: InputMaybe<Scalars['Bytes']>;
  receiver_lte: InputMaybe<Scalars['Bytes']>;
  receiver_not: InputMaybe<Scalars['Bytes']>;
  receiver_not_contains: InputMaybe<Scalars['Bytes']>;
  receiver_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  registrySerialNumbers: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  remainingAmount: InputMaybe<Scalars['BigInt']>;
  remainingAmount_gt: InputMaybe<Scalars['BigInt']>;
  remainingAmount_gte: InputMaybe<Scalars['BigInt']>;
  remainingAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  remainingAmount_lt: InputMaybe<Scalars['BigInt']>;
  remainingAmount_lte: InputMaybe<Scalars['BigInt']>;
  remainingAmount_not: InputMaybe<Scalars['BigInt']>;
  remainingAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  sender: InputMaybe<Scalars['Bytes']>;
  sender_contains: InputMaybe<Scalars['Bytes']>;
  sender_gt: InputMaybe<Scalars['Bytes']>;
  sender_gte: InputMaybe<Scalars['Bytes']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']>>;
  sender_lt: InputMaybe<Scalars['Bytes']>;
  sender_lte: InputMaybe<Scalars['Bytes']>;
  sender_not: InputMaybe<Scalars['Bytes']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  token: InputMaybe<Scalars['Bytes']>;
  tokenId: InputMaybe<Scalars['BigInt']>;
  tokenId_gt: InputMaybe<Scalars['BigInt']>;
  tokenId_gte: InputMaybe<Scalars['BigInt']>;
  tokenId_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt: InputMaybe<Scalars['BigInt']>;
  tokenId_lte: InputMaybe<Scalars['BigInt']>;
  tokenId_not: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains: InputMaybe<Scalars['Bytes']>;
  token_gt: InputMaybe<Scalars['Bytes']>;
  token_gte: InputMaybe<Scalars['Bytes']>;
  token_in: InputMaybe<Array<Scalars['Bytes']>>;
  token_lt: InputMaybe<Scalars['Bytes']>;
  token_lte: InputMaybe<Scalars['Bytes']>;
  token_not: InputMaybe<Scalars['Bytes']>;
  token_not_contains: InputMaybe<Scalars['Bytes']>;
  token_not_in: InputMaybe<Array<Scalars['Bytes']>>;
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
  transactionType: InputMaybe<ProvenanceType>;
  transactionType_in: InputMaybe<Array<ProvenanceType>>;
  transactionType_not: InputMaybe<ProvenanceType>;
  transactionType_not_in: InputMaybe<Array<ProvenanceType>>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ProvenanceRecord_OrderBy {
  createdAt = 'createdAt',
  id = 'id',
  originalAmount = 'originalAmount',
  priorRecords = 'priorRecords',
  receiver = 'receiver',
  registrySerialNumbers = 'registrySerialNumbers',
  remainingAmount = 'remainingAmount',
  sender = 'sender',
  token = 'token',
  tokenId = 'tokenId',
  transactionHash = 'transactionHash',
  transactionType = 'transactionType',
  updatedAt = 'updatedAt'
}

export enum ProvenanceType {
  ORIGINATION = 'ORIGINATION',
  RETIREMENT = 'RETIREMENT',
  TRANSFER = 'TRANSFER'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  account: Maybe<Account>;
  accounts: Array<Account>;
  bridge: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonCredit: Maybe<CarbonCredit>;
  carbonCreditSnapshot: Maybe<CarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<CarbonCreditSnapshot>;
  carbonCredits: Array<CarbonCredit>;
  carbonPool: Maybe<CarbonPool>;
  carbonPoolCreditBalance: Maybe<CarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot: Maybe<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<CarbonPoolCreditBalance>;
  carbonPoolDailySnapshot: Maybe<CarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<CarbonPoolDailySnapshot>;
  carbonPools: Array<CarbonPool>;
  carbonProject: Maybe<CarbonProject>;
  carbonProjects: Array<CarbonProject>;
  crossChainBridge: Maybe<CrossChainBridge>;
  crossChainBridges: Array<CrossChainBridge>;
  ecosystem: Maybe<Ecosystem>;
  ecosystems: Array<Ecosystem>;
  epoch: Maybe<Epoch>;
  epoches: Array<Epoch>;
  holding: Maybe<Holding>;
  holdingDailySnapshot: Maybe<HoldingDailySnapshot>;
  holdingDailySnapshots: Array<HoldingDailySnapshot>;
  holdings: Array<Holding>;
  klimaRetire: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  methodologies: Array<Methodology>;
  methodology: Maybe<Methodology>;
  poolDeposit: Maybe<PoolDeposit>;
  poolDeposits: Array<PoolDeposit>;
  poolRedeem: Maybe<PoolRedeem>;
  poolRedeems: Array<PoolRedeem>;
  provenanceRecord: Maybe<ProvenanceRecord>;
  provenanceRecords: Array<ProvenanceRecord>;
  retire: Maybe<Retire>;
  retires: Array<Retire>;
  token: Maybe<Token>;
  tokens: Array<Token>;
  toucanBatch: Maybe<ToucanBatch>;
  toucanBatches: Array<ToucanBatch>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Account_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Account_Filter>;
};


export type QueryBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Bridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Bridge_Filter>;
};


export type QueryCarbonCreditArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonCreditSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonCreditSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonCreditSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonCreditSnapshot_Filter>;
};


export type QueryCarbonCreditsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonCredit_Filter>;
};


export type QueryCarbonPoolArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type QueryCarbonPoolCreditBalancesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type QueryCarbonPoolDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type QueryCarbonPoolsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPool_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPool_Filter>;
};


export type QueryCarbonProjectArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonProjectsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonProject_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonProject_Filter>;
};


export type QueryCrossChainBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrossChainBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CrossChainBridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CrossChainBridge_Filter>;
};


export type QueryEcosystemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEcosystemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Ecosystem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Ecosystem_Filter>;
};


export type QueryEpochArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEpochesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Epoch_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Epoch_Filter>;
};


export type QueryHoldingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldingDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldingDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type QueryHoldingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Holding_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Holding_Filter>;
};


export type QueryKlimaRetireArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKlimaRetiresArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<KlimaRetire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<KlimaRetire_Filter>;
};


export type QueryMethodologiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Methodology_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Methodology_Filter>;
};


export type QueryMethodologyArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type QueryPoolRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolRedeem_Filter>;
};


export type QueryProvenanceRecordArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProvenanceRecordsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProvenanceRecord_Filter>;
};


export type QueryRetireArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRetiresArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Retire_Filter>;
};


export type QueryTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Token_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Token_Filter>;
};


export type QueryToucanBatchArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryToucanBatchesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ToucanBatch_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ToucanBatch_Filter>;
};

export enum Registry {
  GOLD_STANDARD = 'GOLD_STANDARD',
  ICR = 'ICR',
  PURO_EARTH = 'PURO_EARTH',
  VERRA = 'VERRA'
}

export type Retire = {
  __typename?: 'Retire';
  /** Amount of carbon retired */
  amount: Scalars['BigInt'];
  /** Beneficiary address */
  beneficiaryAddress: Account;
  /** Beneficiary description */
  beneficiaryName: Scalars['String'];
  /** Protocol specific ID */
  bridgeID: Maybe<Scalars['String']>;
  /** Carbon credit being retired */
  credit: CarbonCredit;
  /** Transaction hash of the retirement */
  hash: Scalars['Bytes'];
  /** {Account}-{Total Retirement Counter} */
  id: Scalars['Bytes'];
  klimaRetire: Maybe<KlimaRetire>;
  /** Pool credit was sourced from, if any */
  pool: Maybe<CarbonPool>;
  /** Final provenance record created by this retirement */
  provenance: Maybe<ProvenanceRecord>;
  /** Specific retirement message */
  retirementMessage: Scalars['String'];
  /** Retiree address */
  retiringAddress: Account;
  /** Retiree description */
  retiringName: Scalars['String'];
  /** Source of the retirement */
  source: RetireSource;
  /** Block timestamp of retirement */
  timestamp: Scalars['BigInt'];
};

export enum RetireSource {
  KLIMA = 'KLIMA',
  OTHER = 'OTHER'
}

export type Retire_Filter = {
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
  and: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  beneficiaryAddress: InputMaybe<Scalars['String']>;
  beneficiaryAddress_: InputMaybe<Account_Filter>;
  beneficiaryAddress_contains: InputMaybe<Scalars['String']>;
  beneficiaryAddress_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiaryAddress_ends_with: InputMaybe<Scalars['String']>;
  beneficiaryAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryAddress_gt: InputMaybe<Scalars['String']>;
  beneficiaryAddress_gte: InputMaybe<Scalars['String']>;
  beneficiaryAddress_in: InputMaybe<Array<Scalars['String']>>;
  beneficiaryAddress_lt: InputMaybe<Scalars['String']>;
  beneficiaryAddress_lte: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_contains: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_ends_with: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  beneficiaryAddress_not_starts_with: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryAddress_starts_with: InputMaybe<Scalars['String']>;
  beneficiaryAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName: InputMaybe<Scalars['String']>;
  beneficiaryName_contains: InputMaybe<Scalars['String']>;
  beneficiaryName_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName_ends_with: InputMaybe<Scalars['String']>;
  beneficiaryName_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName_gt: InputMaybe<Scalars['String']>;
  beneficiaryName_gte: InputMaybe<Scalars['String']>;
  beneficiaryName_in: InputMaybe<Array<Scalars['String']>>;
  beneficiaryName_lt: InputMaybe<Scalars['String']>;
  beneficiaryName_lte: InputMaybe<Scalars['String']>;
  beneficiaryName_not: InputMaybe<Scalars['String']>;
  beneficiaryName_not_contains: InputMaybe<Scalars['String']>;
  beneficiaryName_not_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName_not_ends_with: InputMaybe<Scalars['String']>;
  beneficiaryName_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName_not_in: InputMaybe<Array<Scalars['String']>>;
  beneficiaryName_not_starts_with: InputMaybe<Scalars['String']>;
  beneficiaryName_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  beneficiaryName_starts_with: InputMaybe<Scalars['String']>;
  beneficiaryName_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridgeID: InputMaybe<Scalars['String']>;
  bridgeID_contains: InputMaybe<Scalars['String']>;
  bridgeID_contains_nocase: InputMaybe<Scalars['String']>;
  bridgeID_ends_with: InputMaybe<Scalars['String']>;
  bridgeID_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridgeID_gt: InputMaybe<Scalars['String']>;
  bridgeID_gte: InputMaybe<Scalars['String']>;
  bridgeID_in: InputMaybe<Array<Scalars['String']>>;
  bridgeID_lt: InputMaybe<Scalars['String']>;
  bridgeID_lte: InputMaybe<Scalars['String']>;
  bridgeID_not: InputMaybe<Scalars['String']>;
  bridgeID_not_contains: InputMaybe<Scalars['String']>;
  bridgeID_not_contains_nocase: InputMaybe<Scalars['String']>;
  bridgeID_not_ends_with: InputMaybe<Scalars['String']>;
  bridgeID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridgeID_not_in: InputMaybe<Array<Scalars['String']>>;
  bridgeID_not_starts_with: InputMaybe<Scalars['String']>;
  bridgeID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridgeID_starts_with: InputMaybe<Scalars['String']>;
  bridgeID_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<CarbonCredit_Filter>;
  credit_contains: InputMaybe<Scalars['String']>;
  credit_contains_nocase: InputMaybe<Scalars['String']>;
  credit_ends_with: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_gt: InputMaybe<Scalars['String']>;
  credit_gte: InputMaybe<Scalars['String']>;
  credit_in: InputMaybe<Array<Scalars['String']>>;
  credit_lt: InputMaybe<Scalars['String']>;
  credit_lte: InputMaybe<Scalars['String']>;
  credit_not: InputMaybe<Scalars['String']>;
  credit_not_contains: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase: InputMaybe<Scalars['String']>;
  credit_not_ends_with: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  credit_not_in: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  credit_starts_with: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase: InputMaybe<Scalars['String']>;
  hash: InputMaybe<Scalars['Bytes']>;
  hash_contains: InputMaybe<Scalars['Bytes']>;
  hash_gt: InputMaybe<Scalars['Bytes']>;
  hash_gte: InputMaybe<Scalars['Bytes']>;
  hash_in: InputMaybe<Array<Scalars['Bytes']>>;
  hash_lt: InputMaybe<Scalars['Bytes']>;
  hash_lte: InputMaybe<Scalars['Bytes']>;
  hash_not: InputMaybe<Scalars['Bytes']>;
  hash_not_contains: InputMaybe<Scalars['Bytes']>;
  hash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
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
  klimaRetire_: InputMaybe<KlimaRetire_Filter>;
  or: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<CarbonPool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  provenance: InputMaybe<Scalars['String']>;
  provenance_: InputMaybe<ProvenanceRecord_Filter>;
  provenance_contains: InputMaybe<Scalars['String']>;
  provenance_contains_nocase: InputMaybe<Scalars['String']>;
  provenance_ends_with: InputMaybe<Scalars['String']>;
  provenance_ends_with_nocase: InputMaybe<Scalars['String']>;
  provenance_gt: InputMaybe<Scalars['String']>;
  provenance_gte: InputMaybe<Scalars['String']>;
  provenance_in: InputMaybe<Array<Scalars['String']>>;
  provenance_lt: InputMaybe<Scalars['String']>;
  provenance_lte: InputMaybe<Scalars['String']>;
  provenance_not: InputMaybe<Scalars['String']>;
  provenance_not_contains: InputMaybe<Scalars['String']>;
  provenance_not_contains_nocase: InputMaybe<Scalars['String']>;
  provenance_not_ends_with: InputMaybe<Scalars['String']>;
  provenance_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  provenance_not_in: InputMaybe<Array<Scalars['String']>>;
  provenance_not_starts_with: InputMaybe<Scalars['String']>;
  provenance_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  provenance_starts_with: InputMaybe<Scalars['String']>;
  provenance_starts_with_nocase: InputMaybe<Scalars['String']>;
  retirementMessage: InputMaybe<Scalars['String']>;
  retirementMessage_contains: InputMaybe<Scalars['String']>;
  retirementMessage_contains_nocase: InputMaybe<Scalars['String']>;
  retirementMessage_ends_with: InputMaybe<Scalars['String']>;
  retirementMessage_ends_with_nocase: InputMaybe<Scalars['String']>;
  retirementMessage_gt: InputMaybe<Scalars['String']>;
  retirementMessage_gte: InputMaybe<Scalars['String']>;
  retirementMessage_in: InputMaybe<Array<Scalars['String']>>;
  retirementMessage_lt: InputMaybe<Scalars['String']>;
  retirementMessage_lte: InputMaybe<Scalars['String']>;
  retirementMessage_not: InputMaybe<Scalars['String']>;
  retirementMessage_not_contains: InputMaybe<Scalars['String']>;
  retirementMessage_not_contains_nocase: InputMaybe<Scalars['String']>;
  retirementMessage_not_ends_with: InputMaybe<Scalars['String']>;
  retirementMessage_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  retirementMessage_not_in: InputMaybe<Array<Scalars['String']>>;
  retirementMessage_not_starts_with: InputMaybe<Scalars['String']>;
  retirementMessage_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  retirementMessage_starts_with: InputMaybe<Scalars['String']>;
  retirementMessage_starts_with_nocase: InputMaybe<Scalars['String']>;
  retiringAddress: InputMaybe<Scalars['String']>;
  retiringAddress_: InputMaybe<Account_Filter>;
  retiringAddress_contains: InputMaybe<Scalars['String']>;
  retiringAddress_contains_nocase: InputMaybe<Scalars['String']>;
  retiringAddress_ends_with: InputMaybe<Scalars['String']>;
  retiringAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiringAddress_gt: InputMaybe<Scalars['String']>;
  retiringAddress_gte: InputMaybe<Scalars['String']>;
  retiringAddress_in: InputMaybe<Array<Scalars['String']>>;
  retiringAddress_lt: InputMaybe<Scalars['String']>;
  retiringAddress_lte: InputMaybe<Scalars['String']>;
  retiringAddress_not: InputMaybe<Scalars['String']>;
  retiringAddress_not_contains: InputMaybe<Scalars['String']>;
  retiringAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  retiringAddress_not_ends_with: InputMaybe<Scalars['String']>;
  retiringAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiringAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  retiringAddress_not_starts_with: InputMaybe<Scalars['String']>;
  retiringAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  retiringAddress_starts_with: InputMaybe<Scalars['String']>;
  retiringAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
  retiringName: InputMaybe<Scalars['String']>;
  retiringName_contains: InputMaybe<Scalars['String']>;
  retiringName_contains_nocase: InputMaybe<Scalars['String']>;
  retiringName_ends_with: InputMaybe<Scalars['String']>;
  retiringName_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiringName_gt: InputMaybe<Scalars['String']>;
  retiringName_gte: InputMaybe<Scalars['String']>;
  retiringName_in: InputMaybe<Array<Scalars['String']>>;
  retiringName_lt: InputMaybe<Scalars['String']>;
  retiringName_lte: InputMaybe<Scalars['String']>;
  retiringName_not: InputMaybe<Scalars['String']>;
  retiringName_not_contains: InputMaybe<Scalars['String']>;
  retiringName_not_contains_nocase: InputMaybe<Scalars['String']>;
  retiringName_not_ends_with: InputMaybe<Scalars['String']>;
  retiringName_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  retiringName_not_in: InputMaybe<Array<Scalars['String']>>;
  retiringName_not_starts_with: InputMaybe<Scalars['String']>;
  retiringName_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  retiringName_starts_with: InputMaybe<Scalars['String']>;
  retiringName_starts_with_nocase: InputMaybe<Scalars['String']>;
  source: InputMaybe<RetireSource>;
  source_in: InputMaybe<Array<RetireSource>>;
  source_not: InputMaybe<RetireSource>;
  source_not_in: InputMaybe<Array<RetireSource>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Retire_OrderBy {
  amount = 'amount',
  beneficiaryAddress = 'beneficiaryAddress',
  beneficiaryAddress__id = 'beneficiaryAddress__id',
  beneficiaryAddress__totalRetirements = 'beneficiaryAddress__totalRetirements',
  beneficiaryName = 'beneficiaryName',
  bridgeID = 'bridgeID',
  credit = 'credit',
  credit__bridgeProtocol = 'credit__bridgeProtocol',
  credit__bridged = 'credit__bridged',
  credit__crossChainSupply = 'credit__crossChainSupply',
  credit__currentSupply = 'credit__currentSupply',
  credit__exPostTokenId = 'credit__exPostTokenId',
  credit__id = 'credit__id',
  credit__isExAnte = 'credit__isExAnte',
  credit__lastBatchId = 'credit__lastBatchId',
  credit__provenanceCount = 'credit__provenanceCount',
  credit__retired = 'credit__retired',
  credit__tokenAddress = 'credit__tokenAddress',
  credit__tokenId = 'credit__tokenId',
  credit__vintage = 'credit__vintage',
  hash = 'hash',
  id = 'id',
  klimaRetire = 'klimaRetire',
  klimaRetire__feeAmount = 'klimaRetire__feeAmount',
  klimaRetire__id = 'klimaRetire__id',
  klimaRetire__index = 'klimaRetire__index',
  klimaRetire__specific = 'klimaRetire__specific',
  pool = 'pool',
  pool__crossChainSupply = 'pool__crossChainSupply',
  pool__decimals = 'pool__decimals',
  pool__id = 'pool__id',
  pool__lastSnapshotDayID = 'pool__lastSnapshotDayID',
  pool__name = 'pool__name',
  pool__nextSnapshotDayID = 'pool__nextSnapshotDayID',
  pool__supply = 'pool__supply',
  provenance = 'provenance',
  provenance__createdAt = 'provenance__createdAt',
  provenance__id = 'provenance__id',
  provenance__originalAmount = 'provenance__originalAmount',
  provenance__receiver = 'provenance__receiver',
  provenance__remainingAmount = 'provenance__remainingAmount',
  provenance__sender = 'provenance__sender',
  provenance__token = 'provenance__token',
  provenance__tokenId = 'provenance__tokenId',
  provenance__transactionHash = 'provenance__transactionHash',
  provenance__transactionType = 'provenance__transactionType',
  provenance__updatedAt = 'provenance__updatedAt',
  retirementMessage = 'retirementMessage',
  retiringAddress = 'retiringAddress',
  retiringAddress__id = 'retiringAddress__id',
  retiringAddress__totalRetirements = 'retiringAddress__totalRetirements',
  retiringName = 'retiringName',
  source = 'source',
  timestamp = 'timestamp'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  account: Maybe<Account>;
  accounts: Array<Account>;
  bridge: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonCredit: Maybe<CarbonCredit>;
  carbonCreditSnapshot: Maybe<CarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<CarbonCreditSnapshot>;
  carbonCredits: Array<CarbonCredit>;
  carbonPool: Maybe<CarbonPool>;
  carbonPoolCreditBalance: Maybe<CarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot: Maybe<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<CarbonPoolCreditBalance>;
  carbonPoolDailySnapshot: Maybe<CarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<CarbonPoolDailySnapshot>;
  carbonPools: Array<CarbonPool>;
  carbonProject: Maybe<CarbonProject>;
  carbonProjects: Array<CarbonProject>;
  crossChainBridge: Maybe<CrossChainBridge>;
  crossChainBridges: Array<CrossChainBridge>;
  ecosystem: Maybe<Ecosystem>;
  ecosystems: Array<Ecosystem>;
  epoch: Maybe<Epoch>;
  epoches: Array<Epoch>;
  holding: Maybe<Holding>;
  holdingDailySnapshot: Maybe<HoldingDailySnapshot>;
  holdingDailySnapshots: Array<HoldingDailySnapshot>;
  holdings: Array<Holding>;
  klimaRetire: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  methodologies: Array<Methodology>;
  methodology: Maybe<Methodology>;
  poolDeposit: Maybe<PoolDeposit>;
  poolDeposits: Array<PoolDeposit>;
  poolRedeem: Maybe<PoolRedeem>;
  poolRedeems: Array<PoolRedeem>;
  provenanceRecord: Maybe<ProvenanceRecord>;
  provenanceRecords: Array<ProvenanceRecord>;
  retire: Maybe<Retire>;
  retires: Array<Retire>;
  token: Maybe<Token>;
  tokens: Array<Token>;
  toucanBatch: Maybe<ToucanBatch>;
  toucanBatches: Array<ToucanBatch>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Account_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Account_Filter>;
};


export type SubscriptionBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Bridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Bridge_Filter>;
};


export type SubscriptionCarbonCreditArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonCreditSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonCreditSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonCreditSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonCreditSnapshot_Filter>;
};


export type SubscriptionCarbonCreditsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonCredit_Filter>;
};


export type SubscriptionCarbonPoolArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type SubscriptionCarbonPoolCreditBalancesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type SubscriptionCarbonPoolDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type SubscriptionCarbonPoolsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonPool_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonPool_Filter>;
};


export type SubscriptionCarbonProjectArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonProjectsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonProject_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonProject_Filter>;
};


export type SubscriptionCrossChainBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrossChainBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CrossChainBridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CrossChainBridge_Filter>;
};


export type SubscriptionEcosystemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEcosystemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Ecosystem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Ecosystem_Filter>;
};


export type SubscriptionEpochArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEpochesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Epoch_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Epoch_Filter>;
};


export type SubscriptionHoldingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldingDailySnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldingDailySnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type SubscriptionHoldingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Holding_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Holding_Filter>;
};


export type SubscriptionKlimaRetireArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKlimaRetiresArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<KlimaRetire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<KlimaRetire_Filter>;
};


export type SubscriptionMethodologiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Methodology_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Methodology_Filter>;
};


export type SubscriptionMethodologyArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolDeposit_Filter>;
};


export type SubscriptionPoolRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolRedeem_Filter>;
};


export type SubscriptionProvenanceRecordArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProvenanceRecordsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProvenanceRecord_Filter>;
};


export type SubscriptionRetireArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRetiresArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Retire_Filter>;
};


export type SubscriptionTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Token_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Token_Filter>;
};


export type SubscriptionToucanBatchArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionToucanBatchesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ToucanBatch_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ToucanBatch_Filter>;
};

export type Token = {
  __typename?: 'Token';
  /** Decimals of the token */
  decimals: Scalars['Int'];
  /** Ethereum contract address */
  id: Scalars['Bytes'];
  /** Latest price in KLIMA */
  latestPricePerKLIMA: Maybe<Scalars['BigDecimal']>;
  /** Latest price in KLIMAupdate timestamp */
  latestPricePerKLIMAUpdated: Maybe<Scalars['BigInt']>;
  /** Latest price in USD */
  latestPriceUSD: Maybe<Scalars['BigDecimal']>;
  /** Latest price update timestamp */
  latestPriceUSDUpdated: Maybe<Scalars['BigInt']>;
  /** Name of the token */
  name: Scalars['String'];
  /** Symbol of the token */
  symbol: Scalars['String'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals: InputMaybe<Scalars['Int']>;
  decimals_gt: InputMaybe<Scalars['Int']>;
  decimals_gte: InputMaybe<Scalars['Int']>;
  decimals_in: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt: InputMaybe<Scalars['Int']>;
  decimals_lte: InputMaybe<Scalars['Int']>;
  decimals_not: InputMaybe<Scalars['Int']>;
  decimals_not_in: InputMaybe<Array<Scalars['Int']>>;
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
  latestPricePerKLIMA: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMAUpdated: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_gt: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_gte: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestPricePerKLIMAUpdated_lt: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_lte: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_not: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestPricePerKLIMA_gt: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_gte: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPricePerKLIMA_lt: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_lte: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_not: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPriceUSD: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSDUpdated: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_gt: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_gte: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestPriceUSDUpdated_lt: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_lte: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_not: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestPriceUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPriceUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_not: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  or: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol: InputMaybe<Scalars['String']>;
  symbol_contains: InputMaybe<Scalars['String']>;
  symbol_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_ends_with: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_gt: InputMaybe<Scalars['String']>;
  symbol_gte: InputMaybe<Scalars['String']>;
  symbol_in: InputMaybe<Array<Scalars['String']>>;
  symbol_lt: InputMaybe<Scalars['String']>;
  symbol_lte: InputMaybe<Scalars['String']>;
  symbol_not: InputMaybe<Scalars['String']>;
  symbol_not_contains: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_not_ends_with: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_not_in: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  symbol_starts_with: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  decimals = 'decimals',
  id = 'id',
  latestPricePerKLIMA = 'latestPricePerKLIMA',
  latestPricePerKLIMAUpdated = 'latestPricePerKLIMAUpdated',
  latestPriceUSD = 'latestPriceUSD',
  latestPriceUSDUpdated = 'latestPriceUSDUpdated',
  name = 'name',
  symbol = 'symbol'
}

export type ToucanBatch = {
  __typename?: 'ToucanBatch';
  /** Creation Transaction hash */
  creationTransactionHash: Scalars['Bytes'];
  /** Token ID */
  id: Scalars['ID'];
  /** Registry serial numbers associated with this batch */
  registrySerialNumbers: Array<Scalars['String']>;
};

export type ToucanBatch_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ToucanBatch_Filter>>>;
  creationTransactionHash: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_contains: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_gt: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_gte: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  creationTransactionHash_lt: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_lte: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_not: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_not_contains: InputMaybe<Scalars['Bytes']>;
  creationTransactionHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<ToucanBatch_Filter>>>;
  registrySerialNumbers: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
};

export enum ToucanBatch_OrderBy {
  creationTransactionHash = 'creationTransactionHash',
  id = 'id',
  registrySerialNumbers = 'registrySerialNumbers'
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

export type ProvenanceRecordFragmentFragment = { __typename?: 'ProvenanceRecord', id: any, transactionType: ProvenanceType, registrySerialNumbers: Array<string>, token: any, tokenId: string | null, sender: any, receiver: any, originalAmount: string, remainingAmount: string, createdAt: string, updatedAt: string, transactionHash: any };

export type RetireFragmentFragment = { __typename?: 'Retire', id: any, bridgeID: string | null, hash: any, amount: string, beneficiaryName: string, retirementMessage: string, retiringName: string, timestamp: string, pool: { __typename?: 'CarbonPool', id: any } | null, beneficiaryAddress: { __typename?: 'Account', id: any }, retiringAddress: { __typename?: 'Account', id: any } };

export type DigitalCarbonProjectFragmentFragment = { __typename?: 'CarbonProject', id: string, name: string, projectID: string, methodologies: string, country: string, category: string, registry: Registry, region: string };

export type CarbonCreditFragmentFragment = { __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, project: { __typename?: 'CarbonProject', id: string } };

export type PoolBalancesFragmentFragment = { __typename?: 'CarbonPoolCreditBalance', balance: string, id: any, deposited: string, redeemed: string, pool: { __typename?: 'CarbonPool', name: string, supply: string, id: any, decimals: number, dailySnapshots: Array<{ __typename?: 'CarbonPoolDailySnapshot', lastUpdateTimestamp: string }> } };

export type PoolFragmentFragment = { __typename?: 'CarbonPool', name: string, supply: string, id: any, decimals: number, dailySnapshots: Array<{ __typename?: 'CarbonPoolDailySnapshot', lastUpdateTimestamp: string }> };

export type GetDigitalCarbonProjectsVintagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDigitalCarbonProjectsVintagesQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', carbonCredits: Array<{ __typename?: 'CarbonCredit', vintage: number }> }> };

export type GetTokenByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokenByIdQuery = { __typename?: 'Query', token: { __typename?: 'Token', symbol: string } | null };

export type GetDigitalCarbonProjectsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDigitalCarbonProjectsCategoriesQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', category: string }> };

export type GetDigitalCarbonProjectsCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDigitalCarbonProjectsCountriesQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', country: string }> };

export type GetProjectCreditsQueryVariables = Exact<{
  projectID: Scalars['String'];
  vintage: InputMaybe<Scalars['Int']>;
}>;


export type GetProjectCreditsQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', id: string, name: string, projectID: string, methodologies: string, country: string, category: string, registry: Registry, region: string, carbonCredits: Array<{ __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, poolBalances: Array<{ __typename?: 'CarbonPoolCreditBalance', balance: string, id: any, deposited: string, redeemed: string, pool: { __typename?: 'CarbonPool', name: string, supply: string, id: any, decimals: number, dailySnapshots: Array<{ __typename?: 'CarbonPoolDailySnapshot', lastUpdateTimestamp: string }> } }>, project: { __typename?: 'CarbonProject', id: string } }> }> };

export type FindDigitalCarbonProjectsQueryVariables = Exact<{
  country: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  category: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  search: InputMaybe<Scalars['String']>;
  vintage: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type FindDigitalCarbonProjectsQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', id: string, name: string, projectID: string, methodologies: string, country: string, category: string, registry: Registry, region: string, carbonCredits: Array<{ __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, poolBalances: Array<{ __typename?: 'CarbonPoolCreditBalance', balance: string, id: any, deposited: string, redeemed: string, pool: { __typename?: 'CarbonPool', name: string, supply: string, id: any, decimals: number, dailySnapshots: Array<{ __typename?: 'CarbonPoolDailySnapshot', lastUpdateTimestamp: string }> } }>, project: { __typename?: 'CarbonProject', id: string } }> }> };

export type GetRetirementByHashQueryVariables = Exact<{
  hash: Scalars['Bytes'];
}>;


export type GetRetirementByHashQuery = { __typename?: 'Query', retires: Array<{ __typename?: 'Retire', id: any, bridgeID: string | null, hash: any, amount: string, beneficiaryName: string, retirementMessage: string, retiringName: string, timestamp: string, credit: { __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, project: { __typename?: 'CarbonProject', id: string } }, pool: { __typename?: 'CarbonPool', id: any } | null, beneficiaryAddress: { __typename?: 'Account', id: any }, retiringAddress: { __typename?: 'Account', id: any } }> };

export type AllRetirementsQueryVariables = Exact<{
  account_id: InputMaybe<Scalars['String']>;
}>;


export type AllRetirementsQuery = { __typename?: 'Query', retires: Array<{ __typename?: 'Retire', id: any, bridgeID: string | null, hash: any, amount: string, beneficiaryName: string, retirementMessage: string, retiringName: string, timestamp: string, credit: { __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, project: { __typename?: 'CarbonProject', id: string } }, pool: { __typename?: 'CarbonPool', id: any } | null, beneficiaryAddress: { __typename?: 'Account', id: any }, retiringAddress: { __typename?: 'Account', id: any } }> };

export type GetProvenanceRecordsByHashQueryVariables = Exact<{
  hash: Scalars['Bytes'];
}>;


export type GetProvenanceRecordsByHashQuery = { __typename?: 'Query', retires: Array<{ __typename?: 'Retire', credit: { __typename?: 'CarbonCredit', project: { __typename?: 'CarbonProject', id: string, registry: Registry } }, provenance: { __typename?: 'ProvenanceRecord', id: any, transactionType: ProvenanceType, registrySerialNumbers: Array<string>, token: any, tokenId: string | null, sender: any, receiver: any, originalAmount: string, remainingAmount: string, createdAt: string, updatedAt: string, transactionHash: any, priorRecords: Array<{ __typename?: 'ProvenanceRecord', id: any, transactionType: ProvenanceType, registrySerialNumbers: Array<string>, token: any, tokenId: string | null, sender: any, receiver: any, originalAmount: string, remainingAmount: string, createdAt: string, updatedAt: string, transactionHash: any }> } | null }> };

export const ProvenanceRecordFragmentFragmentDoc = gql`
    fragment ProvenanceRecordFragment on ProvenanceRecord {
  id
  transactionType
  registrySerialNumbers
  token
  tokenId
  sender
  receiver
  originalAmount
  remainingAmount
  createdAt
  updatedAt
  transactionHash
}
    `;
export const RetireFragmentFragmentDoc = gql`
    fragment RetireFragment on Retire {
  id
  bridgeID
  hash
  amount
  pool {
    id
  }
  beneficiaryAddress {
    id
  }
  beneficiaryName
  retirementMessage
  retiringAddress {
    id
  }
  retiringName
  timestamp
}
    `;
export const DigitalCarbonProjectFragmentFragmentDoc = gql`
    fragment DigitalCarbonProjectFragment on CarbonProject {
  id
  name
  projectID
  methodologies
  country
  category
  registry
  region
}
    `;
export const CarbonCreditFragmentFragmentDoc = gql`
    fragment CarbonCreditFragment on CarbonCredit {
  vintage
  currentSupply
  id
  crossChainSupply
  bridgeProtocol
  bridged
  retired
  project {
    id
  }
}
    `;
export const PoolBalancesFragmentFragmentDoc = gql`
    fragment PoolBalancesFragment on CarbonPoolCreditBalance {
  balance
  id
  deposited
  redeemed
  pool {
    name
    supply
    id
    decimals
    dailySnapshots {
      lastUpdateTimestamp
    }
  }
}
    `;
export const PoolFragmentFragmentDoc = gql`
    fragment PoolFragment on CarbonPool {
  name
  supply
  id
  decimals
  dailySnapshots {
    lastUpdateTimestamp
  }
}
    `;
export const GetDigitalCarbonProjectsVintagesDocument = gql`
    query getDigitalCarbonProjectsVintages {
  carbonProjects(first: 1000) {
    carbonCredits(
      where: {currentSupply_not: "0", isExAnte: false, poolBalances_: {balance_gte: "0"}}
    ) {
      vintage
    }
  }
}
    `;
export const GetTokenByIdDocument = gql`
    query getTokenById($id: ID!) {
  token(id: $id) {
    symbol
  }
}
    `;
export const GetDigitalCarbonProjectsCategoriesDocument = gql`
    query getDigitalCarbonProjectsCategories {
  carbonProjects(first: 1000) {
    category
  }
}
    `;
export const GetDigitalCarbonProjectsCountriesDocument = gql`
    query getDigitalCarbonProjectsCountries {
  carbonProjects(first: 1000) {
    country
  }
}
    `;
export const GetProjectCreditsDocument = gql`
    query getProjectCredits($projectID: String!, $vintage: Int) {
  carbonProjects(where: {projectID: $projectID}) {
    ...DigitalCarbonProjectFragment
    carbonCredits(where: {vintage: $vintage}) {
      ...CarbonCreditFragment
      poolBalances {
        ...PoolBalancesFragment
      }
    }
  }
}
    ${DigitalCarbonProjectFragmentFragmentDoc}
${CarbonCreditFragmentFragmentDoc}
${PoolBalancesFragmentFragmentDoc}`;
export const FindDigitalCarbonProjectsDocument = gql`
    query findDigitalCarbonProjects($country: [String!], $category: [String!], $search: String, $vintage: [Int!]) {
  carbonProjects(
    first: 1000
    where: {and: [{category_in: $category}, {country_in: $country}, {or: [{name_contains_nocase: $search}, {projectID_contains_nocase: $search}]}]}
  ) {
    ...DigitalCarbonProjectFragment
    carbonCredits(where: {vintage_in: $vintage}) {
      ...CarbonCreditFragment
      poolBalances {
        ...PoolBalancesFragment
        pool {
          ...PoolFragment
        }
      }
    }
  }
}
    ${DigitalCarbonProjectFragmentFragmentDoc}
${CarbonCreditFragmentFragmentDoc}
${PoolBalancesFragmentFragmentDoc}
${PoolFragmentFragmentDoc}`;
export const GetRetirementByHashDocument = gql`
    query getRetirementByHash($hash: Bytes!) {
  retires(where: {hash: $hash}) {
    ...RetireFragment
    credit {
      ...CarbonCreditFragment
    }
  }
}
    ${RetireFragmentFragmentDoc}
${CarbonCreditFragmentFragmentDoc}`;
export const AllRetirementsDocument = gql`
    query allRetirements($account_id: String) {
  retires {
    ...RetireFragment
    credit {
      ...CarbonCreditFragment
    }
  }
}
    ${RetireFragmentFragmentDoc}
${CarbonCreditFragmentFragmentDoc}`;
export const GetProvenanceRecordsByHashDocument = gql`
    query getProvenanceRecordsByHash($hash: Bytes!) {
  retires(where: {provenance_: {transactionHash: $hash}}) {
    credit {
      project {
        id
        registry
      }
    }
    provenance {
      ...ProvenanceRecordFragment
      priorRecords(orderBy: createdAt, orderDirection: desc) {
        ...ProvenanceRecordFragment
      }
    }
  }
}
    ${ProvenanceRecordFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getDigitalCarbonProjectsVintages(variables?: GetDigitalCarbonProjectsVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDigitalCarbonProjectsVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDigitalCarbonProjectsVintagesQuery>(GetDigitalCarbonProjectsVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDigitalCarbonProjectsVintages', 'query');
    },
    getTokenById(variables: GetTokenByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTokenByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTokenByIdQuery>(GetTokenByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTokenById', 'query');
    },
    getDigitalCarbonProjectsCategories(variables?: GetDigitalCarbonProjectsCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDigitalCarbonProjectsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDigitalCarbonProjectsCategoriesQuery>(GetDigitalCarbonProjectsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDigitalCarbonProjectsCategories', 'query');
    },
    getDigitalCarbonProjectsCountries(variables?: GetDigitalCarbonProjectsCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDigitalCarbonProjectsCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDigitalCarbonProjectsCountriesQuery>(GetDigitalCarbonProjectsCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDigitalCarbonProjectsCountries', 'query');
    },
    getProjectCredits(variables: GetProjectCreditsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectCreditsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectCreditsQuery>(GetProjectCreditsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectCredits', 'query');
    },
    findDigitalCarbonProjects(variables?: FindDigitalCarbonProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindDigitalCarbonProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindDigitalCarbonProjectsQuery>(FindDigitalCarbonProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findDigitalCarbonProjects', 'query');
    },
    getRetirementByHash(variables: GetRetirementByHashQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRetirementByHashQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRetirementByHashQuery>(GetRetirementByHashDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRetirementByHash', 'query');
    },
    allRetirements(variables?: AllRetirementsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllRetirementsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllRetirementsQuery>(AllRetirementsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allRetirements', 'query');
    },
    getProvenanceRecordsByHash(variables: GetProvenanceRecordsByHashQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProvenanceRecordsByHashQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProvenanceRecordsByHashQuery>(GetProvenanceRecordsByHashDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProvenanceRecordsByHash', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;