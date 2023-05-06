import {
  ApolloClient,
  HttpLink,
  HttpOptions,
  InMemoryCache,
  QueryOptions,
} from "@apollo/client";
// Import the cross-fetch library for making HTTP requests
import fetch from "cross-fetch";
import { OperationResponse } from "firebase-admin/lib/machine-learning/machine-learning-api-client";

const DEFAULT_OPTIONS = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
} as const;

// Create a new Apollo client instance
export const client = new ApolloClient({
  // Use the createHttpLink function to create a link that sends GraphQL requests over HTTP
  link: new HttpLink({ uri: process.env.GRAPH_API_URL, fetch }),
  // Use the InMemoryCache to store the result of GraphQL queries in memory
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
  defaultOptions: DEFAULT_OPTIONS,
});

// Define a function that executes a GraphQL query and returns the result
export async function executeGraphQLQuery<
  TResponse = OperationResponse,
>(
  link: HttpOptions["uri"],
  query: QueryOptions["query"],
  variables: QueryOptions["variables"] = {}
) {
  client.setLink(new HttpLink({ uri: link, fetch }));

  // Execute the query and return the result
  return await client.query<TResponse>({
    query,
    variables,
  });
}
