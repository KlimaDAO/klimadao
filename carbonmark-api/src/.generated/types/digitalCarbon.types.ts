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
  orderBy?: InputMaybe<Bridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bridge_Filter>;
};


export type AccountHoldingSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type AccountHoldingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Holding_Filter>;
};


export type AccountPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type AccountPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolRedeem_Filter>;
};


export type AccountRetiresBeneficiaryArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Retire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Retire_Filter>;
};


export type AccountRetiresInitiatorArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Retire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Retire_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  bridges_?: InputMaybe<Bridge_Filter>;
  holdingSnapshots_?: InputMaybe<HoldingDailySnapshot_Filter>;
  holdings_?: InputMaybe<Holding_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  poolDeposits_?: InputMaybe<PoolDeposit_Filter>;
  poolRedeems_?: InputMaybe<PoolRedeem_Filter>;
  retiresBeneficiary_?: InputMaybe<Retire_Filter>;
  retiresInitiator_?: InputMaybe<Retire_Filter>;
  totalRetirements?: InputMaybe<Scalars['Int']>;
  totalRetirements_gt?: InputMaybe<Scalars['Int']>;
  totalRetirements_gte?: InputMaybe<Scalars['Int']>;
  totalRetirements_in?: InputMaybe<Array<Scalars['Int']>>;
  totalRetirements_lt?: InputMaybe<Scalars['Int']>;
  totalRetirements_lte?: InputMaybe<Scalars['Int']>;
  totalRetirements_not?: InputMaybe<Scalars['Int']>;
  totalRetirements_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Account_OrderBy {
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
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
  Moss = 'MOSS',
  Thallo = 'THALLO',
  Toucan = 'TOUCAN'
}

export type Bridge_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Bridge_OrderBy {
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
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Timestamp = 'timestamp'
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
  /** Ethereum address where the token is deployed */
  id: Scalars['Bytes'];
  /** Current pool balances for this credit */
  poolBalances: Array<CarbonPoolCreditBalance>;
  /** Carbon Project this token belongs to */
  project: CarbonProject;
  /** Total tokens retired */
  retired: Scalars['BigInt'];
  /** All retirement events for this credit */
  retires: Array<Retire>;
  /** Vintage of issuance */
  vintage: Scalars['Int'];
};


export type CarbonCreditBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bridge_Filter>;
};


export type CarbonCreditPoolBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type CarbonCreditRetiresArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Retire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Retire_Filter>;
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
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonCreditSnapshot_Filter>>>;
  bridged?: InputMaybe<Scalars['BigInt']>;
  bridged_gt?: InputMaybe<Scalars['BigInt']>;
  bridged_gte?: InputMaybe<Scalars['BigInt']>;
  bridged_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridged_lt?: InputMaybe<Scalars['BigInt']>;
  bridged_lte?: InputMaybe<Scalars['BigInt']>;
  bridged_not?: InputMaybe<Scalars['BigInt']>;
  bridged_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  crossChainSupply?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply_lt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_lte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch?: InputMaybe<Scalars['BigInt']>;
  epoch_gt?: InputMaybe<Scalars['BigInt']>;
  epoch_gte?: InputMaybe<Scalars['BigInt']>;
  epoch_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epoch_lt?: InputMaybe<Scalars['BigInt']>;
  epoch_lte?: InputMaybe<Scalars['BigInt']>;
  epoch_not?: InputMaybe<Scalars['BigInt']>;
  epoch_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonCreditSnapshot_Filter>>>;
  retired?: InputMaybe<Scalars['BigInt']>;
  retired_gt?: InputMaybe<Scalars['BigInt']>;
  retired_gte?: InputMaybe<Scalars['BigInt']>;
  retired_in?: InputMaybe<Array<Scalars['BigInt']>>;
  retired_lt?: InputMaybe<Scalars['BigInt']>;
  retired_lte?: InputMaybe<Scalars['BigInt']>;
  retired_not?: InputMaybe<Scalars['BigInt']>;
  retired_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonCreditSnapshot_OrderBy {
  Bridged = 'bridged',
  CreatedAt = 'createdAt',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  CrossChainSupply = 'crossChainSupply',
  CurrentSupply = 'currentSupply',
  Epoch = 'epoch',
  Id = 'id',
  Retired = 'retired'
}

export type CarbonCredit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonCredit_Filter>>>;
  bridgeProtocol?: InputMaybe<BridgeProtocol>;
  bridgeProtocol_in?: InputMaybe<Array<BridgeProtocol>>;
  bridgeProtocol_not?: InputMaybe<BridgeProtocol>;
  bridgeProtocol_not_in?: InputMaybe<Array<BridgeProtocol>>;
  bridged?: InputMaybe<Scalars['BigInt']>;
  bridged_gt?: InputMaybe<Scalars['BigInt']>;
  bridged_gte?: InputMaybe<Scalars['BigInt']>;
  bridged_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridged_lt?: InputMaybe<Scalars['BigInt']>;
  bridged_lte?: InputMaybe<Scalars['BigInt']>;
  bridged_not?: InputMaybe<Scalars['BigInt']>;
  bridged_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridges_?: InputMaybe<Bridge_Filter>;
  crossChainSupply?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply_lt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_lte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonCredit_Filter>>>;
  poolBalances_?: InputMaybe<CarbonPoolCreditBalance_Filter>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<CarbonProject_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retired?: InputMaybe<Scalars['BigInt']>;
  retired_gt?: InputMaybe<Scalars['BigInt']>;
  retired_gte?: InputMaybe<Scalars['BigInt']>;
  retired_in?: InputMaybe<Array<Scalars['BigInt']>>;
  retired_lt?: InputMaybe<Scalars['BigInt']>;
  retired_lte?: InputMaybe<Scalars['BigInt']>;
  retired_not?: InputMaybe<Scalars['BigInt']>;
  retired_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  retires_?: InputMaybe<Retire_Filter>;
  vintage?: InputMaybe<Scalars['Int']>;
  vintage_gt?: InputMaybe<Scalars['Int']>;
  vintage_gte?: InputMaybe<Scalars['Int']>;
  vintage_in?: InputMaybe<Array<Scalars['Int']>>;
  vintage_lt?: InputMaybe<Scalars['Int']>;
  vintage_lte?: InputMaybe<Scalars['Int']>;
  vintage_not?: InputMaybe<Scalars['Int']>;
  vintage_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum CarbonCredit_OrderBy {
  BridgeProtocol = 'bridgeProtocol',
  Bridged = 'bridged',
  Bridges = 'bridges',
  CrossChainSupply = 'crossChainSupply',
  CurrentSupply = 'currentSupply',
  Id = 'id',
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
  Retired = 'retired',
  Retires = 'retires',
  Vintage = 'vintage'
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
  orderBy?: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type CarbonPoolDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type CarbonPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolCreditBalance = {
  __typename?: 'CarbonPoolCreditBalance';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: CarbonCredit;
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
  orderBy?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};

export type CarbonPoolCreditBalanceDailySnapshot = {
  __typename?: 'CarbonPoolCreditBalanceDailySnapshot';
  /** Current balance */
  balance: Scalars['BigInt'];
  /** Credit being pooled */
  credit: CarbonCredit;
  /** ID of the creditBalance entity */
  creditBalance: CarbonPoolCreditBalance;
  /** Day ID of this snapshot */
  dayID?: Maybe<Scalars['Int']>;
  /** Delta balance */
  deltaBalance: Scalars['BigInt'];
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
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolCreditBalanceDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolCreditBalanceDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  credit?: InputMaybe<Scalars['String']>;
  creditBalance?: InputMaybe<Scalars['String']>;
  creditBalance_?: InputMaybe<CarbonPoolCreditBalance_Filter>;
  creditBalance_contains?: InputMaybe<Scalars['String']>;
  creditBalance_contains_nocase?: InputMaybe<Scalars['String']>;
  creditBalance_ends_with?: InputMaybe<Scalars['String']>;
  creditBalance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creditBalance_gt?: InputMaybe<Scalars['String']>;
  creditBalance_gte?: InputMaybe<Scalars['String']>;
  creditBalance_in?: InputMaybe<Array<Scalars['String']>>;
  creditBalance_lt?: InputMaybe<Scalars['String']>;
  creditBalance_lte?: InputMaybe<Scalars['String']>;
  creditBalance_not?: InputMaybe<Scalars['String']>;
  creditBalance_not_contains?: InputMaybe<Scalars['String']>;
  creditBalance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creditBalance_not_ends_with?: InputMaybe<Scalars['String']>;
  creditBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creditBalance_not_in?: InputMaybe<Array<Scalars['String']>>;
  creditBalance_not_starts_with?: InputMaybe<Scalars['String']>;
  creditBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creditBalance_starts_with?: InputMaybe<Scalars['String']>;
  creditBalance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dayID?: InputMaybe<Scalars['Int']>;
  dayID_gt?: InputMaybe<Scalars['Int']>;
  dayID_gte?: InputMaybe<Scalars['Int']>;
  dayID_in?: InputMaybe<Array<Scalars['Int']>>;
  dayID_lt?: InputMaybe<Scalars['Int']>;
  dayID_lte?: InputMaybe<Scalars['Int']>;
  dayID_not?: InputMaybe<Scalars['Int']>;
  dayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  deltaBalance?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_gt?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_gte?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaBalance_lt?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_lte?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_not?: InputMaybe<Scalars['BigInt']>;
  deltaBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaDeposited?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_not?: InputMaybe<Scalars['BigInt']>;
  deltaDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaRedeemed?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_gt?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_gte?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaRedeemed_lt?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_lte?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_not?: InputMaybe<Scalars['BigInt']>;
  deltaRedeemed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposited?: InputMaybe<Scalars['BigInt']>;
  deposited_gt?: InputMaybe<Scalars['BigInt']>;
  deposited_gte?: InputMaybe<Scalars['BigInt']>;
  deposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposited_lt?: InputMaybe<Scalars['BigInt']>;
  deposited_lte?: InputMaybe<Scalars['BigInt']>;
  deposited_not?: InputMaybe<Scalars['BigInt']>;
  deposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_?: InputMaybe<PoolDeposit_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  poolSnapshot?: InputMaybe<Scalars['String']>;
  poolSnapshot_?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshot_contains?: InputMaybe<Scalars['String']>;
  poolSnapshot_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshot_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshot_gt?: InputMaybe<Scalars['String']>;
  poolSnapshot_gte?: InputMaybe<Scalars['String']>;
  poolSnapshot_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshot_lt?: InputMaybe<Scalars['String']>;
  poolSnapshot_lte?: InputMaybe<Scalars['String']>;
  poolSnapshot_not?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_contains?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshot_not_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshot_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  redeemed?: InputMaybe<Scalars['BigInt']>;
  redeemed_gt?: InputMaybe<Scalars['BigInt']>;
  redeemed_gte?: InputMaybe<Scalars['BigInt']>;
  redeemed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  redeemed_lt?: InputMaybe<Scalars['BigInt']>;
  redeemed_lte?: InputMaybe<Scalars['BigInt']>;
  redeemed_not?: InputMaybe<Scalars['BigInt']>;
  redeemed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  redeems_?: InputMaybe<PoolRedeem_Filter>;
};

export enum CarbonPoolCreditBalanceDailySnapshot_OrderBy {
  Balance = 'balance',
  Credit = 'credit',
  CreditBalance = 'creditBalance',
  CreditBalanceBalance = 'creditBalance__balance',
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
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  DayId = 'dayID',
  DeltaBalance = 'deltaBalance',
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

export type CarbonPoolCreditBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dailySnapshots_?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  deposited?: InputMaybe<Scalars['BigInt']>;
  deposited_gt?: InputMaybe<Scalars['BigInt']>;
  deposited_gte?: InputMaybe<Scalars['BigInt']>;
  deposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposited_lt?: InputMaybe<Scalars['BigInt']>;
  deposited_lte?: InputMaybe<Scalars['BigInt']>;
  deposited_not?: InputMaybe<Scalars['BigInt']>;
  deposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastSnapshotDayID?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gt?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gte?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_in?: InputMaybe<Array<Scalars['Int']>>;
  lastSnapshotDayID_lt?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_lte?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gt?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gte?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_in?: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID_lt?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_lte?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonPoolCreditBalance_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  redeemed?: InputMaybe<Scalars['BigInt']>;
  redeemed_gt?: InputMaybe<Scalars['BigInt']>;
  redeemed_gte?: InputMaybe<Scalars['BigInt']>;
  redeemed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  redeemed_lt?: InputMaybe<Scalars['BigInt']>;
  redeemed_lte?: InputMaybe<Scalars['BigInt']>;
  redeemed_not?: InputMaybe<Scalars['BigInt']>;
  redeemed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPoolCreditBalance_OrderBy {
  Balance = 'balance',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
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

export type CarbonPoolDailySnapshot = {
  __typename?: 'CarbonPoolDailySnapshot';
  /** Current balances of underlying project tokens */
  creditBalances: Array<CarbonPoolCreditBalanceDailySnapshot>;
  /** Day ID of this snapshot */
  dayID?: Maybe<Scalars['Int']>;
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
  orderBy?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type CarbonPoolDailySnapshotDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type CarbonPoolDailySnapshotRedeemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolRedeem_Filter>;
};

export type CarbonPoolDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonPoolDailySnapshot_Filter>>>;
  creditBalances_?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  dayID?: InputMaybe<Scalars['Int']>;
  dayID_gt?: InputMaybe<Scalars['Int']>;
  dayID_gte?: InputMaybe<Scalars['Int']>;
  dayID_in?: InputMaybe<Array<Scalars['Int']>>;
  dayID_lt?: InputMaybe<Scalars['Int']>;
  dayID_lte?: InputMaybe<Scalars['Int']>;
  dayID_not?: InputMaybe<Scalars['Int']>;
  dayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  deltaSupply?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_gt?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_gte?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deltaSupply_lt?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_lte?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_not?: InputMaybe<Scalars['BigInt']>;
  deltaSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_?: InputMaybe<PoolDeposit_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonPoolDailySnapshot_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  redeems_?: InputMaybe<PoolRedeem_Filter>;
  supply?: InputMaybe<Scalars['BigInt']>;
  supply_gt?: InputMaybe<Scalars['BigInt']>;
  supply_gte?: InputMaybe<Scalars['BigInt']>;
  supply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt?: InputMaybe<Scalars['BigInt']>;
  supply_lte?: InputMaybe<Scalars['BigInt']>;
  supply_not?: InputMaybe<Scalars['BigInt']>;
  supply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPoolDailySnapshot_OrderBy {
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

export type CarbonPool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonPool_Filter>>>;
  creditBalances_?: InputMaybe<CarbonPoolCreditBalance_Filter>;
  crossChainSupply?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_gte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  crossChainSupply_lt?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_lte?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not?: InputMaybe<Scalars['BigInt']>;
  crossChainSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailySnapshots_?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  deposits_?: InputMaybe<PoolDeposit_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastSnapshotDayID?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gt?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_gte?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_in?: InputMaybe<Array<Scalars['Int']>>;
  lastSnapshotDayID_lt?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_lte?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not?: InputMaybe<Scalars['Int']>;
  lastSnapshotDayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nextSnapshotDayID?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gt?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_gte?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_in?: InputMaybe<Array<Scalars['Int']>>;
  nextSnapshotDayID_lt?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_lte?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not?: InputMaybe<Scalars['Int']>;
  nextSnapshotDayID_not_in?: InputMaybe<Array<Scalars['Int']>>;
  or?: InputMaybe<Array<InputMaybe<CarbonPool_Filter>>>;
  redeems_?: InputMaybe<PoolRedeem_Filter>;
  supply?: InputMaybe<Scalars['BigInt']>;
  supply_gt?: InputMaybe<Scalars['BigInt']>;
  supply_gte?: InputMaybe<Scalars['BigInt']>;
  supply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supply_lt?: InputMaybe<Scalars['BigInt']>;
  supply_lte?: InputMaybe<Scalars['BigInt']>;
  supply_not?: InputMaybe<Scalars['BigInt']>;
  supply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CarbonPool_OrderBy {
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
  orderBy?: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CarbonCredit_Filter>;
};

export type CarbonProject_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CarbonProject_Filter>>>;
  carbonCredits_?: InputMaybe<CarbonCredit_Filter>;
  category?: InputMaybe<Scalars['String']>;
  category_contains?: InputMaybe<Scalars['String']>;
  category_contains_nocase?: InputMaybe<Scalars['String']>;
  category_ends_with?: InputMaybe<Scalars['String']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_gt?: InputMaybe<Scalars['String']>;
  category_gte?: InputMaybe<Scalars['String']>;
  category_in?: InputMaybe<Array<Scalars['String']>>;
  category_lt?: InputMaybe<Scalars['String']>;
  category_lte?: InputMaybe<Scalars['String']>;
  category_not?: InputMaybe<Scalars['String']>;
  category_not_contains?: InputMaybe<Scalars['String']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']>;
  category_not_ends_with?: InputMaybe<Scalars['String']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_in?: InputMaybe<Array<Scalars['String']>>;
  category_not_starts_with?: InputMaybe<Scalars['String']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_starts_with?: InputMaybe<Scalars['String']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  country_contains?: InputMaybe<Scalars['String']>;
  country_contains_nocase?: InputMaybe<Scalars['String']>;
  country_ends_with?: InputMaybe<Scalars['String']>;
  country_ends_with_nocase?: InputMaybe<Scalars['String']>;
  country_gt?: InputMaybe<Scalars['String']>;
  country_gte?: InputMaybe<Scalars['String']>;
  country_in?: InputMaybe<Array<Scalars['String']>>;
  country_lt?: InputMaybe<Scalars['String']>;
  country_lte?: InputMaybe<Scalars['String']>;
  country_not?: InputMaybe<Scalars['String']>;
  country_not_contains?: InputMaybe<Scalars['String']>;
  country_not_contains_nocase?: InputMaybe<Scalars['String']>;
  country_not_ends_with?: InputMaybe<Scalars['String']>;
  country_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  country_not_in?: InputMaybe<Array<Scalars['String']>>;
  country_not_starts_with?: InputMaybe<Scalars['String']>;
  country_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  country_starts_with?: InputMaybe<Scalars['String']>;
  country_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  methodologies?: InputMaybe<Scalars['String']>;
  methodologies_contains?: InputMaybe<Scalars['String']>;
  methodologies_contains_nocase?: InputMaybe<Scalars['String']>;
  methodologies_ends_with?: InputMaybe<Scalars['String']>;
  methodologies_ends_with_nocase?: InputMaybe<Scalars['String']>;
  methodologies_gt?: InputMaybe<Scalars['String']>;
  methodologies_gte?: InputMaybe<Scalars['String']>;
  methodologies_in?: InputMaybe<Array<Scalars['String']>>;
  methodologies_lt?: InputMaybe<Scalars['String']>;
  methodologies_lte?: InputMaybe<Scalars['String']>;
  methodologies_not?: InputMaybe<Scalars['String']>;
  methodologies_not_contains?: InputMaybe<Scalars['String']>;
  methodologies_not_contains_nocase?: InputMaybe<Scalars['String']>;
  methodologies_not_ends_with?: InputMaybe<Scalars['String']>;
  methodologies_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  methodologies_not_in?: InputMaybe<Array<Scalars['String']>>;
  methodologies_not_starts_with?: InputMaybe<Scalars['String']>;
  methodologies_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  methodologies_starts_with?: InputMaybe<Scalars['String']>;
  methodologies_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<CarbonProject_Filter>>>;
  projectID?: InputMaybe<Scalars['String']>;
  projectID_contains?: InputMaybe<Scalars['String']>;
  projectID_contains_nocase?: InputMaybe<Scalars['String']>;
  projectID_ends_with?: InputMaybe<Scalars['String']>;
  projectID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  projectID_gt?: InputMaybe<Scalars['String']>;
  projectID_gte?: InputMaybe<Scalars['String']>;
  projectID_in?: InputMaybe<Array<Scalars['String']>>;
  projectID_lt?: InputMaybe<Scalars['String']>;
  projectID_lte?: InputMaybe<Scalars['String']>;
  projectID_not?: InputMaybe<Scalars['String']>;
  projectID_not_contains?: InputMaybe<Scalars['String']>;
  projectID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  projectID_not_ends_with?: InputMaybe<Scalars['String']>;
  projectID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  projectID_not_in?: InputMaybe<Array<Scalars['String']>>;
  projectID_not_starts_with?: InputMaybe<Scalars['String']>;
  projectID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  projectID_starts_with?: InputMaybe<Scalars['String']>;
  projectID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  region_contains?: InputMaybe<Scalars['String']>;
  region_contains_nocase?: InputMaybe<Scalars['String']>;
  region_ends_with?: InputMaybe<Scalars['String']>;
  region_ends_with_nocase?: InputMaybe<Scalars['String']>;
  region_gt?: InputMaybe<Scalars['String']>;
  region_gte?: InputMaybe<Scalars['String']>;
  region_in?: InputMaybe<Array<Scalars['String']>>;
  region_lt?: InputMaybe<Scalars['String']>;
  region_lte?: InputMaybe<Scalars['String']>;
  region_not?: InputMaybe<Scalars['String']>;
  region_not_contains?: InputMaybe<Scalars['String']>;
  region_not_contains_nocase?: InputMaybe<Scalars['String']>;
  region_not_ends_with?: InputMaybe<Scalars['String']>;
  region_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  region_not_in?: InputMaybe<Array<Scalars['String']>>;
  region_not_starts_with?: InputMaybe<Scalars['String']>;
  region_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  region_starts_with?: InputMaybe<Scalars['String']>;
  region_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registry?: InputMaybe<Registry>;
  registry_in?: InputMaybe<Array<Registry>>;
  registry_not?: InputMaybe<Registry>;
  registry_not_in?: InputMaybe<Array<Registry>>;
};

export enum CarbonProject_OrderBy {
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

export type CrossChainBridge = {
  __typename?: 'CrossChainBridge';
  /** Amount of tokens bridged */
  amount: Scalars['BigInt'];
  /** Bridging address */
  bridger: Scalars['Bytes'];
  /** ID of the credit being bridged, if any */
  credit?: Maybe<CarbonCredit>;
  /** Bridge direction */
  direction: CrossChainBridgeDirection;
  /** Transaction hash of the event */
  hash: Scalars['Bytes'];
  /** {Transaction hash}-{Log Index} */
  id: Scalars['Bytes'];
  /** ID of the pool being bridged, if any */
  pool?: Maybe<CarbonPool>;
  /** Block timestamp of the bridge */
  timestamp: Scalars['BigInt'];
};

export enum CrossChainBridgeDirection {
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type CrossChainBridge_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<CrossChainBridge_Filter>>>;
  bridger?: InputMaybe<Scalars['Bytes']>;
  bridger_contains?: InputMaybe<Scalars['Bytes']>;
  bridger_gt?: InputMaybe<Scalars['Bytes']>;
  bridger_gte?: InputMaybe<Scalars['Bytes']>;
  bridger_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridger_lt?: InputMaybe<Scalars['Bytes']>;
  bridger_lte?: InputMaybe<Scalars['Bytes']>;
  bridger_not?: InputMaybe<Scalars['Bytes']>;
  bridger_not_contains?: InputMaybe<Scalars['Bytes']>;
  bridger_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<CrossChainBridgeDirection>;
  direction_in?: InputMaybe<Array<CrossChainBridgeDirection>>;
  direction_not?: InputMaybe<CrossChainBridgeDirection>;
  direction_not_in?: InputMaybe<Array<CrossChainBridgeDirection>>;
  hash?: InputMaybe<Scalars['Bytes']>;
  hash_contains?: InputMaybe<Scalars['Bytes']>;
  hash_gt?: InputMaybe<Scalars['Bytes']>;
  hash_gte?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']>;
  hash_lte?: InputMaybe<Scalars['Bytes']>;
  hash_not?: InputMaybe<Scalars['Bytes']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<CrossChainBridge_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CrossChainBridge_OrderBy {
  Amount = 'amount',
  Bridger = 'bridger',
  Credit = 'credit',
  CreditBridgeProtocol = 'credit__bridgeProtocol',
  CreditBridged = 'credit__bridged',
  CreditCrossChainSupply = 'credit__crossChainSupply',
  CreditCurrentSupply = 'credit__currentSupply',
  CreditId = 'credit__id',
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

export type Ecosystem = {
  __typename?: 'Ecosystem';
  /** Active credits with supply > 0 */
  activeCredits: Array<Scalars['Bytes']>;
  id: Scalars['ID'];
};

export type Ecosystem_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeCredits?: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not?: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  activeCredits_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<Ecosystem_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Ecosystem_Filter>>>;
};

export enum Ecosystem_OrderBy {
  ActiveCredits = 'activeCredits',
  Id = 'id'
}

export type Holding = {
  __typename?: 'Holding';
  /** Account this belongs to */
  account: Account;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  /** {Account}-{Token} */
  id: Scalars['Bytes'];
  /** Timestamp last updated */
  lastUpdated: Scalars['BigInt'];
  /** Token being held */
  token: Token;
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
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<HoldingDailySnapshot_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<HoldingDailySnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HoldingDailySnapshot_OrderBy {
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

export type Holding_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastUpdated?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Holding_Filter>>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Holding_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  AccountTotalRetirements = 'account__totalRetirements',
  Amount = 'amount',
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
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  feeAmount?: InputMaybe<Scalars['BigInt']>;
  feeAmount_gt?: InputMaybe<Scalars['BigInt']>;
  feeAmount_gte?: InputMaybe<Scalars['BigInt']>;
  feeAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeAmount_lt?: InputMaybe<Scalars['BigInt']>;
  feeAmount_lte?: InputMaybe<Scalars['BigInt']>;
  feeAmount_not?: InputMaybe<Scalars['BigInt']>;
  feeAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  retire?: InputMaybe<Scalars['String']>;
  retire_?: InputMaybe<Retire_Filter>;
  retire_contains?: InputMaybe<Scalars['String']>;
  retire_contains_nocase?: InputMaybe<Scalars['String']>;
  retire_ends_with?: InputMaybe<Scalars['String']>;
  retire_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retire_gt?: InputMaybe<Scalars['String']>;
  retire_gte?: InputMaybe<Scalars['String']>;
  retire_in?: InputMaybe<Array<Scalars['String']>>;
  retire_lt?: InputMaybe<Scalars['String']>;
  retire_lte?: InputMaybe<Scalars['String']>;
  retire_not?: InputMaybe<Scalars['String']>;
  retire_not_contains?: InputMaybe<Scalars['String']>;
  retire_not_contains_nocase?: InputMaybe<Scalars['String']>;
  retire_not_ends_with?: InputMaybe<Scalars['String']>;
  retire_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retire_not_in?: InputMaybe<Array<Scalars['String']>>;
  retire_not_starts_with?: InputMaybe<Scalars['String']>;
  retire_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retire_starts_with?: InputMaybe<Scalars['String']>;
  retire_starts_with_nocase?: InputMaybe<Scalars['String']>;
  specific?: InputMaybe<Scalars['Boolean']>;
  specific_in?: InputMaybe<Array<Scalars['Boolean']>>;
  specific_not?: InputMaybe<Scalars['Boolean']>;
  specific_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum KlimaRetire_OrderBy {
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

export type Methodology = {
  __typename?: 'Methodology';
  approvalDate: Scalars['String'];
  currentVersion: Scalars['String'];
  id: Scalars['ID'];
  scope?: Maybe<Scalars['String']>;
};

export type Methodology_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Methodology_Filter>>>;
  approvalDate?: InputMaybe<Scalars['String']>;
  approvalDate_contains?: InputMaybe<Scalars['String']>;
  approvalDate_contains_nocase?: InputMaybe<Scalars['String']>;
  approvalDate_ends_with?: InputMaybe<Scalars['String']>;
  approvalDate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  approvalDate_gt?: InputMaybe<Scalars['String']>;
  approvalDate_gte?: InputMaybe<Scalars['String']>;
  approvalDate_in?: InputMaybe<Array<Scalars['String']>>;
  approvalDate_lt?: InputMaybe<Scalars['String']>;
  approvalDate_lte?: InputMaybe<Scalars['String']>;
  approvalDate_not?: InputMaybe<Scalars['String']>;
  approvalDate_not_contains?: InputMaybe<Scalars['String']>;
  approvalDate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  approvalDate_not_ends_with?: InputMaybe<Scalars['String']>;
  approvalDate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  approvalDate_not_in?: InputMaybe<Array<Scalars['String']>>;
  approvalDate_not_starts_with?: InputMaybe<Scalars['String']>;
  approvalDate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  approvalDate_starts_with?: InputMaybe<Scalars['String']>;
  approvalDate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentVersion?: InputMaybe<Scalars['String']>;
  currentVersion_contains?: InputMaybe<Scalars['String']>;
  currentVersion_contains_nocase?: InputMaybe<Scalars['String']>;
  currentVersion_ends_with?: InputMaybe<Scalars['String']>;
  currentVersion_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentVersion_gt?: InputMaybe<Scalars['String']>;
  currentVersion_gte?: InputMaybe<Scalars['String']>;
  currentVersion_in?: InputMaybe<Array<Scalars['String']>>;
  currentVersion_lt?: InputMaybe<Scalars['String']>;
  currentVersion_lte?: InputMaybe<Scalars['String']>;
  currentVersion_not?: InputMaybe<Scalars['String']>;
  currentVersion_not_contains?: InputMaybe<Scalars['String']>;
  currentVersion_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentVersion_not_ends_with?: InputMaybe<Scalars['String']>;
  currentVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentVersion_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentVersion_not_starts_with?: InputMaybe<Scalars['String']>;
  currentVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentVersion_starts_with?: InputMaybe<Scalars['String']>;
  currentVersion_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Methodology_Filter>>>;
  scope?: InputMaybe<Scalars['String']>;
  scope_contains?: InputMaybe<Scalars['String']>;
  scope_contains_nocase?: InputMaybe<Scalars['String']>;
  scope_ends_with?: InputMaybe<Scalars['String']>;
  scope_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scope_gt?: InputMaybe<Scalars['String']>;
  scope_gte?: InputMaybe<Scalars['String']>;
  scope_in?: InputMaybe<Array<Scalars['String']>>;
  scope_lt?: InputMaybe<Scalars['String']>;
  scope_lte?: InputMaybe<Scalars['String']>;
  scope_not?: InputMaybe<Scalars['String']>;
  scope_not_contains?: InputMaybe<Scalars['String']>;
  scope_not_contains_nocase?: InputMaybe<Scalars['String']>;
  scope_not_ends_with?: InputMaybe<Scalars['String']>;
  scope_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scope_not_in?: InputMaybe<Array<Scalars['String']>>;
  scope_not_starts_with?: InputMaybe<Scalars['String']>;
  scope_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scope_starts_with?: InputMaybe<Scalars['String']>;
  scope_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Methodology_OrderBy {
  ApprovalDate = 'approvalDate',
  CurrentVersion = 'currentVersion',
  Id = 'id',
  Scope = 'scope'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
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
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<PoolDeposit_Filter>>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<PoolDeposit_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  poolCreditSnapshotID_contains?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_contains_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gt?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gte?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_in?: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_lt?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_lte?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_not_starts_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID?: InputMaybe<Scalars['String']>;
  poolSnapshotID_?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshotID_contains?: InputMaybe<Scalars['String']>;
  poolSnapshotID_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_gt?: InputMaybe<Scalars['String']>;
  poolSnapshotID_gte?: InputMaybe<Scalars['String']>;
  poolSnapshotID_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_lt?: InputMaybe<Scalars['String']>;
  poolSnapshotID_lte?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_not_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum PoolDeposit_OrderBy {
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
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Pool = 'pool',
  PoolCreditSnapshotId = 'poolCreditSnapshotID',
  PoolCreditSnapshotIdBalance = 'poolCreditSnapshotID__balance',
  PoolCreditSnapshotIdDayId = 'poolCreditSnapshotID__dayID',
  PoolCreditSnapshotIdDeltaBalance = 'poolCreditSnapshotID__deltaBalance',
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
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<PoolRedeem_Filter>>>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<PoolRedeem_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
  poolCreditSnapshotID_contains?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_contains_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gt?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_gte?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_in?: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_lt?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_lte?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolCreditSnapshotID_not_starts_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with?: InputMaybe<Scalars['String']>;
  poolCreditSnapshotID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID?: InputMaybe<Scalars['String']>;
  poolSnapshotID_?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
  poolSnapshotID_contains?: InputMaybe<Scalars['String']>;
  poolSnapshotID_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_gt?: InputMaybe<Scalars['String']>;
  poolSnapshotID_gte?: InputMaybe<Scalars['String']>;
  poolSnapshotID_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_lt?: InputMaybe<Scalars['String']>;
  poolSnapshotID_lte?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolSnapshotID_not_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with?: InputMaybe<Scalars['String']>;
  poolSnapshotID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum PoolRedeem_OrderBy {
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
  CreditRetired = 'credit__retired',
  CreditVintage = 'credit__vintage',
  Id = 'id',
  Pool = 'pool',
  PoolCreditSnapshotId = 'poolCreditSnapshotID',
  PoolCreditSnapshotIdBalance = 'poolCreditSnapshotID__balance',
  PoolCreditSnapshotIdDayId = 'poolCreditSnapshotID__dayID',
  PoolCreditSnapshotIdDeltaBalance = 'poolCreditSnapshotID__deltaBalance',
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

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  bridge?: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonCredit?: Maybe<CarbonCredit>;
  carbonCreditSnapshot?: Maybe<CarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<CarbonCreditSnapshot>;
  carbonCredits: Array<CarbonCredit>;
  carbonPool?: Maybe<CarbonPool>;
  carbonPoolCreditBalance?: Maybe<CarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot?: Maybe<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<CarbonPoolCreditBalance>;
  carbonPoolDailySnapshot?: Maybe<CarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<CarbonPoolDailySnapshot>;
  carbonPools: Array<CarbonPool>;
  carbonProject?: Maybe<CarbonProject>;
  carbonProjects: Array<CarbonProject>;
  crossChainBridge?: Maybe<CrossChainBridge>;
  crossChainBridges: Array<CrossChainBridge>;
  ecosystem?: Maybe<Ecosystem>;
  ecosystems: Array<Ecosystem>;
  holding?: Maybe<Holding>;
  holdingDailySnapshot?: Maybe<HoldingDailySnapshot>;
  holdingDailySnapshots: Array<HoldingDailySnapshot>;
  holdings: Array<Holding>;
  klimaRetire?: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  methodologies: Array<Methodology>;
  methodology?: Maybe<Methodology>;
  poolDeposit?: Maybe<PoolDeposit>;
  poolDeposits: Array<PoolDeposit>;
  poolRedeem?: Maybe<PoolRedeem>;
  poolRedeems: Array<PoolRedeem>;
  retire?: Maybe<Retire>;
  retires: Array<Retire>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryBridgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBridgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bridge_Filter>;
};


export type QueryCarbonCreditArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonCreditSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonCreditSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonCreditSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonCreditSnapshot_Filter>;
};


export type QueryCarbonCreditsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonCredit_Filter>;
};


export type QueryCarbonPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type QueryCarbonPoolCreditBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type QueryCarbonPoolDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonPoolDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type QueryCarbonPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPool_Filter>;
};


export type QueryCarbonProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonProject_Filter>;
};


export type QueryCrossChainBridgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrossChainBridgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossChainBridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossChainBridge_Filter>;
};


export type QueryEcosystemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEcosystemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ecosystem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ecosystem_Filter>;
};


export type QueryHoldingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldingDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHoldingDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type QueryHoldingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Holding_Filter>;
};


export type QueryKlimaRetireArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKlimaRetiresArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<KlimaRetire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<KlimaRetire_Filter>;
};


export type QueryMethodologiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Methodology_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Methodology_Filter>;
};


export type QueryMethodologyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type QueryPoolRedeemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolRedeemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolRedeem_Filter>;
};


export type QueryRetireArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRetiresArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Retire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Retire_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export enum Registry {
  GoldStandard = 'GOLD_STANDARD',
  PuroEarth = 'PURO_EARTH',
  Verra = 'VERRA'
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
  bridgeID?: Maybe<Scalars['String']>;
  /** Carbon credit being retired */
  credit: CarbonCredit;
  /** {Account}-{Total Retirement Counter} */
  id: Scalars['Bytes'];
  klimaRetire?: Maybe<KlimaRetire>;
  /** Pool credit was sourced from, if any */
  pool?: Maybe<CarbonPool>;
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
  Klima = 'KLIMA',
  Other = 'OTHER'
}

export type Retire_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  beneficiaryAddress?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_?: InputMaybe<Account_Filter>;
  beneficiaryAddress_contains?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_ends_with?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_gt?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_gte?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiaryAddress_lt?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_lte?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_contains?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiaryAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_starts_with?: InputMaybe<Scalars['String']>;
  beneficiaryAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName?: InputMaybe<Scalars['String']>;
  beneficiaryName_contains?: InputMaybe<Scalars['String']>;
  beneficiaryName_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName_ends_with?: InputMaybe<Scalars['String']>;
  beneficiaryName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName_gt?: InputMaybe<Scalars['String']>;
  beneficiaryName_gte?: InputMaybe<Scalars['String']>;
  beneficiaryName_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiaryName_lt?: InputMaybe<Scalars['String']>;
  beneficiaryName_lte?: InputMaybe<Scalars['String']>;
  beneficiaryName_not?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_contains?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_ends_with?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiaryName_not_starts_with?: InputMaybe<Scalars['String']>;
  beneficiaryName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiaryName_starts_with?: InputMaybe<Scalars['String']>;
  beneficiaryName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgeID?: InputMaybe<Scalars['String']>;
  bridgeID_contains?: InputMaybe<Scalars['String']>;
  bridgeID_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgeID_ends_with?: InputMaybe<Scalars['String']>;
  bridgeID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgeID_gt?: InputMaybe<Scalars['String']>;
  bridgeID_gte?: InputMaybe<Scalars['String']>;
  bridgeID_in?: InputMaybe<Array<Scalars['String']>>;
  bridgeID_lt?: InputMaybe<Scalars['String']>;
  bridgeID_lte?: InputMaybe<Scalars['String']>;
  bridgeID_not?: InputMaybe<Scalars['String']>;
  bridgeID_not_contains?: InputMaybe<Scalars['String']>;
  bridgeID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgeID_not_ends_with?: InputMaybe<Scalars['String']>;
  bridgeID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgeID_not_in?: InputMaybe<Array<Scalars['String']>>;
  bridgeID_not_starts_with?: InputMaybe<Scalars['String']>;
  bridgeID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgeID_starts_with?: InputMaybe<Scalars['String']>;
  bridgeID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit?: InputMaybe<Scalars['String']>;
  credit_?: InputMaybe<CarbonCredit_Filter>;
  credit_contains?: InputMaybe<Scalars['String']>;
  credit_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_ends_with?: InputMaybe<Scalars['String']>;
  credit_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_gt?: InputMaybe<Scalars['String']>;
  credit_gte?: InputMaybe<Scalars['String']>;
  credit_in?: InputMaybe<Array<Scalars['String']>>;
  credit_lt?: InputMaybe<Scalars['String']>;
  credit_lte?: InputMaybe<Scalars['String']>;
  credit_not?: InputMaybe<Scalars['String']>;
  credit_not_contains?: InputMaybe<Scalars['String']>;
  credit_not_contains_nocase?: InputMaybe<Scalars['String']>;
  credit_not_ends_with?: InputMaybe<Scalars['String']>;
  credit_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  credit_not_in?: InputMaybe<Array<Scalars['String']>>;
  credit_not_starts_with?: InputMaybe<Scalars['String']>;
  credit_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  credit_starts_with?: InputMaybe<Scalars['String']>;
  credit_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  klimaRetire_?: InputMaybe<KlimaRetire_Filter>;
  or?: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<CarbonPool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage?: InputMaybe<Scalars['String']>;
  retirementMessage_contains?: InputMaybe<Scalars['String']>;
  retirementMessage_contains_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage_ends_with?: InputMaybe<Scalars['String']>;
  retirementMessage_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage_gt?: InputMaybe<Scalars['String']>;
  retirementMessage_gte?: InputMaybe<Scalars['String']>;
  retirementMessage_in?: InputMaybe<Array<Scalars['String']>>;
  retirementMessage_lt?: InputMaybe<Scalars['String']>;
  retirementMessage_lte?: InputMaybe<Scalars['String']>;
  retirementMessage_not?: InputMaybe<Scalars['String']>;
  retirementMessage_not_contains?: InputMaybe<Scalars['String']>;
  retirementMessage_not_contains_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  retirementMessage_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage_not_in?: InputMaybe<Array<Scalars['String']>>;
  retirementMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  retirementMessage_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retirementMessage_starts_with?: InputMaybe<Scalars['String']>;
  retirementMessage_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress?: InputMaybe<Scalars['String']>;
  retiringAddress_?: InputMaybe<Account_Filter>;
  retiringAddress_contains?: InputMaybe<Scalars['String']>;
  retiringAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress_ends_with?: InputMaybe<Scalars['String']>;
  retiringAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress_gt?: InputMaybe<Scalars['String']>;
  retiringAddress_gte?: InputMaybe<Scalars['String']>;
  retiringAddress_in?: InputMaybe<Array<Scalars['String']>>;
  retiringAddress_lt?: InputMaybe<Scalars['String']>;
  retiringAddress_lte?: InputMaybe<Scalars['String']>;
  retiringAddress_not?: InputMaybe<Scalars['String']>;
  retiringAddress_not_contains?: InputMaybe<Scalars['String']>;
  retiringAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  retiringAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  retiringAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  retiringAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retiringAddress_starts_with?: InputMaybe<Scalars['String']>;
  retiringAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retiringName?: InputMaybe<Scalars['String']>;
  retiringName_contains?: InputMaybe<Scalars['String']>;
  retiringName_contains_nocase?: InputMaybe<Scalars['String']>;
  retiringName_ends_with?: InputMaybe<Scalars['String']>;
  retiringName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retiringName_gt?: InputMaybe<Scalars['String']>;
  retiringName_gte?: InputMaybe<Scalars['String']>;
  retiringName_in?: InputMaybe<Array<Scalars['String']>>;
  retiringName_lt?: InputMaybe<Scalars['String']>;
  retiringName_lte?: InputMaybe<Scalars['String']>;
  retiringName_not?: InputMaybe<Scalars['String']>;
  retiringName_not_contains?: InputMaybe<Scalars['String']>;
  retiringName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  retiringName_not_ends_with?: InputMaybe<Scalars['String']>;
  retiringName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  retiringName_not_in?: InputMaybe<Array<Scalars['String']>>;
  retiringName_not_starts_with?: InputMaybe<Scalars['String']>;
  retiringName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  retiringName_starts_with?: InputMaybe<Scalars['String']>;
  retiringName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<RetireSource>;
  source_in?: InputMaybe<Array<RetireSource>>;
  source_not?: InputMaybe<RetireSource>;
  source_not_in?: InputMaybe<Array<RetireSource>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Retire_OrderBy {
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  bridge?: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonCredit?: Maybe<CarbonCredit>;
  carbonCreditSnapshot?: Maybe<CarbonCreditSnapshot>;
  carbonCreditSnapshots: Array<CarbonCreditSnapshot>;
  carbonCredits: Array<CarbonCredit>;
  carbonPool?: Maybe<CarbonPool>;
  carbonPoolCreditBalance?: Maybe<CarbonPoolCreditBalance>;
  carbonPoolCreditBalanceDailySnapshot?: Maybe<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalanceDailySnapshots: Array<CarbonPoolCreditBalanceDailySnapshot>;
  carbonPoolCreditBalances: Array<CarbonPoolCreditBalance>;
  carbonPoolDailySnapshot?: Maybe<CarbonPoolDailySnapshot>;
  carbonPoolDailySnapshots: Array<CarbonPoolDailySnapshot>;
  carbonPools: Array<CarbonPool>;
  carbonProject?: Maybe<CarbonProject>;
  carbonProjects: Array<CarbonProject>;
  crossChainBridge?: Maybe<CrossChainBridge>;
  crossChainBridges: Array<CrossChainBridge>;
  ecosystem?: Maybe<Ecosystem>;
  ecosystems: Array<Ecosystem>;
  holding?: Maybe<Holding>;
  holdingDailySnapshot?: Maybe<HoldingDailySnapshot>;
  holdingDailySnapshots: Array<HoldingDailySnapshot>;
  holdings: Array<Holding>;
  klimaRetire?: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  methodologies: Array<Methodology>;
  methodology?: Maybe<Methodology>;
  poolDeposit?: Maybe<PoolDeposit>;
  poolDeposits: Array<PoolDeposit>;
  poolRedeem?: Maybe<PoolRedeem>;
  poolRedeems: Array<PoolRedeem>;
  retire?: Maybe<Retire>;
  retires: Array<Retire>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionBridgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBridgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bridge_Filter>;
};


export type SubscriptionCarbonCreditArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonCreditSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonCreditSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonCreditSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonCreditSnapshot_Filter>;
};


export type SubscriptionCarbonCreditsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonCredit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonCredit_Filter>;
};


export type SubscriptionCarbonPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolCreditBalanceDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolCreditBalanceDailySnapshot_Filter>;
};


export type SubscriptionCarbonPoolCreditBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolCreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolCreditBalance_Filter>;
};


export type SubscriptionCarbonPoolDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonPoolDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPoolDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPoolDailySnapshot_Filter>;
};


export type SubscriptionCarbonPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonPool_Filter>;
};


export type SubscriptionCarbonProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CarbonProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CarbonProject_Filter>;
};


export type SubscriptionCrossChainBridgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrossChainBridgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossChainBridge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossChainBridge_Filter>;
};


export type SubscriptionEcosystemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEcosystemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ecosystem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ecosystem_Filter>;
};


export type SubscriptionHoldingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldingDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHoldingDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HoldingDailySnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HoldingDailySnapshot_Filter>;
};


export type SubscriptionHoldingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Holding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Holding_Filter>;
};


export type SubscriptionKlimaRetireArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKlimaRetiresArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<KlimaRetire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<KlimaRetire_Filter>;
};


export type SubscriptionMethodologiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Methodology_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Methodology_Filter>;
};


export type SubscriptionMethodologyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDeposit_Filter>;
};


export type SubscriptionPoolRedeemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolRedeemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolRedeem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolRedeem_Filter>;
};


export type SubscriptionRetireArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRetiresArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Retire_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Retire_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  /** Decimals of the token */
  decimals: Scalars['Int'];
  /** Ethereum contract address */
  id: Scalars['Bytes'];
  /** Latest price in KLIMA */
  latestPricePerKLIMA?: Maybe<Scalars['BigDecimal']>;
  /** Latest price in KLIMAupdate timestamp */
  latestPricePerKLIMAUpdated?: Maybe<Scalars['BigInt']>;
  /** Latest price in USD */
  latestPriceUSD?: Maybe<Scalars['BigDecimal']>;
  /** Latest price update timestamp */
  latestPriceUSDUpdated?: Maybe<Scalars['BigInt']>;
  /** Name of the token */
  name: Scalars['String'];
  /** Symbol of the token */
  symbol: Scalars['String'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  latestPricePerKLIMA?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMAUpdated?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPricePerKLIMAUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_not?: InputMaybe<Scalars['BigInt']>;
  latestPricePerKLIMAUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPricePerKLIMA_gt?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_gte?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPricePerKLIMA_lt?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_lte?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_not?: InputMaybe<Scalars['BigDecimal']>;
  latestPricePerKLIMA_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSDUpdated?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPriceUSDUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_not?: InputMaybe<Scalars['BigInt']>;
  latestPriceUSDUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  latestPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  LatestPricePerKlima = 'latestPricePerKLIMA',
  LatestPricePerKlimaUpdated = 'latestPricePerKLIMAUpdated',
  LatestPriceUsd = 'latestPriceUSD',
  LatestPriceUsdUpdated = 'latestPriceUSDUpdated',
  Name = 'name',
  Symbol = 'symbol'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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

export type GetCarbonProjectsByProjectIdAndVintageQueryVariables = Exact<{
  projectID: Scalars['String'];
  vintage?: InputMaybe<Scalars['Int']>;
}>;


export type GetCarbonProjectsByProjectIdAndVintageQuery = { __typename?: 'Query', carbonProjects: Array<{ __typename?: 'CarbonProject', registry: Registry, region: string, projectID: string, name: string, methodologies: string, id: string, country: string, category: string, carbonCredits: Array<{ __typename?: 'CarbonCredit', vintage: number, currentSupply: string, id: any, crossChainSupply: string, bridgeProtocol: BridgeProtocol, bridged: string, retired: string, poolBalances: Array<{ __typename?: 'CarbonPoolCreditBalance', balance: string, id: any, deposited: string, redeemed: string, pool: { __typename?: 'CarbonPool', name: string, supply: string, id: any } }> }> }> };


export const GetCarbonProjectsByProjectIdAndVintageDocument = gql`
    query getCarbonProjectsByProjectIDAndVintage($projectID: String!, $vintage: Int) {
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
    getCarbonProjectsByProjectIDAndVintage(variables: GetCarbonProjectsByProjectIdAndVintageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCarbonProjectsByProjectIdAndVintageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCarbonProjectsByProjectIdAndVintageQuery>(GetCarbonProjectsByProjectIdAndVintageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonProjectsByProjectIDAndVintage', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;