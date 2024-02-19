import type { Def1 } from "./Def1";

export type GetUsersWalletorhandlePathParams = {
  /**
   * @description A user handle or wallet address
   * @type string
   */
  walletOrHandle: string;
};

/**
 * @description Successful response
 */
export type GetUsersWalletorhandleQueryResponse = {
  handle?: string | null;
  /**
   * @type string
   */
  username: string;
  description?: string | null;
  profileImgUrl?: string | null;
  /**
   * @type number
   */
  updatedAt: number;
  /**
   * @type number
   */
  createdAt: number;
  /**
   * @type string
   */
  wallet: string;
  /**
   * @type array | undefined
   */
  listings?: {
    /**
     * @description Unique listing identifier
     * @type string
     */
    id: string;
    /**
     * @description Remaining supply. Unformatted 18 decimal string
     * @type string
     */
    leftToSell: string;
    /**
     * @description Address of the asset being sold
     * @type string
     */
    tokenAddress: string;
    /**
     * @description USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000
     * @type string
     */
    singleUnitPrice: string;
    /**
     * @type string
     */
    totalAmountToSell: string;
    active?: boolean | null;
    deleted?: boolean | null;
    batches?: string[] | null;
    batchPrices?: string[] | null;
    createdAt?: number | null;
    updatedAt?: number | null;
    /**
     * @type object
     */
    seller: {
      handle?: string | null;
      username?: string | null;
      description?: string | null;
      profileImgUrl?: string | null;
      /**
       * @type string
       */
      id: string;
    };
    /**
     * @description Unix Timestamp (seconds) when the listing expires.
     * @type number
     */
    expiration: number;
    /**
     * @description Minimum quantity for purchase transaction to succeed.
     * @type string
     */
    minFillAmount: string;
    /**
     * @type object
     */
    project: {
      /**
       * @type string
       */
      id: string;
      /**
       * @type string
       */
      key: string;
      /**
       * @type string
       */
      vintage: string;
      /**
       * @type string
       */
      name: string;
      /**
       * @type string
       */
      category: string;
      /**
       * @type string
       */
      country: string;
      /**
       * @type string
       */
      methodology: string;
    };
    /**
     * @description Symbol of the token
     * @type string | undefined
     */
    symbol?: string;
    /**
     * @description ID of the token
     * @type string
     */
    tokenId: string;
  }[];
  /**
   * @type array | undefined
   */
  activities?: {
    /**
     * @type string
     */
    id: string;
    /**
     * @type object
     */
    project: {
      /**
       * @type string
       */
      key: string;
      /**
       * @type string
       */
      vintage: string;
    };
    amount?: string | null;
    previousAmount?: string | null;
    price?: string | null;
    previousPrice?: string | null;
    timeStamp?: string | null;
    activityType?: string | null;
    seller?: {
      /**
       * @type string
       */
      id: string;
      handle?: string | null;
    } | null;
    buyer?: {
      /**
       * @type string
       */
      id: string;
      handle?: string | null;
    } | null;
  }[];
  /**
   * @type array | undefined
   */
  assets?: {
    /**
     * @type string
     */
    id: string;
    /**
     * @type object
     */
    token: {
      /**
       * @type string
       */
      id: string;
      /**
       * @type string
       */
      name: string;
      /**
       * @type string
       */
      symbol: string;
      /**
       * @type number
       */
      decimals: number;
      /**
       * @type string | undefined
       */
      tokenId?: string;
    };
    /**
     * @type string
     */
    amount: string;
  }[];
  /**
   * @type number | undefined
   */
  nonce?: number;
};

export type GetUsersWalletorhandleQueryParams = {
  network?: Def1;
  /**
   * @description Only return listings that expire after this timestamp (Unix seconds)
   * @type string | undefined
   */
  expiresAfter?: string;
  /**
   * @description Only consider projects listings and pools that contains at least this amount of credits (Tonnes)
   * @type number | undefined
   */
  minSupply?: number;
};
export namespace GetUsersWalletorhandleQuery {
  export type Response = GetUsersWalletorhandleQueryResponse;
  export type PathParams = GetUsersWalletorhandlePathParams;
  export type QueryParams = GetUsersWalletorhandleQueryParams;
}
