import { ValueOf } from "./types.utils";

export const keys = <T extends object>(obj: T) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed keys
  Object.keys(obj) as (keyof T)[];

export const entries = <T extends object>(obj: T) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- typed entries
  Object.entries(obj) as [keyof T, ValueOf<T>][];
