import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../../../lib/api/client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
} from "../models/PutUsersWallet";

/**
 * @summary Update user profile
 * @link /users/:wallet
 */

export function usePutUsersWallet<
  TData = PutUsersWalletMutationResponse,
  TError = unknown,
  TVariables = PutUsersWalletMutationRequest,
>(options?: {
  mutation?: SWRMutationConfiguration<TData, TError, string, TVariables>;
  client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
}): SWRMutationResponse<TData, TError, string, TVariables> {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};

  return useSWRMutation<TData, TError, string, TVariables>(
    `/users/${wallet}`,
    (url, { arg: data }) => {
      return client<TData, TError, TVariables>({
        method: "put",
        url,
        data,

        ...clientOptions,
      });
    },
    mutationOptions
  );
}
