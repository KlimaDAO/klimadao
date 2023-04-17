import { isString } from "lodash";

/** An Identity Fn Type */
export type IdentityFn<T> = (t: T) => T;

/** A pass/fail type */
export type Predicate<T> = (x: T) => boolean;

/** String array typeguard */
export const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every(isString);
