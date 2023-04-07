import { isNil } from "lodash/fp";

/** Typeguard for nullish values */
export const notNil = <T>(a: T): a is NonNullable<T> => !isNil(a);
