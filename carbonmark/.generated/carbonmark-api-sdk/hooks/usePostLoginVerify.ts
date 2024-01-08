import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../client";
import type {
  PostLoginVerifyMutationRequest,
  PostLoginVerifyMutationResponse,
} from "../types/PostLoginVerify";

type PostLoginVerifyClient = typeof client<
  PostLoginVerifyMutationResponse,
  never,
  PostLoginVerifyMutationRequest
>;
type PostLoginVerify = {
  data: PostLoginVerifyMutationResponse;
  error: never;
  request: PostLoginVerifyMutationRequest;
  pathParams: never;
  queryParams: never;
  headerParams: never;
  response: PostLoginVerifyMutationResponse;
  client: {
    parameters: Partial<Parameters<PostLoginVerifyClient>[0]>;
    return: Awaited<ReturnType<PostLoginVerifyClient>>;
  };
};
/**
 * @description Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 * @link /login/verify */
export function usePostLoginVerify(options?: {
  mutation?: SWRMutationConfiguration<
    PostLoginVerify["response"],
    PostLoginVerify["error"]
  >;
  client?: PostLoginVerify["client"]["parameters"];
  shouldFetch?: boolean;
}): SWRMutationResponse<PostLoginVerify["response"], PostLoginVerify["error"]> {
  const {
    mutation: mutationOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/login/verify` as const;
  return useSWRMutation<
    PostLoginVerify["response"],
    PostLoginVerify["error"],
    typeof url | null
  >(
    shouldFetch ? url : null,
    async (_url, { arg: data }) => {
      const res = await client<
        PostLoginVerify["data"],
        PostLoginVerify["error"],
        PostLoginVerify["request"]
      >({
        method: "post",
        url,
        data,
        ...clientOptions,
      });
      return res.data;
    },
    mutationOptions
  );
}
