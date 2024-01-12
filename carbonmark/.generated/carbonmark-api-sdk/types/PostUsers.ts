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
  description?: string | null;
  profileImgUrl?: string | null;
};

/**
 * @description Default Response
 */
export type PostUsersMutationResponse = {
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
  description?: string | null;
  profileImgUrl?: string | null;
};
export namespace PostUsersMutation {
  export type Response = PostUsersMutationResponse;
  export type Request = PostUsersMutationRequest;
  export type Errors = PostUsers403;
}
