import { isStringArray } from "./types.utils";

/**
 * Joins an array of strings into a single comma-separated string.
 * If the input is already a string, it returns the input as is.
 */
export const joinArray =
  (delim: string) =>
  (value: string | string[]): string =>
    isStringArray(value) ? value.join(delim) : value;

/**
 * Checks if a string is empty and returns undefined if true.
 * If the string is not empty, it returns the string as is.
 */
export const emptyToUndefined = (value: string): string | undefined =>
  value === "" ? undefined : value;

// Checks if a string represents a number
export const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};
