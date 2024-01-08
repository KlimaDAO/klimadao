import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";
import useSWRMutation from "swr/mutation";
import client from "../client";
import type {
  PutUsersWalletMutationRequest,
  PutUsersWalletMutationResponse,
  PutUsersWalletPathParams,
} from "../types/PutUsersWallet";

type PutUsersWalletClient = typeof client<
  PutUsersWalletMutationResponse,
  never,
  PutUsersWalletMutationRequest
>;
type PutUsersWallet = {
  data: PutUsersWalletMutationResponse;
  error: never;
  request: PutUsersWalletMutationRequest;
  pathParams: PutUsersWalletPathParams;
  queryParams: never;
  headerParams: never;
  response: PutUsersWalletMutationResponse;
  client: {
    parameters: Partial<Parameters<PutUsersWalletClient>[0]>;
    return: Awaited<ReturnType<PutUsersWalletClient>>;
  };
};
/**
 * @summary Update user profile
 * @link /users/:wallet */
export function usePutUsersWallet(
  wallet: PutUsersWalletPathParams["wallet"],
  options?: {
    mutation?: SWRMutationConfiguration<
      PutUsersWallet["response"],
      PutUsersWallet["error"]
    >;
    client?: PutUsersWallet["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRMutationResponse<PutUsersWallet["response"], PutUsersWallet["error"]> {
  const {
    mutation: mutationOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/users/${wallet}` as const;
  return useSWRMutation<
    PutUsersWallet["response"],
    PutUsersWallet["error"],
    typeof url | null
  >(
    shouldFetch ? url : null,
    async (_url, { arg: data }) => {
      const res = await client<
        PutUsersWallet["data"],
        PutUsersWallet["error"],
        PutUsersWallet["request"]
      >({
        method: "put",
        url,
        data,
        ...clientOptions,
      });
      return res.data;
    },
    mutationOptions
  );
}
