import type { Def1 } from "./Def1";

export const type3 = {
  Feature: "Feature",
} as const;
export type Type3 = (typeof type3)[keyof typeof type3];
export const geometryType3 = {
  Point: "Point",
} as const;
export type GeometryType3 = (typeof geometryType3)[keyof typeof geometryType3];
/**
 * @description List of projects
 */
export type GetProjectsQueryResponse = {
  description?: string | null;
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
  methodologies: ({
    id?: string | null;
    category?: string | null;
    name?: string | null;
  } | null)[];
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
  /**
   * @type string
   */
  vintage: string;
  /**
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
   * @type object
   */
  country: {
    /**
     * @type string
     */
    id: string;
  };
  /**
   * @type string
   */
  region: string;
  /**
   * @type string
   */
  price: string;
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
      }[]
    | null;
  images?:
    | {
        /**
         * @type string
         */
        url: string;
        /**
         * @type string
         */
        caption: string;
      }[]
    | null;
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
};
