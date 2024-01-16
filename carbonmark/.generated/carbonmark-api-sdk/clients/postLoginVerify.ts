import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostLoginVerifyMutationRequest,
  PostLoginVerifyMutationResponse,
} from "../types/PostLoginVerify";

/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /login/verify */
export async function postLoginVerify(
  data: PostLoginVerifyMutationRequest,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<PostLoginVerifyMutationResponse>["data"]> {
  const res = await client<
    PostLoginVerifyMutationResponse,
    PostLoginVerifyMutationRequest
  >({
    method: "post",
    url: `/login/verify`,
    data,
    ...options,
  });
  return res.data;
}
