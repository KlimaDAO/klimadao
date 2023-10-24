import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostUsersLoginMutationRequest,
  PostUsersLoginMutationResponse,
} from "../types/PostUsersLogin";

/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /users/login
 */
export async function postUsersLogin<
  TData = PostUsersLoginMutationResponse,
  TVariables = PostUsersLoginMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>> {
  return client<TData, TVariables>({
    method: "post",
    url: `/users/login`,
    data,
    ...options,
  });
}
