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

export type AssetsAccount = {
  __typename?: 'Account';
  holdings: Array<AssetsHolding>;
  /** Ethereum address of the account */
  id: Scalars['Bytes'];
};


export type AssetsAccountHoldingsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsHolding_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<AssetsHolding_Filter>;
};

export type AssetsAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<AssetsBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<AssetsAccount_Filter>>>;
  holdings_: InputMaybe<AssetsHolding_Filter>;
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
  or: InputMaybe<Array<InputMaybe<AssetsAccount_Filter>>>;
};

export enum AssetsAccount_OrderBy {
  Holdings = 'holdings',
  Id = 'id'
}

export type AssetsBlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type AssetsBlock_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type AssetsHolding = {
  __typename?: 'Holding';
  /** Account this belongs to */
  account: AssetsAccount;
  /** Amount currently held in native units */
  amount: Scalars['BigInt'];
  /** {Account}-{Token} */
  id: Scalars['Bytes'];
  /** Timestamp last updated */
  lastUpdated: Scalars['BigInt'];
  /** Token being held */
  token: AssetsToken;
};

export type AssetsHolding_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<AssetsBlockChangedFilter>;
  account: InputMaybe<Scalars['String']>;
  account_: InputMaybe<AssetsAccount_Filter>;
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
  and: InputMaybe<Array<InputMaybe<AssetsHolding_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<AssetsHolding_Filter>>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<AssetsToken_Filter>;
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

export enum AssetsHolding_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
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

/** Defines the order direction, either ascending or descending */
export enum AssetsOrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type AssetsQuery = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<Assets_Meta_>;
  account: Maybe<AssetsAccount>;
  accounts: Array<AssetsAccount>;
  holding: Maybe<AssetsHolding>;
  holdings: Array<AssetsHolding>;
  token: Maybe<AssetsToken>;
  tokens: Array<AssetsToken>;
};


export type AssetsQuery_MetaArgs = {
  block: InputMaybe<AssetsBlock_Height>;
};


export type AssetsQueryAccountArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsQueryAccountsArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsAccount_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsAccount_Filter>;
};


export type AssetsQueryHoldingArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsQueryHoldingsArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsHolding_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsHolding_Filter>;
};


export type AssetsQueryTokenArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsQueryTokensArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsToken_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsToken_Filter>;
};

export type AssetsSubscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<Assets_Meta_>;
  account: Maybe<AssetsAccount>;
  accounts: Array<AssetsAccount>;
  holding: Maybe<AssetsHolding>;
  holdings: Array<AssetsHolding>;
  token: Maybe<AssetsToken>;
  tokens: Array<AssetsToken>;
};


export type AssetsSubscription_MetaArgs = {
  block: InputMaybe<AssetsBlock_Height>;
};


export type AssetsSubscriptionAccountArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsSubscriptionAccountsArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsAccount_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsAccount_Filter>;
};


export type AssetsSubscriptionHoldingArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsSubscriptionHoldingsArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsHolding_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsHolding_Filter>;
};


export type AssetsSubscriptionTokenArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: Assets_SubgraphErrorPolicy_;
};


export type AssetsSubscriptionTokensArgs = {
  block: InputMaybe<AssetsBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AssetsToken_OrderBy>;
  orderDirection: InputMaybe<AssetsOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: Assets_SubgraphErrorPolicy_;
  where: InputMaybe<AssetsToken_Filter>;
};

export type AssetsToken = {
  __typename?: 'Token';
  /** Decimals of the token */
  decimals: Scalars['Int'];
  /** Ethereum contract address */
  id: Scalars['Bytes'];
  /** Latest price in KLIMA */
  latestPricePerKLIMA: Scalars['BigDecimal'];
  /** Latest price in KLIMAupdate timestamp */
  latestPricePerKLIMAUpdated: Scalars['BigInt'];
  /** Latest price in USD */
  latestPriceUSD: Scalars['BigDecimal'];
  /** Latest price update timestamp */
  latestPriceUSDUpdated: Scalars['BigInt'];
  /** Name of the token */
  name: Scalars['String'];
  /** Symbol of the token */
  symbol: Scalars['String'];
};

export type AssetsToken_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<AssetsBlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<AssetsToken_Filter>>>;
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
  or: InputMaybe<Array<InputMaybe<AssetsToken_Filter>>>;
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

export enum AssetsToken_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  LatestPricePerKlima = 'latestPricePerKLIMA',
  LatestPricePerKlimaUpdated = 'latestPricePerKLIMAUpdated',
  LatestPriceUsd = 'latestPriceUSD',
  LatestPriceUsdUpdated = 'latestPriceUSDUpdated',
  Name = 'name',
  Symbol = 'symbol'
}

export type Assets_Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type Assets_Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Assets_Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum Assets_SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AssetsGetHoldingsByWalletQueryVariables = Exact<{
  wallet: InputMaybe<Scalars['Bytes']>;
}>;


export type AssetsGetHoldingsByWalletQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', holdings: Array<{ __typename?: 'Holding', id: any, amount: string, token: { __typename?: 'Token', id: any, name: string, symbol: string, decimals: number } }> }> };


export const GetHoldingsByWalletDocument = gql`
    query getHoldingsByWallet($wallet: Bytes) {
  accounts(where: {id: $wallet}) {
    holdings {
      id
      token {
        id
        name
        symbol
        decimals
      }
      amount
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getHoldingsByWallet(variables?: AssetsGetHoldingsByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetsGetHoldingsByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetsGetHoldingsByWalletQuery>(GetHoldingsByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHoldingsByWallet', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;