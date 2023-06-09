import { DocumentNode } from 'graphql';
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
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pair = {
  currentprice: Scalars['BigDecimal'];
  id: Scalars['ID'];
  lastupdate: Scalars['String'];
  swaps: Array<Swap>;
  token0: Token;
  token1: Token;
  totalklimaearnedfees: Scalars['BigDecimal'];
  totalvolume: Scalars['BigDecimal'];
};


export type PairSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Pair_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pair_Filter>>>;
  currentprice?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_gt?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_gte?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentprice_lt?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_lte?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_not?: InputMaybe<Scalars['BigDecimal']>;
  currentprice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastupdate?: InputMaybe<Scalars['String']>;
  lastupdate_contains?: InputMaybe<Scalars['String']>;
  lastupdate_contains_nocase?: InputMaybe<Scalars['String']>;
  lastupdate_ends_with?: InputMaybe<Scalars['String']>;
  lastupdate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastupdate_gt?: InputMaybe<Scalars['String']>;
  lastupdate_gte?: InputMaybe<Scalars['String']>;
  lastupdate_in?: InputMaybe<Array<Scalars['String']>>;
  lastupdate_lt?: InputMaybe<Scalars['String']>;
  lastupdate_lte?: InputMaybe<Scalars['String']>;
  lastupdate_not?: InputMaybe<Scalars['String']>;
  lastupdate_not_contains?: InputMaybe<Scalars['String']>;
  lastupdate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastupdate_not_ends_with?: InputMaybe<Scalars['String']>;
  lastupdate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastupdate_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastupdate_not_starts_with?: InputMaybe<Scalars['String']>;
  lastupdate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastupdate_starts_with?: InputMaybe<Scalars['String']>;
  lastupdate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<Pair_Filter>>>;
  swaps_?: InputMaybe<Swap_Filter>;
  token0?: InputMaybe<Scalars['String']>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalklimaearnedfees?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalklimaearnedfees_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_not?: InputMaybe<Scalars['BigDecimal']>;
  totalklimaearnedfees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalvolume?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalvolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalvolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Pair_OrderBy {
  Currentprice = 'currentprice',
  Id = 'id',
  Lastupdate = 'lastupdate',
  Swaps = 'swaps',
  Token0 = 'token0',
  Token0Decimals = 'token0__decimals',
  Token0Id = 'token0__id',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token1 = 'token1',
  Token1Decimals = 'token1__decimals',
  Token1Id = 'token1__id',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Totalklimaearnedfees = 'totalklimaearnedfees',
  Totalvolume = 'totalvolume'
}

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
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

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pair_Filter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
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

export type Swap = {
  close: Scalars['BigDecimal'];
  high: Scalars['BigDecimal'];
  id: Scalars['ID'];
  klimaearnedfees: Scalars['BigDecimal'];
  low: Scalars['BigDecimal'];
  lpfees: Scalars['BigDecimal'];
  open: Scalars['BigDecimal'];
  pair: Pair;
  slippage: Scalars['BigDecimal'];
  timestamp: Scalars['String'];
  volume: Scalars['BigDecimal'];
};

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  close?: InputMaybe<Scalars['BigDecimal']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close_lt?: InputMaybe<Scalars['BigDecimal']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']>;
  close_not?: InputMaybe<Scalars['BigDecimal']>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high?: InputMaybe<Scalars['BigDecimal']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high_lt?: InputMaybe<Scalars['BigDecimal']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']>;
  high_not?: InputMaybe<Scalars['BigDecimal']>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  klimaearnedfees?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_gt?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_gte?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  klimaearnedfees_lt?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_lte?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_not?: InputMaybe<Scalars['BigDecimal']>;
  klimaearnedfees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low?: InputMaybe<Scalars['BigDecimal']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low_lt?: InputMaybe<Scalars['BigDecimal']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']>;
  low_not?: InputMaybe<Scalars['BigDecimal']>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpfees?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_gt?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_gte?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpfees_lt?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_lte?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_not?: InputMaybe<Scalars['BigDecimal']>;
  lpfees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open?: InputMaybe<Scalars['BigDecimal']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open_lt?: InputMaybe<Scalars['BigDecimal']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']>;
  open_not?: InputMaybe<Scalars['BigDecimal']>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<Pair_Filter>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  slippage?: InputMaybe<Scalars['BigDecimal']>;
  slippage_gt?: InputMaybe<Scalars['BigDecimal']>;
  slippage_gte?: InputMaybe<Scalars['BigDecimal']>;
  slippage_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  slippage_lt?: InputMaybe<Scalars['BigDecimal']>;
  slippage_lte?: InputMaybe<Scalars['BigDecimal']>;
  slippage_not?: InputMaybe<Scalars['BigDecimal']>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['String']>;
  timestamp_contains?: InputMaybe<Scalars['String']>;
  timestamp_contains_nocase?: InputMaybe<Scalars['String']>;
  timestamp_ends_with?: InputMaybe<Scalars['String']>;
  timestamp_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp_gt?: InputMaybe<Scalars['String']>;
  timestamp_gte?: InputMaybe<Scalars['String']>;
  timestamp_in?: InputMaybe<Array<Scalars['String']>>;
  timestamp_lt?: InputMaybe<Scalars['String']>;
  timestamp_lte?: InputMaybe<Scalars['String']>;
  timestamp_not?: InputMaybe<Scalars['String']>;
  timestamp_not_contains?: InputMaybe<Scalars['String']>;
  timestamp_not_contains_nocase?: InputMaybe<Scalars['String']>;
  timestamp_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['String']>>;
  timestamp_not_starts_with?: InputMaybe<Scalars['String']>;
  timestamp_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp_starts_with?: InputMaybe<Scalars['String']>;
  timestamp_starts_with_nocase?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Swap_OrderBy {
  Close = 'close',
  High = 'high',
  Id = 'id',
  Klimaearnedfees = 'klimaearnedfees',
  Low = 'low',
  Lpfees = 'lpfees',
  Open = 'open',
  Pair = 'pair',
  PairCurrentprice = 'pair__currentprice',
  PairId = 'pair__id',
  PairLastupdate = 'pair__lastupdate',
  PairTotalklimaearnedfees = 'pair__totalklimaearnedfees',
  PairTotalvolume = 'pair__totalvolume',
  Slippage = 'slippage',
  Timestamp = 'timestamp',
  Volume = 'volume'
}

export type Token = {
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  Name = 'name',
  Symbol = 'symbol'
}

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
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

export type GetPairQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPairQuery = { pair?: { currentprice: any } | null };


export const GetPairDocument = gql`
    query getPair($id: ID!) {
  pair(id: $id) {
    currentprice
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getPair(variables: GetPairQueryVariables, options?: C): Promise<GetPairQuery> {
      return requester<GetPairQuery, GetPairQueryVariables>(GetPairDocument, variables, options) as Promise<GetPairQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;