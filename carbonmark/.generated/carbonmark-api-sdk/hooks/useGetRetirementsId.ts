import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetRetirementsIdPathParams,
  GetRetirementsIdQueryParams,
  GetRetirementsIdQueryResponse,
} from "../types/GetRetirementsId";

type GetRetirementsIdClient = typeof client<
  GetRetirementsIdQueryResponse,
  never,
  never
>;
type GetRetirementsId = {
  data: GetRetirementsIdQueryResponse;
  error: never;
  request: never;
  pathParams: GetRetirementsIdPathParams;
  queryParams: GetRetirementsIdQueryParams;
  headerParams: never;
  response: GetRetirementsIdQueryResponse;
  client: {
    parameters: Partial<Parameters<GetRetirementsIdClient>[0]>;
    return: Awaited<ReturnType<GetRetirementsIdClient>>;
  };
};
export function getRetirementsIdQueryOptions<
  TData extends GetRetirementsId["response"] = GetRetirementsId["response"],
  TError = GetRetirementsId["error"],
>(
  id: GetRetirementsIdPathParams["id"],
  params?: GetRetirementsId["queryParams"],
  options: GetRetirementsId["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/retirements/${id}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/:id */
export function useGetRetirementsId<
  TData extends GetRetirementsId["response"] = GetRetirementsId["response"],
  TError = GetRetirementsId["error"],
>(
  id: GetRetirementsIdPathParams["id"],
  params?: GetRetirementsId["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetRetirementsId["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/retirements/${id}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getRetirementsIdQueryOptions<TData, TError>(id, params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
