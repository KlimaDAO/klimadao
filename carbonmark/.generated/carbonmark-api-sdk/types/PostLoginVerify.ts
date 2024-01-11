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
export namespace PostLoginVerifyMutation {
  export type Response = PostLoginVerifyMutationResponse;
  export type Request = PostLoginVerifyMutationRequest;
}
