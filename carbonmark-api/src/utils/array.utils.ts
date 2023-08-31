import { get, isFunction } from "lodash";

type PrimitiveKey = string | number | symbol;

/**
 * Convert the given array to a new map where the accessor function applied to each element gives that elements key in the map
 * @param arr - the target array
 * @param accessor - a function when applied to an element in the array gives the key for that element
 */
export const arrayToMap = <T>(
  arr: T[],
  accessor: ((element: T) => PrimitiveKey) | keyof T
): Map<PrimitiveKey, T> => {
  const map = new Map<PrimitiveKey, T>();
  arr.forEach((current) => {
    const key = isFunction(accessor)
      ? accessor(current)
      : get(current, accessor);
    map.set(key, current);
  });
  return map;
};
