import * as Types from "../types/offsets.types"
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

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
  }
}
    `;
export const FindCarbonOffsetsDocument = gql`
    query findCarbonOffsets($country: [String!], $category: [String!], $search: String, $vintage: [String!]) {
  carbonOffsets(
    first: 1000
    where: {methodologyCategory_in: $category, country_in: $country, name_contains_nocase: $search, vintageYear_in: $vintage}
  ) {
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
    storageMethod
    lastUpdate
    balanceUBO
    balanceNBO
    balanceNCT
    balanceBCT
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCarbonOffsetsCategories(variables?: Types.GetCarbonOffsetsCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCarbonOffsetsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCarbonOffsetsCategoriesQuery>(GetCarbonOffsetsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsCategories', 'query');
    },
    getCarbonOffsetsCountries(variables?: Types.GetCarbonOffsetsCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCarbonOffsetsCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCarbonOffsetsCountriesQuery>(GetCarbonOffsetsCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsCountries', 'query');
    },
    getCarbonOffsetsVintages(variables?: Types.GetCarbonOffsetsVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCarbonOffsetsVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCarbonOffsetsVintagesQuery>(GetCarbonOffsetsVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsVintages', 'query');
    },
    getCarbonOffsetsByProjectAndVintage(variables: Types.GetCarbonOffsetsByProjectAndVintageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCarbonOffsetsByProjectAndVintageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCarbonOffsetsByProjectAndVintageQuery>(GetCarbonOffsetsByProjectAndVintageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCarbonOffsetsByProjectAndVintage', 'query');
    },
    findCarbonOffsets(variables?: Types.FindCarbonOffsetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FindCarbonOffsetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FindCarbonOffsetsQuery>(FindCarbonOffsetsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findCarbonOffsets', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;