export type PostLoginVerifyMutationRequest = {
  /**
   * @type string
   */
  wallet: string;
  /**
   * @type string
   */
  signature: string;
};

/**
 * @description Successful response
 */
export type PostLoginVerifyMutationResponse = {
  /**
   * @type string
   */
  token: string;
};
export type PostLoginVerifyMutation = {
  Response: PostLoginVerifyMutationResponse;
  Request: PostLoginVerifyMutationRequest;
};
