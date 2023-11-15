import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../types/PostUsers";

/**
 * @summary Create user profile
 * @link /users
 */
export async function postUsers<
  TData = PostUsersMutationResponse,
  TVariables = PostUsersMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData, TVariables>({
    method: "post",
    url: `/users`,
    data,
    ...options,
  });

  return resData;
}
