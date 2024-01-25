import type { Def1 } from "./Def1";

/**
 * @description Successful response
 */
export type GetVintagesQueryResponse = string[];

export type GetVintagesQueryParams =
  | {
      network?: Def1;
    }
  | undefined;
export type GetVintagesQuery = {
  Response: GetVintagesQueryResponse;
  QueryParams: GetVintagesQueryParams;
};
