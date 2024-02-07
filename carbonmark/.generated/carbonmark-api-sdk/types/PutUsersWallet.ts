/**
 * @description One or more fields to update.
 */
export type PutUsersWalletMutationRequest = {
  /**
   * @type string | undefined
   */
  username?: string;
  /**
   * @type string | undefined
   */
  description?: string;
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
  address: string;
  /**
   * @type number
   */
  nonce: number;
};

export type PutUsersWalletPathParams = {
  /**
   * @type string
   */
  wallet: string;
};
export namespace PutUsersWalletMutation {
  export type Response = PutUsersWalletMutationResponse;
  export type Request = PutUsersWalletMutationRequest;
  export type PathParams = PutUsersWalletPathParams;
}
