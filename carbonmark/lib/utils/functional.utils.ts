import { isNil } from "lodash/fp";
import { Predicate } from "./types.utils";

/** Typeguard for nullish values */
export const notNil = <T>(a: T): a is NonNullable<T> => !isNil(a);

/** A predicate that returns true if the given element contains the given value for the given key */
export const selector =
  <T>(key: keyof T, value: unknown): Predicate<T> =>
  (x: T) =>
    x[key] === value;
