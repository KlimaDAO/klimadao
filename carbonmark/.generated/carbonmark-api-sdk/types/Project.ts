export const type = {
  Feature: "Feature",
} as const;
export type Type = (typeof type)[keyof typeof type];
export const geometryType = {
  Point: "Point",
} as const;
export type GeometryType = (typeof geometryType)[keyof typeof geometryType];
export type Project = {
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
     * @type string
     */
    type: Type;
    /**
     * @type object
     */
    geometry: {
      /**
       * @type string
       */
      type: GeometryType;
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
        createdAt?: string | null;
        updatedAt?: string | null;
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
         * @type string
         */
        expiration: string;
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
};
