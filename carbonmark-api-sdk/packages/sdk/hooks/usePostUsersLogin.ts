import client from "@kubb/swagger-client/client";
import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type {
  PostUsersLoginMutationRequest,
  PostUsersLoginMutationResponse,
} from "../models/PostUsersLogin";

/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /users/login
 */

export function usePostUsersLogin<
  TData = PostUsersLoginMutationResponse,
  TError = unknown,
  TVariables = PostUsersLoginMutationRequest,
>(options?: {
  mutation?: SWRMutationConfiguration<TData, TError, string, TVariables>;
  client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
}): SWRMutationResponse<TData, TError, string, TVariables> {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};

  return useSWRMutation<TData, TError, string, TVariables>(
    `/users/login`,
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
