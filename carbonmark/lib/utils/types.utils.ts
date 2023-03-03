import { isString } from "lodash";

/** An Identity Fn Type */
export type IdentityFn<T> = (t: T) => T;

/** String array typeguard */
export const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every(isString);
