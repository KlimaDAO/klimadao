import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../client";
import type {
  PostUsers403,
  PostUsersMutationRequest,
  PostUsersMutationResponse,
} from "../types/PostUsers";

type PostUsersClient = typeof client<
  PostUsersMutationResponse,
  PostUsers403,
  PostUsersMutationRequest
>;
type PostUsers = {
  data: PostUsersMutationResponse;
  error: PostUsers403;
  request: PostUsersMutationRequest;
  pathParams: never;
  queryParams: never;
  headerParams: never;
  response: PostUsersMutationResponse;
  client: {
    parameters: Partial<Parameters<PostUsersClient>[0]>;
    return: Awaited<ReturnType<PostUsersClient>>;
  };
};
/**
 * @summary Create user profile
 * @link /users */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    PostUsers["response"],
    PostUsers["error"]
  >;
  client?: PostUsers["client"]["parameters"];
  shouldFetch?: boolean;
}): SWRMutationResponse<PostUsers["response"], PostUsers["error"]> {
  const {
    mutation: mutationOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/users` as const;
  return useSWRMutation<
    PostUsers["response"],
    PostUsers["error"],
    typeof url | null
  >(
    shouldFetch ? url : null,
    async (_url, { arg: data }) => {
      const res = await client<
        PostUsers["data"],
        PostUsers["error"],
        PostUsers["request"]
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
