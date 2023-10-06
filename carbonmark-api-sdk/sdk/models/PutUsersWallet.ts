export type PutUsersWalletMutationRequest = {
  /**
   * @type string
   */
  wallet: string;
  /**
   * @type string
   */
  username: string;
  /**
   * @type string
   */
  description: string;
  /**
   * @type string | undefined
   */
  profileImgUrl?: string;
};

/**
 * @description Successful response
 */
export type PutUsersWalletMutationResponse = {
  /**
   * @type string
   */
  wallet: string;
  /**
   * @type string
   */
  username: string;
  /**
   * @type string
   */
  description: string;
  /**
   * @type string | undefined
   */
  profileImgUrl?: string;
};

export type PutUsersWalletPathParams = {
  /**
   * @description The target wallet address
   * @type string
   */
  wallet: string;
};
