import {
  ApolloClient,
  ApolloLink,
  from,
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

const loggingLink = new ApolloLink((operation, forward) => {
  // Log the request data
  console.info("Request:", operation.operationName, operation.variables);

  // Call the next link in the chain
  return forward(operation).map((response) => {
    // Log the response data
    console.info("Response:", operation.operationName, response.data);
    return response;
  });
});

// Create a new Apollo client instance
export const client = new ApolloClient({
  // Use the InMemoryCache to store the result of GraphQL queries in memory
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
  defaultOptions: DEFAULT_OPTIONS,
});

// Define a function that executes a GraphQL query and returns the result
export async function executeGraphQLQuery<TResponse = OperationResponse>(
  link: HttpOptions["uri"],
  query: QueryOptions["query"],
  variables: QueryOptions["variables"] = {}
) {
  const httpLink = new HttpLink({ uri: link, fetch });
  const isProduction = process.env.VERCEL_ENV === "production";
  from([loggingLink, httpLink]);

  //Conditionally add logging if not in production
  client.setLink(isProduction ? httpLink : from([loggingLink, httpLink]));

  // Execute the query and return the result
  return await client.query<TResponse | undefined>({
    query,
    variables,
  });
}
