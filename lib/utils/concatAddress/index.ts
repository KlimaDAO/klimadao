/**
 * @example
 * // 0x123..456
 */
export const concatAddress = (address: string) => {
  return address.slice(0, 5) + ".." + address.slice(address.length - 3);
};
