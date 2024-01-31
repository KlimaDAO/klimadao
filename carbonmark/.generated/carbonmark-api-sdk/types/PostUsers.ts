/**
 * @description Default Response
 */
export type PostUsers403 = {
  /**
   * @type string
   */
  error: string;
};

export type PostUsersMutationRequest = {
  /**
   * @type string
   */
  handle: string;
  /**
   * @type string
   */
  username: string;
  /**
   * @type string
   */
  wallet: string;
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
 * @description Default Response
 */
export type PostUsersMutationResponse = {
  /**
   * @type string
   */
  address: string;
  /**
   * @type number
   */
  nonce: number;
};
export namespace PostUsersMutation {
  export type Response = PostUsersMutationResponse;
  export type Request = PostUsersMutationRequest;
  export type Errors = PostUsers403;
}
