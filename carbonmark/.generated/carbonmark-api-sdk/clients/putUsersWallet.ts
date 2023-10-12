import client from "../client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
} from "../models/PutUsersWallet";

/**
 * @summary Update user profile
 * @link /users/:wallet
 */

export function putUsersWallet<
  TData = PutUsersWalletMutationResponse,
  TVariables = PutUsersWalletMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData, TVariables>({
    method: "put",
    url: `/users/${wallet}`,

    data,

    ...options,
  });
}
