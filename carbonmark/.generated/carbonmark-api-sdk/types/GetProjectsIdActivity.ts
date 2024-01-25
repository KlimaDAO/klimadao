import type { Def1 } from "./Def1";

export type GetProjectsIdActivityPathParams = {
  /**
   * @description Project id & vintage
   * @type string
   */
  id: string;
};

/**
 * @description List of project activities
 */
export type GetProjectsIdActivityQueryResponse = {
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

export type GetProjectsIdActivityQueryParams =
  | {
      network?: Def1;
      /**
       * @type array | undefined
       */
      projectId?: string[];
      /**
       * @type array | undefined
       */
      activityType?: (
        | "CreatedListing"
        | "DeletedListing"
        | "Purchase"
        | "Sold"
        | "UpdatedPrice"
        | "UpdatedQuantity"
      )[];
    }
  | undefined;
export type GetProjectsIdActivityQuery = {
  Response: GetProjectsIdActivityQueryResponse;
  PathParams: GetProjectsIdActivityPathParams;
  QueryParams: GetProjectsIdActivityQueryParams;
};
