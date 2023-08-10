import * as Types from "../types/tokens.types"
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const GetPairDocument = gql`
    query getPair($id: ID!) {
  pair(id: $id) {
    currentprice
  }
}
    `;
export const GetBySymbolDocument = gql`
    query getBySymbol($symbol: String) {
  tokens(where: {symbol: $symbol}) {
    id
  }
}
    `;
export const GetPoolPricesDocument = gql`
    query getPoolPrices {
  prices: pairs {
    address: id
    price: currentprice
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPair(variables: Types.GetPairQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetPairQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetPairQuery>(GetPairDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPair', 'query');
    },
    getBySymbol(variables?: Types.GetBySymbolQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetBySymbolQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetBySymbolQuery>(GetBySymbolDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBySymbol', 'query');
    },
    getPoolPrices(variables?: Types.GetPoolPricesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetPoolPricesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetPoolPricesQuery>(GetPoolPricesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPoolPrices', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;