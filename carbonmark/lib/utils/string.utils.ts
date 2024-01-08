import { isStringArray } from "./types.utils";

/**
 * Joins an array of strings into a single string.
 * If the input is already a string, it returns the input as is.
 */
export const joinArray = (value: string | string[]): string =>
  isStringArray(value) ? value.join(",") : value;

/**
 * Checks if a string is empty and returns undefined if true.
 * If the string is not empty, it returns the string as is.
 */
export const emptyToUndefined = (value: string): string | undefined =>
  value === "" ? undefined : value;
