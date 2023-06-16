import { isEmpty, isNil, negate, overEvery } from "lodash/fp";

/** Pulls the direct value from an object */
export const extract =
  <T, K extends keyof T>(key: K, fallback?: T[K]) =>
  (obj: T) =>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed extract
    obj[key] ?? (fallback as T[K]);

/** Predicate for null or undefined (not falsey) */
export const notNil = <T>(a: T): a is NonNullable<T> => !isNil(a);

export const notEmpty = negate(isEmpty);

export const notEmptyOrNil = overEvery([notNil, notEmpty]);
