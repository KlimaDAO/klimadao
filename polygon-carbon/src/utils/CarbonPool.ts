import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { CarbonPool, PoolDeposit, PoolRedeem } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'

export function loadOrCreateCarbonPool(poolAddress: Address): CarbonPool {
  let pool = CarbonPool.load(poolAddress)
  if (pool) return pool as CarbonPool

  pool = new CarbonPool(poolAddress)
  pool.supply = ZERO_BI
  pool.save()
  return pool as CarbonPool
}

export function savePoolDeposit(
  id: Bytes,
  account: Address,
  pool: Address,
  offset: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let deposit = new PoolDeposit(id)
  deposit.account = account
  deposit.pool = pool
  deposit.offset = offset
  deposit.amount = amount
  deposit.timestamp = timestamp
  deposit.save()
}

export function savePoolRedeem(
  id: Bytes,
  account: Address,
  pool: Address,
  offset: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let redeem = new PoolRedeem(id)
  redeem.account = account
  redeem.pool = pool
  redeem.offset = offset
  redeem.amount = amount
  redeem.timestamp = timestamp
  redeem.save()
}
