import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
  PutUsersWalletPathParams,
} from "../types/PutUsersWallet";

/**
 * @summary Update user profile
 * @link /users/:wallet
 */
export async function putUsersWallet<
  TData = PutUsersWalletMutationResponse,
  TVariables = PutUsersWalletMutationRequest,
>(
  wallet: PutUsersWalletPathParams["wallet"],
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>> {
  return client<TData, TVariables>({
    method: "put",
    url: `/users/${wallet}`,
    data,
    ...options,
  });
}
