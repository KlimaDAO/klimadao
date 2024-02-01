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

export type Bridge = {
  __typename?: 'Bridge';
  bridger: Scalars['String'];
  id: Scalars['ID'];
  offset: CarbonOffset;
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
  value: Scalars['BigDecimal'];
};

export enum BridgeDirection {
  Received = 'Received',
  Sent = 'Sent'
}

export type Bridge_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  bridger: InputMaybe<Scalars['String']>;
  bridger_contains: InputMaybe<Scalars['String']>;
  bridger_contains_nocase: InputMaybe<Scalars['String']>;
  bridger_ends_with: InputMaybe<Scalars['String']>;
  bridger_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridger_gt: InputMaybe<Scalars['String']>;
  bridger_gte: InputMaybe<Scalars['String']>;
  bridger_in: InputMaybe<Array<Scalars['String']>>;
  bridger_lt: InputMaybe<Scalars['String']>;
  bridger_lte: InputMaybe<Scalars['String']>;
  bridger_not: InputMaybe<Scalars['String']>;
  bridger_not_contains: InputMaybe<Scalars['String']>;
  bridger_not_contains_nocase: InputMaybe<Scalars['String']>;
  bridger_not_ends_with: InputMaybe<Scalars['String']>;
  bridger_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridger_not_in: InputMaybe<Array<Scalars['String']>>;
  bridger_not_starts_with: InputMaybe<Scalars['String']>;
  bridger_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridger_starts_with: InputMaybe<Scalars['String']>;
  bridger_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Bridge_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['BigDecimal']>;
  value_gt: InputMaybe<Scalars['BigDecimal']>;
  value_gte: InputMaybe<Scalars['BigDecimal']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']>;
  value_lte: InputMaybe<Scalars['BigDecimal']>;
  value_not: InputMaybe<Scalars['BigDecimal']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Bridge_OrderBy {
  Bridger = 'bridger',
  Id = 'id',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value',
  Value = 'value'
}

export type CarbonMetric = {
  __typename?: 'CarbonMetric';
  bctCrosschainSupply: Scalars['BigDecimal'];
  bctKlimaRetired: Scalars['BigDecimal'];
  bctRedeemed: Scalars['BigDecimal'];
  bctSupply: Scalars['BigDecimal'];
  c3tRetired: Scalars['BigDecimal'];
  id: Scalars['ID'];
  mco2KlimaRetired: Scalars['BigDecimal'];
  mco2Retired: Scalars['BigDecimal'];
  mco2Supply: Scalars['BigDecimal'];
  nboKlimaRetired: Scalars['BigDecimal'];
  nboRedeemed: Scalars['BigDecimal'];
  nboSupply: Scalars['BigDecimal'];
  nctCrosschainSupply: Scalars['BigDecimal'];
  nctKlimaRetired: Scalars['BigDecimal'];
  nctRedeemed: Scalars['BigDecimal'];
  nctSupply: Scalars['BigDecimal'];
  tco2Retired: Scalars['BigDecimal'];
  timestamp: Scalars['BigInt'];
  totalCarbonSupply: Scalars['BigDecimal'];
  totalCrosschainSupply: Scalars['BigDecimal'];
  totalKlimaRetirements: Scalars['BigDecimal'];
  totalRetirements: Scalars['BigDecimal'];
  uboKlimaRetired: Scalars['BigDecimal'];
  uboRedeemed: Scalars['BigDecimal'];
  uboSupply: Scalars['BigDecimal'];
};

export type CarbonMetric_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CarbonMetric_Filter>>>;
  bctCrosschainSupply: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctCrosschainSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_not: InputMaybe<Scalars['BigDecimal']>;
  bctCrosschainSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctKlimaRetired: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctKlimaRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_not: InputMaybe<Scalars['BigDecimal']>;
  bctKlimaRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctRedeemed: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_gt: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_gte: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctRedeemed_lt: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_lte: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_not: InputMaybe<Scalars['BigDecimal']>;
  bctRedeemed_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctSupply: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bctSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_not: InputMaybe<Scalars['BigDecimal']>;
  bctSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  c3tRetired: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  c3tRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_not: InputMaybe<Scalars['BigDecimal']>;
  c3tRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  mco2KlimaRetired: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mco2KlimaRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_not: InputMaybe<Scalars['BigDecimal']>;
  mco2KlimaRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mco2Retired: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_gt: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_gte: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mco2Retired_lt: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_lte: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_not: InputMaybe<Scalars['BigDecimal']>;
  mco2Retired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mco2Supply: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_gt: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_gte: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mco2Supply_lt: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_lte: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_not: InputMaybe<Scalars['BigDecimal']>;
  mco2Supply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboKlimaRetired: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboKlimaRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_not: InputMaybe<Scalars['BigDecimal']>;
  nboKlimaRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboRedeemed: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_gt: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_gte: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboRedeemed_lt: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_lte: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_not: InputMaybe<Scalars['BigDecimal']>;
  nboRedeemed_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboSupply: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nboSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_not: InputMaybe<Scalars['BigDecimal']>;
  nboSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctCrosschainSupply: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctCrosschainSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_not: InputMaybe<Scalars['BigDecimal']>;
  nctCrosschainSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctKlimaRetired: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctKlimaRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_not: InputMaybe<Scalars['BigDecimal']>;
  nctKlimaRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctRedeemed: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_gt: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_gte: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctRedeemed_lt: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_lte: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_not: InputMaybe<Scalars['BigDecimal']>;
  nctRedeemed_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctSupply: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  nctSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_not: InputMaybe<Scalars['BigDecimal']>;
  nctSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  or: InputMaybe<Array<InputMaybe<CarbonMetric_Filter>>>;
  tco2Retired: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_gt: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_gte: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tco2Retired_lt: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_lte: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_not: InputMaybe<Scalars['BigDecimal']>;
  tco2Retired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalCarbonSupply: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCarbonSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_not: InputMaybe<Scalars['BigDecimal']>;
  totalCarbonSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCrosschainSupply: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCrosschainSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_not: InputMaybe<Scalars['BigDecimal']>;
  totalCrosschainSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalKlimaRetirements: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_gt: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_gte: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalKlimaRetirements_lt: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_lte: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_not: InputMaybe<Scalars['BigDecimal']>;
  totalKlimaRetirements_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalRetirements: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_gt: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_gte: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalRetirements_lt: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_lte: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_not: InputMaybe<Scalars['BigDecimal']>;
  totalRetirements_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboKlimaRetired: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboKlimaRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_not: InputMaybe<Scalars['BigDecimal']>;
  uboKlimaRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboRedeemed: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_gt: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_gte: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboRedeemed_lt: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_lte: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_not: InputMaybe<Scalars['BigDecimal']>;
  uboRedeemed_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboSupply: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  uboSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_not: InputMaybe<Scalars['BigDecimal']>;
  uboSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum CarbonMetric_OrderBy {
  BctCrosschainSupply = 'bctCrosschainSupply',
  BctKlimaRetired = 'bctKlimaRetired',
  BctRedeemed = 'bctRedeemed',
  BctSupply = 'bctSupply',
  C3tRetired = 'c3tRetired',
  Id = 'id',
  Mco2KlimaRetired = 'mco2KlimaRetired',
  Mco2Retired = 'mco2Retired',
  Mco2Supply = 'mco2Supply',
  NboKlimaRetired = 'nboKlimaRetired',
  NboRedeemed = 'nboRedeemed',
  NboSupply = 'nboSupply',
  NctCrosschainSupply = 'nctCrosschainSupply',
  NctKlimaRetired = 'nctKlimaRetired',
  NctRedeemed = 'nctRedeemed',
  NctSupply = 'nctSupply',
  Tco2Retired = 'tco2Retired',
  Timestamp = 'timestamp',
  TotalCarbonSupply = 'totalCarbonSupply',
  TotalCrosschainSupply = 'totalCrosschainSupply',
  TotalKlimaRetirements = 'totalKlimaRetirements',
  TotalRetirements = 'totalRetirements',
  UboKlimaRetired = 'uboKlimaRetired',
  UboRedeemed = 'uboRedeemed',
  UboSupply = 'uboSupply'
}

export type CarbonOffset = {
  __typename?: 'CarbonOffset';
  additionalCertification: Scalars['String'];
  balanceBCT: Scalars['BigDecimal'];
  balanceNBO: Scalars['BigDecimal'];
  balanceNCT: Scalars['BigDecimal'];
  balanceUBO: Scalars['BigDecimal'];
  bridge: Scalars['String'];
  bridges: Maybe<Array<Bridge>>;
  category: Scalars['String'];
  coBenefits: Scalars['String'];
  correspAdjustment: Scalars['String'];
  country: Scalars['String'];
  currentSupply: Scalars['BigDecimal'];
  emissionType: Scalars['String'];
  id: Scalars['ID'];
  isCorsiaCompliant: Maybe<Scalars['Boolean']>;
  klimaRanking: Scalars['BigInt'];
  lastUpdate: Scalars['BigInt'];
  method: Scalars['String'];
  methodology: Scalars['String'];
  methodologyCategory: Scalars['String'];
  name: Scalars['String'];
  projectID: Scalars['String'];
  region: Scalars['String'];
  registry: Scalars['String'];
  retirements: Maybe<Array<Retire>>;
  standard: Scalars['String'];
  storageMethod: Scalars['String'];
  tokenAddress: Scalars['String'];
  totalBridged: Scalars['BigDecimal'];
  totalRetired: Scalars['BigDecimal'];
  vintage: Scalars['String'];
  vintageYear: Scalars['String'];
};


export type CarbonOffsetBridgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Bridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Bridge_Filter>;
};


export type CarbonOffsetRetirementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Retire_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Retire_Filter>;
};

export type CarbonOffset_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  additionalCertification: InputMaybe<Scalars['String']>;
  additionalCertification_contains: InputMaybe<Scalars['String']>;
  additionalCertification_contains_nocase: InputMaybe<Scalars['String']>;
  additionalCertification_ends_with: InputMaybe<Scalars['String']>;
  additionalCertification_ends_with_nocase: InputMaybe<Scalars['String']>;
  additionalCertification_gt: InputMaybe<Scalars['String']>;
  additionalCertification_gte: InputMaybe<Scalars['String']>;
  additionalCertification_in: InputMaybe<Array<Scalars['String']>>;
  additionalCertification_lt: InputMaybe<Scalars['String']>;
  additionalCertification_lte: InputMaybe<Scalars['String']>;
  additionalCertification_not: InputMaybe<Scalars['String']>;
  additionalCertification_not_contains: InputMaybe<Scalars['String']>;
  additionalCertification_not_contains_nocase: InputMaybe<Scalars['String']>;
  additionalCertification_not_ends_with: InputMaybe<Scalars['String']>;
  additionalCertification_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  additionalCertification_not_in: InputMaybe<Array<Scalars['String']>>;
  additionalCertification_not_starts_with: InputMaybe<Scalars['String']>;
  additionalCertification_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  additionalCertification_starts_with: InputMaybe<Scalars['String']>;
  additionalCertification_starts_with_nocase: InputMaybe<Scalars['String']>;
  and: InputMaybe<Array<InputMaybe<CarbonOffset_Filter>>>;
  balanceBCT: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_gt: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_gte: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceBCT_lt: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_lte: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_not: InputMaybe<Scalars['BigDecimal']>;
  balanceBCT_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceNBO: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_gt: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_gte: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceNBO_lt: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_lte: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_not: InputMaybe<Scalars['BigDecimal']>;
  balanceNBO_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceNCT: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_gt: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_gte: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceNCT_lt: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_lte: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_not: InputMaybe<Scalars['BigDecimal']>;
  balanceNCT_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceUBO: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_gt: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_gte: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceUBO_lt: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_lte: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_not: InputMaybe<Scalars['BigDecimal']>;
  balanceUBO_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bridge: InputMaybe<Scalars['String']>;
  bridge_contains: InputMaybe<Scalars['String']>;
  bridge_contains_nocase: InputMaybe<Scalars['String']>;
  bridge_ends_with: InputMaybe<Scalars['String']>;
  bridge_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridge_gt: InputMaybe<Scalars['String']>;
  bridge_gte: InputMaybe<Scalars['String']>;
  bridge_in: InputMaybe<Array<Scalars['String']>>;
  bridge_lt: InputMaybe<Scalars['String']>;
  bridge_lte: InputMaybe<Scalars['String']>;
  bridge_not: InputMaybe<Scalars['String']>;
  bridge_not_contains: InputMaybe<Scalars['String']>;
  bridge_not_contains_nocase: InputMaybe<Scalars['String']>;
  bridge_not_ends_with: InputMaybe<Scalars['String']>;
  bridge_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridge_not_in: InputMaybe<Array<Scalars['String']>>;
  bridge_not_starts_with: InputMaybe<Scalars['String']>;
  bridge_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridge_starts_with: InputMaybe<Scalars['String']>;
  bridge_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridges_: InputMaybe<Bridge_Filter>;
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
  coBenefits: InputMaybe<Scalars['String']>;
  coBenefits_contains: InputMaybe<Scalars['String']>;
  coBenefits_contains_nocase: InputMaybe<Scalars['String']>;
  coBenefits_ends_with: InputMaybe<Scalars['String']>;
  coBenefits_ends_with_nocase: InputMaybe<Scalars['String']>;
  coBenefits_gt: InputMaybe<Scalars['String']>;
  coBenefits_gte: InputMaybe<Scalars['String']>;
  coBenefits_in: InputMaybe<Array<Scalars['String']>>;
  coBenefits_lt: InputMaybe<Scalars['String']>;
  coBenefits_lte: InputMaybe<Scalars['String']>;
  coBenefits_not: InputMaybe<Scalars['String']>;
  coBenefits_not_contains: InputMaybe<Scalars['String']>;
  coBenefits_not_contains_nocase: InputMaybe<Scalars['String']>;
  coBenefits_not_ends_with: InputMaybe<Scalars['String']>;
  coBenefits_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  coBenefits_not_in: InputMaybe<Array<Scalars['String']>>;
  coBenefits_not_starts_with: InputMaybe<Scalars['String']>;
  coBenefits_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  coBenefits_starts_with: InputMaybe<Scalars['String']>;
  coBenefits_starts_with_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment: InputMaybe<Scalars['String']>;
  correspAdjustment_contains: InputMaybe<Scalars['String']>;
  correspAdjustment_contains_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment_ends_with: InputMaybe<Scalars['String']>;
  correspAdjustment_ends_with_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment_gt: InputMaybe<Scalars['String']>;
  correspAdjustment_gte: InputMaybe<Scalars['String']>;
  correspAdjustment_in: InputMaybe<Array<Scalars['String']>>;
  correspAdjustment_lt: InputMaybe<Scalars['String']>;
  correspAdjustment_lte: InputMaybe<Scalars['String']>;
  correspAdjustment_not: InputMaybe<Scalars['String']>;
  correspAdjustment_not_contains: InputMaybe<Scalars['String']>;
  correspAdjustment_not_contains_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment_not_ends_with: InputMaybe<Scalars['String']>;
  correspAdjustment_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment_not_in: InputMaybe<Array<Scalars['String']>>;
  correspAdjustment_not_starts_with: InputMaybe<Scalars['String']>;
  correspAdjustment_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  correspAdjustment_starts_with: InputMaybe<Scalars['String']>;
  correspAdjustment_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  currentSupply: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_gt: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_gte: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentSupply_lt: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_lte: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_not: InputMaybe<Scalars['BigDecimal']>;
  currentSupply_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  emissionType: InputMaybe<Scalars['String']>;
  emissionType_contains: InputMaybe<Scalars['String']>;
  emissionType_contains_nocase: InputMaybe<Scalars['String']>;
  emissionType_ends_with: InputMaybe<Scalars['String']>;
  emissionType_ends_with_nocase: InputMaybe<Scalars['String']>;
  emissionType_gt: InputMaybe<Scalars['String']>;
  emissionType_gte: InputMaybe<Scalars['String']>;
  emissionType_in: InputMaybe<Array<Scalars['String']>>;
  emissionType_lt: InputMaybe<Scalars['String']>;
  emissionType_lte: InputMaybe<Scalars['String']>;
  emissionType_not: InputMaybe<Scalars['String']>;
  emissionType_not_contains: InputMaybe<Scalars['String']>;
  emissionType_not_contains_nocase: InputMaybe<Scalars['String']>;
  emissionType_not_ends_with: InputMaybe<Scalars['String']>;
  emissionType_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  emissionType_not_in: InputMaybe<Array<Scalars['String']>>;
  emissionType_not_starts_with: InputMaybe<Scalars['String']>;
  emissionType_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  emissionType_starts_with: InputMaybe<Scalars['String']>;
  emissionType_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  isCorsiaCompliant: InputMaybe<Scalars['Boolean']>;
  isCorsiaCompliant_in: InputMaybe<Array<Scalars['Boolean']>>;
  isCorsiaCompliant_not: InputMaybe<Scalars['Boolean']>;
  isCorsiaCompliant_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  klimaRanking: InputMaybe<Scalars['BigInt']>;
  klimaRanking_gt: InputMaybe<Scalars['BigInt']>;
  klimaRanking_gte: InputMaybe<Scalars['BigInt']>;
  klimaRanking_in: InputMaybe<Array<Scalars['BigInt']>>;
  klimaRanking_lt: InputMaybe<Scalars['BigInt']>;
  klimaRanking_lte: InputMaybe<Scalars['BigInt']>;
  klimaRanking_not: InputMaybe<Scalars['BigInt']>;
  klimaRanking_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdate: InputMaybe<Scalars['BigInt']>;
  lastUpdate_gt: InputMaybe<Scalars['BigInt']>;
  lastUpdate_gte: InputMaybe<Scalars['BigInt']>;
  lastUpdate_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdate_lt: InputMaybe<Scalars['BigInt']>;
  lastUpdate_lte: InputMaybe<Scalars['BigInt']>;
  lastUpdate_not: InputMaybe<Scalars['BigInt']>;
  lastUpdate_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  method: InputMaybe<Scalars['String']>;
  method_contains: InputMaybe<Scalars['String']>;
  method_contains_nocase: InputMaybe<Scalars['String']>;
  method_ends_with: InputMaybe<Scalars['String']>;
  method_ends_with_nocase: InputMaybe<Scalars['String']>;
  method_gt: InputMaybe<Scalars['String']>;
  method_gte: InputMaybe<Scalars['String']>;
  method_in: InputMaybe<Array<Scalars['String']>>;
  method_lt: InputMaybe<Scalars['String']>;
  method_lte: InputMaybe<Scalars['String']>;
  method_not: InputMaybe<Scalars['String']>;
  method_not_contains: InputMaybe<Scalars['String']>;
  method_not_contains_nocase: InputMaybe<Scalars['String']>;
  method_not_ends_with: InputMaybe<Scalars['String']>;
  method_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  method_not_in: InputMaybe<Array<Scalars['String']>>;
  method_not_starts_with: InputMaybe<Scalars['String']>;
  method_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  method_starts_with: InputMaybe<Scalars['String']>;
  method_starts_with_nocase: InputMaybe<Scalars['String']>;
  methodology: InputMaybe<Scalars['String']>;
  methodologyCategory: InputMaybe<Scalars['String']>;
  methodologyCategory_contains: InputMaybe<Scalars['String']>;
  methodologyCategory_contains_nocase: InputMaybe<Scalars['String']>;
  methodologyCategory_ends_with: InputMaybe<Scalars['String']>;
  methodologyCategory_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodologyCategory_gt: InputMaybe<Scalars['String']>;
  methodologyCategory_gte: InputMaybe<Scalars['String']>;
  methodologyCategory_in: InputMaybe<Array<Scalars['String']>>;
  methodologyCategory_lt: InputMaybe<Scalars['String']>;
  methodologyCategory_lte: InputMaybe<Scalars['String']>;
  methodologyCategory_not: InputMaybe<Scalars['String']>;
  methodologyCategory_not_contains: InputMaybe<Scalars['String']>;
  methodologyCategory_not_contains_nocase: InputMaybe<Scalars['String']>;
  methodologyCategory_not_ends_with: InputMaybe<Scalars['String']>;
  methodologyCategory_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  methodologyCategory_not_in: InputMaybe<Array<Scalars['String']>>;
  methodologyCategory_not_starts_with: InputMaybe<Scalars['String']>;
  methodologyCategory_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  methodologyCategory_starts_with: InputMaybe<Scalars['String']>;
  methodologyCategory_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  or: InputMaybe<Array<InputMaybe<CarbonOffset_Filter>>>;
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
  retirements_: InputMaybe<Retire_Filter>;
  standard: InputMaybe<Scalars['String']>;
  standard_contains: InputMaybe<Scalars['String']>;
  standard_contains_nocase: InputMaybe<Scalars['String']>;
  standard_ends_with: InputMaybe<Scalars['String']>;
  standard_ends_with_nocase: InputMaybe<Scalars['String']>;
  standard_gt: InputMaybe<Scalars['String']>;
  standard_gte: InputMaybe<Scalars['String']>;
  standard_in: InputMaybe<Array<Scalars['String']>>;
  standard_lt: InputMaybe<Scalars['String']>;
  standard_lte: InputMaybe<Scalars['String']>;
  standard_not: InputMaybe<Scalars['String']>;
  standard_not_contains: InputMaybe<Scalars['String']>;
  standard_not_contains_nocase: InputMaybe<Scalars['String']>;
  standard_not_ends_with: InputMaybe<Scalars['String']>;
  standard_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  standard_not_in: InputMaybe<Array<Scalars['String']>>;
  standard_not_starts_with: InputMaybe<Scalars['String']>;
  standard_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  standard_starts_with: InputMaybe<Scalars['String']>;
  standard_starts_with_nocase: InputMaybe<Scalars['String']>;
  storageMethod: InputMaybe<Scalars['String']>;
  storageMethod_contains: InputMaybe<Scalars['String']>;
  storageMethod_contains_nocase: InputMaybe<Scalars['String']>;
  storageMethod_ends_with: InputMaybe<Scalars['String']>;
  storageMethod_ends_with_nocase: InputMaybe<Scalars['String']>;
  storageMethod_gt: InputMaybe<Scalars['String']>;
  storageMethod_gte: InputMaybe<Scalars['String']>;
  storageMethod_in: InputMaybe<Array<Scalars['String']>>;
  storageMethod_lt: InputMaybe<Scalars['String']>;
  storageMethod_lte: InputMaybe<Scalars['String']>;
  storageMethod_not: InputMaybe<Scalars['String']>;
  storageMethod_not_contains: InputMaybe<Scalars['String']>;
  storageMethod_not_contains_nocase: InputMaybe<Scalars['String']>;
  storageMethod_not_ends_with: InputMaybe<Scalars['String']>;
  storageMethod_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  storageMethod_not_in: InputMaybe<Array<Scalars['String']>>;
  storageMethod_not_starts_with: InputMaybe<Scalars['String']>;
  storageMethod_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  storageMethod_starts_with: InputMaybe<Scalars['String']>;
  storageMethod_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenAddress: InputMaybe<Scalars['String']>;
  tokenAddress_contains: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenAddress_gt: InputMaybe<Scalars['String']>;
  tokenAddress_gte: InputMaybe<Scalars['String']>;
  tokenAddress_in: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_lt: InputMaybe<Scalars['String']>;
  tokenAddress_lte: InputMaybe<Scalars['String']>;
  tokenAddress_not: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_starts_with: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
  totalBridged: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_gt: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_gte: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBridged_lt: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_lte: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_not: InputMaybe<Scalars['BigDecimal']>;
  totalBridged_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalRetired: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_gt: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_gte: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalRetired_lt: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_lte: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_not: InputMaybe<Scalars['BigDecimal']>;
  totalRetired_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  vintage: InputMaybe<Scalars['String']>;
  vintageYear: InputMaybe<Scalars['String']>;
  vintageYear_contains: InputMaybe<Scalars['String']>;
  vintageYear_contains_nocase: InputMaybe<Scalars['String']>;
  vintageYear_ends_with: InputMaybe<Scalars['String']>;
  vintageYear_ends_with_nocase: InputMaybe<Scalars['String']>;
  vintageYear_gt: InputMaybe<Scalars['String']>;
  vintageYear_gte: InputMaybe<Scalars['String']>;
  vintageYear_in: InputMaybe<Array<Scalars['String']>>;
  vintageYear_lt: InputMaybe<Scalars['String']>;
  vintageYear_lte: InputMaybe<Scalars['String']>;
  vintageYear_not: InputMaybe<Scalars['String']>;
  vintageYear_not_contains: InputMaybe<Scalars['String']>;
  vintageYear_not_contains_nocase: InputMaybe<Scalars['String']>;
  vintageYear_not_ends_with: InputMaybe<Scalars['String']>;
  vintageYear_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  vintageYear_not_in: InputMaybe<Array<Scalars['String']>>;
  vintageYear_not_starts_with: InputMaybe<Scalars['String']>;
  vintageYear_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  vintageYear_starts_with: InputMaybe<Scalars['String']>;
  vintageYear_starts_with_nocase: InputMaybe<Scalars['String']>;
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

export enum CarbonOffset_OrderBy {
  AdditionalCertification = 'additionalCertification',
  BalanceBct = 'balanceBCT',
  BalanceNbo = 'balanceNBO',
  BalanceNct = 'balanceNCT',
  BalanceUbo = 'balanceUBO',
  Bridge = 'bridge',
  Bridges = 'bridges',
  Category = 'category',
  CoBenefits = 'coBenefits',
  CorrespAdjustment = 'correspAdjustment',
  Country = 'country',
  CurrentSupply = 'currentSupply',
  EmissionType = 'emissionType',
  Id = 'id',
  IsCorsiaCompliant = 'isCorsiaCompliant',
  KlimaRanking = 'klimaRanking',
  LastUpdate = 'lastUpdate',
  Method = 'method',
  Methodology = 'methodology',
  MethodologyCategory = 'methodologyCategory',
  Name = 'name',
  ProjectId = 'projectID',
  Region = 'region',
  Registry = 'registry',
  Retirements = 'retirements',
  Standard = 'standard',
  StorageMethod = 'storageMethod',
  TokenAddress = 'tokenAddress',
  TotalBridged = 'totalBridged',
  TotalRetired = 'totalRetired',
  Vintage = 'vintage',
  VintageYear = 'vintageYear'
}

/**
 * CrosschainBridge entity tracks pool bridges across different blockchains
 * Currently used by Toucan
 *
 */
export type CrosschainBridge = {
  __typename?: 'CrosschainBridge';
  bridger: Scalars['String'];
  direction: BridgeDirection;
  id: Scalars['ID'];
  pool: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
  value: Scalars['BigDecimal'];
};

export type CrosschainBridge_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CrosschainBridge_Filter>>>;
  bridger: InputMaybe<Scalars['String']>;
  bridger_contains: InputMaybe<Scalars['String']>;
  bridger_contains_nocase: InputMaybe<Scalars['String']>;
  bridger_ends_with: InputMaybe<Scalars['String']>;
  bridger_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridger_gt: InputMaybe<Scalars['String']>;
  bridger_gte: InputMaybe<Scalars['String']>;
  bridger_in: InputMaybe<Array<Scalars['String']>>;
  bridger_lt: InputMaybe<Scalars['String']>;
  bridger_lte: InputMaybe<Scalars['String']>;
  bridger_not: InputMaybe<Scalars['String']>;
  bridger_not_contains: InputMaybe<Scalars['String']>;
  bridger_not_contains_nocase: InputMaybe<Scalars['String']>;
  bridger_not_ends_with: InputMaybe<Scalars['String']>;
  bridger_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridger_not_in: InputMaybe<Array<Scalars['String']>>;
  bridger_not_starts_with: InputMaybe<Scalars['String']>;
  bridger_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridger_starts_with: InputMaybe<Scalars['String']>;
  bridger_starts_with_nocase: InputMaybe<Scalars['String']>;
  direction: InputMaybe<BridgeDirection>;
  direction_in: InputMaybe<Array<BridgeDirection>>;
  direction_not: InputMaybe<BridgeDirection>;
  direction_not_in: InputMaybe<Array<BridgeDirection>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<CrosschainBridge_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
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
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['BigDecimal']>;
  value_gt: InputMaybe<Scalars['BigDecimal']>;
  value_gte: InputMaybe<Scalars['BigDecimal']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']>;
  value_lte: InputMaybe<Scalars['BigDecimal']>;
  value_not: InputMaybe<Scalars['BigDecimal']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum CrosschainBridge_OrderBy {
  Bridger = 'bridger',
  Direction = 'direction',
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value',
  Value = 'value'
}

export type DailyKlimaRetirement = {
  __typename?: 'DailyKlimaRetirement';
  amount: Scalars['BigDecimal'];
  feeAmount: Scalars['BigDecimal'];
  id: Scalars['ID'];
  offset: CarbonOffset;
  pool: Scalars['String'];
  timestamp: Scalars['BigInt'];
  token: Scalars['String'];
};

export type DailyKlimaRetirement_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigDecimal']>;
  amount_gt: InputMaybe<Scalars['BigDecimal']>;
  amount_gte: InputMaybe<Scalars['BigDecimal']>;
  amount_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt: InputMaybe<Scalars['BigDecimal']>;
  amount_lte: InputMaybe<Scalars['BigDecimal']>;
  amount_not: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  and: InputMaybe<Array<InputMaybe<DailyKlimaRetirement_Filter>>>;
  feeAmount: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_gt: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_gte: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeAmount_lt: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_lte: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_not: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<DailyKlimaRetirement_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
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
  token: InputMaybe<Scalars['String']>;
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

export enum DailyKlimaRetirement_OrderBy {
  Amount = 'amount',
  FeeAmount = 'feeAmount',
  Id = 'id',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Token = 'token'
}

export type Deposit = {
  __typename?: 'Deposit';
  depositor: Scalars['String'];
  id: Scalars['ID'];
  offset: CarbonOffset;
  pool: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
  value: Scalars['BigDecimal'];
};

export type Deposit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  depositor: InputMaybe<Scalars['String']>;
  depositor_contains: InputMaybe<Scalars['String']>;
  depositor_contains_nocase: InputMaybe<Scalars['String']>;
  depositor_ends_with: InputMaybe<Scalars['String']>;
  depositor_ends_with_nocase: InputMaybe<Scalars['String']>;
  depositor_gt: InputMaybe<Scalars['String']>;
  depositor_gte: InputMaybe<Scalars['String']>;
  depositor_in: InputMaybe<Array<Scalars['String']>>;
  depositor_lt: InputMaybe<Scalars['String']>;
  depositor_lte: InputMaybe<Scalars['String']>;
  depositor_not: InputMaybe<Scalars['String']>;
  depositor_not_contains: InputMaybe<Scalars['String']>;
  depositor_not_contains_nocase: InputMaybe<Scalars['String']>;
  depositor_not_ends_with: InputMaybe<Scalars['String']>;
  depositor_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  depositor_not_in: InputMaybe<Array<Scalars['String']>>;
  depositor_not_starts_with: InputMaybe<Scalars['String']>;
  depositor_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  depositor_starts_with: InputMaybe<Scalars['String']>;
  depositor_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
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
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['BigDecimal']>;
  value_gt: InputMaybe<Scalars['BigDecimal']>;
  value_gte: InputMaybe<Scalars['BigDecimal']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']>;
  value_lte: InputMaybe<Scalars['BigDecimal']>;
  value_not: InputMaybe<Scalars['BigDecimal']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Deposit_OrderBy {
  Depositor = 'depositor',
  Id = 'id',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value',
  Value = 'value'
}

export type KlimaRetire = {
  __typename?: 'KlimaRetire';
  amount: Scalars['BigDecimal'];
  beneficiary: Scalars['String'];
  beneficiaryAddress: Scalars['String'];
  certificateTokenID: Maybe<Scalars['BigInt']>;
  feeAmount: Scalars['BigDecimal'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  offset: CarbonOffset;
  pool: Scalars['String'];
  retirementMessage: Scalars['String'];
  retiringAddress: Scalars['String'];
  specific: Scalars['Boolean'];
  timestamp: Scalars['BigInt'];
  token: Scalars['String'];
  transaction: Transaction;
};

export type KlimaRetire_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigDecimal']>;
  amount_gt: InputMaybe<Scalars['BigDecimal']>;
  amount_gte: InputMaybe<Scalars['BigDecimal']>;
  amount_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt: InputMaybe<Scalars['BigDecimal']>;
  amount_lte: InputMaybe<Scalars['BigDecimal']>;
  amount_not: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  and: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  beneficiary: InputMaybe<Scalars['String']>;
  beneficiaryAddress: InputMaybe<Scalars['String']>;
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
  beneficiary_contains: InputMaybe<Scalars['String']>;
  beneficiary_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiary_ends_with: InputMaybe<Scalars['String']>;
  beneficiary_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_gt: InputMaybe<Scalars['String']>;
  beneficiary_gte: InputMaybe<Scalars['String']>;
  beneficiary_in: InputMaybe<Array<Scalars['String']>>;
  beneficiary_lt: InputMaybe<Scalars['String']>;
  beneficiary_lte: InputMaybe<Scalars['String']>;
  beneficiary_not: InputMaybe<Scalars['String']>;
  beneficiary_not_contains: InputMaybe<Scalars['String']>;
  beneficiary_not_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_not_in: InputMaybe<Array<Scalars['String']>>;
  beneficiary_not_starts_with: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_starts_with: InputMaybe<Scalars['String']>;
  beneficiary_starts_with_nocase: InputMaybe<Scalars['String']>;
  certificateTokenID: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_gt: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_gte: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_in: InputMaybe<Array<Scalars['BigInt']>>;
  certificateTokenID_lt: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_lte: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_not: InputMaybe<Scalars['BigInt']>;
  certificateTokenID_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  feeAmount: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_gt: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_gte: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeAmount_lt: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_lte: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_not: InputMaybe<Scalars['BigDecimal']>;
  feeAmount_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  index: InputMaybe<Scalars['BigInt']>;
  index_gt: InputMaybe<Scalars['BigInt']>;
  index_gte: InputMaybe<Scalars['BigInt']>;
  index_in: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt: InputMaybe<Scalars['BigInt']>;
  index_lte: InputMaybe<Scalars['BigInt']>;
  index_not: InputMaybe<Scalars['BigInt']>;
  index_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<KlimaRetire_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
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
  specific: InputMaybe<Scalars['Boolean']>;
  specific_in: InputMaybe<Array<Scalars['Boolean']>>;
  specific_not: InputMaybe<Scalars['Boolean']>;
  specific_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token: InputMaybe<Scalars['String']>;
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
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum KlimaRetire_OrderBy {
  Amount = 'amount',
  Beneficiary = 'beneficiary',
  BeneficiaryAddress = 'beneficiaryAddress',
  CertificateTokenId = 'certificateTokenID',
  FeeAmount = 'feeAmount',
  Id = 'id',
  Index = 'index',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Pool = 'pool',
  RetirementMessage = 'retirementMessage',
  RetiringAddress = 'retiringAddress',
  Specific = 'specific',
  Timestamp = 'timestamp',
  Token = 'token',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  bridge: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonMetric: Maybe<CarbonMetric>;
  carbonMetrics: Array<CarbonMetric>;
  carbonOffset: Maybe<CarbonOffset>;
  carbonOffsetSearch: Array<CarbonOffset>;
  carbonOffsets: Array<CarbonOffset>;
  crosschainBridge: Maybe<CrosschainBridge>;
  crosschainBridges: Array<CrosschainBridge>;
  dailyKlimaRetirement: Maybe<DailyKlimaRetirement>;
  dailyKlimaRetirements: Array<DailyKlimaRetirement>;
  deposit: Maybe<Deposit>;
  deposits: Array<Deposit>;
  klimaRetire: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  redeem: Maybe<Redeem>;
  redeems: Array<Redeem>;
  retire: Maybe<Retire>;
  retires: Array<Retire>;
  toucanCertificate: Maybe<ToucanCertificate>;
  toucanCertificates: Array<ToucanCertificate>;
  transaction: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
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


export type QueryCarbonMetricArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonMetricsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonMetric_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonMetric_Filter>;
};


export type QueryCarbonOffsetArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCarbonOffsetSearchArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars['String'];
  where: InputMaybe<CarbonOffset_Filter>;
};


export type QueryCarbonOffsetsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonOffset_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonOffset_Filter>;
};


export type QueryCrosschainBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrosschainBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CrosschainBridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CrosschainBridge_Filter>;
};


export type QueryDailyKlimaRetirementArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyKlimaRetirementsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DailyKlimaRetirement_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DailyKlimaRetirement_Filter>;
};


export type QueryDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
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


export type QueryRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Redeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Redeem_Filter>;
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


export type QueryToucanCertificateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryToucanCertificatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ToucanCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ToucanCertificate_Filter>;
};


export type QueryTransactionArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transaction_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transaction_Filter>;
};

export type Redeem = {
  __typename?: 'Redeem';
  id: Scalars['ID'];
  offset: CarbonOffset;
  pool: Scalars['String'];
  redeemer: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
  value: Scalars['BigDecimal'];
};

export type Redeem_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Redeem_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Redeem_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
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
  redeemer: InputMaybe<Scalars['String']>;
  redeemer_contains: InputMaybe<Scalars['String']>;
  redeemer_contains_nocase: InputMaybe<Scalars['String']>;
  redeemer_ends_with: InputMaybe<Scalars['String']>;
  redeemer_ends_with_nocase: InputMaybe<Scalars['String']>;
  redeemer_gt: InputMaybe<Scalars['String']>;
  redeemer_gte: InputMaybe<Scalars['String']>;
  redeemer_in: InputMaybe<Array<Scalars['String']>>;
  redeemer_lt: InputMaybe<Scalars['String']>;
  redeemer_lte: InputMaybe<Scalars['String']>;
  redeemer_not: InputMaybe<Scalars['String']>;
  redeemer_not_contains: InputMaybe<Scalars['String']>;
  redeemer_not_contains_nocase: InputMaybe<Scalars['String']>;
  redeemer_not_ends_with: InputMaybe<Scalars['String']>;
  redeemer_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  redeemer_not_in: InputMaybe<Array<Scalars['String']>>;
  redeemer_not_starts_with: InputMaybe<Scalars['String']>;
  redeemer_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  redeemer_starts_with: InputMaybe<Scalars['String']>;
  redeemer_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['BigDecimal']>;
  value_gt: InputMaybe<Scalars['BigDecimal']>;
  value_gte: InputMaybe<Scalars['BigDecimal']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']>;
  value_lte: InputMaybe<Scalars['BigDecimal']>;
  value_not: InputMaybe<Scalars['BigDecimal']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Redeem_OrderBy {
  Id = 'id',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Pool = 'pool',
  Redeemer = 'redeemer',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value',
  Value = 'value'
}

export type Retire = {
  __typename?: 'Retire';
  beneficiary: Scalars['String'];
  id: Scalars['ID'];
  offset: CarbonOffset;
  retiree: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
  value: Scalars['BigDecimal'];
};

export type Retire_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  beneficiary: InputMaybe<Scalars['String']>;
  beneficiary_contains: InputMaybe<Scalars['String']>;
  beneficiary_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiary_ends_with: InputMaybe<Scalars['String']>;
  beneficiary_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_gt: InputMaybe<Scalars['String']>;
  beneficiary_gte: InputMaybe<Scalars['String']>;
  beneficiary_in: InputMaybe<Array<Scalars['String']>>;
  beneficiary_lt: InputMaybe<Scalars['String']>;
  beneficiary_lte: InputMaybe<Scalars['String']>;
  beneficiary_not: InputMaybe<Scalars['String']>;
  beneficiary_not_contains: InputMaybe<Scalars['String']>;
  beneficiary_not_contains_nocase: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_not_in: InputMaybe<Array<Scalars['String']>>;
  beneficiary_not_starts_with: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  beneficiary_starts_with: InputMaybe<Scalars['String']>;
  beneficiary_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  offset: InputMaybe<Scalars['String']>;
  offset_: InputMaybe<CarbonOffset_Filter>;
  offset_contains: InputMaybe<Scalars['String']>;
  offset_contains_nocase: InputMaybe<Scalars['String']>;
  offset_ends_with: InputMaybe<Scalars['String']>;
  offset_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_gt: InputMaybe<Scalars['String']>;
  offset_gte: InputMaybe<Scalars['String']>;
  offset_in: InputMaybe<Array<Scalars['String']>>;
  offset_lt: InputMaybe<Scalars['String']>;
  offset_lte: InputMaybe<Scalars['String']>;
  offset_not: InputMaybe<Scalars['String']>;
  offset_not_contains: InputMaybe<Scalars['String']>;
  offset_not_contains_nocase: InputMaybe<Scalars['String']>;
  offset_not_ends_with: InputMaybe<Scalars['String']>;
  offset_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  offset_not_in: InputMaybe<Array<Scalars['String']>>;
  offset_not_starts_with: InputMaybe<Scalars['String']>;
  offset_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  offset_starts_with: InputMaybe<Scalars['String']>;
  offset_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Retire_Filter>>>;
  retiree: InputMaybe<Scalars['String']>;
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
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['BigDecimal']>;
  value_gt: InputMaybe<Scalars['BigDecimal']>;
  value_gte: InputMaybe<Scalars['BigDecimal']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']>;
  value_lte: InputMaybe<Scalars['BigDecimal']>;
  value_not: InputMaybe<Scalars['BigDecimal']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Retire_OrderBy {
  Beneficiary = 'beneficiary',
  Id = 'id',
  Offset = 'offset',
  OffsetAdditionalCertification = 'offset__additionalCertification',
  OffsetBalanceBct = 'offset__balanceBCT',
  OffsetBalanceNbo = 'offset__balanceNBO',
  OffsetBalanceNct = 'offset__balanceNCT',
  OffsetBalanceUbo = 'offset__balanceUBO',
  OffsetBridge = 'offset__bridge',
  OffsetCategory = 'offset__category',
  OffsetCoBenefits = 'offset__coBenefits',
  OffsetCorrespAdjustment = 'offset__correspAdjustment',
  OffsetCountry = 'offset__country',
  OffsetCurrentSupply = 'offset__currentSupply',
  OffsetEmissionType = 'offset__emissionType',
  OffsetId = 'offset__id',
  OffsetIsCorsiaCompliant = 'offset__isCorsiaCompliant',
  OffsetKlimaRanking = 'offset__klimaRanking',
  OffsetLastUpdate = 'offset__lastUpdate',
  OffsetMethod = 'offset__method',
  OffsetMethodology = 'offset__methodology',
  OffsetMethodologyCategory = 'offset__methodologyCategory',
  OffsetName = 'offset__name',
  OffsetProjectId = 'offset__projectID',
  OffsetRegion = 'offset__region',
  OffsetRegistry = 'offset__registry',
  OffsetStandard = 'offset__standard',
  OffsetStorageMethod = 'offset__storageMethod',
  OffsetTokenAddress = 'offset__tokenAddress',
  OffsetTotalBridged = 'offset__totalBridged',
  OffsetTotalRetired = 'offset__totalRetired',
  OffsetVintage = 'offset__vintage',
  OffsetVintageYear = 'offset__vintageYear',
  Retiree = 'retiree',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value',
  Value = 'value'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  bridge: Maybe<Bridge>;
  bridges: Array<Bridge>;
  carbonMetric: Maybe<CarbonMetric>;
  carbonMetrics: Array<CarbonMetric>;
  carbonOffset: Maybe<CarbonOffset>;
  carbonOffsets: Array<CarbonOffset>;
  crosschainBridge: Maybe<CrosschainBridge>;
  crosschainBridges: Array<CrosschainBridge>;
  dailyKlimaRetirement: Maybe<DailyKlimaRetirement>;
  dailyKlimaRetirements: Array<DailyKlimaRetirement>;
  deposit: Maybe<Deposit>;
  deposits: Array<Deposit>;
  klimaRetire: Maybe<KlimaRetire>;
  klimaRetires: Array<KlimaRetire>;
  redeem: Maybe<Redeem>;
  redeems: Array<Redeem>;
  retire: Maybe<Retire>;
  retires: Array<Retire>;
  toucanCertificate: Maybe<ToucanCertificate>;
  toucanCertificates: Array<ToucanCertificate>;
  transaction: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
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


export type SubscriptionCarbonMetricArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonMetricsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonMetric_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonMetric_Filter>;
};


export type SubscriptionCarbonOffsetArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCarbonOffsetsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CarbonOffset_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CarbonOffset_Filter>;
};


export type SubscriptionCrosschainBridgeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrosschainBridgesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CrosschainBridge_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CrosschainBridge_Filter>;
};


export type SubscriptionDailyKlimaRetirementArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyKlimaRetirementsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DailyKlimaRetirement_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DailyKlimaRetirement_Filter>;
};


export type SubscriptionDepositArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Deposit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Deposit_Filter>;
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


export type SubscriptionRedeemArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRedeemsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Redeem_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Redeem_Filter>;
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


export type SubscriptionToucanCertificateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionToucanCertificatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ToucanCertificate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ToucanCertificate_Filter>;
};


export type SubscriptionTransactionArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transaction_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transaction_Filter>;
};

export type ToucanCertificate = {
  __typename?: 'ToucanCertificate';
  id: Scalars['ID'];
  klimaRetire: Maybe<KlimaRetire>;
  timestamp: Scalars['BigInt'];
  tokenID: Scalars['BigInt'];
  transaction: Transaction;
};

export type ToucanCertificate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ToucanCertificate_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  klimaRetire: InputMaybe<Scalars['String']>;
  klimaRetire_: InputMaybe<KlimaRetire_Filter>;
  klimaRetire_contains: InputMaybe<Scalars['String']>;
  klimaRetire_contains_nocase: InputMaybe<Scalars['String']>;
  klimaRetire_ends_with: InputMaybe<Scalars['String']>;
  klimaRetire_ends_with_nocase: InputMaybe<Scalars['String']>;
  klimaRetire_gt: InputMaybe<Scalars['String']>;
  klimaRetire_gte: InputMaybe<Scalars['String']>;
  klimaRetire_in: InputMaybe<Array<Scalars['String']>>;
  klimaRetire_lt: InputMaybe<Scalars['String']>;
  klimaRetire_lte: InputMaybe<Scalars['String']>;
  klimaRetire_not: InputMaybe<Scalars['String']>;
  klimaRetire_not_contains: InputMaybe<Scalars['String']>;
  klimaRetire_not_contains_nocase: InputMaybe<Scalars['String']>;
  klimaRetire_not_ends_with: InputMaybe<Scalars['String']>;
  klimaRetire_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  klimaRetire_not_in: InputMaybe<Array<Scalars['String']>>;
  klimaRetire_not_starts_with: InputMaybe<Scalars['String']>;
  klimaRetire_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  klimaRetire_starts_with: InputMaybe<Scalars['String']>;
  klimaRetire_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<ToucanCertificate_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenID: InputMaybe<Scalars['BigInt']>;
  tokenID_gt: InputMaybe<Scalars['BigInt']>;
  tokenID_gte: InputMaybe<Scalars['BigInt']>;
  tokenID_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenID_lt: InputMaybe<Scalars['BigInt']>;
  tokenID_lte: InputMaybe<Scalars['BigInt']>;
  tokenID_not: InputMaybe<Scalars['BigInt']>;
  tokenID_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  transaction: InputMaybe<Scalars['String']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_ends_with: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_gt: InputMaybe<Scalars['String']>;
  transaction_gte: InputMaybe<Scalars['String']>;
  transaction_in: InputMaybe<Array<Scalars['String']>>;
  transaction_lt: InputMaybe<Scalars['String']>;
  transaction_lte: InputMaybe<Scalars['String']>;
  transaction_not: InputMaybe<Scalars['String']>;
  transaction_not_contains: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  transaction_starts_with: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum ToucanCertificate_OrderBy {
  Id = 'id',
  KlimaRetire = 'klimaRetire',
  KlimaRetireAmount = 'klimaRetire__amount',
  KlimaRetireBeneficiary = 'klimaRetire__beneficiary',
  KlimaRetireBeneficiaryAddress = 'klimaRetire__beneficiaryAddress',
  KlimaRetireCertificateTokenId = 'klimaRetire__certificateTokenID',
  KlimaRetireFeeAmount = 'klimaRetire__feeAmount',
  KlimaRetireId = 'klimaRetire__id',
  KlimaRetireIndex = 'klimaRetire__index',
  KlimaRetirePool = 'klimaRetire__pool',
  KlimaRetireRetirementMessage = 'klimaRetire__retirementMessage',
  KlimaRetireRetiringAddress = 'klimaRetire__retiringAddress',
  KlimaRetireSpecific = 'klimaRetire__specific',
  KlimaRetireTimestamp = 'klimaRetire__timestamp',
  KlimaRetireToken = 'klimaRetire__token',
  Timestamp = 'timestamp',
  TokenId = 'tokenID',
  Transaction = 'transaction',
  TransactionBlockHash = 'transaction__blockHash',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionFrom = 'transaction__from',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockHash: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  from: Scalars['Bytes'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  to: Maybe<Scalars['Bytes']>;
  value: Scalars['BigInt'];
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockHash: InputMaybe<Scalars['Bytes']>;
  blockHash_contains: InputMaybe<Scalars['Bytes']>;
  blockHash_gt: InputMaybe<Scalars['Bytes']>;
  blockHash_gte: InputMaybe<Scalars['Bytes']>;
  blockHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_lt: InputMaybe<Scalars['Bytes']>;
  blockHash_lte: InputMaybe<Scalars['Bytes']>;
  blockHash_not: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains: InputMaybe<Scalars['Bytes']>;
  blockHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  blockNumber: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  from: InputMaybe<Scalars['Bytes']>;
  from_contains: InputMaybe<Scalars['Bytes']>;
  from_gt: InputMaybe<Scalars['Bytes']>;
  from_gte: InputMaybe<Scalars['Bytes']>;
  from_in: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt: InputMaybe<Scalars['Bytes']>;
  from_lte: InputMaybe<Scalars['Bytes']>;
  from_not: InputMaybe<Scalars['Bytes']>;
  from_not_contains: InputMaybe<Scalars['Bytes']>;
  from_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  gasPrice: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte: InputMaybe<Scalars['BigInt']>;
  gasPrice_in: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte: InputMaybe<Scalars['BigInt']>;
  gasPrice_not: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  to: InputMaybe<Scalars['Bytes']>;
  to_contains: InputMaybe<Scalars['Bytes']>;
  to_gt: InputMaybe<Scalars['Bytes']>;
  to_gte: InputMaybe<Scalars['Bytes']>;
  to_in: InputMaybe<Array<Scalars['Bytes']>>;
  to_lt: InputMaybe<Scalars['Bytes']>;
  to_lte: InputMaybe<Scalars['Bytes']>;
  to_not: InputMaybe<Scalars['Bytes']>;
  to_not_contains: InputMaybe<Scalars['Bytes']>;
  to_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  value: InputMaybe<Scalars['BigInt']>;
  value_gt: InputMaybe<Scalars['BigInt']>;
  value_gte: InputMaybe<Scalars['BigInt']>;
  value_in: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt: InputMaybe<Scalars['BigInt']>;
  value_lte: InputMaybe<Scalars['BigInt']>;
  value_not: InputMaybe<Scalars['BigInt']>;
  value_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  From = 'from',
  GasPrice = 'gasPrice',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  Value = 'value'
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

export type CarbonOffsetFragmentFragment = { __typename?: 'CarbonOffset', id: string, name: string, tokenAddress: string, vintage: string, vintageYear: string, bridge: string, projectID: string, methodology: string, methodologyCategory: string, country: string, category: string, registry: string, totalBridged: any, totalRetired: any, currentSupply: any, storageMethod: string, balanceUBO: any, balanceNBO: any, balanceNCT: any, balanceBCT: any, lastUpdate: string };

export type GetCarbonOffsetsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarbonOffsetsCategoriesQuery = { __typename?: 'Query', carbonOffsets: Array<{ __typename?: 'CarbonOffset', methodologyCategory: string }> };

export type GetCarbonOffsetsCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarbonOffsetsCountriesQuery = { __typename?: 'Query', carbonOffsets: Array<{ __typename?: 'CarbonOffset', country: string }> };

export type GetCarbonOffsetsVintagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarbonOffsetsVintagesQuery = { __typename?: 'Query', carbonOffsets: Array<{ __typename?: 'CarbonOffset', vintageYear: string }> };

export type GetCarbonOffsetsByProjectAndVintageQueryVariables = Exact<{
  key: Scalars['String'];
  vintageStr: InputMaybe<Scalars['String']>;
}>;


export type GetCarbonOffsetsByProjectAndVintageQuery = { __typename?: 'Query', carbonOffsets: Array<{ __typename?: 'CarbonOffset', id: string, name: string, tokenAddress: string, vintage: string, vintageYear: string, bridge: string, projectID: string, methodology: string, methodologyCategory: string, country: string, category: string, registry: string, totalBridged: any, totalRetired: any, currentSupply: any, storageMethod: string, balanceUBO: any, balanceNBO: any, balanceNCT: any, balanceBCT: any, lastUpdate: string }> };

export type FindCarbonOffsetsQueryVariables = Exact<{
  country: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  category: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  search: InputMaybe<Scalars['String']>;
  vintage: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type FindCarbonOffsetsQuery = { __typename?: 'Query', carbonOffsets: Array<{ __typename?: 'CarbonOffset', id: string, name: string, tokenAddress: string, vintage: string, vintageYear: string, bridge: string, projectID: string, methodology: string, methodologyCategory: string, country: string, category: string, registry: string, totalBridged: any, totalRetired: any, currentSupply: any, storageMethod: string, balanceUBO: any, balanceNBO: any, balanceNCT: any, balanceBCT: any, lastUpdate: string }> };

export type GetKlimaRetirementTransactionIdQueryVariables = Exact<{
  address: InputMaybe<Scalars['String']>;
  index: InputMaybe<Scalars['BigInt']>;
}>;


export type GetKlimaRetirementTransactionIdQuery = { __typename?: 'Query', klimaRetires: Array<{ __typename?: 'KlimaRetire', transaction: { __typename?: 'Transaction', id: string } }> };

export const CarbonOffsetFragmentFragmentDoc = gql`
    fragment CarbonOffsetFragment on CarbonOffset {
  id
  name
  tokenAddress
  vintage
  vintageYear
  bridge
  projectID
  methodology
  methodologyCategory
  country
  category
  name
  registry
  totalBridged
  totalRetired
  currentSupply
  storageMethod
  balanceUBO
  balanceNBO
  balanceNCT
  balanceBCT
  lastUpdate
}
    `;
export const GetCarbonOffsetsCategoriesDocument = gql`
    query getCarbonOffsetsCategories {
  carbonOffsets(first: 1000) {
    methodologyCategory
  }
}
    `;
export const GetCarbonOffsetsCountriesDocument = gql`
    query getCarbonOffsetsCountries {
  carbonOffsets(first: 1000) {
    country
  }
}
    `;
export const GetCarbonOffsetsVintagesDocument = gql`
    query getCarbonOffsetsVintages {
  carbonOffsets(first: 1000) {
    vintageYear
  }
}
    `;
export const GetCarbonOffsetsByProjectAndVintageDocument = gql`
    query getCarbonOffsetsByProjectAndVintage($key: String!, $vintageStr: String) {
  carbonOffsets(where: {projectID: $key, vintageYear: $vintageStr}) {
    ...CarbonOffsetFragment
  }
}
    ${CarbonOffsetFragmentFragmentDoc}`;
export const FindCarbonOffsetsDocument = gql`
    query findCarbonOffsets($country: [String!], $category: [String!], $search: String, $vintage: [String!]) {
  carbonOffsets(
    first: 1000
    where: {and: [{methodologyCategory_in: $category}, {country_in: $country}, {vintageYear_in: $vintage}, {or: [{name_contains_nocase: $search}, {projectID_contains_nocase: $search}]}]}
  ) {
    ...CarbonOffsetFragment
  }
}
    ${CarbonOffsetFragmentFragmentDoc}`;
export const GetKlimaRetirementTransactionIdDocument = gql`
    query getKlimaRetirementTransactionId($address: String, $index: BigInt) {
  klimaRetires(where: {beneficiaryAddress: $address, index: $index}) {
    transaction {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCarbonOffsetsCategories(variables?: GetCarbonOffsetsCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCarbonOffsetsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCarbonOffsetsCategoriesQuery>(GetCarbonOffsetsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsCategories', 'query');
    },
    getCarbonOffsetsCountries(variables?: GetCarbonOffsetsCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCarbonOffsetsCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCarbonOffsetsCountriesQuery>(GetCarbonOffsetsCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsCountries', 'query');
    },
    getCarbonOffsetsVintages(variables?: GetCarbonOffsetsVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCarbonOffsetsVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCarbonOffsetsVintagesQuery>(GetCarbonOffsetsVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsVintages', 'query');
    },
    getCarbonOffsetsByProjectAndVintage(variables: GetCarbonOffsetsByProjectAndVintageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCarbonOffsetsByProjectAndVintageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCarbonOffsetsByProjectAndVintageQuery>(GetCarbonOffsetsByProjectAndVintageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsByProjectAndVintage', 'query');
    },
    findCarbonOffsets(variables?: FindCarbonOffsetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindCarbonOffsetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindCarbonOffsetsQuery>(FindCarbonOffsetsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findCarbonOffsets', 'query');
    },
    getKlimaRetirementTransactionId(variables?: GetKlimaRetirementTransactionIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetKlimaRetirementTransactionIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetKlimaRetirementTransactionIdQuery>(GetKlimaRetirementTransactionIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getKlimaRetirementTransactionId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;