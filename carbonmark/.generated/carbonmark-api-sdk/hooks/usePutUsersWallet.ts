import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { ResponseConfig } from "../../../lib/api/client";
import client from "../../../lib/api/client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
  PutUsersWalletPathParams,
} from "../types/PutUsersWallet";

/**
 * @summary Update user profile
 * @link /users/:wallet
 */

export function usePutUsersWallet<
  TData = PutUsersWalletMutationResponse,
  TError = unknown,
  TVariables = PutUsersWalletMutationRequest,
>(
  wallet: PutUsersWalletPathParams["wallet"],
  options?: {
    mutation?: SWRMutationConfiguration<
      ResponseConfig<TData>,
      TError,
      string | null,
      TVariables
    >;
    client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>;
    shouldFetch?: boolean;
  }
): SWRMutationResponse<
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

  const url = shouldFetch ? `/users/${wallet}` : null;
  return useSWRMutation<
    ResponseConfig<TData>,
    TError,
    string | null,
    TVariables
  >(
    url,
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
