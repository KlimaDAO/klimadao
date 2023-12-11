import type { Def1 } from "./Def1";

export type GetProjectsIdPathParams = {
  /**
   * @description Project id & vintage
   * @type string
   */
  id: string;
};

export const type4 = {
  Feature: "Feature",
} as const;
export type Type4 = (typeof type4)[keyof typeof type4];
export const geometryType4 = {
  Point: "Point",
} as const;
export type GeometryType4 = (typeof geometryType4)[keyof typeof geometryType4];
/**
 * @description Project with id
 */
export type GetProjectsIdQueryResponse = {
  /**
   * @type string
   */
  key: string;
  projectID?: string | null;
  name?: string | null;
  registry?: string | null;
  country?: string | null;
  description?: string | null;
  location?: {
    /**
     * @description `Feature`
     * @type string
     */
    type: Type4;
    /**
     * @type object
     */
    geometry: {
      /**
       * @description `Point`
       * @type string
       */
      type: GeometryType4;
      /**
       * @type array
       */
      coordinates: number[];
    };
  } | null;
  methodologies?:
    | ({
        id?: string | null;
        category?: string | null;
        name?: string | null;
      } | null)[]
    | null;
  /**
   * @type array
   */
  images: {
    caption?: string | null;
    url?: string | null;
  }[];
  long_description?: string | null;
  short_description?: string | null;
  url?: string | null;
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
     * @type boolean
     */
    poolAddress: boolean;
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
   * @type array
   */
  listings: {
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
  }[];
  /**
   * @type string
   */
  price: string;
  /**
   * @type string
   */
  vintage: string;
  serialization?: string | null;
  tokenId?: string | null;
};

export type GetProjectsIdQueryParams = {
  network?: Def1;
  /**
   * @description Only return projects listings that expire after this timestamp (Unix seconds)
   * @type string | undefined
   */
  expiresAfter?: string;
};
