/**
 * @example
 * // 0x123…456
 */
export const concatAddress = (address: string, numbers: number = 5) => {
  return address.slice(0, numbers) + "…" + address.slice(address.length - 3);
};

