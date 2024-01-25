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
export type PostUsersMutation = {
  Response: PostUsersMutationResponse;
  Request: PostUsersMutationRequest;
  Errors: PostUsers403;
};
