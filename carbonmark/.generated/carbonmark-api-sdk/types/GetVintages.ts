import type { Def1 } from "./Def1";

/**
 * @description Successful response
 */
export type GetVintagesQueryResponse = string[];

export type GetVintagesQueryParams = {
  network?: Def1;
};
export namespace GetVintagesQuery {
  export type Response = GetVintagesQueryResponse;
  export type QueryParams = GetVintagesQueryParams;
}
