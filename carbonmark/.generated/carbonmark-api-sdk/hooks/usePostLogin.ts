import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { ResponseConfig } from "../../../lib/api/client";
import client from "../../../lib/api/client";
import type {
  PostLoginMutationRequest,
  PostLoginMutationResponse,
} from "../types/PostLogin";

/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /login
 */

export function usePostLogin<
  TData = PostLoginMutationResponse,
  TError = unknown,
  TVariables = PostLoginMutationRequest,
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

  const url = shouldFetch ? `/login` : null;
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
