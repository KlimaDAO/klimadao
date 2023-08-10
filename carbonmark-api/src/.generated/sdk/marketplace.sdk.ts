import * as Types from "../types/marketplace.types"
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export const ListingFragmentFragmentDoc = gql`
    fragment ListingFragment on Listing {
  id
  totalAmountToSell
  leftToSell
  tokenAddress
  active
  deleted
  batches
  batchPrices
  singleUnitPrice
  createdAt
  updatedAt
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  key
  projectID
  name
  vintage
  projectAddress
  registry
  methodology
  projectType
  region
}
    `;
export const ActivityFragmentFragmentDoc = gql`
    fragment ActivityFragment on Activity {
  id
  amount
  previousAmount
  price
  previousPrice
  timeStamp
  activityType
}
    `;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories(first: 1000) {
    id
  }
}
    `;
export const GetCountriesDocument = gql`
    query getCountries {
  countries(first: 1000) {
    id
  }
}
    `;
export const GetVintagesDocument = gql`
    query getVintages {
  projects(first: 1000) {
    vintage
  }
}
    `;
export const GetPurchasesByIdDocument = gql`
    query getPurchasesById($id: Bytes) {
  purchases(first: 1, where: {id: $id}) {
    id
    amount
    listing {
      ...ListingFragment
      project {
        ...ProjectFragment
        category {
          id
        }
        country {
          id
        }
        updatedAt
      }
    }
    price
    timeStamp
    user {
      id
    }
  }
}
    ${ListingFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export const GetUserByWalletDocument = gql`
    query getUserByWallet($wallet: Bytes) {
  users(where: {id: $wallet}) {
    listings {
      ...ListingFragment
      seller {
        id
      }
      project {
        ...ProjectFragment
        category {
          id
        }
      }
    }
    activities(orderBy: timeStamp, orderDirection: desc, first: 10) {
      ...ActivityFragment
      project {
        category {
          id
        }
        ...ProjectFragment
      }
      seller {
        id
      }
      buyer {
        id
      }
    }
    purchases {
      id
    }
  }
}
    ${ListingFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}
${ActivityFragmentFragmentDoc}`;
export const FindProjectsDocument = gql`
    query findProjects($country: [String!], $category: [String!], $search: String, $vintage: [BigInt!]) {
  projects(
    where: {category_: {id_in: $category}, country_: {id_in: $country}, name_contains_nocase: $search, vintage_in: $vintage}
  ) {
    ...ProjectFragment
    listings {
      ...ListingFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ListingFragmentFragmentDoc}`;
export const GetProjectsByIdDocument = gql`
    query getProjectsById($key: String, $vintageStr: BigInt) {
  projects(where: {key: $key, vintage: $vintageStr}) {
    ...ProjectFragment
    country {
      id
    }
    listings {
      ...ListingFragment
      seller {
        id
      }
    }
    activities(orderBy: timeStamp, orderDirection: desc, first: 10) {
      ...ActivityFragment
      seller {
        id
      }
      buyer {
        id
      }
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ListingFragmentFragmentDoc}
${ActivityFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCategories(variables?: Types.GetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    },
    getCountries(variables?: Types.GetCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCountriesQuery>(GetCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCountries', 'query');
    },
    getVintages(variables?: Types.GetVintagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetVintagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetVintagesQuery>(GetVintagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVintages', 'query');
    },
    getPurchasesById(variables?: Types.GetPurchasesByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetPurchasesByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetPurchasesByIdQuery>(GetPurchasesByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPurchasesById', 'query');
    },
    getUserByWallet(variables?: Types.GetUserByWalletQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetUserByWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetUserByWalletQuery>(GetUserByWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByWallet', 'query');
    },
    findProjects(variables?: Types.FindProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FindProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FindProjectsQuery>(FindProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findProjects', 'query');
    },
    getProjectsById(variables?: Types.GetProjectsByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.GetProjectsByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetProjectsByIdQuery>(GetProjectsByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectsById', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;