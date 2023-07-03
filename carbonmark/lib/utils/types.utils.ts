import { isString } from "lodash";

/** An Identity Fn Type */
export type IdentityFn<T> = (t: T) => T;

/** A pass/fail type */
export type Predicate<T> = (x: T) => boolean;

/** Create a type from the possible values of an object */
export type ValueOf<T> = T[keyof T];

/** All possible primitive keys */
export type PrimitiveKey = string | number | symbol;

/** String array typeguard */
export const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every(isString);
