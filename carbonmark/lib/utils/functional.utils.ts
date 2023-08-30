import { isNil } from "lodash/fp";
import { Predicate } from "./types.utils";

/** Typeguard for nullish values */
export const notNil = <T>(a: T): a is NonNullable<T> => !isNil(a);

/** A predicate that returns true if the given element contains the given value for the given key */
export const selector =
  <T>(key: keyof T, value: unknown): Predicate<T> =>
  (x: T) =>
    x[key] === value;

/** Pulls the direct value from an object */
export const extract =
  <T, K extends keyof T>(key: K, fallback?: T[K]) =>
  (obj: T) =>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed extract
    obj[key] ?? (fallback as T[K]);
