import client from "@kubb/swagger-client/client";
import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type {
  PostUsersLoginVerifyMutationRequest,
  PostUsersLoginVerifyMutationResponse,
} from "../models/PostUsersLoginVerify";

/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /users/login/verify
 */

export function usePostUsersLoginVerify<
  TData = PostUsersLoginVerifyMutationResponse,
  TError = unknown,
  TVariables = PostUsersLoginVerifyMutationRequest,
>(options?: {
  mutation?: SWRMutationConfiguration<TData, TError, string, TVariables>;
  client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
}): SWRMutationResponse<TData, TError, string, TVariables> {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};

  return useSWRMutation<TData, TError, string, TVariables>(
    `/users/login/verify`,
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
