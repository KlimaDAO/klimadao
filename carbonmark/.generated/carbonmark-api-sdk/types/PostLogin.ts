export type PostLoginMutationRequest = {
  /**
   * @type string
   */
  wallet: string;
};

/**
 * @description Successful response
 */
export type PostLoginMutationResponse = {
  /**
   * @type string
   */
  nonce: string;
};
