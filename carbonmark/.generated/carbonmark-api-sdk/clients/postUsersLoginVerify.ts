import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostUsersLoginVerifyMutationRequest,
  PostUsersLoginVerifyMutationResponse,
} from "../types/PostUsersLoginVerify";

/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /users/login/verify
 */
export async function postUsersLoginVerify<
  TData = PostUsersLoginVerifyMutationResponse,
  TVariables = PostUsersLoginVerifyMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData, TVariables>({
    method: "post",
    url: `/users/login/verify`,
    data,
    ...options,
  });

  return resData;
}
