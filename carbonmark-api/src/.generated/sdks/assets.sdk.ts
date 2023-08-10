import * as Types from "../types/assets.types"
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getHoldingsByWallet(variables?: Types.GetHoldingsByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetHoldingsByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetHoldingsByWalletQuery>(GetHoldingsByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHoldingsByWallet', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;