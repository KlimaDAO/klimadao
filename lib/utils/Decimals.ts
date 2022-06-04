import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const DEFAULT_DECIMALS = 18;

export const BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9') 
export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12') 
export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18') 

export function pow(base: BigDecimal, exponent: number): BigDecimal {
  let result = base;

  if (exponent == 0) {
    return BigDecimal.fromString('1');
  }

  for (let i = 2; i <= exponent; i++) {
    result = result.times(base);
  }

  return result;
}

export function toDecimal(
  value: BigInt,
  decimals: number = DEFAULT_DECIMALS,
): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal();

  return value.divDecimal(precision);
}