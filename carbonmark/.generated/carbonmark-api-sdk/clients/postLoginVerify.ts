import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostLoginVerifyMutationRequest,
  PostLoginVerifyMutationResponse,
} from "../types/PostLoginVerify";

/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /login/verify
 */
export async function postLoginVerify<
  TData = PostLoginVerifyMutationResponse,
  TVariables = PostLoginVerifyMutationRequest,
>(
  data: TVariables,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData, TVariables>({
    method: "post",
    url: `/login/verify`,
    data,
    ...options,
  });

  return resData;
}
