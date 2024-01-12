import { isEmpty, isNil, mapValues, omitBy, overSome, pipe } from "lodash/fp";
import { ArrayUtils } from "./array.utils";
import { ValueOf } from "./types.utils";

export const keys = <T extends object>(obj: T) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed keys
  Object.keys(obj) as (keyof T)[];

export const entries = <T extends object>(obj: T) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed entries
  Object.entries(obj) as [keyof T, ValueOf<T>][];

/** Remove all keys with nullish values and remove nullish entries from arrays */
export const clean = pipe(
  omitBy(overSome([isNil, isEmpty])),
  mapValues(ArrayUtils.clean)
);

export const ObjectUtils = {
  clean,
  entries,
  keys,
};
