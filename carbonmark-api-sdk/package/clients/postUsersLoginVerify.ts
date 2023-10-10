import client from "../client";
import type {
  PostUsersLoginVerifyMutationRequest,
  PostUsersLoginVerifyMutationResponse,
} from "../models/PostUsersLoginVerify";

/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /users/login/verify
 */

export function postUsersLoginVerify<
  TData = PostUsersLoginVerifyMutationResponse,
  TVariables = PostUsersLoginVerifyMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData, TVariables>({
    method: "post",
    url: `/users/login/verify`,

    data,

    ...options,
  });
}
