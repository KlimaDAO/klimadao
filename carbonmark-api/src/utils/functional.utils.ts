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

type Predicate<T> = (x: T) => boolean;

/** A predicate that returns true if the given element contains the given value for the given key */
export const selector =
  <T, K extends keyof T = keyof T>(
    key: K,
    value: unknown | Predicate<K>
  ): Predicate<T> =>
  (x: T) => {
    if (typeof value === "function") {
      return value(x[key]);
    } else {
      return x[key] === value;
    }
  };
