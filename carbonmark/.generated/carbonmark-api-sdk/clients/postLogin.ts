import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostLoginMutationRequest,
  PostLoginMutationResponse,
} from "../types/PostLogin";

/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /login */
export async function postLogin(
  data: PostLoginMutationRequest,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<PostLoginMutationResponse>["data"]> {
  const res = await client<PostLoginMutationResponse, PostLoginMutationRequest>(
    {
      method: "post",
      url: `/login`,
      data,
      ...options,
    }
  );
  return res.data;
}
