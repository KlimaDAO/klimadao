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

export type DigitalcarbonAccount = {
  __typename?: 'Account';
  bridges: Array<DigitalcarbonBridge>;
  holdingSnapshots: Array<DigitalcarbonHoldingDailySnapshot>;
  holdings: Array<DigitalcarbonHolding>;
  /** Ethereum address of the account */
  id: Scalars['Bytes'];
  poolDeposits: Array<DigitalcarbonPoolDeposit>;
  poolRedeems: Array<DigitalcarbonPoolRedeem>;
  retiresBeneficiary: Array<DigitalcarbonRetire>;
  retiresInitiator: Array<DigitalcarbonRetire>;
  totalRetirements: Scalars['Int'];
};


export type DigitalcarbonAccountBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonBridge_Filter>;
};


export type DigitalcarbonAccountHoldingSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>;
};


export type DigitalcarbonAccountHoldingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHolding_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonHolding_Filter>;
};


export type DigitalcarbonAccountPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonAccountPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};


export type DigitalcarbonAccountRetiresBeneficiaryArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonRetire_Filter>;
};


export type DigitalcarbonAccountRetiresInitiatorArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonRetire_Filter>;
};

export type DigitalcarbonAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonAccount_Filter>>>;
  bridges_: InputMaybe<DigitalcarbonBridge_Filter>;
  holdingSnapshots_: InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>;
  holdings_: InputMaybe<DigitalcarbonHolding_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonAccount_Filter>>>;
  poolDeposits_: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
  poolRedeems_: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
  retiresBeneficiary_: InputMaybe<DigitalcarbonRetire_Filter>;
  retiresInitiator_: InputMaybe<DigitalcarbonRetire_Filter>;
  totalRetirements: InputMaybe<Scalars['Int']>;
  totalRetirements_gt: InputMaybe<Scalars['Int']>;
  totalRetirements_gte: InputMaybe<Scalars['Int']>;
  totalRetirements_in: InputMaybe<Array<Scalars['Int']>>;
  totalRetirements_lt: InputMaybe<Scalars['Int']>;
  totalRetirements_lte: InputMaybe<Scalars['Int']>;
  totalRetirements_not: InputMaybe<Scalars['Int']>;
  totalRetirements_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum DigitalcarbonAccount_OrderBy {
  Bridges = 'bridges',
  HoldingSnapshots = 'holdingSnapshots',
  Holdings = 'holdings',
  Id = 'id',
  PoolDeposits = 'poolDeposits',
  PoolRedeems = 'poolRedeems',
  RetiresBeneficiary = 'retiresBeneficiary',
  RetiresInitiator = 'retiresInitiator',
  TotalRetirements = 'totalRetirements'
}

export type DigitalcarbonBlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type DigitalcarbonBlock_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type DigitalcarbonBridge = {
  __typename?: 'Bridge';
  /** Account receiving the bridged carbon */
  account: DigitalcarbonAccount;
  /** Amount of tokens bridged in native units */
  amount: Scalars['BigInt'];
  /** Credit bridged */
  credit: DigitalcarbonCarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Block timestamp of the bridge */
  timestamp: Scalars['BigInt'];
};

export enum DigitalcarbonBridgeProtocol {
  C3 = 'C3',
  Moss = 'MOSS',
  Thallo = 'THALLO',
  Toucan = 'TOUCAN'
}

export type DigitalcarbonBridge_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  and: InputMaybe<Array<InputMaybe<DigitalcarbonBridge_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonBridge_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonBridge_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  Amount = 'amount',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type DigitalcarbonCarbonCredit = {
  __typename?: 'CarbonCredit';
  /** Protocol used to bridge the tons */
  bridgeProtocol: DigitalcarbonBridgeProtocol;
  /** Total tokens issued via bridging */
  bridged: Scalars['BigInt'];
  /** All bridge events for this credit */
  bridges: Array<DigitalcarbonBridge>;
  /** Total tokens bridged to other chains */
  crossChainSupply: Scalars['BigInt'];
  /** Current token supply */
  currentSupply: Scalars['BigInt'];
  /** Ethereum address where the token is deployed */
  id: Scalars['Bytes'];
  /** Last batch ID that was fractionalized if applicable */
  lastBatchId: Scalars['BigInt'];
  /** Current pool balances for this credit */
  poolBalances: Array<DigitalcarbonCarbonPoolCreditBalance>;
  /** Carbon Project this token belongs to */
  project: DigitalcarbonCarbonProject;
  /** Total provenance records for this credit */
  provenanceCount: Scalars['Int'];
  /** Total tokens retired */
  retired: Scalars['BigInt'];
  /** All retirement events for this credit */
  retires: Array<DigitalcarbonRetire>;
  /** Vintage of issuance */
  vintage: Scalars['Int'];
};


export type DigitalcarbonCarbonCreditBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonBridge_Filter>;
};


export type DigitalcarbonCarbonCreditPoolBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
};


export type DigitalcarbonCarbonCreditRetiresArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonRetire_Filter>;
};

export type DigitalcarbonCarbonCreditSnapshot = {
  __typename?: 'CarbonCreditSnapshot';
  /** Total tokens issued via bridging */
  bridged: Scalars['BigInt'];
  /** Timestamp created */
  createdAt: Scalars['BigInt'];
  /** Credit for this snapshot */
  credit: DigitalcarbonCarbonCredit;
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

export type DigitalcarbonCarbonCreditSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonCreditSnapshot_Filter>>>;
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
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonCreditSnapshot_Filter>>>;
  retired: InputMaybe<Scalars['BigInt']>;
  retired_gt: InputMaybe<Scalars['BigInt']>;
  retired_gte: InputMaybe<Scalars['BigInt']>;
  retired_in: InputMaybe<Array<Scalars['BigInt']>>;
  retired_lt: InputMaybe<Scalars['BigInt']>;
  retired_lte: InputMaybe<Scalars['BigInt']>;
  retired_not: InputMaybe<Scalars['BigInt']>;
  retired_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonCarbonCreditSnapshot_OrderBy {
  Bridged = 'bridged',
  CreatedAt = 'createdAt',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  CrossChainSupply = 'crossChainSupply',
  CurrentSupply = 'currentSupply',
  Epoch = 'epoch',
  Id = 'id',
  Retired = 'retired'
}

export type DigitalcarbonCarbonCredit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonCredit_Filter>>>;
  bridgeProtocol: InputMaybe<DigitalcarbonBridgeProtocol>;
  bridgeProtocol_in: InputMaybe<Array<DigitalcarbonBridgeProtocol>>;
  bridgeProtocol_not: InputMaybe<DigitalcarbonBridgeProtocol>;
  bridgeProtocol_not_in: InputMaybe<Array<DigitalcarbonBridgeProtocol>>;
  bridged: InputMaybe<Scalars['BigInt']>;
  bridged_gt: InputMaybe<Scalars['BigInt']>;
  bridged_gte: InputMaybe<Scalars['BigInt']>;
  bridged_in: InputMaybe<Array<Scalars['BigInt']>>;
  bridged_lt: InputMaybe<Scalars['BigInt']>;
  bridged_lte: InputMaybe<Scalars['BigInt']>;
  bridged_not: InputMaybe<Scalars['BigInt']>;
  bridged_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  bridges_: InputMaybe<DigitalcarbonBridge_Filter>;
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
  lastBatchId: InputMaybe<Scalars['BigInt']>;
  lastBatchId_gt: InputMaybe<Scalars['BigInt']>;
  lastBatchId_gte: InputMaybe<Scalars['BigInt']>;
  lastBatchId_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastBatchId_lt: InputMaybe<Scalars['BigInt']>;
  lastBatchId_lte: InputMaybe<Scalars['BigInt']>;
  lastBatchId_not: InputMaybe<Scalars['BigInt']>;
  lastBatchId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonCredit_Filter>>>;
  poolBalances_: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
  project: InputMaybe<Scalars['String']>;
  project_: InputMaybe<DigitalcarbonCarbonProject_Filter>;
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
  retires_: InputMaybe<DigitalcarbonRetire_Filter>;
  vintage: InputMaybe<Scalars['Int']>;
  vintage_gt: InputMaybe<Scalars['Int']>;
  vintage_gte: InputMaybe<Scalars['Int']>;
  vintage_in: InputMaybe<Array<Scalars['Int']>>;
  vintage_lt: InputMaybe<Scalars['Int']>;
  vintage_lte: InputMaybe<Scalars['Int']>;
  vintage_not: InputMaybe<Scalars['Int']>;
  vintage_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum DigitalcarbonCarbonCredit_OrderBy {
  BridgeProtocol = 'bridgeProtocol',
  Bridged = 'bridged',
  Bridges = 'bridges',
  CrossChainSupply = 'crossChainSupply',
  CurrentSupply = 'currentSupply',
  Id = 'id',
  LastBatchId = 'lastBatchId',
  PoolBalances = 'poolBalances',
  Project = 'project',
  ProjectCategory = 'project__category',
  ProjectCountry = 'project__country',
  ProjectId = 'project__id',
  ProjectMethodologies = 'project__methodologies',
  ProjectName = 'project__name',
  ProjectProjectId = 'project__projectID',
  ProjectRegion = 'project__region',
  ProjectRegistry = 'project__registry',
  ProvenanceCount = 'provenanceCount',
  Retired = 'retired',
  Retires = 'retires',
  Vintage = 'vintage'
}

export type DigitalcarbonCarbonPool = {
  __typename?: 'CarbonPool';
  /** Current balances of underlying project tokens */
  creditBalances: Array<DigitalcarbonCarbonPoolCreditBalance>;
  /** Total tokens bridged to other chains */
  crossChainSupply: Scalars['BigInt'];
  dailySnapshots: Array<DigitalcarbonCarbonPoolDailySnapshot>;
  /** Decimals of the token */
  decimals: Scalars['Int'];
  deposits: Array<DigitalcarbonPoolDeposit>;
  /** Ethereum address of the pool contract */
  id: Scalars['Bytes'];
  lastSnapshotDayID: Scalars['Int'];
  /** Common name for the pool */
  name: Scalars['String'];
  nextSnapshotDayID: Scalars['Int'];
  redeems: Array<DigitalcarbonPoolRedeem>;
  /** Current supply */
  supply: Scalars['BigInt'];
};


export type DigitalcarbonCarbonPoolCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
};


export type DigitalcarbonCarbonPoolDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
};


export type DigitalcarbonCarbonPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonCarbonPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};

export type DigitalcarbonCarbonPoolCreditBalance = {
  __typename?: 'CarbonPoolCreditBalance';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: DigitalcarbonCarbonCredit;
  /** Current balance bridge to another chain */
  crossChainSupply: Scalars['BigInt'];
  dailySnapshots: Array<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  /** LTD deposited amount */
  deposited: Scalars['BigInt'];
  /** {Pool Address}-{Credit Address} */
  id: Scalars['Bytes'];
  lastSnapshotDayID: Scalars['Int'];
  nextSnapshotDayID: Scalars['Int'];
  /** Target carbon pool */
  pool: DigitalcarbonCarbonPool;
  /** LTD redeemed amount */
  redeemed: Scalars['BigInt'];
};


export type DigitalcarbonCarbonPoolCreditBalanceDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
};

export type DigitalcarbonCarbonPoolCreditBalanceDailySnapshot = {
  __typename?: 'CarbonPoolCreditBalanceDailySnapshot';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: DigitalcarbonCarbonCredit;
  /** ID of the creditBalance entity */
  creditBalance: DigitalcarbonCarbonPoolCreditBalance;
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
  deposits: Array<DigitalcarbonPoolDeposit>;
  /** {Pool Address}-{Credit Address}-{Day ID} */
  id: Scalars['Bytes'];
  lastUpdateBlockNumber: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  /** Target carbon pool */
  pool: DigitalcarbonCarbonPool;
  /** The daily pool snapshot that this belongs to */
  poolSnapshot: DigitalcarbonCarbonPoolDailySnapshot;
  /** Redeemed amount */
  redeemed: Scalars['BigInt'];
  redeems: Array<DigitalcarbonPoolRedeem>;
};


export type DigitalcarbonCarbonPoolCreditBalanceDailySnapshotDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonCarbonPoolCreditBalanceDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};

export type DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>>>;
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
  creditBalance_: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
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
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  deposits_: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolSnapshot: InputMaybe<Scalars['String']>;
  poolSnapshot_: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
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
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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
  redeems_: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};

export enum DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_OrderBy {
  Balance = 'balance',
  Credit = 'credit',
  CreditBalance = 'creditBalance',
  CreditBalanceBalance = 'creditBalance__balance',
  CreditBalanceCrossChainSupply = 'creditBalance__crossChainSupply',
  CreditBalanceDeposited = 'creditBalance__deposited',
  CreditBalanceId = 'creditBalance__id',
  CreditBalanceLastSnapshotDayId = 'creditBalance__lastSnapshotDayID',
  CreditBalanceNextSnapshotDayId = 'creditBalance__nextSnapshotDayID',
  CreditBalanceRedeemed = 'creditBalance__redeemed',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  CrossChainSupply = 'crossChainSupply',
  DayId = 'dayID',
  DeltaBalance = 'deltaBalance',
  DeltaCrossChainSupply = 'deltaCrossChainSupply',
  DeltaDeposited = 'deltaDeposited',
  DeltaRedeemed = 'deltaRedeemed',
  Deposited = 'deposited',
  Deposits = 'deposits',
  Id = 'id',
  LastUpdateBlockNumber = 'lastUpdateBlockNumber',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  Pool = 'pool',
  PoolSnapshot = 'poolSnapshot',
  PoolSnapshotDayId = 'poolSnapshot__dayID',
  PoolSnapshotDeltaSupply = 'poolSnapshot__deltaSupply',
  PoolSnapshotId = 'poolSnapshot__id',
  PoolSnapshotLastUpdateBlockNumber = 'poolSnapshot__lastUpdateBlockNumber',
  PoolSnapshotLastUpdateTimestamp = 'poolSnapshot__lastUpdateTimestamp',
  PoolSnapshotSupply = 'poolSnapshot__supply',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Redeemed = 'redeemed',
  Redeems = 'redeems'
}

export type DigitalcarbonCarbonPoolCreditBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>>>;
  balance: InputMaybe<Scalars['BigInt']>;
  balance_gt: InputMaybe<Scalars['BigInt']>;
  balance_gte: InputMaybe<Scalars['BigInt']>;
  balance_in: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt: InputMaybe<Scalars['BigInt']>;
  balance_lte: InputMaybe<Scalars['BigInt']>;
  balance_not: InputMaybe<Scalars['BigInt']>;
  balance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  dailySnapshots_: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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

export enum DigitalcarbonCarbonPoolCreditBalance_OrderBy {
  Balance = 'balance',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  CrossChainSupply = 'crossChainSupply',
  DailySnapshots = 'dailySnapshots',
  Deposited = 'deposited',
  Id = 'id',
  LastSnapshotDayId = 'lastSnapshotDayID',
  NextSnapshotDayId = 'nextSnapshotDayID',
  Pool = 'pool',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Redeemed = 'redeemed'
}

export type DigitalcarbonCarbonPoolDailySnapshot = {
  __typename?: 'CarbonPoolDailySnapshot';
  /** Current balances of underlying project tokens */
  creditBalances: Array<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  /** Day ID of this snapshot */
  dayID: Maybe<Scalars['Int']>;
  /** Change in supply during this period */
  deltaSupply: Scalars['BigInt'];
  deposits: Array<DigitalcarbonPoolDeposit>;
  /** Ethereum address of the pool contract */
  id: Scalars['Bytes'];
  lastUpdateBlockNumber: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  /** Pool this snapshot belongs to */
  pool: DigitalcarbonCarbonPool;
  redeems: Array<DigitalcarbonPoolRedeem>;
  /** Current supply */
  supply: Scalars['BigInt'];
};


export type DigitalcarbonCarbonPoolDailySnapshotCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type DigitalcarbonCarbonPoolDailySnapshotDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonCarbonPoolDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};

export type DigitalcarbonCarbonPoolDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>>>;
  creditBalances_: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
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
  deposits_: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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
  redeems_: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonCarbonPoolDailySnapshot_OrderBy {
  CreditBalances = 'creditBalances',
  DayId = 'dayID',
  DeltaSupply = 'deltaSupply',
  Deposits = 'deposits',
  Id = 'id',
  LastUpdateBlockNumber = 'lastUpdateBlockNumber',
  LastUpdateTimestamp = 'lastUpdateTimestamp',
  Pool = 'pool',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Redeems = 'redeems',
  Supply = 'supply'
}

export type DigitalcarbonCarbonPool_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPool_Filter>>>;
  creditBalances_: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
  crossChainSupply: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  dailySnapshots_: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
  decimals: InputMaybe<Scalars['Int']>;
  decimals_gt: InputMaybe<Scalars['Int']>;
  decimals_gte: InputMaybe<Scalars['Int']>;
  decimals_in: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt: InputMaybe<Scalars['Int']>;
  decimals_lte: InputMaybe<Scalars['Int']>;
  decimals_not: InputMaybe<Scalars['Int']>;
  decimals_not_in: InputMaybe<Array<Scalars['Int']>>;
  deposits_: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonPool_Filter>>>;
  redeems_: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
  supply: InputMaybe<Scalars['BigInt']>;
  supply_gt: InputMaybe<Scalars['BigInt']>;
  supply_gte: InputMaybe<Scalars['BigInt']>;
  supply_in: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt: InputMaybe<Scalars['BigInt']>;
  supply_lte: InputMaybe<Scalars['BigInt']>;
  supply_not: InputMaybe<Scalars['BigInt']>;
  supply_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonCarbonPool_OrderBy {
  CreditBalances = 'creditBalances',
  CrossChainSupply = 'crossChainSupply',
  DailySnapshots = 'dailySnapshots',
  Decimals = 'decimals',
  Deposits = 'deposits',
  Id = 'id',
  LastSnapshotDayId = 'lastSnapshotDayID',
  Name = 'name',
  NextSnapshotDayId = 'nextSnapshotDayID',
  Redeems = 'redeems',
  Supply = 'supply'
}

export type DigitalcarbonCarbonProject = {
  __typename?: 'CarbonProject';
  /** Carbon credit tokens related to this project */
  carbonCredits: Array<DigitalcarbonCarbonCredit>;
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
  registry: DigitalcarbonRegistry;
};


export type DigitalcarbonCarbonProjectCarbonCreditsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonCredit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
};

export type DigitalcarbonCarbonProject_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonProject_Filter>>>;
  carbonCredits_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCarbonProject_Filter>>>;
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
  registry: InputMaybe<DigitalcarbonRegistry>;
  registry_in: InputMaybe<Array<DigitalcarbonRegistry>>;
  registry_not: InputMaybe<DigitalcarbonRegistry>;
  registry_not_in: InputMaybe<Array<DigitalcarbonRegistry>>;
};

export enum DigitalcarbonCarbonProject_OrderBy {
  CarbonCredits = 'carbonCredits',
  Category = 'category',
  Country = 'country',
  Id = 'id',
  Methodologies = 'methodologies',
  Name = 'name',
  ProjectId = 'projectID',
  Region = 'region',
  Registry = 'registry'
}

export type DigitalcarbonCrossChainBridge = {
  __typename?: 'CrossChainBridge';
  /** Amount of tokens bridged */
  amount: Scalars['BigInt'];
  /** Bridging address */
  bridger: Scalars['Bytes'];
  /** ID of the credit being bridged, if any */
  credit: Maybe<DigitalcarbonCarbonCredit>;
  /** Bridge direction */
  direction: DigitalcarbonCrossChainBridgeDirection;
  /** Transaction hash of the event */
  hash: Scalars['Bytes'];
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** ID of the pool being bridged, if any */
  pool: Maybe<DigitalcarbonCarbonPool>;
  /** Block timestamp of the bridge */
  timestamp: Scalars['BigInt'];
};

export enum DigitalcarbonCrossChainBridgeDirection {
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type DigitalcarbonCrossChainBridge_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonCrossChainBridge_Filter>>>;
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
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  direction: InputMaybe<DigitalcarbonCrossChainBridgeDirection>;
  direction_in: InputMaybe<Array<DigitalcarbonCrossChainBridgeDirection>>;
  direction_not: InputMaybe<DigitalcarbonCrossChainBridgeDirection>;
  direction_not_in: InputMaybe<Array<DigitalcarbonCrossChainBridgeDirection>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonCrossChainBridge_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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

export enum DigitalcarbonCrossChainBridge_OrderBy {
  Amount = 'amount',
  Bridger = 'bridger',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Direction = 'direction',
  Hash = 'hash',
  Id = 'id',
  Pool = 'pool',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Timestamp = 'timestamp'
}

export type DigitalcarbonEcosystem = {
  __typename?: 'Ecosystem';
  /** Active credits with supply > 0 */
  activeCredits: Array<Scalars['Bytes']>;
  id: Scalars['ID'];
};

export type DigitalcarbonEcosystem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  activeCredits: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonEcosystem_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<DigitalcarbonEcosystem_Filter>>>;
};

export enum DigitalcarbonEcosystem_OrderBy {
  ActiveCredits = 'activeCredits',
  Id = 'id'
}

export type DigitalcarbonEpoch = {
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

export type DigitalcarbonEpoch_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonEpoch_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonEpoch_Filter>>>;
};

export enum DigitalcarbonEpoch_OrderBy {
  CreditSma = 'creditSMA',
  CreditSupply = 'creditSupply',
  DeltaCreditSupply = 'deltaCreditSupply',
  Epoch = 'epoch',
  Id = 'id'
}

export type DigitalcarbonHolding = {
  __typename?: 'Holding';
  /** Account this belongs to */
  account: DigitalcarbonAccount;
  activeProvenanceRecords: Array<DigitalcarbonProvenanceRecord>;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  historicalProvenanceRecords: Array<DigitalcarbonProvenanceRecord>;
  /** {Account}-{Token} */
  id: Scalars['Bytes'];
  /** Timestamp last updated */
  lastUpdated: Scalars['BigInt'];
  /** Token being held */
  token: DigitalcarbonToken;
};


export type DigitalcarbonHoldingActiveProvenanceRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
};


export type DigitalcarbonHoldingHistoricalProvenanceRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
};

export type DigitalcarbonHoldingDailySnapshot = {
  __typename?: 'HoldingDailySnapshot';
  /** Account this belongs to */
  account: DigitalcarbonAccount;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  /** {Account}-{Token}-{Days since Unix epoch} */
  id: Scalars['Bytes'];
  /** Day in Unix timestamp */
  timestamp: Scalars['BigInt'];
  /** Token being held */
  token: DigitalcarbonToken;
};

export type DigitalcarbonHoldingDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  and: InputMaybe<Array<InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<DigitalcarbonToken_Filter>;
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

export enum DigitalcarbonHoldingDailySnapshot_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  Amount = 'amount',
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLatestPricePerKlima = 'token__latestPricePerKLIMA',
  TokenLatestPricePerKlimaUpdated = 'token__latestPricePerKLIMAUpdated',
  TokenLatestPriceUsd = 'token__latestPriceUSD',
  TokenLatestPriceUsdUpdated = 'token__latestPriceUSDUpdated',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol'
}

export type DigitalcarbonHolding_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  activeProvenanceRecords_: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
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
  and: InputMaybe<Array<InputMaybe<DigitalcarbonHolding_Filter>>>;
  historicalProvenanceRecords: InputMaybe<Array<Scalars['String']>>;
  historicalProvenanceRecords_: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonHolding_Filter>>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<DigitalcarbonToken_Filter>;
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

export enum DigitalcarbonHolding_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  ActiveProvenanceRecords = 'activeProvenanceRecords',
  Amount = 'amount',
  HistoricalProvenanceRecords = 'historicalProvenanceRecords',
  Id = 'id',
  LastUpdated = 'lastUpdated',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLatestPricePerKlima = 'token__latestPricePerKLIMA',
  TokenLatestPricePerKlimaUpdated = 'token__latestPricePerKLIMAUpdated',
  TokenLatestPriceUsd = 'token__latestPriceUSD',
  TokenLatestPriceUsdUpdated = 'token__latestPriceUSDUpdated',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol'
}

export type DigitalcarbonKlimaRetire = {
  __typename?: 'KlimaRetire';
  /** Fee charged for retirement in native units */
  feeAmount: Scalars['BigInt'];
  /** {Account}-{Klima Retirement Index} */
  id: Scalars['Bytes'];
  /** Klima retirement index */
  index: Scalars['BigInt'];
  /** Retirement made by the aggregator */
  retire: DigitalcarbonRetire;
  /** Selective retirement */
  specific: Scalars['Boolean'];
};

export type DigitalcarbonKlimaRetire_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonKlimaRetire_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonKlimaRetire_Filter>>>;
  retire: InputMaybe<Scalars['String']>;
  retire_: InputMaybe<DigitalcarbonRetire_Filter>;
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

export enum DigitalcarbonKlimaRetire_OrderBy {
  FeeAmount = 'feeAmount',
  Id = 'id',
  Index = 'index',
  Retire = 'retire',
  RetireAmount = 'retire__amount',
  RetireBeneficiaryName = 'retire__beneficiaryName',
  RetireBridgeId = 'retire__bridgeID',
  RetireId = 'retire__id',
  RetireRetirementMessage = 'retire__retirementMessage',
  RetireRetiringName = 'retire__retiringName',
  RetireSource = 'retire__source',
  RetireTimestamp = 'retire__timestamp',
  Specific = 'specific'
}

export type DigitalcarbonMethodology = {
  __typename?: 'Methodology';
  approvalDate: Scalars['String'];
  currentVersion: Scalars['String'];
  id: Scalars['ID'];
  scope: Maybe<Scalars['String']>;
};

export type DigitalcarbonMethodology_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonMethodology_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonMethodology_Filter>>>;
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

export enum DigitalcarbonMethodology_OrderBy {
  ApprovalDate = 'approvalDate',
  CurrentVersion = 'currentVersion',
  Id = 'id',
  Scope = 'scope'
}

/** Defines the order direction, either ascending or descending */
export enum DigitalcarbonOrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type DigitalcarbonPoolDeposit = {
  __typename?: 'PoolDeposit';
  /** Account making the deposit */
  account: DigitalcarbonAccount;
  /** Amount deposited in native units */
  amount: Scalars['BigInt'];
  /** Credit deposited in the pool */
  credit: DigitalcarbonCarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Pool that the credit was deposited in */
  pool: DigitalcarbonCarbonPool;
  /** {Pool}-{Credit}-{Day ID} for snapshot referencing */
  poolCreditSnapshotID: DigitalcarbonCarbonPoolCreditBalanceDailySnapshot;
  /** {Pool}-{Day ID} for snapshot referencing */
  poolSnapshotID: DigitalcarbonCarbonPoolDailySnapshot;
  /** Block timestamp of the deposit */
  timestamp: Scalars['BigInt'];
};

export type DigitalcarbonPoolDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  and: InputMaybe<Array<InputMaybe<DigitalcarbonPoolDeposit_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonPoolDeposit_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
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
  poolSnapshotID_: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
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
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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

export enum DigitalcarbonPoolDeposit_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  Amount = 'amount',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Pool = 'pool',
  PoolCreditSnapshotId = 'poolCreditSnapshotID',
  PoolCreditSnapshotIdBalance = 'poolCreditSnapshotID__balance',
  PoolCreditSnapshotIdCrossChainSupply = 'poolCreditSnapshotID__crossChainSupply',
  PoolCreditSnapshotIdDayId = 'poolCreditSnapshotID__dayID',
  PoolCreditSnapshotIdDeltaBalance = 'poolCreditSnapshotID__deltaBalance',
  PoolCreditSnapshotIdDeltaCrossChainSupply = 'poolCreditSnapshotID__deltaCrossChainSupply',
  PoolCreditSnapshotIdDeltaDeposited = 'poolCreditSnapshotID__deltaDeposited',
  PoolCreditSnapshotIdDeltaRedeemed = 'poolCreditSnapshotID__deltaRedeemed',
  PoolCreditSnapshotIdDeposited = 'poolCreditSnapshotID__deposited',
  PoolCreditSnapshotIdId = 'poolCreditSnapshotID__id',
  PoolCreditSnapshotIdLastUpdateBlockNumber = 'poolCreditSnapshotID__lastUpdateBlockNumber',
  PoolCreditSnapshotIdLastUpdateTimestamp = 'poolCreditSnapshotID__lastUpdateTimestamp',
  PoolCreditSnapshotIdRedeemed = 'poolCreditSnapshotID__redeemed',
  PoolSnapshotId = 'poolSnapshotID',
  PoolSnapshotIdDayId = 'poolSnapshotID__dayID',
  PoolSnapshotIdDeltaSupply = 'poolSnapshotID__deltaSupply',
  PoolSnapshotIdId = 'poolSnapshotID__id',
  PoolSnapshotIdLastUpdateBlockNumber = 'poolSnapshotID__lastUpdateBlockNumber',
  PoolSnapshotIdLastUpdateTimestamp = 'poolSnapshotID__lastUpdateTimestamp',
  PoolSnapshotIdSupply = 'poolSnapshotID__supply',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Timestamp = 'timestamp'
}

export type DigitalcarbonPoolRedeem = {
  __typename?: 'PoolRedeem';
  /** Account making the redemption */
  account: DigitalcarbonAccount;
  /** Amount redeemed in native units */
  amount: Scalars['BigInt'];
  /** Credit redeemed from the pool */
  credit: DigitalcarbonCarbonCredit;
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** Pool that the credit was redeemed from */
  pool: DigitalcarbonCarbonPool;
  /** {Pool}-{Credit}-{Day ID} for snapshot referencing */
  poolCreditSnapshotID: DigitalcarbonCarbonPoolCreditBalanceDailySnapshot;
  /** {Pool}-{Day ID} for snapshot referencing */
  poolSnapshotID: DigitalcarbonCarbonPoolDailySnapshot;
  /** Block timestamp of the deposit */
  timestamp: Scalars['BigInt'];
};

export type DigitalcarbonPoolRedeem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  and: InputMaybe<Array<InputMaybe<DigitalcarbonPoolRedeem_Filter>>>;
  credit: InputMaybe<Scalars['String']>;
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonPoolRedeem_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
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
  poolSnapshotID_: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
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
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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

export enum DigitalcarbonPoolRedeem_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  Amount = 'amount',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Pool = 'pool',
  PoolCreditSnapshotId = 'poolCreditSnapshotID',
  PoolCreditSnapshotIdBalance = 'poolCreditSnapshotID__balance',
  PoolCreditSnapshotIdCrossChainSupply = 'poolCreditSnapshotID__crossChainSupply',
  PoolCreditSnapshotIdDayId = 'poolCreditSnapshotID__dayID',
  PoolCreditSnapshotIdDeltaBalance = 'poolCreditSnapshotID__deltaBalance',
  PoolCreditSnapshotIdDeltaCrossChainSupply = 'poolCreditSnapshotID__deltaCrossChainSupply',
  PoolCreditSnapshotIdDeltaDeposited = 'poolCreditSnapshotID__deltaDeposited',
  PoolCreditSnapshotIdDeltaRedeemed = 'poolCreditSnapshotID__deltaRedeemed',
  PoolCreditSnapshotIdDeposited = 'poolCreditSnapshotID__deposited',
  PoolCreditSnapshotIdId = 'poolCreditSnapshotID__id',
  PoolCreditSnapshotIdLastUpdateBlockNumber = 'poolCreditSnapshotID__lastUpdateBlockNumber',
  PoolCreditSnapshotIdLastUpdateTimestamp = 'poolCreditSnapshotID__lastUpdateTimestamp',
  PoolCreditSnapshotIdRedeemed = 'poolCreditSnapshotID__redeemed',
  PoolSnapshotId = 'poolSnapshotID',
  PoolSnapshotIdDayId = 'poolSnapshotID__dayID',
  PoolSnapshotIdDeltaSupply = 'poolSnapshotID__deltaSupply',
  PoolSnapshotIdId = 'poolSnapshotID__id',
  PoolSnapshotIdLastUpdateBlockNumber = 'poolSnapshotID__lastUpdateBlockNumber',
  PoolSnapshotIdLastUpdateTimestamp = 'poolSnapshotID__lastUpdateTimestamp',
  PoolSnapshotIdSupply = 'poolSnapshotID__supply',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  Timestamp = 'timestamp'
}

export type DigitalcarbonProvenanceRecord = {
  __typename?: 'ProvenanceRecord';
  /** Unix timestamp created */
  createdAt: Scalars['BigInt'];
  /** Token address - Holding address - increment */
  id: Scalars['Bytes'];
  /** Original amount received */
  originalAmount: Scalars['BigInt'];
  /** Prior records associated with this transaction */
  priorRecords: Array<DigitalcarbonProvenanceRecord>;
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
  /** Transaction hash creating this record */
  transactionHash: Scalars['Bytes'];
  /** Action being made with the credit */
  transactionType: DigitalcarbonProvenanceType;
  /** Unix timestamp updated */
  updatedAt: Scalars['BigInt'];
};


export type DigitalcarbonProvenanceRecordPriorRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
};

export type DigitalcarbonProvenanceRecord_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonProvenanceRecord_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonProvenanceRecord_Filter>>>;
  originalAmount: InputMaybe<Scalars['BigInt']>;
  originalAmount_gt: InputMaybe<Scalars['BigInt']>;
  originalAmount_gte: InputMaybe<Scalars['BigInt']>;
  originalAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  originalAmount_lt: InputMaybe<Scalars['BigInt']>;
  originalAmount_lte: InputMaybe<Scalars['BigInt']>;
  originalAmount_not: InputMaybe<Scalars['BigInt']>;
  originalAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  priorRecords: InputMaybe<Array<Scalars['String']>>;
  priorRecords_: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
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
  transactionType: InputMaybe<DigitalcarbonProvenanceType>;
  transactionType_in: InputMaybe<Array<DigitalcarbonProvenanceType>>;
  transactionType_not: InputMaybe<DigitalcarbonProvenanceType>;
  transactionType_not_in: InputMaybe<Array<DigitalcarbonProvenanceType>>;
  updatedAt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte: InputMaybe<Scalars['BigInt']>;
  updatedAt_in: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte: InputMaybe<Scalars['BigInt']>;
  updatedAt_not: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonProvenanceRecord_OrderBy {
  CreatedAt = 'createdAt',
  Id = 'id',
  OriginalAmount = 'originalAmount',
  PriorRecords = 'priorRecords',
  Receiver = 'receiver',
  RegistrySerialNumbers = 'registrySerialNumbers',
  RemainingAmount = 'remainingAmount',
  Sender = 'sender',
  Token = 'token',
  TransactionHash = 'transactionHash',
  TransactionType = 'transactionType',
  UpdatedAt = 'updatedAt'
}

export enum DigitalcarbonProvenanceType {
  Origination = 'ORIGINATION',
  Retirement = 'RETIREMENT',
  Transfer = 'TRANSFER'
}

export type DigitalcarbonQuery = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<Digitalcarbon_Meta_>;
  account: Maybe<DigitalcarbonAccount>;
  accounts: Array<DigitalcarbonAccount>;
  bridge: Maybe<DigitalcarbonBridge>;
  bridges: Array<DigitalcarbonBridge>;
  carbonCredit: Maybe<DigitalcarbonCarbonCredit>;
  carbonCreditSnapshot: Maybe<DigitalcarbonCarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<DigitalcarbonCarbonCreditSnapshot>;
  carbonCredits: Array<DigitalcarbonCarbonCredit>;
  carbonPool: Maybe<DigitalcarbonCarbonPool>;
  carbonPoolCreditBalance: Maybe<DigitalcarbonCarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot: Maybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<DigitalcarbonCarbonPoolCreditBalance>;
  carbonPoolDailySnapshot: Maybe<DigitalcarbonCarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<DigitalcarbonCarbonPoolDailySnapshot>;
  carbonPools: Array<DigitalcarbonCarbonPool>;
  carbonProject: Maybe<DigitalcarbonCarbonProject>;
  carbonProjects: Array<DigitalcarbonCarbonProject>;
  crossChainBridge: Maybe<DigitalcarbonCrossChainBridge>;
  crossChainBridges: Array<DigitalcarbonCrossChainBridge>;
  ecosystem: Maybe<DigitalcarbonEcosystem>;
  ecosystems: Array<DigitalcarbonEcosystem>;
  epoch: Maybe<DigitalcarbonEpoch>;
  epoches: Array<DigitalcarbonEpoch>;
  holding: Maybe<DigitalcarbonHolding>;
  holdingDailySnapshot: Maybe<DigitalcarbonHoldingDailySnapshot>;
  holdingDailySnapshots: Array<DigitalcarbonHoldingDailySnapshot>;
  holdings: Array<DigitalcarbonHolding>;
  klimaRetire: Maybe<DigitalcarbonKlimaRetire>;
  klimaRetires: Array<DigitalcarbonKlimaRetire>;
  methodologies: Array<DigitalcarbonMethodology>;
  methodology: Maybe<DigitalcarbonMethodology>;
  poolDeposit: Maybe<DigitalcarbonPoolDeposit>;
  poolDeposits: Array<DigitalcarbonPoolDeposit>;
  poolRedeem: Maybe<DigitalcarbonPoolRedeem>;
  poolRedeems: Array<DigitalcarbonPoolRedeem>;
  provenanceRecord: Maybe<DigitalcarbonProvenanceRecord>;
  provenanceRecords: Array<DigitalcarbonProvenanceRecord>;
  retire: Maybe<DigitalcarbonRetire>;
  retires: Array<DigitalcarbonRetire>;
  token: Maybe<DigitalcarbonToken>;
  tokens: Array<DigitalcarbonToken>;
  toucanBatch: Maybe<DigitalcarbonToucanBatch>;
  toucanBatches: Array<DigitalcarbonToucanBatch>;
};


export type DigitalcarbonQuery_MetaArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
};


export type DigitalcarbonQueryAccountArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryAccountsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonAccount_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonAccount_Filter>;
};


export type DigitalcarbonQueryBridgeArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryBridgesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonBridge_Filter>;
};


export type DigitalcarbonQueryCarbonCreditArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonCreditSnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonCreditSnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonCreditSnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonCreditSnapshot_Filter>;
};


export type DigitalcarbonQueryCarbonCreditsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonCredit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
};


export type DigitalcarbonQueryCarbonPoolArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonPoolCreditBalanceArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonPoolCreditBalanceDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type DigitalcarbonQueryCarbonPoolCreditBalancesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
};


export type DigitalcarbonQueryCarbonPoolDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonPoolDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
};


export type DigitalcarbonQueryCarbonPoolsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPool_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPool_Filter>;
};


export type DigitalcarbonQueryCarbonProjectArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCarbonProjectsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonProject_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonProject_Filter>;
};


export type DigitalcarbonQueryCrossChainBridgeArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryCrossChainBridgesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCrossChainBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCrossChainBridge_Filter>;
};


export type DigitalcarbonQueryEcosystemArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryEcosystemsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonEcosystem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonEcosystem_Filter>;
};


export type DigitalcarbonQueryEpochArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryEpochesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonEpoch_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonEpoch_Filter>;
};


export type DigitalcarbonQueryHoldingArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryHoldingDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryHoldingDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>;
};


export type DigitalcarbonQueryHoldingsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHolding_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonHolding_Filter>;
};


export type DigitalcarbonQueryKlimaRetireArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryKlimaRetiresArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonKlimaRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonKlimaRetire_Filter>;
};


export type DigitalcarbonQueryMethodologiesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonMethodology_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonMethodology_Filter>;
};


export type DigitalcarbonQueryMethodologyArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryPoolDepositArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryPoolDepositsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonQueryPoolRedeemArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryPoolRedeemsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};


export type DigitalcarbonQueryProvenanceRecordArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryProvenanceRecordsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
};


export type DigitalcarbonQueryRetireArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryRetiresArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonRetire_Filter>;
};


export type DigitalcarbonQueryTokenArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryTokensArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonToken_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonToken_Filter>;
};


export type DigitalcarbonQueryToucanBatchArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonQueryToucanBatchesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonToucanBatch_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonToucanBatch_Filter>;
};

export enum DigitalcarbonRegistry {
  GoldStandard = 'GOLD_STANDARD',
  PuroEarth = 'PURO_EARTH',
  Verra = 'VERRA'
}

export type DigitalcarbonRetire = {
  __typename?: 'Retire';
  /** Amount of carbon retired */
  amount: Scalars['BigInt'];
  /** Beneficiary address */
  beneficiaryAddress: DigitalcarbonAccount;
  /** Beneficiary description */
  beneficiaryName: Scalars['String'];
  /** Protocol specific ID */
  bridgeID: Maybe<Scalars['String']>;
  /** Carbon credit being retired */
  credit: DigitalcarbonCarbonCredit;
  /** {Account}-{Total Retirement Counter} */
  id: Scalars['Bytes'];
  klimaRetire: Maybe<DigitalcarbonKlimaRetire>;
  /** Pool credit was sourced from, if any */
  pool: Maybe<DigitalcarbonCarbonPool>;
  /** Specific retirement message */
  retirementMessage: Scalars['String'];
  /** Retiree address */
  retiringAddress: DigitalcarbonAccount;
  /** Retiree description */
  retiringName: Scalars['String'];
  /** Source of the retirement */
  source: DigitalcarbonRetireSource;
  /** Block timestamp of retirement */
  timestamp: Scalars['BigInt'];
};

export enum DigitalcarbonRetireSource {
  Klima = 'KLIMA',
  Other = 'OTHER'
}

export type DigitalcarbonRetire_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonRetire_Filter>>>;
  beneficiaryAddress: InputMaybe<Scalars['String']>;
  beneficiaryAddress_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  credit_: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
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
  klimaRetire_: InputMaybe<DigitalcarbonKlimaRetire_Filter>;
  or: InputMaybe<Array<InputMaybe<DigitalcarbonRetire_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<DigitalcarbonCarbonPool_Filter>;
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
  retiringAddress_: InputMaybe<DigitalcarbonAccount_Filter>;
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
  source: InputMaybe<DigitalcarbonRetireSource>;
  source_in: InputMaybe<Array<DigitalcarbonRetireSource>>;
  source_not: InputMaybe<DigitalcarbonRetireSource>;
  source_not_in: InputMaybe<Array<DigitalcarbonRetireSource>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DigitalcarbonRetire_OrderBy {
  Amount = 'amount',
  BeneficiaryAddress = 'beneficiaryAddress',
  BeneficiaryAddressId = 'beneficiaryAddress__id',
  BeneficiaryAddressTotalRetirements = 'beneficiaryAddress__totalRetirements',
  BeneficiaryName = 'beneficiaryName',
  BridgeId = 'bridgeID',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditLastBatchId = 'credit__lastBatchId',
  CreditProvenanceCount = 'credit__provenanceCount',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  KlimaRetire = 'klimaRetire',
  KlimaRetireFeeAmount = 'klimaRetire__feeAmount',
  KlimaRetireId = 'klimaRetire__id',
  KlimaRetireIndex = 'klimaRetire__index',
  KlimaRetireSpecific = 'klimaRetire__specific',
  Pool = 'pool',
  PoolCrossChainSupply = 'pool__crossChainSupply',
  PoolDecimals = 'pool__decimals',
  PoolId = 'pool__id',
  PoolLastSnapshotDayId = 'pool__lastSnapshotDayID',
  PoolName = 'pool__name',
  PoolNextSnapshotDayId = 'pool__nextSnapshotDayID',
  PoolSupply = 'pool__supply',
  RetirementMessage = 'retirementMessage',
  RetiringAddress = 'retiringAddress',
  RetiringAddressId = 'retiringAddress__id',
  RetiringAddressTotalRetirements = 'retiringAddress__totalRetirements',
  RetiringName = 'retiringName',
  Source = 'source',
  Timestamp = 'timestamp'
}

export type DigitalcarbonSubscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<Digitalcarbon_Meta_>;
  account: Maybe<DigitalcarbonAccount>;
  accounts: Array<DigitalcarbonAccount>;
  bridge: Maybe<DigitalcarbonBridge>;
  bridges: Array<DigitalcarbonBridge>;
  carbonCredit: Maybe<DigitalcarbonCarbonCredit>;
  carbonCreditSnapshot: Maybe<DigitalcarbonCarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<DigitalcarbonCarbonCreditSnapshot>;
  carbonCredits: Array<DigitalcarbonCarbonCredit>;
  carbonPool: Maybe<DigitalcarbonCarbonPool>;
  carbonPoolCreditBalance: Maybe<DigitalcarbonCarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot: Maybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<DigitalcarbonCarbonPoolCreditBalance>;
  carbonPoolDailySnapshot: Maybe<DigitalcarbonCarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<DigitalcarbonCarbonPoolDailySnapshot>;
  carbonPools: Array<DigitalcarbonCarbonPool>;
  carbonProject: Maybe<DigitalcarbonCarbonProject>;
  carbonProjects: Array<DigitalcarbonCarbonProject>;
  crossChainBridge: Maybe<DigitalcarbonCrossChainBridge>;
  crossChainBridges: Array<DigitalcarbonCrossChainBridge>;
  ecosystem: Maybe<DigitalcarbonEcosystem>;
  ecosystems: Array<DigitalcarbonEcosystem>;
  epoch: Maybe<DigitalcarbonEpoch>;
  epoches: Array<DigitalcarbonEpoch>;
  holding: Maybe<DigitalcarbonHolding>;
  holdingDailySnapshot: Maybe<DigitalcarbonHoldingDailySnapshot>;
  holdingDailySnapshots: Array<DigitalcarbonHoldingDailySnapshot>;
  holdings: Array<DigitalcarbonHolding>;
  klimaRetire: Maybe<DigitalcarbonKlimaRetire>;
  klimaRetires: Array<DigitalcarbonKlimaRetire>;
  methodologies: Array<DigitalcarbonMethodology>;
  methodology: Maybe<DigitalcarbonMethodology>;
  poolDeposit: Maybe<DigitalcarbonPoolDeposit>;
  poolDeposits: Array<DigitalcarbonPoolDeposit>;
  poolRedeem: Maybe<DigitalcarbonPoolRedeem>;
  poolRedeems: Array<DigitalcarbonPoolRedeem>;
  provenanceRecord: Maybe<DigitalcarbonProvenanceRecord>;
  provenanceRecords: Array<DigitalcarbonProvenanceRecord>;
  retire: Maybe<DigitalcarbonRetire>;
  retires: Array<DigitalcarbonRetire>;
  token: Maybe<DigitalcarbonToken>;
  tokens: Array<DigitalcarbonToken>;
  toucanBatch: Maybe<DigitalcarbonToucanBatch>;
  toucanBatches: Array<DigitalcarbonToucanBatch>;
};


export type DigitalcarbonSubscription_MetaArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
};


export type DigitalcarbonSubscriptionAccountArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionAccountsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonAccount_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonAccount_Filter>;
};


export type DigitalcarbonSubscriptionBridgeArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionBridgesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonBridge_Filter>;
};


export type DigitalcarbonSubscriptionCarbonCreditArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonCreditSnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonCreditSnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonCreditSnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonCreditSnapshot_Filter>;
};


export type DigitalcarbonSubscriptionCarbonCreditsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonCredit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonCredit_Filter>;
};


export type DigitalcarbonSubscriptionCarbonPoolArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonPoolCreditBalanceArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonPoolCreditBalanceDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type DigitalcarbonSubscriptionCarbonPoolCreditBalancesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolCreditBalance_Filter>;
};


export type DigitalcarbonSubscriptionCarbonPoolDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonPoolDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPoolDailySnapshot_Filter>;
};


export type DigitalcarbonSubscriptionCarbonPoolsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonPool_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonPool_Filter>;
};


export type DigitalcarbonSubscriptionCarbonProjectArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCarbonProjectsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCarbonProject_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCarbonProject_Filter>;
};


export type DigitalcarbonSubscriptionCrossChainBridgeArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionCrossChainBridgesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonCrossChainBridge_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonCrossChainBridge_Filter>;
};


export type DigitalcarbonSubscriptionEcosystemArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionEcosystemsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonEcosystem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonEcosystem_Filter>;
};


export type DigitalcarbonSubscriptionEpochArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionEpochesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonEpoch_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonEpoch_Filter>;
};


export type DigitalcarbonSubscriptionHoldingArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionHoldingDailySnapshotArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionHoldingDailySnapshotsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHoldingDailySnapshot_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonHoldingDailySnapshot_Filter>;
};


export type DigitalcarbonSubscriptionHoldingsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonHolding_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonHolding_Filter>;
};


export type DigitalcarbonSubscriptionKlimaRetireArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionKlimaRetiresArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonKlimaRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonKlimaRetire_Filter>;
};


export type DigitalcarbonSubscriptionMethodologiesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonMethodology_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonMethodology_Filter>;
};


export type DigitalcarbonSubscriptionMethodologyArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionPoolDepositArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionPoolDepositsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolDeposit_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonPoolDeposit_Filter>;
};


export type DigitalcarbonSubscriptionPoolRedeemArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionPoolRedeemsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonPoolRedeem_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonPoolRedeem_Filter>;
};


export type DigitalcarbonSubscriptionProvenanceRecordArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionProvenanceRecordsArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonProvenanceRecord_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonProvenanceRecord_Filter>;
};


export type DigitalcarbonSubscriptionRetireArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionRetiresArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonRetire_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonRetire_Filter>;
};


export type DigitalcarbonSubscriptionTokenArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionTokensArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonToken_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonToken_Filter>;
};


export type DigitalcarbonSubscriptionToucanBatchArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
};


export type DigitalcarbonSubscriptionToucanBatchesArgs = {
  block: InputMaybe<DigitalcarbonBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DigitalcarbonToucanBatch_OrderBy>;
  orderDirection: InputMaybe<DigitalcarbonOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Digitalcarbon_SubgraphErrorPolicy_;
  where: InputMaybe<DigitalcarbonToucanBatch_Filter>;
};

export type DigitalcarbonToken = {
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

export type DigitalcarbonToken_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonToken_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonToken_Filter>>>;
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

export enum DigitalcarbonToken_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  LatestPricePerKlima = 'latestPricePerKLIMA',
  LatestPricePerKlimaUpdated = 'latestPricePerKLIMAUpdated',
  LatestPriceUsd = 'latestPriceUSD',
  LatestPriceUsdUpdated = 'latestPriceUSDUpdated',
  Name = 'name',
  Symbol = 'symbol'
}

export type DigitalcarbonToucanBatch = {
  __typename?: 'ToucanBatch';
  /** Creation Transaction hash */
  creationTransactionHash: Scalars['Bytes'];
  /** Token ID */
  id: Scalars['ID'];
  /** Registry serial numbers associated with this batch */
  registrySerialNumbers: Array<Scalars['String']>;
};

export type DigitalcarbonToucanBatch_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DigitalcarbonBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DigitalcarbonToucanBatch_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<DigitalcarbonToucanBatch_Filter>>>;
  registrySerialNumbers: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains: InputMaybe<Array<Scalars['String']>>;
  registrySerialNumbers_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
};

export enum DigitalcarbonToucanBatch_OrderBy {
  CreationTransactionHash = 'creationTransactionHash',
  Id = 'id',
  RegistrySerialNumbers = 'registrySerialNumbers'
}

export type Digitalcarbon_Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type Digitalcarbon_Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Digitalcarbon_Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum Digitalcarbon_SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type DigitalcarbonGetProjectCreditsQueryVariables = Exact<{
  projectID: Scalars['String'];
  vintage: InputMaybe<Scalars['Int']>;
}>;


export type DigitalcarbonGetProjectCreditsQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', registry: DigitalcarbonRegistry, region: string, projectID: string, name: string, methodologies: string, id: string, country: string, category: string, carbonCredits: Array<{ __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: DigitalcarbonBridgeProtocol, bridged: string, retired: string, poolBalances: Array<{ __typename?: 'CarbonPoolCreditBalance', balance: string, id: any, deposited: string, redeemed: string, pool: { __typename?: 'CarbonPool', name: string, supply: string, id: any, decimals: number } }> }> }> };


export const GetProjectCreditsDocument = gql`
    query getProjectCredits($projectID: String!, $vintage: Int) {
  carbonProjects(where: {projectID: $projectID}) {
    registry
    region
    projectID
    name
    methodologies
    id
    country
    category
    carbonCredits(where: {vintage: $vintage}) {
      vintage
      currentSupply
      poolBalances {
        balance
        id
        deposited
        redeemed
        pool {
          name
          supply
          id
          decimals
        }
      }
      id
      crossChainSupply
      bridgeProtocol
      bridged
      retired
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getProjectCredits(variables: DigitalcarbonGetProjectCreditsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DigitalcarbonGetProjectCreditsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DigitalcarbonGetProjectCreditsQuery>(GetProjectCreditsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectCredits', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;