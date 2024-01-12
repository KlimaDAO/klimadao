import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetRetirementsQueryParams,
  GetRetirementsQueryResponse,
} from "../types/GetRetirements";

type GetRetirementsClient = typeof client<
  GetRetirementsQueryResponse,
  never,
  never
>;
type GetRetirements = {
  data: GetRetirementsQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: GetRetirementsQueryParams;
  headerParams: never;
  response: GetRetirementsQueryResponse;
  client: {
    parameters: Partial<Parameters<GetRetirementsClient>[0]>;
    return: Awaited<ReturnType<GetRetirementsClient>>;
  };
};
export function getRetirementsQueryOptions<
  TData extends GetRetirements["response"] = GetRetirements["response"],
  TError = GetRetirements["error"],
>(
  params?: GetRetirements["queryParams"],
  options: GetRetirements["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/retirements`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve an array of retirement filtered by desired query parameters
 * @summary Retirement
 * @link /retirements */
export function useGetRetirements<
  TData extends GetRetirements["response"] = GetRetirements["response"],
  TError = GetRetirements["error"],
>(
  params?: GetRetirements["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetRetirements["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/retirements` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getRetirementsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
