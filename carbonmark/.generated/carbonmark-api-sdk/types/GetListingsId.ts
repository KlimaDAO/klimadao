import type { Def1 } from "./Def1";

export type GetListingsIdPathParams = {
  /**
   * @description The listing id
   * @type string
   */
  id: string;
};

/**
 * @description Successful response
 */
export type GetListingsIdQueryResponse = {
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
   * @description USDC.e price per tonne. Unformatted 6 decimal string. e.g. 1000000
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
};

export type GetListingsIdQueryParams = {
  network?: Def1;
};
export namespace GetListingsIdQuery {
  export type Response = GetListingsIdQueryResponse;
  export type PathParams = GetListingsIdPathParams;
  export type QueryParams = GetListingsIdQueryParams;
}
