import type { Def1 } from "./Def1";

export const type2 = {
  Feature: "Feature",
} as const;
export type Type2 = (typeof type2)[keyof typeof type2];
export const geometryType2 = {
  Point: "Point",
} as const;
export type GeometryType2 = (typeof geometryType2)[keyof typeof geometryType2];
/**
 * @description List of projects
 */
export type GetProjectsQueryResponse = {
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
    type: Type2;
    /**
     * @type object
     */
    geometry: {
      /**
       * @description `Point`
       * @type string
       */
      type: GeometryType2;
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
     * @description formatted USDC price for 1 tonne e.g. '0.123456'
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
  /**
   * @type string | undefined
   */
  serialization?: string;
}[];

export type GetProjectsQueryParams = {
  network?: Def1;
  /**
   * @description Desired country of origin for carbon projects
   * @type string | undefined
   */
  country?: string;
  /**
   * @description Desired category of carbon projects
   * @type string | undefined
   */
  category?: string;
  /**
   * @description Search carbon project names and descriptions for a string of text
   * @type string | undefined
   */
  search?: string;
  /**
   * @description Desired vintage of carbon projects
   * @type string | undefined
   */
  vintage?: string;
  /**
   * @description Only return projects listings that expire after this timestamp (Unix seconds)
   * @type string | undefined
   */
  expiresAfter?: string;
  /**
   * @description Only return projects listings and pools that contains at least this amount of credits (Tonnes)
   * @type number | undefined
   */
  minSupply?: number;
};
export namespace GetProjectsQuery {
  export type Response = GetProjectsQueryResponse;
  export type QueryParams = GetProjectsQueryParams;
}
