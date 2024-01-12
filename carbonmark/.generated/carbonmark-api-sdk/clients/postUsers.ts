import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../types/PostUsers";

/**
 * @summary Create user profile
 * @link /users */
export async function postUsers(
  data: PostUsersMutationRequest,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<PostUsersMutationResponse>["data"]> {
  const res = await client<PostUsersMutationResponse, PostUsersMutationRequest>(
    {
      method: "post",
      url: `/users`,
      data,
      ...options,
    }
  );
  return res.data;
}
