import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../client";
import type {
  PostLoginMutationRequest,
  PostLoginMutationResponse,
} from "../types/PostLogin";

type PostLoginClient = typeof client<
  PostLoginMutationResponse,
  never,
  PostLoginMutationRequest
>;
type PostLogin = {
  data: PostLoginMutationResponse;
  error: never;
  request: PostLoginMutationRequest;
  pathParams: never;
  queryParams: never;
  headerParams: never;
  response: PostLoginMutationResponse;
  client: {
    parameters: Partial<Parameters<PostLoginClient>[0]>;
    return: Awaited<ReturnType<PostLoginClient>>;
  };
};
/**
 * @description Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 * @link /login */
export function usePostLogin(options?: {
  mutation?: SWRMutationConfiguration<
    PostLogin["response"],
    PostLogin["error"]
  >;
  client?: PostLogin["client"]["parameters"];
  shouldFetch?: boolean;
}): SWRMutationResponse<PostLogin["response"], PostLogin["error"]> {
  const {
    mutation: mutationOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/login` as const;
  return useSWRMutation<
    PostLogin["response"],
    PostLogin["error"],
    typeof url | null
  >(
    shouldFetch ? url : null,
    async (_url, { arg: data }) => {
      const res = await client<
        PostLogin["data"],
        PostLogin["error"],
        PostLogin["request"]
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
