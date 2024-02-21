import type { Def1 } from "./Def1";

export type GetProjectsIdPathParams = {
  /**
   * @description Project id & vintage
   * @type string
   */
  id: string;
};

export const type3 = {
  Feature: "Feature",
} as const;
export type Type3 = (typeof type3)[keyof typeof type3];
export const geometryType3 = {
  Point: "Point",
} as const;
export type GeometryType3 = (typeof geometryType3)[keyof typeof geometryType3];
/**
 * @description Project with id
 */
export type GetProjectsIdQueryResponse = {
  description?: string | null;
  long_description?: string | null;
  short_description?: string | null;
  /**
   * @type string
   */
  key: string;
  /**
   * @type string
   */
  projectID: string;
  /**
   * @type string
   */
  name: string;
  /**
   * @type array
   */
  methodologies: {
    id?: string | null;
    category?: string | null;
    name?: string | null;
  }[];
  /**
   * @description A GeoJSON Point feature.
   */
  location?: {
    /**
     * @description `Feature`
     * @type string
     */
    type: Type3;
    /**
     * @type object
     */
    geometry: {
      /**
       * @description `Point`
       * @type string
       */
      type: GeometryType3;
      /**
       * @type array
       */
      coordinates: number[];
    };
  } | null;
  url?: string | null;
  /**
   * @type string
   */
  vintage: string;
  /**
   * @description ⚠️Deprecated. Project may have multiple token addresses.
   * @type string
   */
  creditTokenAddress: string;
  /**
   * @type string
   */
  registry: string;
  /**
   * @type string
   */
  updatedAt: string;
  /**
   * @type string
   */
  country: string;
  /**
   * @type string
   */
  region: string;
  /**
   * @type string
   */
  price: string;
  /**
   * @type array
   */
  prices: {
    /**
     * @description Lowercase name of pool / pool token e.g. 'bct'
     */
    poolName: "ubo" | "nbo" | "bct" | "nct";
    /**
     * @description Remaining supply in pool
     * @type string
     */
    supply: string;
    /**
     * @description Address of the pool itself, e.g. bct token address
     * @type string
     */
    poolAddress: string;
    /**
     * @description Address of the project token in this pool
     * @type string
     */
    projectTokenAddress: string;
    /**
     * @description True if default project for pool and no selective redemption fee applies
     * @type boolean
     */
    isPoolDefault: boolean;
    /**
     * @description formatted USDC.e price for 1 tonne e.g. '0.123456'
     * @type string
     */
    singleUnitPrice: string;
  }[];
  /**
   * @type object
   */
  stats: {
    /**
     * @type number
     */
    totalBridged: number;
    /**
     * @type number
     */
    totalRetired: number;
    /**
     * @type number
     */
    totalSupply: number;
  };
  listings?:
    | {
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
        /**
         * @description ID of the token
         * @type string
         */
        tokenId: string;
      }[]
    | null;
  /**
   * @type array | undefined
   */
  images?: {
    /**
     * @type string
     */
    url: string;
    /**
     * @type string
     */
    caption: string;
  }[];
  /**
   * @type boolean
   */
  hasSupply: boolean;
  /**
   * @type string | undefined
   */
  tokenId?: string;
};

export type GetProjectsIdQueryParams = {
  network?: Def1;
  /**
   * @description Only return projects listings that expire after this timestamp (Unix seconds)
   * @type string | undefined
   */
  expiresAfter?: string;
  /**
   * @description Only consider projects listings and pools that contains at least this amount of credits (Tonnes)
   * @type number | undefined
   */
  minSupply?: number;
};
export namespace GetProjectsIdQuery {
  export type Response = GetProjectsIdQueryResponse;
  export type PathParams = GetProjectsIdPathParams;
  export type QueryParams = GetProjectsIdQueryParams;
}
