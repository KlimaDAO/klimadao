import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostLoginMutationRequest,
  PostLoginMutationResponse,
} from "../types/PostLogin";

/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /login
 */
export async function postLogin<
  TData = PostLoginMutationResponse,
  TVariables = PostLoginMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData, TVariables>({
    method: "post",
    url: `/login`,
    data,
    ...options,
  });

  return resData;
}
