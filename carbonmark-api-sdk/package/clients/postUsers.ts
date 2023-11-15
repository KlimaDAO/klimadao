import client from "../client";
import type {
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../models/PostUsers";

/**
 * @summary Create user profile
 * @link /users
 */

export function postUsers<
  TData = PostUsersMutationResponse,
  TVariables = PostUsersMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData, TVariables>({
    method: "post",
    url: `/users`,

    data,

    ...options,
  });
}
