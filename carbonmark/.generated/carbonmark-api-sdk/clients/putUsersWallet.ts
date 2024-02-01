import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
  PutUsersWalletPathParams,
} from "../types/PutUsersWallet";

/**
 * @summary Update an existing user profile
 * @link /users/:wallet */
export async function putUsersWallet(
  wallet: PutUsersWalletPathParams["wallet"],
  data?: PutUsersWalletMutationRequest,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<PutUsersWalletMutationResponse>["data"]> {
  const res = await client<
    PutUsersWalletMutationResponse,
    PutUsersWalletMutationRequest
  >({
    method: "put",
    url: `/users/${wallet}`,
    data,
    ...options,
  });
  return res.data;
}
