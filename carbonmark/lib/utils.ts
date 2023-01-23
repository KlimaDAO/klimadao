/**
 * Is the given arg null or undefined.
 * Use to check that a value is not defined (rather than `nullish`: 0,"" etc)
 */
export const isNil = <T>(a: T): a is NonNullable<T> =>
  a === undefined || a === null;

/**
 * The negated version of isNil.
 * i.e is the given arg a value other than null or undefined
 * Use to check that a value is defined (rather than `nullish`: 0,"" etc)
 */
export const notNil = <T>(a: T): a is NonNullable<T> => !isNil(a);
