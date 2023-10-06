import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../../../lib/api/client";
import type {
  PostUsers403,
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../models/PostUsers";

/**
 * @summary Create user profile
 * @link /users
 */

export function usePostUsers<
  TData = PostUsersMutationResponse,
  TError = PostUsers403,
  TVariables = PostUsersMutationRequest,
>(options?: {
  mutation?: SWRMutationConfiguration<TData, TError, string, TVariables>;
  client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
}): SWRMutationResponse<TData, TError, string, TVariables> {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};

  return useSWRMutation<TData, TError, string, TVariables>(
    `/users`,
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
