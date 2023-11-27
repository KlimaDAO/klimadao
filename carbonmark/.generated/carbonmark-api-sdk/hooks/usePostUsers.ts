import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { ResponseConfig } from "../../../lib/api/client";
import client from "../../../lib/api/client";
import type {
  PostUsers403,
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../types/PostUsers";

/**
 * @summary Create user profile
 * @link /users
 */

export function usePostUsers<
  TData = PostUsersMutationResponse,
  TError = PostUsers403,
  TVariables = PostUsersMutationRequest,
>(options?: {
  mutation?: SWRMutationConfiguration<
    ResponseConfig<TData>,
    TError,
    string | null,
    TVariables
  >;
  client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
  shouldFetch?: boolean;
}): SWRMutationResponse<
  ResponseConfig<TData>,
  TError,
  string | null,
  TVariables
> {
  const {
    mutation: mutationOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};

  const url = shouldFetch ? `/users` : null;
  return useSWRMutation<
    ResponseConfig<TData>,
    TError,
    string | null,
    TVariables
  >(
    url,
    (url, { arg: data }) => {
      return client<TData, TError, TVariables>({
        method: "post",
        url,
        data,

        ...clientOptions,
      });
    },
    mutationOptions
  );
}
