import { Address, BigInt } from '@graphprotocol/graph-ts'
import { CarbonPoolOffsetBalance } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'

export function loadOrCreateCarbonPoolOffsetBalance(
  poolAddress: Address,
  offsetAddress: Address
): CarbonPoolOffsetBalance {
  let balance = CarbonPoolOffsetBalance.load(poolAddress.concat(offsetAddress))
  if (balance) return balance as CarbonPoolOffsetBalance

  balance = new CarbonPoolOffsetBalance(poolAddress.concat(offsetAddress))
  balance.pool = poolAddress
  balance.offset = offsetAddress
  balance.balance = ZERO_BI
  balance.deposited = ZERO_BI
  balance.redeemed = ZERO_BI
  balance.save()
  return balance as CarbonPoolOffsetBalance
}

export function recordOffsetBalanceDeposit(poolAddress: Address, offsetAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)
  balance.balance = balance.balance.plus(amount)
  balance.deposited = balance.deposited.plus(amount)
  balance.save()
}

export function recordOffsetBalanceRedeem(poolAddress: Address, offsetAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)
  balance.balance = balance.balance.minus(amount)
  balance.redeemed = balance.redeemed.plus(amount)
  balance.save()
}
