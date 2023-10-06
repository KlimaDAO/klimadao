export type PostUsersLoginVerifyMutationRequest = {
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
export type PostUsersLoginVerifyMutationResponse = {
  /**
   * @type string
   */
  token: string;
};
